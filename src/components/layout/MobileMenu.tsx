"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { buttonClass } from "@/components/ui/styles";
import type { NavKey } from "@/config/navigation";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

interface MobileMenuProps {
  locale: Locale;
  navLabels: Record<NavKey, string>;
  labels: {
    open: string;
    close: string;
    mainNav: string;
    cta: string;
    ctaHref: string;
    language: string;
    themeToLight: string;
    themeToDark: string;
  };
}

export function MobileMenu({ locale, navLabels, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-10 items-center justify-center rounded-md text-fg hover:bg-primary-soft"
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-b border-border bg-bg shadow-card"
      >
        <nav aria-label={labels.mainNav} className="container-site py-4">
          <NavLinks locale={locale} labels={navLabels} layout="mobile" onNavigate={close} />
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
            <LanguageSwitcher locale={locale} label={labels.language} />
            <ThemeToggle labels={{ toLight: labels.themeToLight, toDark: labels.themeToDark }} />
          </div>
          <Link href={labels.ctaHref} onClick={close} className={buttonClass("primary", "mt-4 w-full")}>
            {labels.cta}
          </Link>
        </nav>
      </div>
    </div>
  );
}
