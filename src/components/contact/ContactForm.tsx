'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactFormSchema = z.object({
    email: z.string().email({
      message: t('validation.email'),
    }),
    phone: z.string().min(10, {
      message: t('validation.phone'),
    }),
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

  function onSubmit(_values: z.infer<typeof contactFormSchema>) {
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-primary/10 rounded-[2.5rem] space-y-4"
      >
        <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
        <h3 className="text-2xl font-bold">{t('success_message')}</h3>
        <p className="text-muted-foreground italic">{t('success_subtitle')}</p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            form.reset();
          }}
          className="rounded-full mt-4"
        >
          {t('send_another')}
        </Button>
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
                  <Input placeholder={t('form_email_placeholder')} {...field} className="rounded-xl h-12 bg-background border-primary/10 focus:ring-primary" />
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
                  <Input placeholder={t('form_phone_placeholder')} {...field} className="rounded-xl h-12 bg-background border-primary/10 focus:ring-primary" />
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full rounded-full h-12 text-lg font-bold">
            {t('form_submit')}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};
