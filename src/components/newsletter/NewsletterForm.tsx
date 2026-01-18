'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect } from 'react'; // React 19 imports
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { subscribeToNewsletter } from '@/app/actions/newsletter';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type NewsletterFormProps = {
  onSuccess?: () => void;
  className?: string;
  variant?: 'popup' | 'section';
};

export const NewsletterForm = ({ onSuccess, className, variant = 'popup' }: NewsletterFormProps) => {
  const t = useTranslations('Newsletter');

  const newsletterSchema = z.object({
    email: z.string().email({
      message: t('validation_email'),
    }),
  });

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, {
    message: '',
    success: false,
  });

  function onSubmit(values: z.infer<typeof newsletterSchema>) {
    const formData = new FormData();
    formData.append('email', values.email);

    startTransition(() => {
      formAction(formData);
    });
  }

  // Handle success callback
  useEffect(() => {
    if (state.success && onSuccess) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
        </motion.div>
        <h4 className="font-semibold text-lg">{t('success_title')}</h4>
        <p className="text-sm text-muted-foreground mt-1">
          {t('success_message')}
        </p>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      {variant === 'popup' && (
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-lg leading-tight">{t('title')}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {t('description')}
            </p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t('email_placeholder')}
                    {...field}
                    className="rounded-xl h-11 bg-white/50 dark:bg-black/30 border-primary/10 focus:ring-primary"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {state.message && !state.success && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <Button
            type="submit"
            className="w-full rounded-xl h-11 font-semibold"
            disabled={isPending}
          >
            {isPending
              ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {t('submitting')}
                  </span>
                )
              : (
                  t('submit')
                )}
          </Button>
        </form>
      </Form>

      {variant === 'popup' && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          {t('privacy')}
        </p>
      )}
    </div>
  );
};
