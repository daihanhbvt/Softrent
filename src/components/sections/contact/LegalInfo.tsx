import { RichText } from "@/components/ui/RichText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { bodyLargeClass } from "@/components/ui/styles";
import { contactInfo, legalInfo } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

export function LegalInfo({ locale, labels }: { locale: Locale; labels: Dictionary["contactPage"]["legal"] }) {
  const rows = [
    { label: labels.companyName, value: legalInfo.companyName[locale] },
    { label: labels.taxCode, value: legalInfo.taxCode },
    { label: labels.headquarters, value: contactInfo.address[locale] },
  ];

  return (
    <section aria-labelledby="legal-title" className="bg-bg-tint py-16 md:py-[74px]">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_600px] lg:gap-16">
        <div>
          <SectionLabel>{labels.label}</SectionLabel>
          <h2 id="legal-title" className="mt-4 text-[30px] font-semibold leading-tight tracking-[-0.01em] text-fg md:text-[36px]">
            {labels.title}
          </h2>
          <p className={`mt-5 max-w-[545px] ${bodyLargeClass}`}>{labels.description}</p>
        </div>
        <dl className="rounded-2xl border border-border bg-surface px-7 py-2">
          {rows.map(({ label, value }) => (
            <div key={label} className="grid gap-1 border-b border-border py-5 last:border-b-0 sm:grid-cols-[254px_1fr] sm:gap-0">
              <dt className="text-base font-medium text-fg">{label}</dt>
              <dd className="text-base leading-6 text-fg">
                <RichText text={value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
