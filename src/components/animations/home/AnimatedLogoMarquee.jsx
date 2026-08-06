import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useInView, useReducedMotion } from "motion/react";

const AnimatedLogoMarquee = ({ logos, speed = 60 }) => {
  const x = useMotionValue(0);
  const wrapperRef = useRef(null);
  const firstSetRef = useRef(null);

  const [copies, setCopies] = useState(3);
  const [paused, setPaused] = useState(false);
  const [measuredSetWidth, setMeasuredSetWidth] = useState(0);

  const isInView = useInView(wrapperRef, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const measure = () => {
      const wrapWidth = wrapperRef.current?.offsetWidth || 0;
      const setWidth = firstSetRef.current?.offsetWidth || 0;
      if (wrapWidth && setWidth) {
        setCopies(Math.max(3, Math.ceil(wrapWidth / setWidth) + 2));
        setMeasuredSetWidth(setWidth);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [logos]);

  // Seamless infinite right-to-left
  useAnimationFrame((_, delta) => {
    if (!isInView || paused || reduceMotion || !measuredSetWidth) return;
    let nextX = x.get() - (speed * delta) / 1000;
    // Reset when one full set has scrolled past
    if (nextX <= -measuredSetWidth) nextX += measuredSetWidth;
    x.set(nextX);
  });

  if (!Array.isArray(logos) || logos.length === 0) return null;

  const renderSet = (setIndex) => (
    <div
      key={setIndex}
      ref={setIndex === 0 ? firstSetRef : null}
      aria-hidden={setIndex > 0}
      className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12"
    >
      {logos.map((logo, index) => (
        <div
          key={`${setIndex}-${index}`}
          className="w-28 sm:w-36 lg:w-40 h-12 flex-shrink-0 flex items-center justify-center"
        >
          <img
            src={logo}
            alt="Brand Logo"
            draggable={false}
            loading="lazy"
            className="max-w-[120px] sm:max-w-[130px] max-h-8 sm:max-h-9 object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className="w-full overflow-hidden marquee-fade select-none py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div style={{ x }} className="flex w-max items-center">
        {Array.from({ length: copies }, (_, i) => renderSet(i))}
      </motion.div>
    </div>
  );
};

export default AnimatedLogoMarquee;
