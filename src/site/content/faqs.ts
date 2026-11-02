import { SITE } from "../config";

export type FaqCategory = {
  id: string;
  label: string;
  tone: "green" | "purple" | "blue" | "yellow" | "pink";
  items: { q: string; a: string }[];
};

/**
 * Built-in answers, written from how the app works today. Live FAQs from the
 * backend (the list the app shows under Help & FAQs) are shown above these.
 */
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "start",
    label: "Getting started",
    tone: "green",
    items: [
      {
        q: "What is Loveping?",
        a: "Loveping is a relationship app that gives you gentle nudges to stay connected with your partner: a sweet message ready to send, a reminder that a quick call could make their day, and a heads-up before birthdays and anniversaries.",
      },
      {
        q: "Is Loveping free?",
        a: "Yes. Loveping is free to download and use, with no ads. If we ever add paid extras, we’ll tell you clearly before anything costs money.",
      },
      {
        q: "Can I try it without signing up?",
        a: "Yes — choose “Continue as guest”. You can set up your partner and get nudges straight away. Guest accounts live only on your phone, so create an account from the app when you’re ready to keep your notes safe.",
      },
      {
        q: "Does my partner need Loveping too?",
        a: "No. Loveping is just for you. Your partner doesn’t need the app and never sees your account, notes or nudges — they just get the lovely messages you send.",
      },
      {
        q: "Which phones does it work on?",
        a: "Loveping is built for both Android and iPhone. It’s launching on Google Play first, with the App Store to follow.",
      },
    ],
  },
  {
    id: "nudges",
    label: "Nudges & messages",
    tone: "purple",
    items: [
      {
        q: "What’s a nudge?",
        a: "A small, timely prompt to show love. A Text Nudge gives you a message you can send as it is or edit; a Call Nudge reminds you that a short call could mean a lot, with a few conversation starters.",
      },
      {
        q: "How do I send a message?",
        a: "Open a Text Nudge and tap “Copy & Send”. The message is copied and your phone’s share sheet opens, so you can send it on WhatsApp, iMessage or any app you like. Loveping never sends messages on your behalf.",
      },
      {
        q: "Can I change the tone of a message?",
        a: "Yes. Pick up to two tones — Romantic, Playful, Deep & Thoughtful, Supportive or Funny/Lighthearted — and edit any message so it sounds like you.",
      },
      {
        q: "Can I write my own love notes?",
        a: "Yes. In Messages, tap the + button to write a note, tag it by tone and save it. Your saved notes and history stay in the app, ready to reuse.",
      },
      {
        q: "How do I choose when I get nudges?",
        a: "Go to Profile → App Settings → Notifications → Nudge Type to pick the days and how often you’d like nudges. You can also turn on Silent Mode when you need a break.",
      },
    ],
  },
  {
    id: "partner",
    label: "Partner & reminders",
    tone: "pink",
    items: [
      {
        q: "What does Loveping need to know about my partner?",
        a: "Just the basics that help us time your nudges: their name, relationship type, birthday, anniversary and love languages. You can update these any time in Profile → My Account.",
      },
      {
        q: "Will I be reminded about birthdays and anniversaries?",
        a: "Yes. Your partner’s upcoming birthday and anniversary appear on Home, and with Special Occasion Reminders on, you’ll get a heads-up before the day.",
      },
      {
        q: "I’m not getting notifications. What should I check?",
        a: "Make sure notifications are allowed for Loveping in your phone’s settings, that Silent Mode is off in the app, and that you’ve picked nudge days. On Android, also check that battery saver isn’t restricting Loveping.",
      },
    ],
  },
  {
    id: "gifts",
    label: "Gifts",
    tone: "yellow",
    items: [
      {
        q: "When are gifts coming?",
        a: "Soon! We’re building gift ideas picked for your partner’s love language, nudges before big days, and a wishlist to save ideas. Keep the app updated and you’ll see them as soon as they’re ready.",
      },
    ],
  },
  {
    id: "account",
    label: "Account & privacy",
    tone: "blue",
    items: [
      {
        q: "Is my data private?",
        a: "Yes. We never sell your data or show ads, and your partner can’t see your account. Read exactly what we collect and why in our privacy policy.",
      },
      {
        q: "Can I lock the app with a PIN?",
        a: "Yes. Set a 6-digit PIN in Profile → App Settings → Privacy, and Loveping will ask for it whenever you open the app.",
      },
      {
        q: "I forgot my password. What do I do?",
        a: "On the sign-in screen tap “Forgot Password?”, enter your email and we’ll send you a code to set a new one.",
      },
      {
        q: "How do I delete my account?",
        a: `Request deletion on our Delete your account page or email ${SITE.supportEmail} from your account’s email address. We’ll delete your account and all its data within ${SITE.deletionDays} days.`,
      },
      {
        q: "What happens to a guest account if I log out?",
        a: "A guest account has no email or password, so it can’t be recovered after logging out or uninstalling. Create an account first if you want to keep your partner details and notes.",
      },
    ],
  },
];
