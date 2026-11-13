import { Playfair_Display, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";

/**
 * Nohemi (display) and General Sans (body) are the brand fonts, but the font files are not in
 * the repo yet and the Nohemi web licence is [TO CONFIRM]. Until then, Google stand-ins are
 * used. To switch: drop the files in public/fonts and replace these with next/font/local,
 * keeping the same CSS variable names.
 *
 * Budget: three font files in total (one variable file each for display and body, and a single
 * italic weight for the serif accent) and at most two preloaded: display and serif, which
 * paint the hero headline. The body font swaps in with a size-matched fallback.
 */
export const serif = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500"],
  variable: "--font-serif",
  display: "swap",
});
export const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
export const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: false,
});
