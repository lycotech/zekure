import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1200px] px-5 md:px-8", className)}>{children}</Tag>
  );
}

/** Large rounded light panel on the black page. */
export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("on-light mx-2 rounded-[32px] bg-white text-ink md:mx-4", className)}>
      {children}
    </div>
  );
}
