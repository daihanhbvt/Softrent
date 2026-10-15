import Image from "next/image";
import Link from "next/link";
import { buttonClass } from "@/components/ui/styles";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import heroImage from "../../../../public/images/hero-illustration.webp";

export function HomeHero({ locale, labels }: { locale: Locale; labels: Dictionary["home"]["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-bg-soft">
      {/* Ảnh minh hoạ (kèm mảng nền xanh nhạt) neo ở mép phải như thiết kế */}
      <Image
        src={heroImage}
        alt={labels.imageAlt}
        priority
        sizes="(min-width: 1024px) 700px, 100vw"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-auto max-w-none select-none hero-art-fade lg:block"
      />
      <div className="container-site relative py-14 md:py-20 lg:flex lg:min-h-[548px] lg:items-center lg:py-0">
        <div className="max-w-[640px]">
          <p className="text-sm font-medium text-primary-text">{labels.eyebrow}</p>
          <h1 className="mt-5 font-bold tracking-[-0.02em] text-fg md:mt-6">
            <span className="block text-[32px] leading-[1.25] md:text-[48px]">{labels.titleLine1}</span>
            <span className="block text-[48px] leading-[1.25] text-primary md:text-[72px]">{labels.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-[600px] text-base leading-[1.6] text-fg-body md:mt-6 md:text-lg">{labels.description}</p>
          <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
            <Link href={localizePath(locale, "/about")} className={buttonClass("primary", "px-7")}>
              {labels.primaryCta}
            </Link>
            <Link href={localizePath(locale, "/contact")} className={buttonClass("outline", "px-5")}>
              {labels.secondaryCta}
            </Link>
          </div>
        </div>
        <Image src={heroImage} alt="" aria-hidden sizes="100vw" className="mt-10 h-auto w-full rounded-2xl lg:hidden" />
      </div>
    </section>
  );
}
