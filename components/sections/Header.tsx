"use client";
import * as NM from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { companyLinks, productLinks } from "@/content/nav";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const trigger =
  "group inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-[15px] font-medium text-white hover:text-cyan data-[state=open]:text-cyan";
const panel =
  "absolute left-0 top-full z-50 mt-2 w-[22rem] origin-top rounded-2xl border border-white/15 bg-card-dark p-2 shadow-2xl data-[state=open]:animate-[menu-in_160ms_ease-out] data-[state=closed]:animate-[menu-out_160ms_ease-in]";
const item = "block rounded-xl px-4 py-3 hover:bg-white/10 focus-visible:bg-white/10";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full text-white transition-colors duration-300",
        scrolled ? "bg-black/70 backdrop-blur-md" : "bg-black",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 md:px-8">
        <Logo />

        <NM.Root className="relative hidden md:block">
          <NM.List className="flex items-center gap-1">
            <NM.Item className="relative">
              <NM.Trigger className={trigger}>
                Products{" "}
                <span
                  aria-hidden
                  className="text-xs transition-transform group-data-[state=open]:rotate-180"
                >
                  ▾
                </span>
              </NM.Trigger>
              <NM.Content className={panel}>
                <ul>
                  {productLinks.map((l) => (
                    <li key={l.href}>
                      <NM.Link asChild>
                        <Link href={l.href} className={item}>
                          <span className="flex items-center gap-2 font-display font-semibold">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: l.color }}
                              aria-hidden
                            />
                            {l.label}
                          </span>
                          <span className="block text-sm text-white/65">{l.desc}</span>
                        </Link>
                      </NM.Link>
                    </li>
                  ))}
                </ul>
              </NM.Content>
            </NM.Item>
            <NM.Item className="relative">
              <NM.Trigger className={trigger}>
                Company{" "}
                <span
                  aria-hidden
                  className="text-xs transition-transform group-data-[state=open]:rotate-180"
                >
                  ▾
                </span>
              </NM.Trigger>
              <NM.Content className={panel}>
                <ul>
                  {companyLinks.map((l) => (
                    <li key={l.href}>
                      <NM.Link asChild>
                        <Link href={l.href} className={item}>
                          <span className="block font-display font-semibold">{l.label}</span>
                          {l.desc && <span className="block text-sm text-white/65">{l.desc}</span>}
                        </Link>
                      </NM.Link>
                    </li>
                  ))}
                </ul>
              </NM.Content>
            </NM.Item>
          </NM.List>
        </NM.Root>

        <div className="flex items-center gap-2">
          <Button href="/#waitlist" className="hidden sm:inline-flex">
            Get Started
          </Button>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 md:hidden"
              aria-label="Open menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                aria-hidden
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,90vw)] flex-col gap-6 overflow-y-auto bg-black p-6 text-white">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-sm font-medium uppercase tracking-widest text-white/60">
                    Menu
                  </Dialog.Title>
                  <Dialog.Close
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30"
                    aria-label="Close menu"
                  >
                    ✕
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                <nav aria-label="Mobile" className="flex flex-col gap-6">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-widest text-white/50">Products</p>
                    {productLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block py-2.5 font-display text-lg font-semibold"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-widest text-white/50">Company</p>
                    {companyLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block py-2.5 font-display text-lg font-semibold"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </nav>
                <Button href="/#waitlist" onClick={() => setOpen(false)}>
                  Get Started
                </Button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
