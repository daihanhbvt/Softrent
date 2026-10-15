"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonClass } from "@/components/ui/styles";
import { defaultLocale, hasLocale, localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

/**
 * Nội dung trang 404. `not-found.tsx` không nhận params nên ngôn ngữ đọc từ đoạn đầu của URL
 * (`/en/...` → en); server chỉ truyền xuống chữ của trang này, không phải cả từ điển.
 */
export function NotFoundContent({ messages }: { messages: Record<Locale, Dictionary["notFound"]> }) {
  const segment = usePathname().split("/")[1] ?? "";
  const locale = hasLocale(segment) ? segment : defaultLocale;
  const { title, description, back } = messages[locale];

  return (
    <section className="container-site py-24 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-fg">{title}</h1>
      <p className="mt-3 text-fg-body">{description}</p>
      <Link href={localizePath(locale)} className={buttonClass("primary", "mt-8")}>
        {back}
      </Link>
    </section>
  );
}
