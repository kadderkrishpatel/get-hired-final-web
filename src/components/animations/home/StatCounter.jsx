"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// ============================================================
// Odometer Counter FX (Uber / Stripe Style)
// Smooth, slow, elegant vertical digit wheel counter.
// Each digit rolls at a luxurious speed with spring deceleration.
// ============================================================

// 2 full cycles of digits 0-9 (0..9, 0..9) = 20 items
const DIGIT_CYCLES = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];
const TOTAL_ITEMS = DIGIT_CYCLES.length; // 20

const OdometerDigit = ({ digit, colIndex, inView }) => {
  const targetDigit = parseInt(digit, 10);

  if (isNaN(targetDigit)) {
    return <span className="inline-block">{digit}</span>;
  }

  // Spin 1 full cycle (10 steps) + land on targetDigit in the 2nd cycle
  const targetIndex = 10 + targetDigit;
  const targetYPercent = (targetIndex / TOTAL_ITEMS) * 100;

  return (
    <span className="inline-block overflow-hidden h-[1.05em] relative leading-none align-baseline">
      <motion.span
        initial={{ y: "0%" }}
        animate={inView ? { y: `-${targetYPercent}%` } : { y: "0%" }}
        transition={{
          type: "spring",
          stiffness: 18, // Slower, silky smooth spring roll
          damping: 14,   // Soft, graceful deceleration
          mass: 1.15,    // Luxurious smooth weight feel
          delay: 0.15 + colIndex * 0.18, // Clear staggered timing per digit wheel
        }}
        className="flex flex-col leading-none"
      >
        {DIGIT_CYCLES.map((num, i) => (
          <span
            key={i}
            className="h-[1.05em] flex items-center justify-center select-none"
          >
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
};

const StatCounter = ({ value, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  const strValue = String(value ?? "");
  const match = strValue.match(/^([^0-9]*)(\d+)(.*)$/);

  if (!match || reduceMotion) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const prefix = match[1];
  const digitsStr = match[2];
  const suffix = match[3];

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 25, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 25, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 60, damping: 14 }}
      className={`inline-flex items-baseline leading-none font-variant-numeric-tabular ${className}`}
    >
      {prefix && <span className="inline-block">{prefix}</span>}
      {digitsStr.split("").map((digitChar, colIdx) => (
        <OdometerDigit
          key={colIdx}
          digit={digitChar}
          colIndex={colIdx}
          inView={inView}
        />
      ))}
      {suffix && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 12,
            delay: 0.2 + digitsStr.length * 0.18,
          }}
          className="inline-block"
        >
          {suffix}
        </motion.span>
      )}
    </motion.span>
  );
};

export default StatCounter;