import { buttonClass, cardClass } from "@/components/ui/styles";
import type { Job } from "@/content/careers";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { applyMailto, formatAllowance, formatOpenings } from "@/lib/careers";

interface JobDetailProps {
  locale: Locale;
  job: Job;
  labels: Dictionary["careers"];
}

const bodyClass = "text-base leading-[1.7] text-fg-body md:text-[17px]";

/** Thân trang một vị trí: thẻ Thông tin chung (dính bên phải ở màn rộng) + các mục mô tả. */
export function JobDetail({ locale, job, labels }: JobDetailProps) {
  const content = job.content[locale];
  const { facts, sections, apply } = labels;
  const factRows = [
    { label: facts.position, value: content.position },
    { label: facts.openings, value: formatOpenings(job.openings) },
    { label: facts.location, value: content.location },
    { label: facts.audience, value: content.audience },
    { label: facts.allowance, value: formatAllowance(locale, job.monthlyAllowance, facts.allowanceValue) },
    { label: facts.schedule, value: content.schedule },
    { label: facts.path, value: content.path },
  ];

  return (
    <section className="bg-bg py-12 md:py-[80px]">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        {/* Đứng trước trong DOM: màn hẹp và trình đọc màn hình gặp Thông tin chung đầu tiên, như tin gốc. */}
        <aside aria-labelledby="job-facts-title" className={`p-6 md:p-7 lg:sticky lg:top-8 lg:order-2 ${cardClass}`}>
          <h2 id="job-facts-title" className="text-lg font-semibold text-fg">
            {facts.title}
          </h2>
          <dl className="mt-3 divide-y divide-border">
            {factRows.map(({ label, value }) => (
              <div key={label} className="py-3">
                <dt className="text-sm text-fg-muted">{label}</dt>
                <dd className="mt-1 text-base leading-6 text-fg">{value}</dd>
              </div>
            ))}
          </dl>
          <a href={applyMailto(job.applyTag)} className={buttonClass("primary", "mt-4 w-full")}>
            {apply.button}
          </a>
        </aside>

        <div className="flex flex-col gap-10 md:gap-12 lg:order-1">
          <JobSection title={sections.responsibilities}>
            {content.responsibilitiesIntro && <p className={bodyClass}>{content.responsibilitiesIntro}</p>}
            <BulletList items={content.responsibilities} />
          </JobSection>

          <JobSection title={sections.training}>
            <p className={bodyClass}>{content.training}</p>
          </JobSection>

          <JobSection title={sections.requirements}>
            <h3 className="text-lg font-semibold text-fg">{sections.basic}</h3>
            <BulletList items={content.requirements} />
            <h3 className="mt-4 text-lg font-semibold text-fg">{sections.niceToHave}</h3>
            <BulletList items={content.niceToHave} />
            <p className="mt-4 rounded-xl border border-border-accent bg-primary-soft px-5 py-4 text-base leading-[1.6] text-fg">
              <strong className="font-semibold">{sections.note}</strong> {content.note}
            </p>
          </JobSection>

          <JobSection title={sections.benefits}>
            <BulletList items={content.benefits} />
          </JobSection>
        </div>
      </div>
    </section>
  );
}

function JobSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold leading-tight tracking-[-0.01em] text-fg md:text-[28px]">{title}</h2>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={`list-disc space-y-2 pl-5 marker:text-primary ${bodyClass}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
