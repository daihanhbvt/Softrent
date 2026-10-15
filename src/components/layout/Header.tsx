import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/styles";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const { header, nav, common } = dict;
  const ctaHref = localizePath(locale, "/contact");
  const themeLabels = { toLight: header.themeToLight, toDark: header.themeToDark };

  return (
    <header className="relative z-30 border-b border-border bg-bg">
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[88px]">
        <Link href={localizePath(locale)} aria-label={common.homeLabel} className="shrink-0 rounded">
          <Logo alt={common.logoAlt} className="h-6 w-auto md:h-7" priority />
        </Link>

        <div className="hidden items-center lg:flex">
          <nav aria-label={header.mainNav}>
            <NavLinks locale={locale} labels={nav} layout="desktop" />
          </nav>
          <div className="ml-6 flex items-center gap-1.5 xl:ml-8">
            <LanguageSwitcher locale={locale} label={header.language} />
            <ThemeToggle labels={themeLabels} />
          </div>
          <Link href={ctaHref} className={buttonClass("primary", "ml-4 xl:ml-6")}>
            {header.cta}
          </Link>
        </div>

        <MobileMenu
          locale={locale}
          navLabels={nav}
          labels={{
            open: header.openMenu,
            close: header.closeMenu,
            mainNav: header.mainNav,
            cta: header.cta,
            ctaHref,
            language: header.language,
            themeToLight: header.themeToLight,
            themeToDark: header.themeToDark,
          }}
        />
      </div>
    </header>
  );
}
