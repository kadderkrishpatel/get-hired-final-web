import { ArrowUpRight } from "./Icons";

const TextLink = ({ children, href = "#contact", className = "" }) => {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-1.5
      text-primary text-base sm:text-[17px] font-bold font-display
      border-b border-transparent pb-0.5
      hover:border-primary transition-colors ${className}`}
    >
      {children}
      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
};

export default TextLink;
