import Image from "next/image";
import logo from "../../../public/images/logo.png";
import logoWhite from "../../../public/images/logo-white.png";

interface LogoProps {
  alt: string;
  /** "auto": bản màu ở theme sáng, bản trắng ở theme tối. "white": luôn trắng (footer). */
  tone?: "auto" | "white";
  className?: string;
  priority?: boolean;
}

// Logo gốc do Softrent cung cấp (PNG nền trong suốt); bản trắng dùng cho footer và dark mode.
export function Logo({ alt, tone = "auto", className = "h-8 w-auto", priority }: LogoProps) {
  if (tone === "white") {
    return <Image src={logoWhite} alt={alt} className={className} priority={priority} sizes="160px" />;
  }
  return (
    <>
      <Image src={logo} alt={alt} className={`${className} dark:hidden`} priority={priority} sizes="160px" />
      <Image src={logoWhite} alt={alt} className={`${className} hidden dark:block`} priority={priority} sizes="160px" />
    </>
  );
}
