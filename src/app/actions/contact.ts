'use server';

import arcjet, { detectBot, protectSignup, request, shield } from '@arcjet/next';
import { Resend } from 'resend';
import { z } from 'zod';
import { Env } from '@/libs/Env';

import ContactEmail from '@/templates/ContactEmail';

// Initialize Arcjet
const aj = arcjet({
  key: Env.ARCJET_KEY,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: [], // Block all bots
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
        interval: '10m',
        max: 5,
      },
    }),
  ],
});

// Initialize Resend
const resend = new Resend(Env.RESEND_API_KEY);

// Validation Schema
const ContactSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
});

export type ContactState = {
  message: string;
  errors?: {
    email?: string[];
    phone?: string[];
    message?: string[];
  };
  success?: boolean;
};

export async function sendContactEmail(_prevState: ContactState, formData: FormData): Promise<ContactState> {
  // 1. Validate Form Data
  const validatedFields = ContactSchema.safeParse({
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Veuillez corriger les erreurs ci-dessous.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, phone, message } = validatedFields.data;

  // 2. Arcjet Protection
  try {
    const req = await request();
    const decision = await aj.protect(req, { email });

    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        return { message: 'Activité suspecte détectée (Bot).' };
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

  // 3. Send Email via Resend
  try {
    const { error } = await resend.emails.send({
      from: 'L\'Essence K <contact@lessencek.com>',
      to: ['contact@lessencek.com'],
      subject: `Nouveau message de ${email}`,
      replyTo: email,
      react: ContactEmail({ email, phone, message }),
    });

    if (error) {
      console.error('Resend error:', error);
      return { message: 'Erreur lors de l\'envoi de l\'email.' };
    }

    return { success: true, message: 'Message envoyé avec succès !' };
  } catch (err) {
    console.error('Server action error:', err);
    return { message: 'Une erreur inattendue s\'est produite.' };
  }
}
