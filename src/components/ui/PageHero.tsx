import Link from "next/link";
import { RichText } from "./RichText";

interface PageHeroProps {
  breadcrumbLabel: string;
  homeLabel: string;
  homeHref: string;
  /** Tầng giữa của breadcrumb, cho trang lồng (vd Tuyển dụng → một vị trí). */
  parent?: { label: string; href: string };
  currentLabel: string;
  title: string;
  highlight: string;
  description: string;
}

/** Hero dạng tiêu đề + breadcrumb cho các trang con (About, Contact, Tuyển dụng). */
export function PageHero({ breadcrumbLabel, homeLabel, homeHref, parent, currentLabel, title, highlight, description }: PageHeroProps) {
  return (
    <section className="bg-bg-soft pb-14 pt-12 text-center md:pb-[56px] md:pt-[60px]">
      <div className="container-site">
        <nav aria-label={breadcrumbLabel}>
          <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-fg-muted">
            <li>
              <Link href={homeHref} className="rounded hover:text-primary-text">
                {homeLabel}
              </Link>
            </li>
            <li aria-hidden>/</li>
            {parent && (
              <>
                <li>
                  <Link href={parent.href} className="rounded hover:text-primary-text">
                    {parent.label}
                  </Link>
                </li>
                <li aria-hidden>/</li>
              </>
            )}
            <li aria-current="page">{currentLabel}</li>
          </ol>
        </nav>
        <h1 className="mt-2 text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-fg md:mt-3 md:text-[56px]">
          {title} <span className="text-primary">{highlight}</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[900px] text-base leading-[1.55] text-fg-body md:text-lg">
          <RichText text={description} />
        </p>
      </div>
    </section>
  );
}
