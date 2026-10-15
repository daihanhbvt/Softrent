// Thêm ngôn ngữ mới: thêm mã vào `locales`, khai báo trong `localeLabels`
// và tạo file từ điển tương ứng trong ./dictionaries (đăng ký ở get-dictionary.ts).
export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export const localeLabels: Record<Locale, { short: string; name: string; ogLocale: string }> = {
  vi: { short: "VI", name: "Tiếng Việt", ogLocale: "vi_VN" },
  en: { short: "EN", name: "English", ogLocale: "en_US" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Tạo đường dẫn có tiền tố ngôn ngữ, ví dụ localizePath("en", "/about") → "/en/about". */
export function localizePath(locale: Locale, path: string = "/"): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}

/** Bỏ tiền tố ngôn ngữ khỏi pathname: "/en/about" → "/about". */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (hasLocale(segments[1] ?? "")) {
    const rest = segments.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}
