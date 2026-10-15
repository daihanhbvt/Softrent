"use client";

import { useId, useState, type FormEvent } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { buttonClass } from "@/components/ui/styles";
import type { Dictionary } from "@/i18n/get-dictionary";
import {
  submitContactRequest,
  validateContactRequest,
  type ContactField,
  type ContactErrorKey,
  type ContactRequest,
} from "@/lib/contact";

type FormLabels = Dictionary["contact"]["form"];
type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "block w-full rounded-lg border border-border bg-surface px-3.5 text-base text-fg placeholder:text-fg-subtle transition-colors hover:border-border-strong focus:border-primary focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-danger";

const textFields = ["name", "email", "phone", "company"] as const;
const requiredFields: ContactField[] = ["name", "email", "message"];

export function ContactForm({ labels, locale }: { labels: FormLabels; locale: string }) {
  const formId = useId();
  const [errors, setErrors] = useState<Partial<Record<ContactField, ContactErrorKey>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [hasService, setHasService] = useState(false);

  const fieldId = (name: ContactField) => `${formId}-${name}`;
  const errorId = (name: ContactField) => `${formId}-${name}-error`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const data: ContactRequest = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      service: String(fd.get("service") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      locale,
    };

    const nextErrors = validateContactRequest(data);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0] as ContactField | undefined;
    if (firstInvalid) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await submitContactRequest(data);
      setStatus("success");
      form.reset();
      setHasService(false);
    } catch {
      setStatus("error");
    }
  }

  function fieldProps(name: ContactField) {
    const error = errors[name];
    return {
      id: fieldId(name),
      name,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId(name) : undefined,
      "aria-required": requiredFields.includes(name) || undefined,
      onChange: () => error && setErrors((prev) => ({ ...prev, [name]: undefined })),
    };
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-6">
      <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
        {textFields.map((name) => (
          <Field key={name} label={labels[name].label} htmlFor={fieldId(name)} required={requiredFields.includes(name)} requiredLabel={labels.required} error={errors[name] && labels.errors[errors[name]]} errorId={errorId(name)}>
            <input
              {...fieldProps(name)}
              type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
              autoComplete={name === "name" ? "name" : name === "email" ? "email" : name === "phone" ? "tel" : "organization"}
              placeholder={labels[name].placeholder}
              className={`${inputClass} h-11`}
            />
          </Field>
        ))}

        <Field label={labels.service.label} htmlFor={fieldId("service")} className="sm:col-span-2">
          <div className="relative">
            <select
              {...fieldProps("service")}
              defaultValue=""
              onChange={(e) => setHasService(e.target.value !== "")}
              className={`${inputClass} h-11 appearance-none pr-10 ${hasService ? "" : "text-fg-subtle"}`}
            >
              <option value="" disabled>
                {labels.service.placeholder}
              </option>
              {labels.service.options.map((option) => (
                <option key={option} value={option} className="text-fg">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 size-5 -translate-y-1/2 text-fg-body" />
          </div>
        </Field>

        <Field label={labels.message.label} htmlFor={fieldId("message")} required requiredLabel={labels.required} error={errors.message && labels.errors[errors.message]} errorId={errorId("message")} className="sm:col-span-2">
          <textarea {...fieldProps("message")} rows={1} placeholder={labels.message.placeholder} className={`${inputClass} min-h-28 resize-y py-2.5 leading-6 md:min-h-11`} />
        </Field>
      </div>

      <div className="mt-6">
        <div className="flex items-start gap-3">
          <input
            {...fieldProps("consent")}
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-border-strong accent-primary"
          />
          <label htmlFor={fieldId("consent")} className="cursor-pointer text-sm leading-5 text-fg-body">
            {labels.consent} <span aria-hidden="true">*</span>
            <span className="sr-only">({labels.required})</span>
          </label>
        </div>
        {errors.consent && (
          <p id={errorId("consent")} className="mt-1.5 text-sm text-danger">
            {labels.errors[errors.consent]}
          </p>
        )}
      </div>

      <button type="submit" disabled={status === "submitting"} className={buttonClass("primary", "mt-6 h-[52px] w-full rounded-lg")}>
        {status === "submitting" ? labels.submitting : labels.submit}
      </button>

      <div aria-live="polite" role="status">
        {status === "success" && <p className="mt-4 rounded-lg bg-success-soft px-4 py-3 text-sm text-success">{labels.success}</p>}
        {status === "error" && <p className="mt-4 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">{labels.error}</p>}
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  requiredLabel?: string;
  error?: string;
  errorId?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, required, requiredLabel, error, errorId, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-fg">
        {label}
        {required && (
          <>
            {" "}
            <span aria-hidden="true" className="text-danger">
              *
            </span>
            <span className="sr-only">({requiredLabel})</span>
          </>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
