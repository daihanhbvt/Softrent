"use client";

import { usePathname } from "next/navigation";
import { localeLabels, locales, localizePath, stripLocale, type Locale } from "@/i18n/config";
import { LOCALE_COOKIE } from "@/i18n/cookie";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  className?: string;
}

export function LanguageSwitcher({ locale, label, className = "" }: LanguageSwitcherProps) {
  const path = stripLocale(usePathname());

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center rounded-md border border-border p-0.5 text-sm font-medium">
        {locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              {/* Thẻ <a> thường: đổi ngôn ngữ tải lại cả trang vì layout gốc (thẻ <html lang>) thay đổi. */}
              <a
                href={localizePath(l, path)}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                aria-label={localeLabels[l].name}
                onClick={() => {
                  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
                }}
                className={`inline-flex h-8 min-w-9 items-center justify-center rounded px-2 transition-colors ${
                  active ? "bg-primary text-primary-fg" : "text-fg-body hover:bg-primary-soft hover:text-primary-text"
                }`}
              >
                {localeLabels[l].short}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
