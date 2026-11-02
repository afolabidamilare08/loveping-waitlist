import type { ReactNode } from "react";

/** Inline link styled for policy text. */
export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary">
    {children}
  </a>
);

/** Bulleted list with green markers. */
export const List = ({ items }: { items: ReactNode[] }) => (
  <ul className="list-disc pl-5 space-y-2 marker:text-primary">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);
