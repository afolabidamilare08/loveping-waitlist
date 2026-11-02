import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { LuCircleAlert, LuCircleCheck, LuHourglass, LuLoaderCircle, LuMail, LuTrash2 } from "react-icons/lu";
import { toast } from "../../components";
import { sendContactMessage } from "../api";
import { SITE } from "../config";
import { Card, IconChip, Mark, PageHero } from "../ui";

const DELETED = [
  "Your account: name, email address, password and PIN",
  "Everything about your partner: name, birthday, anniversary, love languages",
  "Your love notes, saved messages and nudge history",
  "Your preferences, notification token and activity records",
];

const KEPT = [
  "Messages you sent our support team, for up to 12 months, in case you contact us again",
  "Encrypted backups, which are overwritten within 90 days",
  "Anything we must keep by law (for example to prevent fraud)",
];

const REASONS = [
  "I’m taking a break",
  "I don’t use it enough",
  "Something isn’t working",
  "Privacy concerns",
  "Other",
];

const inputCls =
  "w-full rounded-2xl bg-white/[0.03] border border-[#48D96233] px-4 text-white placeholder:text-[#909090] text-[15px] focus:outline-none focus:border-primary transition-colors";

const DeleteAccountPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState(REASONS[0]);
  const [confirm, setConfirm] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !confirm) return;
    setSending(true);
    try {
      await sendContactMessage({
        name: name.trim() || "Loveping user",
        email,
        topic: "Account deletion request",
        message: `Please permanently delete the Loveping account registered to ${email.trim()} and all its data. Reason: ${reason}.`,
      });
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "We couldn't send your request. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Delete your account"
        title={
          <>
            Leaving Loveping? We’ll <Mark>erase</Mark> everything.
          </>
        }
        lead={`Request deletion of your Loveping account and all the data linked to it. We’ll confirm by email and complete it within ${SITE.deletionDays} days.`}
      />

      <div className="mx-auto max-w-6xl px-5 md:px-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12 items-start">
        <div className="space-y-6">
          <Card className="p-6 md:p-8">
            <h2 className="text-white text-xl font-semibold mb-6">How it works</h2>
            <ol className="space-y-6">
              {[
                { icon: <LuMail size={18} />, tone: "green" as const, t: "Send your request", d: "Use the form with the email address on your Loveping account, or email us from that address." },
                { icon: <LuCircleCheck size={18} />, tone: "blue" as const, t: "We confirm it’s you", d: "We may reply to that address to confirm before deleting anything, so nobody else can delete your account." },
                { icon: <LuHourglass size={18} />, tone: "purple" as const, t: `Deleted within ${SITE.deletionDays} days`, d: "Your account and data are permanently removed and we email you when it’s done. This can’t be undone." },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <IconChip tone={s.tone}>{s.icon}</IconChip>
                  <div>
                    <p className="text-white font-medium">
                      <span className="text-primary tabular-nums mr-2">{i + 1}.</span>
                      {s.t}
                    </p>
                    <p className="text-sm text-[#9CA9A5] leading-6 mt-1">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <LuTrash2 className="text-[#FA7070]" size={18} /> What we delete
              </h3>
              <ul className="space-y-3 text-sm text-[#9CA9A5] leading-6">
                {DELETED.map((d) => (
                  <li key={d} className="flex gap-2"><span className="text-primary">•</span>{d}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <LuHourglass className="text-yellow" size={18} /> What we keep, and for how long
              </h3>
              <ul className="space-y-3 text-sm text-[#9CA9A5] leading-6">
                {KEPT.map((d) => (
                  <li key={d} className="flex gap-2"><span className="text-yellow">•</span>{d}</li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="p-6 flex gap-4">
            <IconChip tone="yellow"><LuCircleAlert size={18} /></IconChip>
            <div className="text-sm text-[#9CA9A5] leading-6">
              <p className="text-white font-medium mb-1">Using a guest account?</p>
              Guest accounts have no email address. Uninstalling Loveping or logging out of a guest account
              removes your access to it; to have its data erased too, tell us in the form roughly when you
              started using Loveping and your partner’s first name, and we’ll find and delete it.
            </div>
          </Card>
        </div>

        <Card className="p-6 md:p-8 lg:sticky lg:top-28">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div key="done" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 py-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary-1A text-primary flex items-center justify-center">
                  <LuCircleCheck size={30} />
                </div>
                <h2 className="text-white text-xl font-semibold">Request received</h2>
                <p className="text-sm text-[#9CA9A5] leading-6">
                  We’ll email <span className="text-white">{email}</span> to confirm, then delete your account
                  within {SITE.deletionDays} days. We’re sorry to see you go.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} className="space-y-5" exit={{ opacity: 0 }}>
                <div>
                  <h2 className="text-white text-xl font-semibold">Request deletion</h2>
                  <p className="text-sm text-[#9CA9A5] mt-1">This permanently deletes your account.</p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="del-email" className="block text-sm text-white font-medium">Account email</label>
                  <input id="del-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} h-12`} placeholder="The email you signed up with" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="del-name" className="block text-sm text-white font-medium">
                    Name <span className="text-[#909090] font-normal">(optional)</span>
                  </label>
                  <input id="del-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={`${inputCls} h-12`} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="del-reason" className="block text-sm text-white font-medium">
                    Why are you leaving? <span className="text-[#909090] font-normal">(optional)</span>
                  </label>
                  <select id="del-reason" value={reason} onChange={(e) => setReason(e.target.value)} className={`${inputCls} h-12 appearance-none cursor-pointer`}>
                    {REASONS.map((r) => (
                      <option key={r} value={r} className="bg-secondary">{r}</option>
                    ))}
                  </select>
                </div>
                <label className="flex gap-3 items-start text-sm text-[#C4CDCA] leading-6 cursor-pointer">
                  <input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} className="mt-1 w-4 h-4 accent-[#48D962] shrink-0" required />
                  I understand my account, partner details and love notes will be permanently deleted and can’t be recovered.
                </label>
                <button
                  type="submit"
                  disabled={sending || !confirm}
                  className="w-full h-12 rounded-full bg-[#DB1212] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 transition cursor-pointer disabled:cursor-not-allowed"
                >
                  {sending ? <LuLoaderCircle className="animate-spin" size={18} /> : <LuTrash2 size={16} />}
                  {sending ? "Sending request…" : "Request account deletion"}
                </button>
                <p className="text-xs text-[#909090] text-center">
                  Or email <a href={`mailto:${SITE.supportEmail}?subject=Delete%20my%20Loveping%20account`} className="text-primary underline underline-offset-2">{SITE.supportEmail}</a>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </>
  );
};

export default DeleteAccountPage;
