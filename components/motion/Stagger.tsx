import { Children } from "react";
import { Reveal } from "./Reveal";

/** Wraps each child in a Reveal with an 80 ms stagger. */
export function Stagger({
  children,
  className,
  itemClassName,
  step = 80,
}: {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  step?: number;
}) {
  return (
    <div className={className}>
      {Children.toArray(children).map((c, i) => (
        <Reveal key={i} delay={i * step} className={itemClassName}>
          {c}
        </Reveal>
      ))}
    </div>
  );
}
