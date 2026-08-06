const SectionHeading = ({ label, title, description, center = false }) => {
  return (
    <div
      className={
        center
          ? "flex flex-col items-center text-center gap-3"
          : "flex flex-col items-start gap-3"
      }
    >
      {label && (
        <p
          className="
            text-primary
            text-sm
            font-bold
            font-display
            uppercase
            tracking-widest
            leading-5
          "
        >
          {label}
        </p>
      )}

      {title && (
        <h2
          className="
            text-slate-900
            text-4xl
            lg:text-[2.0rem]
            font-medium
            font-display
            leading-snug
            lg:leading-[1.2]
          "
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`
            text-slate-600
            text-xl
            sm:text-[17px]
            font-medium
            font-display
            leading-8
            max-w-2xl
            ${center ? "mx-auto" : ""}
          `}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
