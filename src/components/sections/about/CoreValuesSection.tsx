import Image, { type StaticImageData } from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import iconCreative from "../../../../public/images/value-creative.webp";
import iconEfficient from "../../../../public/images/value-efficient.webp";
import iconDedicated from "../../../../public/images/value-dedicated.webp";

const icons: StaticImageData[] = [iconCreative, iconEfficient, iconDedicated];

export function CoreValuesSection({ labels }: { labels: Dictionary["about"]["values"] }) {
  return (
    <div className="container-site">
      <div className="text-center">
        <h2 className="text-[28px] font-bold leading-tight tracking-[-0.01em] text-fg md:text-[36px]">
          {labels.title} <span className="text-glow text-primary">{labels.highlight}</span>
        </h2>
        <p className="mt-3 text-base text-fg-body">{labels.subtitle}</p>
      </div>
      <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
        {labels.items.map((item, index) => (
          <li key={item.title} className="relative pt-2">
            {/* Tab xanh trang trí phía sau góc phải thẻ, theo thiết kế */}
            <span aria-hidden className="absolute right-0 top-0 h-6 w-20 rounded-t-xl bg-gradient-to-r from-primary to-primary-hover" />
            <article className="relative h-full rounded-2xl border border-border bg-surface px-4 pb-4 pt-4 shadow-card">
              <span aria-hidden className="absolute right-4 top-6 text-sm text-fg-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Image src={icons[index]} alt="" aria-hidden sizes="48px" className="size-12 rounded-lg" />
              <h3 className="mt-6 text-lg font-semibold text-fg">{item.title}</h3>
              <p className="mt-2 text-sm leading-5 text-fg-muted">{item.description}</p>
              <p className="mt-4 inline-block rounded-full bg-primary-soft px-3 py-1.5 text-sm text-primary-text">{item.tag}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
