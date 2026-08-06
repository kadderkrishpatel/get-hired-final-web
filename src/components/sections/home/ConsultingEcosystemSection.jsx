import { useState } from "react";
import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import SectionHeading from "../../ui/SectionHeading";
import EcosystemCard from "../../ui/EcosystemCard";
import Reveal from "../../animations/Reveal";
import { motion } from "motion/react";
import { staggerContainer, VIEWPORT_ONCE } from "../../animations/motionVariants";

const ConsultingEcosystemSection = () => {
  const ecosystemSection = useArrayTranslation("ecosystem_section");
  const ecosystemCards = useArrayTranslation("ecosystem_cards");

  // Cloud sits low by default. It rises when a card is hovered.
  const [cardsHovered, setCardsHovered] = useState(false);

  return (
    <section className="px-3 sm:px-6 py-10">
      <Reveal className="relative max-w-7xl mx-auto rounded-[20px] overflow-hidden bg-gradient-to-b from-[#A7BADD] from-10% to-[#AFC9F9]">
        {/* Cloud background image — starts shifted down, rises on card hover */}
        <img
          src="/images/our_consulting/Cloud_Large.png"
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none
            transition-transform duration-[1200ms] ease-out
            ${cardsHovered ? "translate-y-0" : "translate-y-[18%]"}`}
        />

        {/* Figma decorative blobs */}
        <div className="absolute w-[110%] h-[55%] -left-[8%] -bottom-[10%] rounded-full bg-indigo-200/40 blur-3xl pointer-events-none" />
        <div className="absolute w-[110%] h-[55%] left-[60%] -bottom-[12%] rounded-full bg-indigo-200/40 blur-3xl pointer-events-none" />

        <div className="relative px-6 sm:px-12 py-16 sm:py-28">
          <SectionHeading
            center
            label={ecosystemSection?.label}
            title={ecosystemSection?.title}
            description={ecosystemSection?.description}
          />

          {/* Cards — stagger in one by one. Hovering any card tells the cloud to rise. */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            onMouseEnter={() => setCardsHovered(true)}
            onMouseLeave={() => setCardsHovered(false)}
            className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {Array.isArray(ecosystemCards) &&
              ecosystemCards.map((card) => (
                <EcosystemCard key={card.number} card={card} />
              ))}
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
};

export default ConsultingEcosystemSection;