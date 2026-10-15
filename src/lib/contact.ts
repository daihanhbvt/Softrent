export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
  locale: string;
}

export type ContactField = keyof Omit<ContactRequest, "locale">;

export type ContactErrorKey =
  | "nameRequired"
  | "emailRequired"
  | "emailInvalid"
  | "phoneInvalid"
  | "messageRequired"
  | "consentRequired";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s.-]{8,15}$/;

/** Kiểm tra dữ liệu form; trả về mã lỗi theo từng trường (dùng chung được cho API sau này). */
export function validateContactRequest(data: ContactRequest): Partial<Record<ContactField, ContactErrorKey>> {
  const errors: Partial<Record<ContactField, ContactErrorKey>> = {};
  if (!data.name.trim()) errors.name = "nameRequired";
  if (!data.email.trim()) errors.email = "emailRequired";
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = "emailInvalid";
  if (data.phone.trim() && !PHONE_RE.test(data.phone.trim())) errors.phone = "phoneInvalid";
  if (!data.message.trim()) errors.message = "messageRequired";
  if (!data.consent) errors.consent = "consentRequired";
  return errors;
}

/**
 * Gửi yêu cầu tư vấn.
 *
 * TODO(API): hiện chỉ mô phỏng phía giao diện. Khi có backend, thay phần thân hàm bằng:
 *   const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
 *   if (!res.ok) throw new Error(`Contact request failed: ${res.status}`);
 */
export async function submitContactRequest(data: ContactRequest): Promise<void> {
  void data;
  await new Promise((resolve) => setTimeout(resolve, 800));
}
