import type { Dictionary } from "@/i18n/get-dictionary";

export type NavKey = keyof Dictionary["nav"];

export interface NavItem {
  key: NavKey;
  /** Đường dẫn chưa có tiền tố ngôn ngữ. */
  href: string;
  /** Hiển thị icon nhỏ cạnh nhãn (mục "Nền tảng" trong thiết kế). */
  withIcon?: boolean;
}

export const mainNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "platform", href: "/#xeprime", withIcon: true },
  { key: "contact", href: "/contact" },
];

export const footerNav: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "aboutUs", href: "/about" },
  { key: "contact", href: "/contact" },
];

/** Các trang có trong sitemap. */
export const sitePages = ["/", "/about", "/contact"] as const;
export type SitePage = (typeof sitePages)[number];
