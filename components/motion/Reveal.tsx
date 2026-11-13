/**
 * Fade up once when 20% visible. A server component: it only emits markup. The single shared
 * <RevealObserver /> (mounted in template.tsx) reveals every [data-reveal] element, so the page
 * pays for one IntersectionObserver instead of dozens of hydrated components.
 * Content is in the server HTML; CSS hides it only after JS sets <html class="js">, so the
 * largest paint is never held back.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const Comp = as as React.ElementType;
  return (
    <Comp data-reveal className={className} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Comp>
  );
}
