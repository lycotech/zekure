import Link from "next/link";

/** Lightning-bolt Z mark + wordmark. Placeholder drawing; replace with the brand SVG. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Zekured home"
      className={`inline-flex min-h-11 items-center gap-2 ${className ?? ""}`}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden>
        <rect width="32" height="32" rx="9" fill="var(--cyan)" />
        <path d="M8 8h16l-9 9h9l-2 7-3-5H8l9-9H8z" fill="var(--on-cyan)" />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">Zekured</span>
    </Link>
  );
}
