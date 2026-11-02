import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useMemo, useState } from "react";
import { LuArrowRight, LuChevronDown, LuMessageCircle, LuSearch, LuX } from "react-icons/lu";
import { fetchFaqs, type Faq } from "../api";
import { FAQ_CATEGORIES, type FaqCategory } from "../content/faqs";
import { fadeUp, stagger } from "../motion";
import { Card, IconChip, Mark, PageHero } from "../ui";

type Item = { q: string; a: string; category: string };

const TONE_CHIP: Record<FaqCategory["tone"], string> = {
  green: "text-primary bg-primary-1A border-primary-1A",
  purple: "text-purple bg-purple-1A border-purple-1A",
  blue: "text-blue bg-blue-1A border-blue-1A",
  yellow: "text-yellow bg-yellow-1A border-yellow-1A",
  pink: "text-[#FA5EBC] bg-[#FA5EBC1A] border-[#FA5EBC1A]",
};

const normalise = (s: string) => s.toLowerCase().replace(/[’']/g, "'").trim();

const QuestionRow = ({ item, open, onToggle }: { item: Item; open: boolean; onToggle: () => void }) => {
  const id = useId();
  return (
    <Card className={`overflow-hidden transition-colors ${open ? "border-[#48D96233]" : ""}`}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-5 cursor-pointer"
        >
          <span className="text-white font-medium text-[15px] md:text-base">{item.q}</span>
          <span
            className={`shrink-0 w-8 h-8 rounded-full inline-flex items-center justify-center border transition-all ${
              open ? "bg-primary text-secondary border-primary rotate-180" : "text-primary border-[#48D96233]"
            }`}
          >
            <LuChevronDown size={18} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <p className="px-5 md:px-6 pb-5 -mt-1 text-[15px] leading-7 text-[#9CA9A5] whitespace-pre-line">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const FaqPage = () => {
  const [live, setLive] = useState<Faq[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);

  // The app's own FAQ list (edited by the team in the admin), shown first.
  useEffect(() => {
    const ctrl = new AbortController();
    fetchFaqs(ctrl.signal)
      .then(setLive)
      .catch(() => {
        /* built-in answers are enough on their own */
      });
    return () => ctrl.abort();
  }, []);

  const categories = useMemo(() => {
    const cats = [...FAQ_CATEGORIES];
    if (live.length) {
      const builtIn = new Set(FAQ_CATEGORIES.flatMap((c) => c.items.map((i) => normalise(i.q))));
      const fresh = live.filter((f) => !builtIn.has(normalise(f.question)));
      if (fresh.length) {
        cats.unshift({
          id: "team",
          label: "Popular",
          tone: "green",
          items: fresh.map((f) => ({ q: f.question, a: f.answer })),
        });
      }
    }
    return cats;
  }, [live]);

  const results = useMemo(() => {
    // Every word must appear at the start of a word, so "pin" finds "PIN"
    // but not "Loveping".
    const words = normalise(query)
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i"));
    const matches = (i: { q: string; a: string }) => {
      const text = `${normalise(i.q)} ${normalise(i.a)}`;
      return words.every((re) => re.test(text));
    };
    return categories
      .filter((c) => category === "all" || c.id === category)
      .map((c) => ({
        ...c,
        items: c.items.filter((i) => words.length === 0 || matches(i)),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, category, query]);

  const total = results.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      <PageHero
        center
        eyebrow="Help & FAQs"
        title={
          <>
            Questions? We’ve got <Mark>answers</Mark>.
          </>
        }
        lead="Everything you might want to know about nudges, love notes, reminders and your account."
      />

      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="relative mb-6">
          <LuSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} aria-hidden="true" />
          <label htmlFor="faq-search" className="sr-only">
            Search questions
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="w-full h-14 rounded-full bg-white/[0.03] border border-[#48D96233] pl-12 pr-12 text-white placeholder:text-[#909090] text-[15px] focus:outline-none focus:border-primary transition-colors"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full inline-flex items-center justify-center text-[#909090] hover:text-white"
            >
              <LuX size={18} />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap" role="group" aria-label="Filter by topic">
          {[{ id: "all", label: "All topics" }, ...categories].map((c) => {
            const on = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(c.id)}
                className={`shrink-0 h-10 px-5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                  on ? "bg-primary text-secondary border-primary" : "bg-white/[0.02] text-white/80 border-[#48D96214] hover:border-[#48D96233]"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {total} {total === 1 ? "question" : "questions"} found
        </p>

        {results.length === 0 ? (
          <Card className="p-10 text-center space-y-3">
            <p className="text-white font-medium">No answers match “{query}”.</p>
            <p className="text-sm text-[#9CA9A5]">
              Try another word, or <a className="text-primary underline underline-offset-4" href="/contact/">ask us directly</a>.
            </p>
          </Card>
        ) : (
          <motion.div className="space-y-12" variants={stagger} initial="hidden" animate="visible">
            {results.map((c) => (
              <motion.section key={c.id} variants={fadeUp} aria-labelledby={`cat-${c.id}`}>
                <h2 id={`cat-${c.id}`} className="flex items-center gap-3 mb-4">
                  <span className={`text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full border ${TONE_CHIP[c.tone]}`}>
                    {c.label}
                  </span>
                </h2>
                <div className="space-y-3">
                  {c.items.map((item) => {
                    const key = `${c.id}:${item.q}`;
                    return (
                      <QuestionRow
                        key={key}
                        item={{ ...item, category: c.id }}
                        open={open === key}
                        onToggle={() => setOpen(open === key ? null : key)}
                      />
                    );
                  })}
                </div>
              </motion.section>
            ))}
          </motion.div>
        )}

        <Card className="mt-16 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
          <div className="flex items-center gap-4">
            <IconChip tone="purple" size="lg">
              <LuMessageCircle size={24} />
            </IconChip>
            <div>
              <p className="text-white font-semibold">Still need help?</p>
              <p className="text-sm text-[#9CA9A5]">Send us a note — a real person will get back to you.</p>
            </div>
          </div>
          <a
            href="/contact/"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-primary text-secondary text-sm font-semibold hover:brightness-110 transition"
          >
            Contact us <LuArrowRight size={16} />
          </a>
        </Card>
      </div>
    </>
  );
};

export default FaqPage;
