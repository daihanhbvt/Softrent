/**
 * Cấu hình & dữ liệu dùng chung của website.
 *
 * ⚠️ NỘI DUNG CHỜ XÁC NHẬN: các giá trị đánh dấu `PENDING` được lấy từ ảnh thiết kế,
 * chưa được Softrent xác nhận chính thức. Cập nhật tại đây khi có hồ sơ pháp lý/thông tin chính thức.
 */

/** URL production — `NEXT_PUBLIC_SITE_URL` ghi đè khi cần (vd môi trường thử). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://softrent.vn").replace(/\/$/, "");

export const siteName = "Softrent";

export const contactInfo = {
  /** PENDING: địa chỉ lấy từ thiết kế. */
  address: {
    vi: "133 Trung Lương 11, Phường Hòa Xuân,\nThành phố Đà Nẵng, Việt Nam",
    en: "133 Trung Luong 11, Hoa Xuan Ward,\nDa Nang City, Vietnam",
  },
  /** PENDING */
  phone: "0352 063 205",
  phoneHref: "tel:+84352063205",
  email: "admin@softrent.vn",
  /** Truy vấn dùng cho bản đồ nhúng. PENDING: cập nhật toạ độ chính xác. */
  mapQuery: "133 Trung Lương 11, Hòa Xuân, Đà Nẵng, Việt Nam",
} as const;

export const legalInfo = {
  /** PENDING: theo hồ sơ pháp lý chính thức. */
  companyName: { vi: "Công ty TNHH Công nghệ Softrent", en: "Softrent Technology Co., Ltd." },
  /** PENDING */
  taxCode: "0402359663",
} as const;

export type SocialKey = "facebook" | "instagram" | "twitter" | "tiktok";

/** PENDING: thay "#" bằng URL trang mạng xã hội chính thức. */
export const socialLinks: { key: SocialKey; label: string; href: string }[] = [
  { key: "facebook", label: "Facebook", href: "#" },
  { key: "instagram", label: "Instagram", href: "#" },
  { key: "twitter", label: "Twitter", href: "#" },
  { key: "tiktok", label: "TikTok", href: "#" },
];

/** PENDING: URL chính thức của nền tảng XePrime. */
export const xeprimeUrl = "#";

/** Năm hiển thị ở dòng bản quyền (tính tại thời điểm build). */
export const copyrightYear = new Date().getFullYear();

/**
 * PENDING — NỘI DUNG MẪU: người ký lời tầm nhìn trên trang About lấy nguyên từ thiết kế,
 * chưa xác thực. Thay bằng người đại diện thật của Softrent (và ảnh chữ ký /images/ceo-signature.webp).
 */
export const ceoQuote = {
  name: "Nguyễn Văn A",
  role: "CEO of TD Consulting",
} as const;
