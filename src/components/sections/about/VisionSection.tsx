import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ceoQuote } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import collage from "../../../../public/images/about-collage.webp";
import signature from "../../../../public/images/ceo-signature.webp";

export function VisionSection({ labels }: { labels: Dictionary["about"]["vision"] }) {
  return (
    <div className="container-site grid items-center gap-10 lg:grid-cols-[410px_1fr] lg:gap-[18px]">
      <Image src={collage} alt={labels.imageAlt} sizes="(min-width: 1024px) 410px, 90vw" className="mx-auto h-auto w-full max-w-[410px]" />
      <div>
        <SectionLabel variant="strong">{labels.label}</SectionLabel>
        <h2 className="mt-5 font-bold tracking-[-0.01em]">
          <span className="text-glow block text-[28px] leading-[1.3] text-primary md:text-[36px]">{labels.titleHighlight}</span>
          <span className="mt-2 block text-[28px] leading-[1.3] text-fg md:mt-3 md:text-[36px]">{labels.titleRest}</span>
        </h2>
        <p className="mt-3 text-base leading-[1.6] text-fg-body">{labels.description}</p>
        {/* Người ký và chức danh là nội dung mẫu — chờ Softrent xác nhận (xem config/site.ts). */}
        <figure className="mt-10 md:mt-[58px]">
          <Image src={signature} alt={`${labels.signatureAlt}: ${ceoQuote.name}`} sizes="156px" className="h-9 w-auto dark:invert" />
          <figcaption className="mt-2 text-sm text-fg-body">{ceoQuote.role}</figcaption>
        </figure>
      </div>
    </div>
  );
}
