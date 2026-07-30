import { motion } from "motion/react";

const HeroClouds = () => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Bottom-left cloud — bigger, slides in from bottom-left corner */}
      <motion.img
        src={`${assetBaseUrl}/images/hero/Cloud01.png`}
        alt=""
        initial={{ x: "-25%", y: "15%", opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.9 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="absolute left-0 bottom-0 w-[70%] max-w-[850px] h-auto object-contain"
        draggable={false}
      />

      {/* Bottom-right cloud — bigger, slides in from bottom-right corner */}
      <motion.img
        src={`${assetBaseUrl}/images/hero/cloud02.png`}
        alt=""
        initial={{ x: "25%", y: "15%", opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.9 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="absolute right-0 bottom-0 w-[70%] max-w-[850px] h-auto object-contain"
        draggable={false}
      />
    </div>
  );
};

export default HeroClouds;