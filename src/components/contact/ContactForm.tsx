'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { sendContactEmail } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const ContactForm = () => {
  const t = useTranslations('Contact');

  const contactFormSchema = z.object({
    email: z.string().email({
      message: t('validation.email'),
    }),
    phone: z.string()
      .min(10, { message: t('validation.phone') })
      .transform(val => val.replace(/\s/g, ''))
      .pipe(z.string().min(10, { message: t('validation.phone') })),
    message: z.string().min(10, {
      message: t('validation.message'),
    }),
  });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      phone: '',
      message: '',
    },
  });

  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    message: '',
    success: false,
  });

  // Track submission count to allow "send another" functionality
  const submissionCountRef = useRef(0);
  const lastSuccessCountRef = useRef(0);

  // Derive isSubmitted from state.success and track it
  if (state.success && lastSuccessCountRef.current < submissionCountRef.current) {
    lastSuccessCountRef.current = submissionCountRef.current;
  }
  const isSubmitted = state.success && lastSuccessCountRef.current === submissionCountRef.current;

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    submissionCountRef.current += 1;
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('message', values.message);

    startTransition(() => {
      formAction(formData);
    });
  }

  // Success view
  if (isSubmitted) {
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eec170', '#f6a757', '#ffffff'], // Gold/Wood tones
      });
    });

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] min-h-[400px] text-center space-y-6 shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <CheckCircle2 className="h-24 w-24 text-primary relative z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-amber-600">
            {t('success_message')}
          </h3>
          <p className="text-muted-foreground text-lg max-w-sm mx-auto leading-relaxed">
            {t('success_subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm font-medium text-primary/80 pt-4"
        >
          Bonne journée !
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 md:p-12 bg-accent/5 border border-primary/5 rounded-[2.5rem]"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">{t('form_email')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form_email_placeholder')} {...field} className="rounded-xl h-12 bg-background border-primary/10 focus:ring-primary" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">{t('form_phone')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form_phone_placeholder')}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      const formatted = value.match(/.{1,2}/g)?.join(' ') ?? value;
                      if (formatted.length <= 14) {
                        field.onChange(formatted);
                      }
                    }}
                    value={field.value}
                    className="rounded-xl h-12 bg-background border-primary/10 focus:ring-primary"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">{t('form_message')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('form_message_placeholder')}
                    className="min-h-[150px] rounded-xl bg-background border-primary/10 focus:ring-primary"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {state.message && !state.success && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
              {state.message}
            </div>
          )}

          <Button type="submit" size="lg" className="w-full rounded-full h-12 text-lg font-bold" disabled={isPending}>
            {isPending
              ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </span>
                )
              : t('form_submit')}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};
