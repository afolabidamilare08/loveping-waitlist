import { LuHandHeart, LuHeart, LuSmartphone, LuUser } from "react-icons/lu";
import { SITE } from "../config";
import { A, List } from "../Prose";
import type { Highlight, LegalSection } from "../LegalDoc";


const mail = <A href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</A>;


export const termsHighlights: Highlight[] = [
  {
    icon: <LuUser size={20} />,
    tone: "green",
    title: `${SITE.minimumAge}+ only`,
    text: `You need to be at least ${SITE.minimumAge} to use Loveping, and you’re responsible for your account.`,
  },
  {
    icon: <LuHeart size={20} />,
    tone: "pink",
    title: "Be kind",
    text: "Loveping is for showing love. No spam, harassment or harmful behaviour.",
  },
  {
    icon: <LuHandHeart size={20} />,
    tone: "purple",
    title: "Your words are yours",
    text: "You own the notes you write. You’re responsible for what you send.",
  },
  {
    icon: <LuSmartphone size={20} />,
    tone: "blue",
    title: "Nudges, not promises",
    text: "Suggestions and reminders help — the relationship magic is still all you.",
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Accepting these terms",
    body: (
      <>
        <p>
          These terms are an agreement between you and {SITE.name} about your use of the Loveping app,
          website and related services (together, “Loveping”). By creating an account, continuing as a
          guest or otherwise using Loveping, you agree to these terms and to our{" "}
          <A href="/privacy/">privacy policy</A>. If you don’t agree, please don’t use Loveping.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Who can use Loveping",
    body: (
      <p>
        You must be at least {SITE.minimumAge} years old, and old enough to agree to these terms where you
        live. By using Loveping you confirm that you meet these requirements.
      </p>
    ),
  },
  {
    id: "account",
    title: "Your account",
    body: (
      <List
        items={[
          "Give accurate information when you sign up and keep it up to date.",
          "Keep your password and app PIN private. You’re responsible for activity on your account.",
          "Guest accounts are tied to your device and have no email or password. If you log out, uninstall the app or lose your phone, a guest account can’t be recovered — create an account to keep your notes.",
          `Tell us straight away at ${SITE.supportEmail} if you think someone else has accessed your account.`,
        ]}
      />
    ),
  },
  {
    id: "using-loveping",
    title: "Using Loveping",
    body: (
      <>
        <p>
          Loveping is designed to help couples connect through nudges, love notes and remembering the
          moments that matter. We give you a personal, non-transferable right to use the app for that
          purpose. When you use Loveping, you agree not to:
        </p>
        <List
          items={[
            "use it to spam, harass, threaten, deceive or harm anyone;",
            "add information about someone you’re not in a relationship with, or without a good reason to believe they’d be comfortable with it;",
            "break the law, or infringe anyone’s rights;",
            "try to access other people’s accounts, our servers or data you’re not allowed to see;",
            "copy, reverse engineer, resell or interfere with the app, or use bots or scrapers on it.",
          ]}
        />
      </>
    ),
  },
  {
    id: "content",
    title: "Your content",
    body: (
      <>
        <p>
          You own the love notes and other content you create in Loveping, and you’re responsible for it,
          including what you choose to send to your partner. We don’t share your private notes, history or
          saved content with others.
        </p>
        <p>
          So we can run the service, you give us permission to store, process and display your content to
          you (for example, saving a note and showing it in your history). This permission ends when you
          delete the content or your account.
        </p>
      </>
    ),
  },
  {
    id: "suggestions",
    title: "Nudges and suggested messages",
    body: (
      <p>
        Loveping suggests messages, call ideas and reminders. They’re suggestions to help you — please read
        and edit them so they sound like you before sending. We work hard to get timing and content right,
        but we can’t guarantee that every nudge arrives at a particular time or suits every situation, and
        notifications depend on your device settings and network.
      </p>
    ),
  },
  {
    id: "gifts",
    title: "Gifts and third-party services",
    body: (
      <p>
        Gift features are coming soon. Some gift suggestions may link to third-party stores or services.
        Those are run by other companies under their own terms; Loveping isn’t responsible for their
        products, prices, delivery or transactions made outside the app. Sending messages through
        WhatsApp, iMessage or other apps is also governed by their terms.
      </p>
    ),
  },
  {
    id: "paid-features",
    title: "Paid features",
    body: (
      <p>
        Loveping is currently free. If we introduce paid features or subscriptions, we’ll show the price
        and terms clearly before you buy, and purchases will be handled through the App Store or Google
        Play under their payment and refund rules.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Our intellectual property",
    body: (
      <p>
        The Loveping name, logo, app design, suggested messages and other materials we provide belong to
        {" "}{SITE.name} and are protected by law. These terms don’t give you any rights to them beyond using
        the app as intended.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension and termination",
    body: (
      <>
        <p>
          You can stop using Loveping at any time and ask us to{" "}
          <A href="/delete-account/">delete your account</A>.
        </p>
        <p>
          We may suspend or close accounts that misuse the app, break these terms, or put other people or
          the service at risk. Where reasonable, we’ll tell you why and give you a chance to respond. We
          may also change or discontinue features, and will give notice of major changes where we can.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <p>
        Loveping is provided “as is” and “as available”. To the extent the law allows, we don’t make
        promises that it will always be available, error-free or meet every need, and we don’t give
        relationship, medical or professional advice. Nothing in these terms limits rights you have as a
        consumer that can’t be limited by law.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent the law allows, {SITE.name} isn’t liable for indirect or consequential losses, or for
        losses caused by your use of third-party apps or services, or by content you send. Our total
        liability to you for any claim relating to Loveping is limited to the greater of the amount you
        paid us in the 12 months before the claim or USD 50. This doesn’t limit liability for death or
        personal injury caused by negligence, fraud, or anything else that can’t be limited by law.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. We’ll change the “last updated” date at the top, and
        for important changes we’ll let you know in the app or by email. If you keep using Loveping after
        changes take effect, you accept the updated terms.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of {SITE.governingLaw}. If a dispute comes up, please contact
        us first — most things can be sorted out quickly. If we can’t resolve it, the courts of{" "}
        {SITE.governingLaw} will have jurisdiction, without affecting any right you have to bring a claim
        where you live.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about these terms? Email {mail} or use our <A href="/contact/">contact page</A>.
      </p>
    ),
  },
];
