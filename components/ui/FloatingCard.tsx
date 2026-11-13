import { cn } from "@/lib/cn";

/**
 * Overlay card with a 1.5 px black outline and pale fill. Always an
 * illustration: carries an "Illustrative" label. Drifts unless motion is reduced.
 */
export function FloatingCard({
  title,
  children,
  action,
  className,
  drift = true,
  delay = 0,
}: {
  title: string;
  children?: React.ReactNode;
  action?: string;
  className?: string;
  drift?: boolean;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "on-light w-max max-w-[16rem] rounded-2xl border-[1.5px] border-black bg-cyan-tint p-4 text-ink shadow-lg",
        drift && "anim-drift",
        className,
      )}
      style={{ animationDelay: `${delay}s` }}
      role="group"
      aria-label={`${title} (illustrative)`}
    >
      <p className="text-[11px] font-medium uppercase tracking-widest text-muted">Illustrative</p>
      <p className="mt-1 font-display text-base font-semibold">{title}</p>
      {children && <div className="mt-1 text-sm text-muted">{children}</div>}
      {action && (
        <span
          className="mt-3 inline-flex rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white"
          aria-hidden
        >
          {action}
        </span>
      )}
    </div>
  );
}
