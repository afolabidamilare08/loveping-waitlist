import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import {
  LuArrowRight,
  LuBug,
  LuCircleHelp,
  LuClock,
  LuHandshake,
  LuHeart,
  LuKeyRound,
  LuLightbulb,
  LuLoaderCircle,
  LuMail,
  LuSend,
  LuTrash2,
} from "react-icons/lu";
import { toast } from "../../components";
import { sendContactMessage } from "../api";
import { SITE } from "../config";
import { Card, IconChip, Mark, PageHero } from "../ui";

const TOPICS = [
  { id: "General question", icon: <LuCircleHelp size={16} /> },
  { id: "Account & sign-in", icon: <LuKeyRound size={16} /> },
  { id: "Bug or problem", icon: <LuBug size={16} /> },
  { id: "Idea or feedback", icon: <LuLightbulb size={16} /> },
  { id: "Partnerships & press", icon: <LuHandshake size={16} /> },
] as const;

const inputCls =
  "w-full rounded-2xl bg-white/[0.03] border border-[#48D96233] px-4 text-white placeholder:text-[#909090] text-[15px] focus:outline-none focus:border-primary transition-colors";

const ContactPage = () => {
  const [topic, setTopic] = useState<string>(TOPICS[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    try {
      await sendContactMessage({ name, email, topic, message });
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "We couldn't send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSent(false);
    setMessage("");
  };

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            We’d <Mark>love</Mark> to hear from you.
          </>
        }
        lead="Questions, ideas, a bug that’s getting in the way of the romance — send us a note and a real person on the Loveping team will reply."
      />

      <div className="mx-auto max-w-6xl px-5 md:px-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <Card className="p-6 md:p-10 relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[420px] flex flex-col items-center justify-center text-center gap-5"
                role="status"
              >
                <motion.div
                  initial={{ scale: 0.4, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 12 }}
                  className="relative w-20 h-20 rounded-full bg-primary-1A border border-primary-1A flex items-center justify-center text-primary"
                >
                  <LuHeart size={34} fill="currentColor" />
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#FA2E2E] border-[3px] border-secondary" />
                </motion.div>
                <h2 className="text-white text-2xl font-semibold">Message sent!</h2>
                <p className="text-[#9CA9A5] max-w-sm leading-7">
                  Thanks, {name.split(" ")[0] || "friend"}. We’ve got your note and will reply to{" "}
                  <span className="text-white">{email}</span> {SITE.replyTime}.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-2 h-11 px-6 rounded-full border border-[#48D96233] text-primary text-sm font-semibold hover:bg-primary-1A transition cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-7">
                <fieldset>
                  <legend className="text-white font-medium mb-3">What’s it about?</legend>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => {
                      const on = topic === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setTopic(t.id)}
                          className={`h-10 px-4 rounded-full text-sm font-medium border inline-flex items-center gap-2 transition-colors cursor-pointer ${
                            on ? "bg-primary text-secondary border-primary" : "text-white/80 border-[#48D96214] bg-white/[0.02] hover:border-[#48D96233]"
                          }`}
                        >
                          {t.icon}
                          {t.id}
                        </button>
                      );
                    })}
                    <a
                      href="/delete-account/"
                      className="h-10 px-4 rounded-full text-sm font-medium border inline-flex items-center gap-2 text-[#FA7070] border-[#FA2E2E33] bg-[#FA2E2E0D] hover:bg-[#FA2E2E1A] transition-colors"
                    >
                      <LuTrash2 size={16} /> Delete my account
                    </a>
                  </div>
                </fieldset>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm text-white font-medium">Your name</label>
                    <input id="name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={`${inputCls} h-12`} placeholder="Ada Okafor" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm text-white font-medium">Email</label>
                    <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} h-12`} placeholder="you@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm text-white font-medium">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputCls} py-3.5 resize-y min-h-[160px]`}
                    placeholder={
                      topic === "Bug or problem"
                        ? "What happened, and what were you doing just before? Your phone model helps too."
                        : "Tell us how we can help…"
                    }
                  />
                  <p className="text-xs text-[#909090] text-right tabular-nums">{message.length}/2000</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <p className="text-xs text-[#909090] leading-5 max-w-sm">
                    We’ll only use your details to reply. See our{" "}
                    <a href="/privacy/" className="text-primary underline underline-offset-2">privacy policy</a>.
                  </p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="h-12 px-7 rounded-full bg-primary text-secondary font-semibold text-sm inline-flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-60 transition cursor-pointer"
                  >
                    {sending ? <LuLoaderCircle className="animate-spin" size={18} /> : <LuSend size={16} />}
                    {sending ? "Sending…" : "Send message"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>

        <aside className="space-y-4" aria-label="Other ways to get help">
          <Card className="p-6 space-y-4">
            <IconChip tone="green"><LuMail size={20} /></IconChip>
            <div>
              <p className="text-white font-semibold">Email us</p>
              <a href={`mailto:${SITE.supportEmail}`} className="text-primary text-sm underline underline-offset-4 break-all">{SITE.supportEmail}</a>
            </div>
          </Card>
          <Card className="p-6 space-y-4">
            <IconChip tone="blue"><LuClock size={20} /></IconChip>
            <div>
              <p className="text-white font-semibold">Reply time</p>
              <p className="text-sm text-[#9CA9A5]">We usually reply {SITE.replyTime}.</p>
            </div>
          </Card>
          <Card className="p-6 space-y-4">
            <IconChip tone="purple"><LuCircleHelp size={20} /></IconChip>
            <div className="space-y-2">
              <p className="text-white font-semibold">Quick answers</p>
              <p className="text-sm text-[#9CA9A5]">Notifications, PIN, guest accounts and more.</p>
              <a href="/faq/" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                Browse FAQs <LuArrowRight size={14} />
              </a>
            </div>
          </Card>
          <Card className="p-6 space-y-4">
            <IconChip tone="yellow"><LuHeart size={20} /></IconChip>
            <div>
              <p className="text-white font-semibold">Already using Loveping?</p>
              <p className="text-sm text-[#9CA9A5]">You can also reach us from the app: Profile → Support.</p>
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
};

export default ContactPage;
