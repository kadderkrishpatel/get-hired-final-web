import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import Button from "../../ui/Button";
import Reveal from "../../animations/Reveal";
import { motion } from "motion/react";
import { fadeUp, scaleIn, staggerContainer, VIEWPORT_ONCE } from "../../animations/motionVariants";

const GetStartedSection = () => {
  const getStartedSection = useArrayTranslation("get_started_section");

  return (
    <section className="px-3 sm:px-6 py-6">
      <Reveal
        variants={scaleIn}
        className="group relative max-w-7xl mx-auto rounded-[28px] overflow-hidden
        bg-gradient-to-b from-[#AFC9F9] to-[#FFFFFF]"
      >
        {/* Cloud background — sits in its natural position by default, slides down on hover */}
        <img
          src="/images/our_consulting/Cloud_Large.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none
            translate-y-0 transition-transform duration-[1200ms] ease-out group-hover:translate-y-[18%]"
        />
        <motion.div
          variants={staggerContainer(0.12, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative px-6 py-24 sm:py-32 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[34px] sm:text-5xl lg:text-[56px] leading-[1.15] font-bold text-navy tracking-tight"
          >
            {getStartedSection?.title_line1}
            <br className="hidden sm:block" /> {getStartedSection?.title_line2}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl mx-auto text-[15px] sm:text-lg font-display font-medium text-[#4d5b7c]"
          >
            {getStartedSection?.description}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Button
              className="mt-10"
              onClick={() => document.querySelector("#contact")?.scrollIntoView()}
            >
              {getStartedSection?.cta}
            </Button>
          </motion.div>
        </motion.div>
      </Reveal>
    </section>
  );
};

export default GetStartedSection;