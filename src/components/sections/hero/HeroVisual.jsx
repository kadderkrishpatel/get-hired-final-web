  import { useEffect, useState } from "react";
  import { motion, AnimatePresence } from "motion/react";

  const HeroVisual = () => {
    const assetBaseUrl = import.meta.env.VITE_IMAGES || "";

    const jobImages = [
      `${assetBaseUrl}/images/hero/Software_Eng.png`,
    ];

    const [cycle, setCycle] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCycle((prev) => prev + 1);
      }, 4500);
      return () => clearInterval(interval);
    }, []);

    const floatIdle = (yMax = 6, duration = 3.8, delay = 0) => ({
      animate: {
        y: [0, -yMax, 0],
      },
      transition: {
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      },
    });

    return (
      <div className="relative w-full max-w-3xl mt-8 sm:mt-12 mx-auto aspect-[16/10] sm:aspect-[16/9] select-none z-10">
        
        {/* 1. PHONE MOCKUP FRAME */}
        <motion.div
          initial={{ y: 140, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[65%] sm:w-[52%] lg:w-[48%] z-10"
        >
          <motion.div {...floatIdle(5, 4.0, 1.8)}>
            {/* Smooth Bottom Fade Mask on Phone Frame */}
            <div className="relative [mask-image:linear-gradient(to_bottom,black_50%,transparent_95%)] [-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent_95%)]">
              <img
                src={`${assetBaseUrl}/images/hero/Mobile.png`}
                alt="Get Hired Mobile"
                className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
                draggable={false}
              />

              {/* Inner Mobile Screen Content */}
              <div className="absolute top-[6.8%] left-[5.5%] w-[89%] h-[82%] overflow-hidden rounded-[24px]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`inner-${cycle}`}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
                    className="absolute inset-0 w-full"
                  >
                    {/* <img
                      src={jobImages[cycle % jobImages.length]}
                      alt="Screen Content"
                      className="w-full h-auto object-top"
                      draggable={false}
                    /> */}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>


        {/* 2. FLOATING CARDS */}

        {/* Software Engineer Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, x: -40, y: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9, ease: [0.34, 1.4, 0.64, 1] }}
          className="absolute left-[8%] sm:left-[14%] lg:left-[16%] top-[30%] sm:top-[34%] z-30 w-[52%] sm:w-[44%] max-w-[360px]"
        >
          <motion.div {...floatIdle(8, 3.6, 1.8)}>
            <img
              src={jobImages[cycle % jobImages.length]}
              alt="Software Engineer Card"
              className="w-full h-auto mt-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] rounded-2xl"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* Companies Chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: -30, y: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.34, 1.4, 0.64, 1] }}
          className="absolute left-[5%] sm:left-[10%] lg:left-[14%] top-[10%] sm:top-[12%] z-30 w-[24%] sm:w-[19%] max-w-[155px]"
        >
          <motion.div {...floatIdle(6, 3.2, 1.8)}>
            <img
              src={`${assetBaseUrl}/images/hero/Companies01.png`}
              alt="Companies"
              className="w-full h-auto drop-shadow-xl"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* 92% Success Rate Chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 30, y: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.34, 1.4, 0.64, 1] }}
          className="absolute right-[5%] sm:right-[10%] lg:right-[14%] top-[10%] sm:top-[12%] z-30 w-[24%] sm:w-[19%] max-w-[155px]"
        >
          <motion.div {...floatIdle(7, 4.0, 1.8)}>
            <img
              src={`${assetBaseUrl}/images/hero/HeroCounterIMG.png`}
              alt="Success Rate"
              className="w-full h-auto drop-shadow-xl"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* Avatars Strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 30, y: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.34, 1.4, 0.64, 1] }}
          className="absolute right-[12%] sm:right-[18%] lg:right-[22%] top-[54%] sm:top-[58%] z-30 w-[18%] sm:w-[14%] max-w-[115px]"
        >
          <motion.div {...floatIdle(5, 3.4, 1.8)}>
            <img
              src={`${assetBaseUrl}/images/hero/Profiles_img.png`}
              alt="Profiles"
              className="w-full h-auto drop-shadow-xl"
              draggable={false}
            />
          </motion.div>
        </motion.div>

      </div>
    );
  };

  export default HeroVisual;