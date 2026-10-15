import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { ContactForm } from "./ContactForm";
import { ContactInfoCard } from "./ContactInfoCard";

interface ContactSectionProps {
  locale: Locale;
  dict: Dictionary;
  className?: string;
}

/** Khối "Gửi yêu cầu tư vấn" dùng chung cho cả 3 trang. */
export function ContactSection({ locale, dict, className = "py-16 md:py-24" }: ContactSectionProps) {
  const { form, info } = dict.contact;
  return (
    <section id="contact" aria-labelledby="contact-title" className={`scroll-mt-4 bg-bg ${className}`}>
      <div className="container-site grid gap-12 lg:grid-cols-[480px_1fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <ContactInfoCard locale={locale} labels={info} />
        </div>
        <div className="order-1 lg:order-2">
          <SectionLabel>{form.label}</SectionLabel>
          <h2 id="contact-title" className="mt-4 text-[32px] font-medium leading-tight tracking-[-0.01em] text-fg md:mt-4 md:text-[40px]">
            {form.title}
          </h2>
          <p className="mt-4 text-base leading-[1.5] text-fg-body md:mt-5 md:text-lg">{form.description}</p>
          <ContactForm labels={form} locale={locale} />
        </div>
      </div>
    </section>
  );
}
