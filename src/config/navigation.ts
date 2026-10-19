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
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

export const footerNav: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "aboutUs", href: "/about" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

/** Các trang tĩnh có trong sitemap (trang chi tiết tin tuyển dụng sinh từ `src/content/careers.ts`). */
export const sitePages = ["/", "/about", "/careers", "/contact"] as const;
export type SitePage = (typeof sitePages)[number];

/** Mọi đường dẫn có trang thật: trang tĩnh + chi tiết tin tuyển dụng. */
export type SitePath = SitePage | `/careers/${string}`;

export function jobPath(slug: string): SitePath {
  return `/careers/${slug}`;
}
