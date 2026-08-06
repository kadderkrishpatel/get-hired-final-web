import { motion } from "motion/react";

const HeroClouds = () => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES || "";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Left Cloud */}
      <motion.img
        src={`${assetBaseUrl}/images/hero/Cloud01.png`}
        alt="Cloud Left"
        initial={{ x: "-30%", y: "20%", scale: 0.85, opacity: 0 }}
        animate={{ x: "0%", y: "0%", scale: 1, opacity: 0.95 }}
        transition={{
          duration: 1.2,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute -left-[10%] sm:left-0 bottom-0 w-[65%] max-w-[850px] h-auto object-contain"
        draggable={false}
      />

      {/* Right Cloud */}
      <motion.img
        src={`${assetBaseUrl}/images/hero/cloud02.png`}
        alt="Cloud Right"
        initial={{ x: "30%", y: "20%", scale: 0.85, opacity: 0 }}
        animate={{ x: "0%", y: "0%", scale: 1, opacity: 0.95 }}
        transition={{
          duration: 1.2,
          delay: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute -right-[10%] sm:right-0 bottom-0 w-[65%] max-w-[850px] h-auto object-contain"
        draggable={false}
      />

      {/* Center Cloud Blend Overlay (Ghul-mil jaane ke liye bottom white mist) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default HeroClouds;