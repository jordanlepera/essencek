import type { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'L\'Essence K',
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localePrefix,
  socialMedia: {
    facebook: 'https://www.facebook.com/p/Lessence-K-61554656266995/',
    instagram: 'https://www.instagram.com/l_essence_k/',
  },
};
