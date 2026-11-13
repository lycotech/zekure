import { cn } from "@/lib/cn";
import { Eyebrow } from "./Pill";

/**
 * Heading with italic cyan emphasis. Pass `parts` with `em: true` on emphasised
 * words, e.g. [{t:"Your go to app for "},{t:"every need",em:true}].
 */
export function Heading({
  parts,
  as: Tag = "h2",
  className,
  id,
}: {
  parts: { t: string; em?: boolean }[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("font-display font-bold leading-[1.08] tracking-tight", className)}>
      {parts.map((p, i) =>
        p.em ? (
          <span key={i} className="em">
            {p.t}
          </span>
        ) : (
          <span key={i}>{p.t}</span>
        ),
      )}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  parts,
  sub,
  align = "center",
  className,
  id,
}: {
  id?: string;
  eyebrow?: string;
  parts: { t: string; em?: boolean }[];
  sub?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <Heading id={id} parts={parts} className="text-[length:var(--text-section)]" />
      {sub && <p className="mt-4 text-muted">{sub}</p>}
    </div>
  );
}
