import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { footerNav } from "@/config/navigation";
import { copyrightYear, xeprimeUrl } from "@/config/site";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

const headingClass = "text-base font-semibold text-footer-fg";
const linkClass = "rounded text-sm text-footer-muted transition-colors hover:text-footer-fg";

export function Footer({ locale, dict }: FooterProps) {
  const { footer, nav, common } = dict;
  const servicesHref = `${localizePath(locale)}#services`;

  return (
    <footer className="bg-footer-bg text-footer-fg">
      <div className="container-site pb-6 pt-12 md:pt-[46px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <Link href={localizePath(locale)} aria-label={common.homeLabel} className="inline-block rounded">
              <Logo alt={common.logoAlt} tone="white" className="h-7 w-auto" />
            </Link>
            <p className="mt-6 max-w-[290px] text-sm font-medium leading-[1.45]">{footer.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 sm:gap-x-[70px] lg:gap-x-0">
            <FooterColumn title={footer.navTitle} className="lg:w-[170px]">
              {footerNav.map(({ key, href }) => (
                <li key={key}>
                  <Link href={localizePath(locale, href)} className={linkClass}>
                    {nav[key]}
                  </Link>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title={footer.fieldsTitle} className="lg:w-[157px]">
              {footer.fields.map((field) => (
                <li key={field}>
                  <Link href={servicesHref} className={linkClass}>
                    {field}
                  </Link>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title={footer.platformTitle} className="lg:w-[151px]">
              {footer.platforms.map((platform) => (
                <li key={platform}>
                  <a href={xeprimeUrl} className={linkClass}>
                    {platform}
                  </a>
                </li>
              ))}
            </FooterColumn>
            <div>
              <h2 className={headingClass}>{footer.linksTitle}</h2>
              <SocialLinks className="mt-4 gap-4" iconClassName="size-5" />
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-footer-border pt-5 text-sm text-footer-muted md:mt-[30px]">
          {footer.copyright.replace("{year}", String(copyrightYear))}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className={headingClass}>{title}</h2>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </div>
  );
}
