import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "secondary-dark" | "link";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[32px] px-6 text-[15px] font-medium transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-cyan text-on-cyan hover:shadow-[0_6px_24px_rgba(41,203,239,0.35)]",
  secondary: "border-[1.5px] border-white text-white",
  "secondary-dark": "border-[1.5px] border-ink text-ink",
  link: "group min-h-0 rounded-none px-0 hover:translate-y-0",
};

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ variant = "primary", href, className, children, ...rest }: Props) {
  const cls = cn(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/** "Learn more →" coloured by product; the arrow nudges 4 px on hover. */
export function LearnMore({
  href,
  color,
  about,
  children = "Learn more",
}: {
  href: string;
  color: string;
  /** Screen-reader context so the link text is descriptive, e.g. "about Save". */
  about?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 font-medium"
      style={{ color }}
    >
      {children}
      {about && <span className="sr-only"> {about}</span>}
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
      >
        →
      </span>
    </Link>
  );
}
