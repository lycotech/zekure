import { z } from "zod";

export const messageSchema = z.object({
  kind: z.enum(["contact", "careers"]),
  name: z.string().trim().min(1, "Enter your name").max(80, "That name is too long"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(254),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine(
      (v) => v === "" || /^\+?[0-9\s-]{7,15}$/.test(v),
      "Enter a valid phone number or leave it blank",
    )
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a few words")
    .max(2000, "Please keep it under 2,000 characters"),
  consent: z.literal("on", { error: "Please tick the box so we can reply to you" }),
});

export type MessageState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "message" | "consent", string>>;
  values?: { name: string; email: string; phone: string; message: string };
};
