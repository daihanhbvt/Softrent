import { jobPath } from "@/config/navigation";
import { contactInfo, legalInfo, siteName, siteUrl, socialLinks } from "@/config/site";
import type { Job } from "@/content/careers";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { applySubject } from "@/lib/careers";

// Ảnh vuông ≥ 112px theo yêu cầu logo của Google; `images/logo.png` là dải ngang 960×202.
const logoUrl = `${siteUrl}/apple-icon.png`;

function postalAddress(locale: Locale) {
  return {
    "@type": "PostalAddress",
    streetAddress: contactInfo.address[locale].replace(/\s*\n\s*/g, " "),
    addressCountry: "VN",
  };
}

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
        logo: logoUrl,
        email: contactInfo.email,
        telephone: contactInfo.phoneHref.replace(/^tel:/, ""),
        taxID: legalInfo.taxCode,
        address: postalAddress(locale),
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

/**
 * JSON-LD JobPosting cho trang một vị trí — điều kiện để tin hiện trong mục việc làm của Google.
 * `description` là TOÀN BỘ nội dung tin dưới dạng HTML, dựng từ cùng dữ liệu đang hiển thị trên trang.
 */
export function buildJobPostingJsonLd(job: Job, locale: Locale, labels: Dictionary["careers"]) {
  const content = job.content[locale];

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: content.title,
    description: jobDescriptionHtml(job, locale, labels),
    datePosted: job.postedAt,
    employmentType: "INTERN",
    totalJobOpenings: job.openings,
    url: `${siteUrl}${localizePath(locale, jobPath(job.slug))}`,
    hiringOrganization: { "@type": "Organization", name: siteName, sameAs: siteUrl, logo: logoUrl },
    jobLocation: {
      "@type": "Place",
      address: { ...postalAddress(locale), addressLocality: content.location, addressRegion: content.location },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "VND",
      value: { "@type": "QuantitativeValue", value: job.monthlyAllowance, unitText: "MONTH" },
    },
    // Ứng tuyển bằng email, không có form nộp hồ sơ ngay trên trang.
    directApply: false,
  };
}

function jobDescriptionHtml(job: Job, locale: Locale, { sections, apply }: Dictionary["careers"]): string {
  const content = job.content[locale];
  const paragraph = (text: string) => `<p>${inlineHtml(text)}</p>`;
  const heading = (text: string) => `<h3>${escapeHtml(text)}</h3>`;
  const list = (items: string[]) => `<ul>${items.map((item) => `<li>${inlineHtml(item)}</li>`).join("")}</ul>`;

  return [
    paragraph(content.intro),
    heading(sections.responsibilities),
    content.responsibilitiesIntro ? paragraph(content.responsibilitiesIntro) : "",
    list(content.responsibilities),
    heading(sections.training),
    paragraph(content.training),
    heading(sections.requirements),
    list(content.requirements),
    heading(sections.niceToHave),
    list(content.niceToHave),
    paragraph(`**${sections.note}** ${content.note}`),
    heading(sections.benefits),
    list(content.benefits),
    heading(apply.title),
    paragraph(`${apply.lead} ${contactInfo.email}`),
    paragraph(`${apply.subject}: ${applySubject(apply.subjectPattern, job.applyTag)}`),
  ].join("");
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Chuỗi từ điển → HTML: thoát ký tự đặc biệt, rồi `**đậm**` → <strong>, xuống dòng → <br>. */
function inlineHtml(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

/** JSON nhúng vào `<script>`: đổi `<` thành `<` để chuỗi dữ liệu không đóng được thẻ script sớm. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
