import SectionBadge from "../../ui/SectionBadge";
import Button from "../../ui/Button";

// Hero copy block — badge, heading, description and CTA are static
const HeroContent = ({ heroSection, badgeIcon }) => {
  return (
    <div className="w-full max-w-[850px] mx-auto inline-flex flex-col justify-start items-center gap-10 pt-16 sm:pt-20">
      {/* Badge + Heading + Description */}
      <div className="w-full flex flex-col justify-start items-center gap-6">
        {/* Badge + Heading */}
        <div className=" w-full flex flex-col justify-start items-center gap-2">
          <div>
            <SectionBadge title={heroSection?.badge} icon={badgeIcon} />
          </div>

          <h1
            className="
              w-full
              text-center
              text-slate-900
              dark:text-white
              font-semibold
              font-display
              text-3xl
              sm:text-4xl
              lg:text-7xl
              leading-tight
              lg:leading-[64px]
              tracking-normal
            "
          >
            <span className="block">
              {heroSection?.title_line1}
            </span>
            <span className="block">
              {heroSection?.title_line2}
            </span>
          </h1>
        </div>

        {/* Description */}
        <div
          className="
            w-full
            max-w-[760px]
            text-center
            text-slate-600
            dark:text-slate-300
            text-[18px]
            font-medium
            font-display
            leading-8
          "
        >
          {heroSection?.description}
        </div>
      </div>

      {/* CTA Button */}
      <div className="inline-flex justify-center items-center ">
        <Button
          onClick={() =>
            document
              .querySelector("#contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {heroSection?.cta}
        </Button>
      </div>
    </div>
  );
};

export default HeroContent;
