import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { Toaster } from "../components";
import { NAV, SITE } from "./config";

const current = () =>
  typeof window === "undefined" ? "" : window.location.pathname.replace(/\/?$/, "/");

const Header = () => {
  const [open, setOpen] = useState(false);
  const here = current();
  return (
    <header
      className="header sticky top-0 z-40 w-full bg-[#02231ACC] border-b border-[#48D96214]"
      style={{ borderBottomWidth: "0.5px" }}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="/" aria-label="Loveping home" className="shrink-0">
          <img src="/images/Logo.svg" alt="Loveping" className="h-4 md:h-5" />
        </a>

        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const active = here === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary-1A text-primary"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="/"
            className="ml-3 bg-primary text-secondary rounded-full px-5 h-10 inline-flex items-center text-sm font-semibold hover:brightness-110 transition"
          >
            Join the waitlist
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden w-11 h-11 -mr-2 inline-flex items-center justify-center rounded-full text-white hover:bg-white/5"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <LuX size={22} /> : <LuMenu size={22} />}
        </button>
      </div>

      {open && (
        <motion.nav
          aria-label="Main"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-[#48D96214] px-5 pb-5 pt-2 flex flex-col"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={here === item.href ? "page" : undefined}
              className={`py-3 text-base font-medium border-b border-white/5 ${
                here === item.href ? "text-primary" : "text-white/80"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/"
            className="mt-4 bg-primary text-secondary rounded-full h-11 inline-flex items-center justify-center text-sm font-semibold"
          >
            Join the waitlist
          </a>
        </motion.nav>
      )}
    </header>
  );
};

const FOOTER_LINKS = [
  { href: "/faq/", label: "FAQs" },
  { href: "/contact/", label: "Contact us" },
  { href: "/privacy/", label: "Privacy policy" },
  { href: "/terms/", label: "Terms & conditions" },
  { href: "/delete-account/", label: "Delete your account" },
];

const Footer = () => (
  <footer className="border-t border-[#48D96214] mt-24" style={{ borderTopWidth: "0.5px" }}>
    <div className="mx-auto max-w-6xl px-5 md:px-8 py-12 flex flex-col md:flex-row gap-10 md:items-start md:justify-between">
      <div className="max-w-xs space-y-3">
        <img src="/images/Logo.svg" alt="Loveping" className="h-5" />
        <p className="text-sm text-[#909090] leading-6">
          Gentle nudges to text, call and show love at just the right moment.
        </p>
      </div>
      <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
        {FOOTER_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="text-white/70 hover:text-primary transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
    </div>
    <div className="mx-auto max-w-6xl px-5 md:px-8 pb-10 flex flex-col sm:flex-row gap-2 justify-between text-xs text-[#909090]">
      <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
      <a href={`mailto:${SITE.supportEmail}`} className="hover:text-primary">
        {SITE.supportEmail}
      </a>
    </div>
  </footer>
);

/** Page shell for the content pages: header, main, footer, toasts. */
export const SiteLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Toaster />
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-primary focus:text-secondary focus:px-4 focus:py-2 focus:rounded-full"
    >
      Skip to content
    </a>
    <Header />
    <main id="main" className="relative">
      {children}
    </main>
    <Footer />
  </>
);
