import { useLocale } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter } from '@/libs/I18nNavigation';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleValueChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select value={locale} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[140px] rounded-full bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all focus:ring-primary/20">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={4}
        className="w-[140px] rounded-2xl border-white/10 bg-background/95 backdrop-blur-xl"
      >
        <SelectItem value="fr" className="rounded-xl focus:bg-primary/10">
          <span className="flex items-center gap-2">
            Français
            {' '}
            <span className="text-base" role="img" aria-label="French flag">🇫🇷</span>
          </span>
        </SelectItem>
        <SelectItem value="en" className="rounded-xl focus:bg-primary/10">
          <span className="flex items-center gap-2">
            English
            {' '}
            <span className="text-base" role="img" aria-label="English flag">🇬🇧</span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
