import type { SVGProps } from "react";
import type { SocialKey } from "@/config/site";

type IconProps = SVGProps<SVGSVGElement>;

const base = { "aria-hidden": true, focusable: false } as const;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base} {...props}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base} {...props}>
      <path d="M17.5 1h-11A5.5 5.5 0 0 0 1 6.5v11A5.5 5.5 0 0 0 6.5 23h11a5.5 5.5 0 0 0 5.5-5.5v-11A5.5 5.5 0 0 0 17.5 1ZM12 17.3A5.3 5.3 0 1 1 12 6.7a5.3 5.3 0 0 1 0 10.6Zm0-8.3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.8-1.4a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base} {...props}>
      <path d="M23.6 4.6c-.87.39-1.8.65-2.78.77a4.86 4.86 0 0 0 2.13-2.68 9.7 9.7 0 0 1-3.08 1.18 4.85 4.85 0 0 0-8.26 4.42A13.76 13.76 0 0 1 1.64 3.2a4.85 4.85 0 0 0 1.5 6.47 4.83 4.83 0 0 1-2.2-.6v.06a4.85 4.85 0 0 0 3.89 4.75 4.9 4.9 0 0 1-2.19.08 4.86 4.86 0 0 0 4.53 3.37A9.73 9.73 0 0 1 0 19.4a13.73 13.73 0 0 0 7.44 2.18c8.93 0 13.81-7.4 13.81-13.8l-.01-.63A9.86 9.86 0 0 0 23.6 4.6Z" />
    </svg>
  );
}

export function TiktokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base} {...props}>
      <path d="M16.6 0h-4v16.2a3.4 3.4 0 1 1-2.43-3.26V8.85a7.4 7.4 0 1 0 6.43 7.35V7.96A9.1 9.1 0 0 0 22 9.7V5.7A5.5 5.5 0 0 1 16.6 0Z" />
    </svg>
  );
}

export const socialIcons: Record<SocialKey, (props: IconProps) => React.JSX.Element> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  tiktok: TiktokIcon,
};

/** Mũi tên sang phải; xoay `rotate-180` để thành mũi tên quay lại. */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...base} {...props}>
      <path d="M4 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...base} {...props}>
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

/** Icon nhỏ cạnh mục "Nền tảng" trong header. */
export function PlatformIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" {...base} {...props}>
      <path d="M17 3 9.5 10.5M17 3l-4.5 13-3-5.5L4 7.5 17 3Z" />
      <path d="M6.5 13.5 3 17" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...base} {...props}>
      <path d="M20.5 14.1A8.5 8.5 0 1 1 9.9 3.5a6.6 6.6 0 0 0 10.6 10.6Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </svg>
  );
}
