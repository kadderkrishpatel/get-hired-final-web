import { useState } from "react";
import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import SectionHeading from "../../ui/SectionHeading";
import TextLink from "../../ui/TextLink";
import CapabilityVideo from "../../animations/home/CapabilityVideo";
import Reveal from "../../animations/Reveal";
import { fadeLeft, fadeRight } from "../../animations/motionVariants";

const CapabilitiesSection = () => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;
  const capabilitiesSection = useArrayTranslation("capabilities_section");
  const capabilitiesItems = useArrayTranslation("capabilities_items");

  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="services"
      // className=" w-full max-w-[1400px] mx-auto px-5 scroll-mt-20"
      className="w-full max-w-[1400px] mx-auto px-5 scroll-mt-20 mt-20 lg:mt-[120px]"
    >
      {/* Heading Row */}
      <div className="flex flex-col lg:flex-row items-end gap-8 self-stretch">
        {/* Left Side */}
        <Reveal variants={fadeLeft} className="flex-1">
          <SectionHeading
            label={capabilitiesSection?.label}
            title={capabilitiesSection?.title}
          />
        </Reveal>

        {/* Right Side */}
        <Reveal variants={fadeRight} className="flex-1">
          <p
            className="
        text-slate-600
        text-base
        lg:text-[17px]
        font-medium
        font-display
        leading-7
      "
          >
            {capabilitiesSection?.description}
          </p>
        </Reveal>
      </div>

      {/* Accordion */}
      <Reveal className="mt-8 sm:mt-12 lg:mt-[72px] border-b border-slate-200">
        {Array.isArray(capabilitiesItems) &&
          capabilitiesItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.title} className="border-t border-slate-200">
                {/* Header row */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between gap-3 py-5 sm:py-7 lg:py-10 px-1 sm:px-4 text-left cursor-pointer group"
                >
                  <span
                    className={`flex items-baseline gap-2.5 sm:gap-3 text-xl sm:text-2xl lg:text-3xl font-medium leading-7 sm:leading-10 font-display transition-colors ${
                      isOpen
                        ? "text-primary"
                        : "text-navy group-hover:text-primary"
                    }`}
                  >
                    <span className="font-bold text-primary">{index + 1}.</span>
                    {item.title}
                  </span>
                  {/* Plus / minus icon */}
                  <span className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-primary rounded" />
                    <span
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-primary rounded
                      transition-all duration-300 ${isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100"}`}
                    />
                  </span>
                </button>

                {/* Body (CSS grid-rows transition, see index.css) */}
                <div className={`accordion-body ${isOpen ? "open" : ""}`}>
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-stretch gap-4 sm:gap-6 pb-6 sm:pb-8 px-1 sm:px-0">
                      {/* Left Content For Video*/}

                      <div
                        className="
                              w-full
                              aspect-[652/486]
                              sm:aspect-auto
                              sm:h-[300px]
                              lg:h-[420px]
                              rounded-2xl
                              overflow-hidden
                              bg-[#F8F9FA]
                              border
                              border-slate-100
                              shadow-sm
                                    "
                      >
                        {item.video ? (
                          <CapabilityVideo
                            src={`${assetBaseUrl}${item.video}`}
                            poster={`${assetBaseUrl}${item.image}`}
                            active={isOpen}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={`${assetBaseUrl}${item.image}`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Right Content */}
                      <div
                        className="
                          flex
                          flex-col
                          justify-between
                          h-auto
                          lg:h-full
                          lg:min-h-[420px]
                          gap-4
                          py-1
                          px-1
                          sm:px-6
                          "
                      >
                        {/* Top Description & Bullets */}
                        <div>
                          <p
                            className="
                              text-[#3C4369]
                              text-base
                              sm:text-lg
                              lg:text-[18px]
                              font-medium
                              font-display
                              leading-[1.4]
                              tracking-normal
                            "
                          >
                            {item.description}
                          </p>

                          {/* Bullets */}
                          <ul className="mt-4 sm:mt-6 space-y-2">
                            {item.bullets?.map((bullet) => (
                              <li
                                key={bullet}
                                className="
                                  flex
                                  items-start
                                  gap-2.5
                                  text-[#3C4369]
                                  text-sm
                                  sm:text-base
                                  lg:text-[16px]
                                  font-medium
                                  font-display
                                  leading-snug
                                "
                              >
                                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#3C4369] shrink-0" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA */}
                        <div className="pt-4 sm:pt-6">
                          <TextLink>{item.cta}</TextLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Reveal>
    </section>
  );
};

export default CapabilitiesSection;
