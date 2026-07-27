import { motion } from "framer-motion";
import { useState } from "react";
import { FaSmile, FaHeart, FaBell, FaGift, FaComments, FaArrowRight, FaQuoteLeft, FaInstagram, FaTelegramPlane, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuLoaderCircle } from "react-icons/lu";

const icons = [
  {
    icon: "/icons/message.svg",
    style: "bg-purple-1A border-purple-1A lg:hover:shadow-[0px_4px_46px_0px_#A561FF33] transition-all duration-300",
    title: "message",
  },
  {
    icon: "/icons/call.svg",
    style: "bg-blue-1A border-blue-1A lg:hover:shadow-[0px_4px_46px_0px_#3BD1DC33] transition-all duration-300",
    title: "call",
  },
  {
    icon: "/icons/gift.svg",
    style: "bg-yellow-1A border-yellow-1A lg:hover:shadow-[0px_4px_46px_0px_#D7BA3833] transition-all duration-300",
    title: "gift",
  },
];

const heroImages = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
];

const marqueeImages = [...heroImages, ...heroImages];

const features = [
  {
    icon: FaBell,
    title: "AI-Powered Reminders",
    description:
      "We use AI to generate timely relationship reminders so you never miss an anniversary, birthday, or simple check-in again.",
    color: "text-[#3BD1DC]",
    bg: "bg-blue-1A",
    border: "border-blue-1A",
  },
  {
    icon: FaComments,
    title: "AI Message Generation",
    description:
      "Not sure what to say? Our AI generates personalized message ideas based on your partner's mood, your history, and the occasion.",
    color: "text-[#A561FF]",
    bg: "bg-purple-1A",
    border: "border-purple-1A",
  },
  {
    icon: FaGift,
    title: "Meaningful Gift Ideas",
    description:
      "From spontaneous surprises to planned presents, AI-curated gift suggestions that show you truly care.",
    color: "text-[#D7BA38]",
    bg: "bg-yellow-1A",
    border: "border-yellow-1A",
  },
  {
    icon: FaHeart,
    title: "Relationship Insights",
    description:
      "Track your love language, see patterns, and discover ways to deepen your connection over time.",
    color: "text-[#48D962]",
    bg: "bg-primary/10",
    border: "border-primary/10",
  },
];

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Join the waitlist and tell us a little about your relationship.",
  },
  {
    number: "02",
    title: "Connect",
    description: "Link with your partner and let Loveping learn your unique dynamic.",
  },
  {
    number: "03",
    title: "AI-Generated Nudges",
    description: "Receive timely AI-generated suggestions for messages, gifts, and thoughtful gestures delivered right when they matter.",
  },
];

