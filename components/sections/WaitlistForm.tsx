"use client";
import { useActionState } from "react";
import Link from "next/link";
import { joinWaitlist } from "@/app/actions/waitlist";
import type { WaitlistState } from "@/lib/waitlist-schema";
import { Sparkle } from "@/components/ui/Pill";

const initial: WaitlistState = { status: "idle" };

const field =
  "mt-1.5 min-h-12 w-full rounded-2xl border border-white/20 bg-card-dark px-4 text-white placeholder:text-white/40 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan aria-[invalid=true]:border-orange";

function Err({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} role="alert" className="mt-1.5 text-sm text-orange">
      {msg}
    </p>
  ) : null;
}

/** One-off confetti of cyan sparkles, 1.2 s, pure CSS. Hidden under reduced motion (see globals.css). */
function Confetti() {
  return (
    <div
      className="confetti-wrap pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden
    >
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return (
          <span
            key={i}
            className="confetti absolute left-1/2 top-1/2"
            style={
              {
                "--dx": `${Math.round(Math.cos(a) * 140)}px`,
                "--dy": `${Math.round(Math.sin(a) * 100)}px`,
              } as React.CSSProperties
            }
          >
            <Sparkle size={14} />
          </span>
        );
      })}
    </div>
  );
}

export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initial);

  if (state.status === "success") {
    return (
      <div
        className="relative mx-auto max-w-xl rounded-3xl border border-cyan/40 p-8 text-center"
        role="status"
      >
        <Confetti />
        <Sparkle size={28} className="mx-auto mb-3" />
        <p className="font-display text-xl font-semibold">
          You&apos;re on the list. We&apos;ll tell you the moment the app launches.
        </p>
      </div>
    );
  }

  const e = state.errors ?? {};
  const v = state.values;
  return (
    <form
      action={action}
      noValidate
      className="mx-auto grid max-w-xl gap-5 text-left"
      aria-describedby={state.message ? "wl-msg" : undefined}
    >
      {/* Honeypot: hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="wl-first" className="text-sm font-medium">
          First name
        </label>
        <input
          id="wl-first"
          name="firstName"
          autoComplete="given-name"
          defaultValue={v?.firstName}
          required
          aria-invalid={!!e.firstName}
          aria-describedby={e.firstName ? "wl-first-err" : undefined}
          className={field}
        />
        <Err id="wl-first-err" msg={e.firstName} />
      </div>
      <div>
        <label htmlFor="wl-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="wl-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          defaultValue={v?.email}
          required
          aria-invalid={!!e.email}
          aria-describedby={e.email ? "wl-email-err" : undefined}
          className={field}
        />
        <Err id="wl-email-err" msg={e.email} />
      </div>
      <div>
        <label htmlFor="wl-phone" className="text-sm font-medium">
          Phone <span className="text-white/50">(optional)</span>
        </label>
        <input
          id="wl-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          defaultValue={v?.phone}
          aria-invalid={!!e.phone}
          aria-describedby={e.phone ? "wl-phone-err" : undefined}
          className={field}
        />
        <Err id="wl-phone-err" msg={e.phone} />
      </div>
      <div>
        <label
          htmlFor="wl-consent"
          className="flex min-h-11 items-start gap-3 text-sm text-white/80"
        >
          <input
            id="wl-consent"
            name="consent"
            type="checkbox"
            aria-invalid={!!e.consent}
            aria-describedby={e.consent ? "wl-consent-err" : undefined}
            className="mt-0.5 h-6 w-6 shrink-0 accent-[var(--cyan)]"
          />
          <span>
            I agree to Zekured storing my details to tell me when the app launches, as set out in
            the{" "}
            <Link href="/privacy" className="text-cyan underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <Err id="wl-consent-err" msg={e.consent} />
      </div>

      {state.message && (
        <p id="wl-msg" role="alert" className="text-sm text-orange">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-[32px] bg-cyan px-8 font-medium text-on-cyan transition-transform hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(41,203,239,0.35)] active:scale-[0.97] disabled:opacity-60"
      >
        {pending ? "Joining…" : "Join Waitlist"}
      </button>
    </form>
  );
}
