import Link from "next/link";
import { buttonClass } from "@/components/ui/styles";
import { defaultLocale, localizePath } from "@/i18n/config";
import vi from "@/i18n/dictionaries/vi";

// not-found không nhận params; dùng ngôn ngữ mặc định.
export default function NotFound() {
  const { notFound } = vi;
  return (
    <section className="container-site py-24 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-fg">{notFound.title}</h1>
      <p className="mt-3 text-fg-body">{notFound.description}</p>
      <Link href={localizePath(defaultLocale)} className={buttonClass("primary", "mt-8")}>
        {notFound.back}
      </Link>
    </section>
  );
}
