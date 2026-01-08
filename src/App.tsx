
import "./App.css";
import { motion } from "framer-motion";
import { FaSmile } from "react-icons/fa";

const icons = [
  {
    icon: "/icons/message.svg",
    style: "bg-purple-1A border-purple-1A lg:hover:shadow-[0px_4px_46px_0px_#A561FF33] transition-all duration-300",
    title: "message"
  },
  {
    icon: "/icons/call.svg",
    style: "bg-blue-1A border-blue-1A lg:hover:shadow-[0px_4px_46px_0px_#3BD1DC33] transition-all duration-300",
    title: "call"
  },
  {
    icon: "/icons/gift.svg",
    style: "bg-yellow-1A border-yellow-1A lg:hover:shadow-[0px_4px_46px_0px_#D7BA3833] transition-all duration-300",
    title: "gift"
  }
]

const heroImages = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
];

const marqueeImages = [...heroImages, ...heroImages];

const App = () => {
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

  return (
    <div className="h-screen bg-[#02231A] flex flex-col justify-between overflow-hidden overflow-y-hidden">
      <div
        className="header w-full flex items-center justify-center bg-[#02231A80] border-b border-[#48D96214] py-4 md:py-8"
        style={{
          borderBottomWidth: "0.5px"
        }}
      >
        <img
          src="/images/Logo.svg"
          alt="Loveping"
          loading="lazy"
          className="h-4 md:h-auto"
        />
      </div>

      <div className="w-full h-full flex-1 grow relative">
        <div className="px-6 h-full flex items-center justify-center pt-[40px] lg:pt-[90px]">
          <motion.div
            className="space-y-4 lg:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full bg-[#04281C] w-fit mx-auto"
              variants={itemVariants}
            >
              <div className="dot w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary" />
              <p className="uppercase text-xs md:text-sm font-medium text-white">
                Still in the kitchen
              </p>
            </motion.div>

            <motion.div className="" variants={itemVariants}>
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <h1 className="text-white text-xl md:text-2xl lg:text-[50px] font-semibold">
                  Never miss the right
                </h1>

                <div className={`group w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border-[0.74px] cursor-pointer ${icons[1].style}`}>
                  <img
                    src={icons[1].icon}
                    alt={icons[1].title}
                    className="size-4 lg:size-6 lg:group-hover:rotate-[15deg] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                <div className="moment-mask bg-primary rounded-sm px-1.5 md:px-3">
                  <h1 className="text-secondary text-xl md:text-2xl lg:text-[50px] font-semibold">
                    moment
                  </h1>
                </div>
                <div className={`group min-w-8 min-h-8 lg:min-w-12 lg:min-h-12 flex items-center justify-center rounded-full border-[0.74px] cursor-pointer ${icons[0].style}`}>
                  <img
                    src={icons[0].icon}
                    alt={icons[0].title}
                    className="size-4 lg:size-6 lg:group-hover:rotate-[-15deg] transition-all duration-300"
                  />
                </div>
                <div className={`group min-w-8 min-h-8 lg:min-w-12 lg:min-h-12 flex items-center justify-center rounded-full border-[0.74px] cursor-pointer ${icons[2].style}`}>
                  <img
                    src={icons[2].icon}
                    alt={icons[2].title}
                    className="size-4 lg:size-6 lg:group-hover:rotate-[-15deg] transition-all duration-300"
                  />
                </div>

                <h1 className="text-white text-xl md:text-2xl lg:text-[50px] font-semibold whitespace-nowrap">
                  to show love.
                </h1>
              </div>
            </motion.div>

            <motion.p
              className="text-sm lg:text-base font-normal text-[#909090] leading-[21px] text-center max-w-lg mx-auto"
              style={{
                letterSpacing: "-2%",
              }}
              variants={itemVariants}
            >
              Loveping uses AI-powered nudges to help couples send thoughtful messages and meaningful gifts — exactly when it matters.
            </motion.p>

            <motion.form className="" variants={itemVariants}>
              <div className="flex flex-col lg:flex-row items-center max-w-[410px] mx-auto gap-2">
                <input
                  className="max-w-[269px] lg:w-full h-10 px-4 border border-primary-1A text-white rounded-full text-sm font-normal"
                  placeholder="you@example.com"
                  required
                />

                <button
                  type="submit"
                  className="bg-primary text-secondary rounded-full px-6 h-10 flex items-center gap-2"
                >
                  <span className="whitespace-nowrap text-sm">Join Waitlist</span>
                  <FaSmile />
                </button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
      {/* <div className="flex-1 grow flex flex-col items-center justify-center">
      </div> */}
      <div className="relative top-[40px] lg:top-[90px] h-fit">
        <motion.div
          className="hero-image-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <motion.div
            className="flex items-center gap-4 [&>*:nth-child(even)]:mt-[100px]"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {marqueeImages.map((image, index) => (
              <MarqueImage
                key={index}
                image={image}
              />
            ))}
            {marqueeImages.map((image, index) => (
              <MarqueImage
                key={index}
                image={image}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


const MarqueImage = ({ image }: { image: string }) => {
  return (
    <motion.div
      className={`w-[238px] h-[259px] md:min-w-[337px] md:min-h-[336px]`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={image}
        className=""
        loading="lazy"
      />
    </motion.div>
  )
}


export default App;