const testimonials = [
  {
    quote:
      "Loveping helped me remember our 6-month anniversary. My girlfriend cried happy tears. This app is magic.",
    author: "Alex K.",
    role: "Beta Tester",
  },
  {
    quote:
      "I'm terrible at gift-giving. Loveping's suggestions made me look like a pro. My partner couldn't believe I thought of it myself.",
    author: "Sam T.",
    role: "Beta Tester",
  },
  {
    quote:
      "The message prompts are surprisingly spot-on. It's like the app knows exactly what my partner needs to hear.",
    author: "Jordan M.",
    role: "Beta Tester",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const SectionHeader = ({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) => (
  <motion.div
    className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
  >
    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium border border-primary/20">
      {label}
    </span>
    <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
      {title}
    </h2>
    <p className="text-sm md:text-base text-[#909090] leading-relaxed">{description}</p>
  </motion.div>
);

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = import.meta.env.VITE_AUTH_TOKEN;

const App = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok && response.status !== 409) {
        throw new Error(data?.message || "Request failed");
      }

      if (data?.is_existing) {
        // toast.repeated(data.message);
      } else {
        // toast.success(data.message || "Successfully added to waitlist");
      }
      setEmail("");
    } catch {
      // toast.error("Failed to add to waitlist - please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#02231A] text-white font-['Inter',sans-serif] overflow-x-hidden">
      {/* ============================== */}
      {/* NAV */}
      {/* ============================== */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#02231A80] backdrop-blur-[50px] border-b border-[#48D96214]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-20 flex items-center justify-between gap-1.5">
          <img src="/images/Logo.svg" alt="Loveping" className="h-3 md:h-5 shrink-0" />
          <div className="flex items-center gap-1.5 md:gap-3">
            <a
              href="#waitlist"
              className="bg-primary text-secondary text-xs md:text-sm font-medium rounded-full px-3 md:px-5 py-1.5 md:py-2 hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Get Started
            </a>
            <a
              href="http://t.me/Love_ping_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 border border-primary/30 text-primary text-xs md:text-sm font-medium rounded-full px-3 md:px-5 py-1.5 md:py-2 hover:bg-primary/10 transition-all whitespace-nowrap"
            >
              <FaTelegramPlane className="text-xs md:text-sm" /> Test
            </a>
          </div>
        </div>
      </nav>

      {/* ============================== */}
      {/* HERO */}
      {/* ============================== */}
      <section className="min-h-screen flex flex-col justify-center pt-14 md:pt-24">
        <div className="px-4 md:px-6 flex-1 flex items-center justify-center pt-8 md:pt-16">
          <motion.div
            className="space-y-5 lg:space-y-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="sr-only">Never miss the right moment to show love.</h1>

            <motion.div
              className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#04281C] w-fit mx-auto"
              variants={itemVariants}
            >
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary animate-pulse" />
              <p className="uppercase text-[10px] md:text-sm font-medium text-white">
                Still in the kitchen, join the waitlist
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                <span className="text-white text-[clamp(1.25rem,5vw,3.125rem)] font-semibold">
                  Never miss the right
                </span>
                <div
                  className={`group w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full border-[0.74px] cursor-pointer ${icons[1].style}`}
                >
                  <img
                    src={icons[1].icon}
                    alt={icons[1].title}
                    className="size-4 md:size-6 lg:group-hover:rotate-[15deg] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                <div className="bg-primary rounded-sm px-1.5 md:px-3">
                  <span className="text-secondary text-[clamp(1.25rem,5vw,3.125rem)] font-semibold">
                    moment
                  </span>
                </div>
                <div
                  className={`group min-w-8 min-h-8 md:min-w-12 md:min-h-12 flex items-center justify-center rounded-full border-[0.74px] cursor-pointer ${icons[0].style}`}
                >
                  <img
                    src={icons[0].icon}
                    alt={icons[0].title}
                    className="size-4 md:size-6 lg:group-hover:rotate-[-15deg] transition-all duration-300"
                  />
                </div>
                <div
                  className={`group min-w-8 min-h-8 md:min-w-12 md:min-h-12 flex items-center justify-center rounded-full border-[0.74px] cursor-pointer ${icons[2].style}`}
                >
                  <img
                    src={icons[2].icon}
                    alt={icons[2].title}
                    className="size-4 md:size-6 lg:group-hover:rotate-[-15deg] transition-all duration-300"
                  />
                </div>

                <span className="text-white text-[clamp(1.25rem,5vw,3.125rem)] font-semibold whitespace-nowrap">
                  to show love.
                </span>
              </div>
            </motion.div>

            <motion.p
              className="text-sm lg:text-base font-normal text-[#909090] leading-[21px] text-center max-w-lg mx-auto"
              variants={itemVariants}
            >
              Loveping uses AI to generate reminders, messages, and gift suggestions helping
              couples stay connected exactly when it matters.
            </motion.p>

            <motion.form variants={itemVariants} onSubmit={handleSubmit} id="waitlist">
              <div className="flex flex-col md:flex-row items-center max-w-[410px] mx-auto gap-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="max-w-[269px] lg:w-full h-10 px-4 border border-primary-1A bg-transparent text-white rounded-full text-sm font-normal focus:outline-none focus-visible:ring-primary focus-visible:ring-[1px] transition-all placeholder:text-[#48D96240]"
                  placeholder="you@example.com"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-secondary rounded-full px-6 h-10 flex items-center min-w-[133px] justify-center cursor-pointer hover:opacity-90 transition-opacity"
                >
                  {loading ? (
                    <LuLoaderCircle className="animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-medium">
                      Get Started <FaSmile />
                    </span>
                  )}
                </button>
              </div>
            </motion.form>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="relative mt-8 md:mt-12 pb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#02231A] z-10 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="flex items-center gap-4 [&>*:nth-child(even)]:mt-[60px] md:[&>*:nth-child(even)]:mt-[100px]"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                },
              }}
            >
              {[...marqueeImages, ...marqueeImages].map((image, index) => (
                <motion.div
                  key={index}
                  className="w-[180px] h-[200px] md:min-w-[240px] md:min-h-[260px] lg:min-w-[280px] lg:min-h-[300px] shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={image} alt="" className="w-full h-full object-cover rounded-xl" loading="lazy" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================== */}
      {/* FEATURES */}
      {/* ============================== */}
      <section className="px-6 py-20 md:py-32 max-w-6xl mx-auto">
        <SectionHeader
          label="Features"
          title="Everything you need to nurture your relationship"
          description="Loveping combines AI with relationship psychology to help you be more thoughtful, more often."
        />
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className={`p-6 md:p-8 rounded-2xl border ${feature.border} ${feature.bg} hover:scale-[1.02] transition-all duration-300 cursor-default`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className={`w-12 h-12 rounded-full ${feature.bg} border ${feature.border} flex items-center justify-center mb-4`}
                >
                  <Icon className={`text-xl ${feature.color}`} />
                </div>
                <h3 className="text-lg md:text-xl text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-[#909090] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ============================== */}
      {/* HOW IT WORKS */}
      {/* ============================== */}
      <section className="px-6 py-20 md:py-32 bg-[#04281C]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="How It Works"
            title="Three simple steps to better love"
            description="Getting started is easy. Loveping does the heavy lifting."
          />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t border-dashed border-primary/20" />
                )}
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                  <span className="text-primary text-2xl font-bold">{step.number}</span>
                </div>
                <h3 className="text-lg md:text-xl text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-sm md:text-base text-[#909090] leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* TESTIMONIALS */}
      {/* ============================== */}
      <section className="px-6 py-20 md:py-32 max-w-6xl mx-auto">
        <SectionHeader
          label="Testimonials"
          title="What early users are saying"
          description="Real feedback from couples who've tried Loveping."
        />
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              className="p-6 md:p-8 rounded-2xl border border-primary/10 bg-[#04281C]/50 hover:border-primary/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <FaQuoteLeft className="text-primary/40 text-xl mb-4" />
              <p className="text-sm md:text-base text-[#B0B0B0] leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="text-white text-sm font-semibold">{t.author}</p>
                <p className="text-[#909090] text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================== */}
      {/* WAITLIST CTA */}
      {/* ============================== */}
      <section className="px-6 py-20 md:py-32">
        <motion.div
          className="max-w-2xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium border border-primary/20">
            Get Early Access
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
            Ready to never miss
            <br />
            the right moment?
          </h2>
          <p className="text-sm md:text-base text-[#909090] max-w-md mx-auto">
            Join thousands of couples who are already using Loveping to strengthen their
            relationships.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center max-w-[410px] mx-auto gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="max-w-[269px] lg:w-full h-10 px-4 border border-primary-1A bg-transparent text-white rounded-full text-sm font-normal focus:outline-none focus-visible:ring-primary focus-visible:ring-[1px] transition-all placeholder:text-[#48D96240]"
              placeholder="you@example.com"
              required
            />
            <button
              type="submit"
              className="bg-primary text-secondary rounded-full px-6 h-10 flex items-center min-w-[133px] justify-center cursor-pointer hover:opacity-90 transition-opacity"
            >
              {loading ? (
                <LuLoaderCircle className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2 text-sm font-medium">
                  Get Started <FaArrowRight />
                </span>
              )}
            </button>
          </form>
        </motion.div>
      </section>

      {/* ============================== */}
      {/* FOOTER */}
      {/* ============================== */}
      <footer className="border-t border-[#48D96214] py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <img src="/images/Logo.svg" alt="Loveping" className="h-5" />
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-all"
              >
                <FaInstagram className="text-primary text-sm" />
              </a>
              <a
                href="https://x.com/GetLoveping"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-all"
              >
                <FaXTwitter className="text-primary text-sm" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-all"
              >
                <FaTiktok className="text-primary text-sm" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#48D96214] text-center">
            <p className="text-[#909090] text-xs md:text-sm">
              &copy; {new Date().getFullYear()} Loveping. All rights reserved. Made with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
