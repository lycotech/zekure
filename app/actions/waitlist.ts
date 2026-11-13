"use server";
import { headers } from "next/headers";
import { db, ensureSchema } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { waitlistSchema, type WaitlistState } from "@/lib/waitlist-schema";

export async function joinWaitlist(_prev: WaitlistState, form: FormData): Promise<WaitlistState> {
  // Honeypot: bots fill the hidden field. Pretend success so they learn nothing.
  if (String(form.get("website") ?? "") !== "") return { status: "success" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(`waitlist:${ip}`)) {
    return { status: "error", message: "Too many attempts. Please try again in a little while." };
  }

  const raw = {
    firstName: String(form.get("firstName") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
    consent: form.get("consent") === "on" ? "on" : "",
  };
  const parsed = waitlistSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: NonNullable<WaitlistState["errors"]> = {};
    for (const i of parsed.error.issues) {
      const k = i.path[0] as keyof typeof errors;
      errors[k] ??= i.message;
    }
    return {
      status: "error",
      errors,
      values: { firstName: raw.firstName, email: raw.email, phone: raw.phone },
    };
  }

  try {
    await ensureSchema();
    await db().query(
      `INSERT INTO waitlist (first_name, email, phone) VALUES ($1, $2, $3)
       ON CONFLICT (lower(email)) DO NOTHING`,
      [parsed.data.firstName, parsed.data.email, parsed.data.phone || null],
    );
  } catch (e) {
    console.error("waitlist insert failed", e instanceof Error ? e.message : e);
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again shortly.",
      values: { firstName: raw.firstName, email: raw.email, phone: raw.phone },
    };
  }
  // Duplicate emails also report success so the list cannot be probed.
  return { status: "success" };
}
