import { cn } from "@/lib/cn";

/**
 * Marked placeholder for commissioned photography. Replace with next/image once the team
 * supplies licensed photos of Nigerian people. `description` doubles as alt text.
 */
export function ImagePlaceholder({
  description,
  className,
  children,
}: {
  description: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={description}
      className={cn(
        "relative flex items-end overflow-hidden rounded-[24px] bg-gradient-to-br from-[#1b2a33] via-[#16313a] to-[#0d1417]",
        className,
      )}
    >
      <p className="p-4 text-xs leading-snug text-white/45">[IMAGE: {description}]</p>
      {children}
    </div>
  );
}
