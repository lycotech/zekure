"use server";
import { headers } from "next/headers";
import { db, ensureSchema } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { messageSchema, type MessageState } from "@/lib/message-schema";

export async function sendMessage(_prev: MessageState, form: FormData): Promise<MessageState> {
  // Honeypot: bots fill the hidden field. Pretend success.
  if (String(form.get("website") ?? "") !== "") return { status: "success" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(`message:${ip}`, 5)) {
    return { status: "error", message: "Too many messages. Please try again in a little while." };
  }

  const raw = {
    kind: String(form.get("kind") ?? ""),
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
    message: String(form.get("message") ?? ""),
    consent: form.get("consent") === "on" ? "on" : "",
  };
  const values = { name: raw.name, email: raw.email, phone: raw.phone, message: raw.message };
  const parsed = messageSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: NonNullable<MessageState["errors"]> = {};
    for (const i of parsed.error.issues) {
      const k = String(i.path[0]);
      if (k !== "kind") errors[k as keyof typeof errors] ??= i.message;
    }
    return { status: "error", errors, values };
  }

  try {
    await ensureSchema();
    await db().query(
      `INSERT INTO messages (kind, name, email, phone, message) VALUES ($1,$2,$3,$4,$5)`,
      [
        parsed.data.kind,
        parsed.data.name,
        parsed.data.email,
        parsed.data.phone || null,
        parsed.data.message,
      ],
    );
  } catch (e) {
    console.error("message insert failed", e instanceof Error ? e.message : e);
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again shortly.",
      values,
    };
  }
  return { status: "success" };
}
