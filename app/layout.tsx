import type { Metadata } from "next";
import { serif, display, body } from "@/lib/fonts";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteJsonLd } from "@/components/sections/JsonLd";
import { Analytics } from "@/components/sections/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zekured.com"),
  title: { default: "Zekured | Save, invest, insure and lend", template: "%s | Zekured" },
  description:
    "Zekured is a Nigerian digital finance app for saving, investing, insurance and lending through licensed partners. Mobile app launching soon.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-NG"
      className={`${serif.variable} ${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cyan focus:px-5 focus:py-3 focus:text-on-cyan"
        >
          Skip to content
        </a>
        <SiteJsonLd />
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
