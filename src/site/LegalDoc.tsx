import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { fadeUp, stagger } from "./motion";
import { Card, IconChip } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };
export type Highlight = {
  icon: ReactNode;
  tone: "green" | "purple" | "blue" | "yellow" | "pink";
  title: string;
  text: string;
};

/** Highlights the section currently in view in the table of contents. */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
};

/**
 * Policy page body: "the short version" cards, a sticky contents list
 * (desktop) and numbered sections.
 */
export const LegalDoc = ({
  highlights,
  sections,
}: {
  highlights?: Highlight[];
  sections: LegalSection[];
}) => {
  const active = useActiveSection(sections.map((s) => s.id));

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      {highlights && (
        <motion.section
          aria-labelledby="short-version"
          className="mb-14 md:mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            id="short-version"
            variants={fadeUp}
            className="text-white text-lg md:text-xl font-semibold mb-5"
          >
            The short version
          </motion.h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <motion.div key={h.title} variants={fadeUp}>
                <Card className="h-full p-5 md:p-6 space-y-4 hover:border-[#48D96233] transition-colors">
                  <IconChip tone={h.tone}>{h.icon}</IconChip>
                  <div className="space-y-1.5">
                    <h3 className="text-white font-semibold text-[15px]">{h.title}</h3>
                    <p className="text-sm text-[#9CA9A5] leading-6">{h.text}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-xs uppercase tracking-wider text-[#909090] font-medium mb-4">
              On this page
            </p>
            <ol className="space-y-1 border-l border-[#48D96214]">
              {sections.map((s, i) => {
                const on = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={on ? "location" : undefined}
                      className={`-ml-px flex gap-2 border-l py-1.5 pl-4 text-sm transition-colors ${
                        on
                          ? "border-primary text-primary"
                          : "border-transparent text-white/60 hover:text-white"
                      }`}
                    >
                      <span className="tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>

        <article className="legal max-w-3xl">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 py-8 first:pt-0 border-b border-[#48D96214] last:border-0">
              <h2 className="flex items-baseline gap-3 text-white text-xl md:text-2xl font-semibold mb-4">
                <span className="text-primary text-sm md:text-base tabular-nums font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#C4CDCA]">{s.body}</div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
};

/** A labelled list block used inside sections ("Account details: …"). */
export const DataList = ({ items }: { items: { label: string; text: ReactNode }[] }) => (
  <ul className="grid gap-3">
    {items.map((it) => (
      <li key={it.label} className="rounded-xl bg-white/[0.03] border border-[#48D96214] px-4 py-3.5">
        <span className="block text-white font-medium text-sm mb-1">{it.label}</span>
        <span className="block text-sm leading-6 text-[#9CA9A5]">{it.text}</span>
      </li>
    ))}
  </ul>
);
