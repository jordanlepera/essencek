'use server';

import arcjet, { detectBot, protectSignup, request, shield } from '@arcjet/next';
import { ContactsApi, ContactsApiApiKeys, CreateContact } from '@getbrevo/brevo';
import { z } from 'zod';
import { Env } from '@/libs/Env';

// Brevo List ID for newsletter
const BREVO_LIST_ID = 2;

// Initialize Arcjet with newsletter-specific rules
const aj = arcjet({
  key: Env.ARCJET_KEY,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: [],
    }),
    protectSignup({
      email: {
        mode: 'LIVE',
        deny: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS'],
      },
      bots: {
        mode: 'LIVE',
        allow: [],
      },
      rateLimit: {
        mode: 'LIVE',
        interval: '1h',
        max: 3,
      },
    }),
  ],
});

// Initialize Brevo API
const contactsApi = new ContactsApi();
contactsApi.setApiKey(ContactsApiApiKeys.apiKey, Env.BREVO_API_KEY);

// Validation Schema
const NewsletterSchema = z.object({
  email: z.string().email(),
});

export type NewsletterState = {
  message: string;
  success?: boolean;
};

export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  // 1. Validate Form Data
  const validatedFields = NewsletterSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Veuillez entrer une adresse email valide.',
    };
  }

  const { email } = validatedFields.data;

  // 2. Arcjet Protection
  try {
    const req = await request();
    const decision = await aj.protect(req, { email });

    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        return { message: 'Activité suspecte détectée.' };
      }
      if (decision.reason.isRateLimit()) {
        return { message: 'Trop de tentatives, veuillez réessayer plus tard.' };
      }
      if (decision.reason.isEmail()) {
        return { message: 'Adresse email invalide ou non autorisée.' };
      }
      return { message: 'Accès refusé.' };
    }
  } catch (error) {
    console.error('Arcjet error:', error);
    return { message: 'Erreur de sécurité, veuillez réessayer.' };
  }

  // 3. Add contact to Brevo list
  try {
    const contact = new CreateContact();
    contact.email = email;
    contact.listIds = [BREVO_LIST_ID];
    contact.updateEnabled = true; // Update if contact already exists

    await contactsApi.createContact(contact);

    return { success: true, message: 'Inscription réussie !' };
  } catch (error: unknown) {
    // Handle duplicate contact (Brevo returns 400 for existing contacts)
    if (
      error
      && typeof error === 'object'
      && 'response' in error
      && (error as { response?: { status?: number } }).response?.status === 400
    ) {
      // Contact already exists - this is actually okay for newsletters
      return { success: true, message: 'Inscription réussie !' };
    }

    console.error('Brevo error:', error);
    return { message: 'Une erreur est survenue lors de l\'inscription.' };
  }
}
