import { SocialLinks } from "@/components/ui/SocialLinks";
import { RichText } from "@/components/ui/RichText";
import { contactInfo } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

const titleClass = "text-[28px] font-medium leading-tight text-white md:text-[32px]";
const textClass = "text-base leading-[1.55] text-white/85 md:text-lg";
const strongClass = "font-medium text-white";

export function ContactInfoCard({ locale, labels }: { locale: Locale; labels: Dictionary["contact"]["info"] }) {
  return (
    <address className="bg-contact-card flex flex-col gap-10 rounded-2xl px-6 py-10 not-italic md:gap-[46px] md:px-8 md:pb-[50px] md:pt-[46px]">
      <div>
        <h3 className={titleClass}>{labels.addressTitle}</h3>
        <p className={`mt-3 ${textClass}`}>
          <RichText text={contactInfo.address[locale]} />
        </p>
      </div>
      <div>
        <h3 className={titleClass}>{labels.contactTitle}</h3>
        <p className={`mt-3 ${textClass}`}>
          {labels.phoneLabel}{" "}
          <a href={contactInfo.phoneHref} className={`${strongClass} rounded hover:underline`}>
            {contactInfo.phone}
          </a>
        </p>
        <p className={`mt-3 ${textClass}`}>
          {labels.emailLabel}{" "}
          <a href={`mailto:${contactInfo.email}`} className={`${strongClass} rounded hover:underline`}>
            {contactInfo.email}
          </a>
        </p>
      </div>
      <div>
        <h3 className={titleClass}>{labels.hoursTitle}</h3>
        <p className={`mt-3 ${textClass}`}>{labels.hours}</p>
      </div>
      <div>
        <h3 className={titleClass}>{labels.socialTitle}</h3>
        <SocialLinks className="mt-4 gap-6 text-white" iconClassName="size-9" linkClassName="focus-visible:outline-white" />
      </div>
    </address>
  );
}
