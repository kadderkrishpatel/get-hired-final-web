import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// Phone mockup + floating chips/job-card/avatars — enters as a staggered
// "pop" cascade on hover matching the reference video.
// 1. Phone slides up on page load.
// 2. When user hovers over the hero card container:
//    - Job card slides out of the phone to the left.
//    - Simultaneously, Card 2 slides up inside the phone.
//    - Staggered side chips pop into view.
// 3. When hover leaves, the card slides back inside the phone and chips hide.
const HeroVisual = ({ heroSection }) => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;

  const jobImages = [
    `${assetBaseUrl}/images/hero/Software_Eng.png`,
    // If you add more images later, they will cycle seamlessly:
    // `${assetBaseUrl}/images/hero/Software_Eng_2.png`,
  ];

  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cycle, setCycle] = useState(0);

  const intervalRef = useRef(null);

  useEffect(() => {
    // Detect viewport size for precise card offsets
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    setIsLoaded(true);

    // Start the infinite looping card process
    intervalRef.current = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, 4200);

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Card 1 (Job Card) slide-out parameters:
  // Starts centered exactly over the baked-in phone card, then slides out to the left and grows to full size.
  const card1Variants = {
    hidden: {
      opacity: 0,
      x: isMobile ? "18%" : "23%",
      y: isMobile ? "1.5%" : "2%",
      scale: isMobile ? 0.78 : 0.72,
    },
    visible: {
      opacity: 1,
      x: isMobile ? "18%" : "23%",
      y: isMobile ? "1.5%" : "2%",
      scale: isMobile ? 0.78 : 0.72,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
    slideOut: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const activeImage = jobImages[cycle % jobImages.length];
  const nextImage = jobImages[(cycle + 1) % jobImages.length];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-3xl mt-14 sm:mt-16 mx-auto aspect-[16/10]"
    >
      {/* Phone — center pe, base layer */}
      <motion.div
        initial={{ y: 140, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: 140, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[62%] sm:w-[46%] z-10"
      >
        <div className="relative [mask-image:linear-gradient(to_bottom,black_62%,transparent_96%)]">
          {/* Phone Mockup Frame */}
          <img
            src={`${assetBaseUrl}/images/hero/Mobile.png`}
            alt="Get Hired mobile app"
            className="w-full h-auto drop-shadow-[10px_4px_10px_rgba(10,0,0,0.10)]"
            draggable={false}
          />

          {/* Screen Overlay (Covers the baked Adobe & Discord cards, rendering the slide-up replacement instead) */}
          <div className="relative w-[90%] mx-auto mt-2 h-[80%] overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`inside-${cycle}`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0"
              >
                <img
                  src={nextImage}
                  alt="Job Card inside"
                  className="w-full h-auto drop-shadow-sm"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Card 1 — Slides out of the phone to the left (Looping Anim) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`float-${cycle}`}
          variants={card1Variants}
          initial="hidden"
          animate={isHovered ? "slideOut" : "visible"}
          exit={{ opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.6 } }}
          className="absolute left-[6%] sm:left-[6%] lg:left-[8%] top-[42%] z-30 w-[62%] sm:w-[46%] lg:w-[44%] max-w-[380px] text-left"
        >
          <div>
            <img
              src={activeImage}
              alt="Job Card"
              className="w-full h-auto drop-shadow-xl"
              draggable={false}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Companies Chip — phone ke upar-left, floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -60, y: 10 }}
        animate={isHovered ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 0, scale: 0.8, x: -60, y: 10 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isHovered ? 0.15 : 0 }}
        className="absolute left-[2%] sm:left-[6%] top-[20%] z-20 hidden sm:block w-[20%] max-w-[160px]"
      >
        <div>
          <img
            src={`${assetBaseUrl}/images/hero/Companies01.png`}
            alt="Companies"
            className="w-full h-auto drop-shadow-lg"
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Success Rate Chip — phone ke upar-right, floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 60, y: 10 }}
        animate={isHovered ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 0, scale: 0.8, x: 60, y: 10 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isHovered ? 0.3 : 0 }}
        className="absolute right-[2%] sm:right-[6%] top-[20%] z-20 hidden sm:block w-[20%] max-w-[160px]"
      >
        <div>
          <img
            src={`${assetBaseUrl}/images/hero/HeroCounterIMG.png`}
            alt="Success Rate"
            className="w-full h-auto drop-shadow-lg"
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Avatar Strip — phone ke niche-right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 60, y: 15 }}
        animate={isHovered ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 0, scale: 0.8, x: 60, y: 15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isHovered ? 0.45 : 0 }}
        className="absolute right-[8%] sm:right-[12%] top-[62%] z-30 hidden sm:block w-[16%] max-w-[110px]"
      >
        <div>
          <img
            src={`${assetBaseUrl}/images/hero/Profiles_img.png`}
            alt="Profiles"
            className="w-full h-auto drop-shadow-lg"
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroVisual;

