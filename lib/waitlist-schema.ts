import { z } from "zod";

export const waitlistSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(60, "That name is too long"),
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
  consent: z.literal("on", { error: "Please tick the box to join the waitlist" }),
});

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"firstName" | "email" | "phone" | "consent", string>>;
  values?: { firstName: string; email: string; phone: string };
};
