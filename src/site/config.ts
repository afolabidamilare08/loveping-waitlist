/**
 * One place for the details the legal and support pages share.
 * Check these before publishing.
 */
export const SITE = {
  name: "Loveping",
  url: "https://loveping.net",
  /** Where people reach a human. Make sure this inbox exists. */
  supportEmail: "support@loveping.net",
  /** Date the current policies took effect (shown on Privacy and Terms). */
  policiesUpdated: "2 November 2026",
  /** Law that governs the Terms. */
  governingLaw: "the Federal Republic of Nigeria",
  minimumAge: 16,
  /** How long an account deletion request takes, at most. */
  deletionDays: 30,
  /** Typical reply time shown on Contact. */
  replyTime: "within 2 working days",
};

/** Backend API base, the same one the waitlist form uses. */
export const API_BASE: string =
  import.meta.env.VITE_BASE_URL ||
  "https://loveping-backend-production.up.railway.app/api/v1";

export const NAV = [
  { href: "/faq/", label: "FAQs" },
  { href: "/contact/", label: "Contact" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
] as const;
