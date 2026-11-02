import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "./motion";

/** The landing page's "● Still in the kitchen" pill. */
export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#04281C] w-fit">
    <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary" />
    <span className="uppercase text-xs md:text-sm font-medium text-white tracking-wide">
      {children}
    </span>
  </div>
);

/** The tilted green word from the landing headline ("moment"). */
export const Mark = ({ children }: { children: ReactNode }) => (
  <span className="moment-mask bg-primary rounded-sm px-1.5 md:px-3 mx-1">
    <span className="text-secondary">{children}</span>
  </span>
);

type Tone = "green" | "purple" | "blue" | "yellow" | "pink";
const TONES: Record<Tone, string> = {
  green: "bg-primary-1A border-primary-1A text-primary",
  purple: "bg-purple-1A border-purple-1A text-purple",
  blue: "bg-blue-1A border-blue-1A text-blue",
  yellow: "bg-yellow-1A border-yellow-1A text-yellow",
  pink: "bg-[#FA5EBC1A] border-[#FA5EBC1A] text-[#FA5EBC]",
};

/** Round tinted icon, as on the landing page's message/call/gift chips. */
export const IconChip = ({
  tone = "green",
  size = "md",
  children,
}: {
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}) => {
  const s = size === "lg" ? "w-14 h-14" : size === "sm" ? "w-9 h-9" : "w-11 h-11";
  return (
    <span
      aria-hidden="true"
      className={`${s} shrink-0 inline-flex items-center justify-center rounded-full border-[0.74px] ${TONES[tone]}`}
    >
      {children}
    </span>
  );
};

/** Page intro: eyebrow, big headline, grey lead. */
export const PageHero = ({
  eyebrow,
  title,
  lead,
  meta,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode;
  center?: boolean;
}) => (
  <section className="relative overflow-hidden">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
      style={{ background: "radial-gradient(closest-side, rgba(72,217,98,0.14), rgba(72,217,98,0))" }}
    />
    <motion.div
      className={`relative mx-auto max-w-6xl px-5 md:px-8 pt-14 md:pt-24 pb-10 md:pb-16 space-y-5 md:space-y-6 ${
        center ? "flex flex-col items-center text-center" : ""
      }`}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeUp}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h1
        variants={fadeUp}
        className="text-white text-[34px] leading-[1.15] md:text-[56px] md:leading-[1.1] font-semibold tracking-tight max-w-3xl"
      >
        {title}
      </motion.h1>
      {lead && (
        <motion.p
          variants={fadeUp}
          className="text-[15px] md:text-lg text-[#9CA9A5] leading-7 md:leading-8 max-w-2xl"
        >
          {lead}
        </motion.p>
      )}
      {meta && (
        <motion.div variants={fadeUp} className="text-sm text-[#909090]">
          {meta}
        </motion.div>
      )}
    </motion.div>
  </section>
);

/** The app's card surface: faint white fill, green hairline. */
export const Card = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`rounded-2xl bg-white/[0.03] border border-[#48D96214] ${className}`}>
    {children}
  </div>
);
