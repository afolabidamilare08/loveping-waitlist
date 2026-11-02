import { LuBellRing, LuEyeOff, LuShieldCheck, LuTrash2 } from "react-icons/lu";
import { SITE } from "../config";
import { A } from "../Prose";
import { DataList, type Highlight, type LegalSection } from "../LegalDoc";


const mail = <A href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</A>;

export const privacyHighlights: Highlight[] = [
  {
    icon: <LuEyeOff size={20} />,
    tone: "green",
    title: "Your notes stay yours",
    text: "We never sell your data, show ads, or share your messages with your partner or anyone else.",
  },
  {
    icon: <LuShieldCheck size={20} />,
    tone: "purple",
    title: "Only what we need",
    text: "Your account, your partner’s key dates and preferences — just enough to send the right nudge.",
  },
  {
    icon: <LuBellRing size={20} />,
    tone: "blue",
    title: "You control nudges",
    text: "Choose the days, use silent mode, or switch notifications off any time.",
  },
  {
    icon: <LuTrash2 size={20} />,
    tone: "yellow",
    title: "Delete anytime",
    text: `Ask us to delete your account and we’ll erase your data within ${SITE.deletionDays} days.`,
  },
];

export const privacySections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          {SITE.name} (“Loveping”, “we”, “us”) makes the Loveping mobile app and the website at{" "}
          <A href={SITE.url}>loveping.net</A>. Loveping helps couples stay connected with gentle
          nudges to send a message, make a call or mark a special date.
        </p>
        <p>
          This policy explains what information we collect, why, who helps us process it, and the
          choices you have. It applies to the app, the website and our waitlist. If you have any
          questions, contact us at {mail}.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We collect information you give us and a small amount that is created when you use Loveping:</p>
        <DataList
          items={[
            {
              label: "Account details",
              text: "Your full name, email address and password (stored only in a securely hashed form). If you set a 6-digit PIN to lock the app, it is protected the same way. If you continue as a guest, we create an anonymous account with a random identifier instead.",
            },
            {
              label: "Details about your partner",
              text: "What you choose to tell us: your partner’s name, gender, relationship type, birthday, anniversary and love languages. We use these to time and personalise your nudges.",
            },
            {
              label: "Your preferences",
              text: "Nudge tones (for example Romantic or Playful), which days and how often you’d like nudges, special-occasion reminders, silent mode, language and country.",
            },
            {
              label: "Content you create",
              text: "Love notes you write or save, the tones you tag them with, and your nudge history (for example which nudges were delivered or saved).",
            },
            {
              label: "Device and technical information",
              text: "A push notification token so we can send you notifications, your app version and platform (to tell you about updates), sign-in and activity records that keep your account secure, and crash diagnostics if the app stops working.",
            },
            {
              label: "Messages to us",
              text: "Your name, email and message when you contact us, send feedback or report an issue, plus our replies.",
            },
            {
              label: "Website and waitlist",
              text: "Your email address if you join the waitlist, and basic usage statistics about visits to loveping.net (pages viewed, approximate location from your IP address, device and browser type) collected with Google Analytics.",
            },
          ]}
        />
        <p>
          We do not collect your contacts, photos, precise location, or the content of messages you send
          to your partner through other apps. When you copy a note and send it through WhatsApp, iMessage
          or another app, that message is handled by that app, not by Loveping.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2 marker:text-primary">
          <li>To create and run your account, and keep it secure (including verifying your email and resetting your password).</li>
          <li>To prepare your daily text and call nudges and remind you before birthdays and anniversaries.</li>
          <li>To save your love notes and show your history across sessions.</li>
          <li>To send notifications you’ve asked for, and important account or service messages.</li>
          <li>To answer your questions, feedback and issue reports.</li>
          <li>To understand how Loveping is used, fix crashes and improve the app.</li>
          <li>To comply with the law and protect our users and service from fraud and abuse.</li>
        </ul>
        <p>
          We rely on the following legal bases: providing the service you signed up for (contract), your
          consent (for example for notifications, which you can withdraw in your device settings), our
          legitimate interest in keeping Loveping secure and improving it, and legal obligations.
        </p>
      </>
    ),
  },
  {
    id: "notifications",
    title: "Notifications",
    body: (
      <>
        <p>
          With your permission, Loveping sends push notifications: nudges, reminders before special
          dates, and occasional announcements from the Loveping team. Some reminders are scheduled
          directly on your phone. You can change which days you get nudges, turn on silent mode in the
          app, or switch notifications off entirely in your phone’s settings.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    body: (
      <>
        <p>
          <strong className="text-white font-semibold">We do not sell your personal information, and we don’t use it for advertising.</strong>{" "}
          Your partner does not get access to your account, notes or history. We share information only
          with service providers that help us run Loveping, under agreements that limit how they can use it:
        </p>
        <DataList
          items={[
            { label: "Hosting and database", text: "Cloud providers that host our servers and store your account data." },
            { label: "Push notifications", text: "Expo’s push notification service, Google Firebase Cloud Messaging (Android) and Apple Push Notification service (iPhone), which deliver notifications to your device." },
            { label: "Email delivery", text: "Email providers such as Resend that send verification codes, password resets and replies to your messages." },
            { label: "Crash reporting", text: "Sentry, which receives technical details when the app crashes so we can fix it." },
            { label: "Website analytics", text: "Google Analytics, for aggregated statistics about visits to loveping.net." },
          ]}
        />
        <p>
          We may also share information if the law requires it, to protect the rights and safety of our
          users or others, or as part of a merger or acquisition (in which case this policy would continue
          to apply to your information).
        </p>
      </>
    ),
  },
  {
    id: "your-partner",
    title: "Information about your partner",
    body: (
      <p>
        Loveping lets you add details about another person — your partner. Please only add information
        you’re comfortable sharing and that your partner would reasonably expect you to use for this
        purpose. We use it only to personalise your own nudges; we never contact your partner, and they
        cannot see what you’ve saved. If your partner asks us to remove their details, contact us and we
        will help.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <>
        <p>
          We keep your information for as long as your account is active. If you delete your account, we
          delete your account details, partner details, preferences, notes and history within{" "}
          {SITE.deletionDays} days. Copies in encrypted backups are overwritten within a further 90 days.
        </p>
        <p>
          We may keep limited records for longer where the law requires it, or to resolve disputes and
          prevent abuse. Waitlist emails are kept until you unsubscribe or ask us to remove them. Guest
          accounts that are never upgraded may be deleted after a long period of inactivity.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Keeping your information safe",
    body: (
      <p>
        We use encryption in transit (HTTPS) for all communication between the app and our servers,
        store passwords and PINs only as secure hashes, keep sign-in tokens in your phone’s secure
        storage, and limit access to personal data to people who need it to run Loveping. No system is
        perfectly secure, so please use a strong password and keep your device locked.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    body: (
      <>
        <p>
          Depending on where you live — including under Nigeria’s Data Protection Act 2023 and the EU and
          UK GDPR — you have the right to:
        </p>
        <ul className="list-disc pl-5 space-y-2 marker:text-primary">
          <li>access the personal information we hold about you and get a copy of it;</li>
          <li>correct information that is wrong (most of it you can edit in the app under Profile);</li>
          <li>delete your account and personal information;</li>
          <li>object to or restrict certain processing, and withdraw consent at any time;</li>
          <li>complain to your local data protection authority (in Nigeria, the Nigeria Data Protection Commission).</li>
        </ul>
        <p>
          To use any of these rights, email {mail} or use our <A href="/contact/">contact form</A>. We may
          need to confirm it’s really you before acting on a request.
        </p>
      </>
    ),
  },
  {
    id: "delete-account",
    title: "Deleting your account",
    body: (
      <p>
        You can ask us to delete your Loveping account and all associated data at any time on our{" "}
        <A href="/delete-account/">delete your account</A> page, or by emailing {mail} from the address
        on your account. We’ll confirm once it’s done, within {SITE.deletionDays} days.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Loveping is for people aged {SITE.minimumAge} and over. We don’t knowingly collect information
        from anyone younger. If you believe a child under {SITE.minimumAge} has given us information,
        contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "international",
    title: "International transfers",
    body: (
      <p>
        Our service providers may store and process information in countries other than where you live,
        including the United States and the European Union. When we transfer information abroad, we rely
        on appropriate safeguards such as standard contractual clauses.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy as Loveping grows — for example when gift features launch. We’ll change
        the “last updated” date at the top, and for significant changes we’ll let you know in the app or
        by email before they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions, requests or concerns about your privacy? Email {mail} or reach us through our{" "}
        <A href="/contact/">contact page</A>. We’re happy to help.
      </p>
    ),
  },
];
