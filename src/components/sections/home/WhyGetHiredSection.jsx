import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useReducedMotion, useInView } from "motion/react";
import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import Reveal from "../../animations/Reveal";
import {
  fadeDown,
  petalUp,
  staggerContainer,
  VIEWPORT_ONCE,
} from "../../animations/motionVariants";

const WhyGetHiredSection = () => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;
  const whySection = useArrayTranslation("why_section");
  const whyCards = useArrayTranslation("why_cards");
  const reduceMotion = useReducedMotion();

  // ---- Hover-activated auto-slide (paused by default, slides while
  // the row is hovered) — same seamless-loop technique as the brands
  // marquee, just inverted: idle = still, hover = sliding. ----
  const x = useMotionValue(0);
  const wrapperRef = useRef(null);
  const firstSetRef = useRef(null);
  const [copies, setCopies] = useState(2);
  const [sliding, setSliding] = useState(true);
  const [dimensions, setDimensions] = useState({ wrapWidth: 0, setWidth: 0 });
  const isDraggingRef = useRef(false);
  const isInView = useInView(wrapperRef, { amount: 0.1 });

  useLayoutEffect(() => {
    const measure = () => {
      const wrapWidth = wrapperRef.current?.offsetWidth || 0;
      const setWidth = firstSetRef.current?.offsetWidth || 0;
      if (wrapWidth && setWidth) {
        setDimensions((prev) => {
          if (prev.wrapWidth === wrapWidth && prev.setWidth === setWidth) {
            return prev;
          }
          return { wrapWidth, setWidth };
        });
        setCopies((prev) => {
          const next = Math.max(2, Math.ceil(wrapWidth / setWidth) + 1);
          return prev === next ? prev : next;
        });
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [whyCards]);

  useAnimationFrame((time, delta) => {
    if (!sliding || reduceMotion || isDraggingRef.current || !isInView) return;
    const setWidth = dimensions.setWidth || firstSetRef.current?.offsetWidth;
    if (!setWidth) return;
    let next = x.get() - (60 * delta) / 1000; // 60px/s
    next = ((next % setWidth) - setWidth) % setWidth;
    x.set(next);
  });

  const cardsArray = Array.isArray(whyCards) ? whyCards : [];

  const renderCardSet = (setIndex) => (
    <div
      key={setIndex}
      ref={setIndex === 0 ? firstSetRef : null}
      aria-hidden={setIndex > 0}
      className="flex gap-5 pr-5"
    >
      {cardsArray.map((card, index) => (
        <motion.div
          variants={petalUp}
          custom={index}
          key={`${setIndex}-${card.title}`}
          className="w-[300px] sm:w-[350px] lg:w-[370px] min-h-[290px] sm:min-h-[320px] shrink-0
          rounded-2xl bg-white/[0.08] backdrop-blur-[10px] border border-white/15
          p-6 sm:p-8 flex flex-col justify-between gap-8
          transition-all duration-300 hover:bg-white/[0.14]"
        >
          <h3 className="text-white text-lg sm:text-xl font-semibold font-display leading-6 sm:leading-7">
            {card.title}
          </h3>
          <p className="text-white text-sm sm:text-base font-normal font-display leading-6">
            {card.description}
          </p>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="about" className=" max-w-[1400px] mx-auto px-5 py-[120px] scroll-mt-20">
      <Reveal className="relative max-w-8xl mx-auto rounded-[20px] overflow-hidden bg-navy-deep">
        {/* BACKGROUND IMAGE (dynamic path from en.json) */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${`${assetBaseUrl}${whySection?.backgroundImage}`})`,
          }}
        />

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />

        <div className="relative px-6 sm:px-10 pt-12 sm:pt-14 pb-10">
          {/* Label + heading — both drop in from the top, label first */}
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.p
              variants={fadeDown}
              className="text-primary text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase"
            >
              {whySection?.label}
            </motion.p>

            <motion.h2
              variants={fadeDown}
              className="mt-4 sm:mt-5 max-w-[950px] text-white text-xl sm:text-3xl lg:text-[34px] font-semibold font-display leading-snug sm:leading-tight lg:leading-[44px]"
            >
              {whySection?.title}
            </motion.h2>
          </motion.div>

          {/* Card row — "flower opening" entrance (rise + un-tilt +
              scale up, alternating lean per card), then auto-slides
              like a marquee only while hovered. */}
          <div
            ref={wrapperRef}
            onMouseEnter={() => setSliding(false)}
            onMouseLeave={() => setSliding(true)}
            className="mt-16 sm:mt-24 -mx-6 sm:-mx-10 overflow-hidden"
          >
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              style={{ x }}
              drag="x"
              dragConstraints={
                dimensions.setWidth && dimensions.wrapWidth
                  ? { left: -(copies * dimensions.setWidth - dimensions.wrapWidth), right: 0 }
                  : { left: 0, right: 0 }
              }
              onDragStart={() => {
                isDraggingRef.current = true;
              }}
              onDragEnd={() => {
                isDraggingRef.current = false;
                const setWidth = dimensions.setWidth || firstSetRef.current?.offsetWidth;
                if (setWidth) {
                  const currentX = x.get();
                  const wrappedX = ((currentX % setWidth) - setWidth) % setWidth;
                  x.set(wrappedX);
                }
              }}
              className="flex w-max pb-1 pl-6 sm:pl-10 pr-6 sm:pr-10 cursor-grab active:cursor-grabbing"
            >
              {Array.from({ length: copies }, (_, i) => renderCardSet(i))}
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default WhyGetHiredSection;