import { cn } from "@/lib/cn";

/** Small uppercase label chip. */
export function Pill({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light" | "cyan";
}) {
  const tones = {
    dark: "border-white/30 text-white",
    light: "border-ink/20 text-ink",
    cyan: "border-transparent bg-cyan text-on-cyan",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-[13px] font-medium uppercase tracking-[0.16em] text-muted", className)}>
      {children}
    </p>
  );
}

export function Sparkle({
  color = "var(--cyan)",
  size = 20,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      aria-hidden
    >
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" />
    </svg>
  );
}
