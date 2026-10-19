"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlatformIcon } from "@/components/icons";
import { mainNav, type NavKey } from "@/config/navigation";
import { localizePath, stripLocale, type Locale } from "@/i18n/config";

interface NavLinksProps {
  locale: Locale;
  labels: Record<NavKey, string>;
  /** "desktop": hàng ngang; "mobile": danh sách dọc trong menu. */
  layout: "desktop" | "mobile";
  onNavigate?: () => void;
}

export function NavLinks({ locale, labels, layout, onNavigate }: NavLinksProps) {
  const current = stripLocale(usePathname());

  return (
    <ul className={layout === "desktop" ? "flex items-center gap-8" : "flex flex-col gap-1"}>
      {mainNav.map(({ key, href, withIcon }) => {
        // Trang con (vd /careers/intern-qc) vẫn làm sáng mục cha của nó.
        const active = href === current || (href !== "/" && current.startsWith(`${href}/`));
        return (
          <li key={key}>
            <Link
              href={localizePath(locale, href)}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={`inline-flex items-center gap-1.5 rounded text-base transition-colors hover:text-primary-text ${
                active ? "font-medium text-primary-text" : "text-fg"
              } ${layout === "mobile" ? "w-full px-3 py-3 hover:bg-primary-soft" : ""}`}
            >
              {labels[key]}
              {withIcon && <PlatformIcon className="size-4 text-fg-subtle" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
