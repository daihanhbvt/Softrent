import { socialLinks } from "@/config/site";
import { socialIcons } from "@/components/icons";

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
  linkClassName?: string;
}

export function SocialLinks({ className = "", iconClassName = "size-6", linkClassName = "" }: SocialLinksProps) {
  return (
    <ul className={`flex items-center ${className}`}>
      {socialLinks.map(({ key, label, href }) => {
        const Icon = socialIcons[key];
        return (
          <li key={key}>
            <a
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`inline-flex rounded transition-opacity hover:opacity-80 ${linkClassName}`}
            >
              <Icon className={iconClassName} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
