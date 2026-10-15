import { contactInfo, legalInfo, siteName, siteUrl, socialLinks } from "@/config/site";
import type { Locale } from "@/i18n/config";

/**
 * JSON-LD Organization + WebSite: cho công cụ tìm kiếm biết "Softrent" là tổ chức nào — trang chủ,
 * logo, liên hệ. Đây là tín hiệu chính để tên thương hiệu khớp đúng website khi người dùng gõ "softrent".
 *
 * Đọc từ CÙNG config đang hiển thị trên trang (`src/config/site.ts`): Google yêu cầu dữ liệu có cấu trúc
 * khớp nội dung người đọc thấy, và chung một nguồn thì không lệch nhau được.
 */
export function buildSiteJsonLd(locale: Locale) {
  const organizationId = `${siteUrl}/#organization`;
  // Mạng xã hội chưa có URL thật (`#`) thì không khai — `sameAs` trỏ vào hư không chỉ là tín hiệu nhiễu.
  const sameAs = socialLinks.map((s) => s.href).filter((href) => href.startsWith("https://"));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        legalName: legalInfo.companyName[locale],
        url: siteUrl,
        // Ảnh vuông ≥ 112px theo yêu cầu logo của Google; `images/logo.png` là dải ngang 960×202.
        logo: `${siteUrl}/apple-icon.png`,
        email: contactInfo.email,
        telephone: contactInfo.phoneHref.replace(/^tel:/, ""),
        taxID: legalInfo.taxCode,
        address: {
          "@type": "PostalAddress",
          streetAddress: contactInfo.address[locale].replace(/\s*\n\s*/g, " "),
          addressCountry: "VN",
        },
        ...(sameAs.length > 0 && { sameAs }),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        inLanguage: locale,
        publisher: { "@id": organizationId },
      },
    ],
  };
}

/** JSON nhúng vào `<script>`: đổi `<` thành `<` để chuỗi dữ liệu không đóng được thẻ script sớm. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
