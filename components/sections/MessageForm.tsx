"use client";
import { useActionState } from "react";
import Link from "next/link";
import { sendMessage } from "@/app/actions/message";
import type { MessageState } from "@/lib/message-schema";

const initial: MessageState = { status: "idle" };
const field =
  "mt-1.5 min-h-12 w-full rounded-2xl border border-ink/25 bg-white px-4 text-ink focus:border-link-blue focus:outline-none focus:ring-2 focus:ring-link-blue aria-[invalid=true]:border-[#B8340F]";

function Err({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} role="alert" className="mt-1.5 text-sm text-[#B8340F]">
      {msg}
    </p>
  ) : null;
}

/** Light-surface form shared by Contact and Careers (general application). */
export function MessageForm({
  kind,
  messageLabel,
  submitLabel,
  successText,
}: {
  kind: "contact" | "careers";
  messageLabel: string;
  submitLabel: string;
  successText: string;
}) {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const p = kind;
  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-[24px] bg-cyan-tint p-8 font-display text-xl font-semibold"
      >
        {successText}
      </div>
    );
  }
  const e = state.errors ?? {};
  const v = state.values;
  return (
    <form action={action} noValidate className="grid gap-5">
      <input type="hidden" name="kind" value={kind} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label htmlFor={`${p}-name`} className="text-sm font-medium">
          Name
        </label>
        <input
          id={`${p}-name`}
          name="name"
          autoComplete="name"
          defaultValue={v?.name}
          required
          aria-invalid={!!e.name}
          aria-describedby={e.name ? `${p}-name-err` : undefined}
          className={field}
        />
        <Err id={`${p}-name-err`} msg={e.name} />
      </div>
      <div>
        <label htmlFor={`${p}-email`} className="text-sm font-medium">
          Email
        </label>
        <input
          id={`${p}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          defaultValue={v?.email}
          required
          aria-invalid={!!e.email}
          aria-describedby={e.email ? `${p}-email-err` : undefined}
          className={field}
        />
        <Err id={`${p}-email-err`} msg={e.email} />
      </div>
      <div>
        <label htmlFor={`${p}-phone`} className="text-sm font-medium">
          Phone <span className="text-muted">(optional)</span>
        </label>
        <input
          id={`${p}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          defaultValue={v?.phone}
          aria-invalid={!!e.phone}
          aria-describedby={e.phone ? `${p}-phone-err` : undefined}
          className={field}
        />
        <Err id={`${p}-phone-err`} msg={e.phone} />
      </div>
      <div>
        <label htmlFor={`${p}-message`} className="text-sm font-medium">
          {messageLabel}
        </label>
        <textarea
          id={`${p}-message`}
          name="message"
          rows={5}
          defaultValue={v?.message}
          required
          aria-invalid={!!e.message}
          aria-describedby={e.message ? `${p}-message-err` : undefined}
          className={`${field} py-3`}
        />
        <Err id={`${p}-message-err`} msg={e.message} />
      </div>
      <div>
        <label htmlFor={`${p}-consent`} className="flex min-h-11 items-start gap-3 text-sm">
          <input
            id={`${p}-consent`}
            name="consent"
            type="checkbox"
            aria-invalid={!!e.consent}
            aria-describedby={e.consent ? `${p}-consent-err` : undefined}
            className="mt-0.5 h-6 w-6 shrink-0 accent-[var(--link-blue)]"
          />
          <span>
            I agree to Zekured storing my details to reply to me, as set out in the{" "}
            <Link href="/privacy" className="text-link-blue underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <Err id={`${p}-consent-err`} msg={e.consent} />
      </div>
      {state.message && (
        <p role="alert" className="text-sm text-[#B8340F]">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-[32px] bg-cyan px-8 font-medium text-on-cyan transition-transform hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-60 sm:w-max"
      >
        {pending ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
