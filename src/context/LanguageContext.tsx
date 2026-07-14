'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { ar, type ContentDictionary } from '@/content/ar';
import { en } from '@/content/en';

// ─── Types ────────────────────────────────────────────────
type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextValue {
  /** Current active language */
  language: Language;
  /** Text direction for the current language */
  direction: Direction;
  /** Toggle between Arabic and English */
  toggleLanguage: () => void;
  /** Look up a content value by dot-notation key, e.g. `t('discovery.headline')` */
  t: (key: string) => unknown;
}

// ─── Dictionaries ─────────────────────────────────────────
const dictionaries: Record<Language, ContentDictionary> = { ar, en };

// ─── Helpers ──────────────────────────────────────────────
const STORAGE_KEY = 'alarrab-lang';

/**
 * Resolve a dot-notation key against a nested object.
 * Returns the matched value, or the key itself as a fallback.
 */
function resolve(obj: Record<string, unknown>, path: string): unknown {
  const segments = path.split('.');
  let current: unknown = obj;

  for (const segment of segments) {
    if (current === null || current === undefined) return path;
    if (typeof current === 'object' && segment in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      // Key not found — return path as visual indicator in dev
      return path;
    }
  }

  return current;
}

// ─── Context ──────────────────────────────────────────────
const LanguageContext = createContext<LanguageContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────
interface LanguageProviderProps {
  children: ReactNode;
  /** Override the default language (useful for SSR / testing) */
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  defaultLanguage = 'ar',
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'ar' || stored === 'en') {
        setLanguage(stored);
      }
    } catch {
      // localStorage unavailable (SSR / privacy mode) — keep default
    }
  }, []);

  // Sync document attributes & localStorage whenever language changes
  useEffect(() => {
    const dir: Direction = language === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Silently ignore write failures
    }
  }, [language]);

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const t = useCallback(
    (key: string): unknown => {
      return resolve(dictionaries[language] as unknown as Record<string, unknown>, key);
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────
/**
 * Access the language context.
 * Must be used within a `<LanguageProvider>`.
 */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>');
  }
  return ctx;
}
