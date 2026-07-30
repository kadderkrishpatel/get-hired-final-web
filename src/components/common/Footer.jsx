import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import Reveal from "../animations/Reveal";
import { staggerContainer, VIEWPORT_ONCE, EASE_OUT } from "../animations/motionVariants";

const growBar = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

const Footer = () => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;
  const img = (name) => `${assetBaseUrl}/images/${name}`;

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section id="contact" className="px-3 sm:px-6 pb-4 pt-16 bg-cream">
      <Reveal className="relative w-full bg-slate-900 rounded-[20px] overflow-hidden">
        {/* Decorative growth bars in the background */}
        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="pointer-events-none absolute bottom-0 inset-x-0 h-96 flex items-end justify-center gap-10 opacity-[0.35]"
        >
          {[90, 140, 200, 250, 190, 130, 220, 170, 110].map((h, i) => (
            <motion.div key={i} variants={growBar} className="flex items-end gap-10 origin-bottom">
              <div
                className="w-24 rounded-t-md bg-gradient-to-t from-[#131c42] to-transparent"
                style={{ height: `${h}px` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main content — px-14 pt-20 pb-16 gap-16 (Figma exact) */}
        <div className="relative w-full px-6 sm:px-10 lg:px-14 pt-14 sm:pt-16 lg:pt-20 pb-16 flex flex-col gap-16">
          {/* Top row */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
            {/* Left: logo + description — w-96 pr-10 gap-10 */}
            <div className="w-full lg:w-96 lg:pr-10 flex flex-col gap-10">
              <img src={img("logo-white.svg")} alt="Get-Hired" className="w-44 h-auto" />
              <p className="text-base font-normal leading-6 text-stone-100/60">
                Career guidance, resume optimization, and interview preparation for international students entering the US job market.
              </p>
            </div>

            {/* Right: columns — pl-28 gap-20 */}
            <div className="flex flex-wrap sm:flex-nowrap justify-between lg:justify-end gap-10 lg:gap-20 lg:pl-28 w-full lg:w-auto">
              {/* SERVICES */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-medium leading-4 text-slate-500">SERVICES</p>
                <div className="flex flex-col gap-3">
                  <Link to="/services/resume-preparation" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    Resume Preparation
                  </Link>
                  <Link to="/services/cover-letter-upgrade" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    Cover Letter Upgrade
                  </Link>
                  <Link to="/services/linkedin-makeover" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    LinkedIn Makeover
                  </Link>
                  <Link to="/services/job-portal-profile-makeover" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    Job Portal Profile Makeover
                  </Link>
                </div>
              </div>

              {/* RESOURCES */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-medium leading-4 text-slate-500">RESOURCES</p>
                <div className="flex flex-col gap-3">
                  <Link to="/career-insights" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    Career Insights
                  </Link>
                  <Link to="/success-stories" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    Success Stories
                  </Link>
                  <Link to="/faq" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    FAQ
                  </Link>
                  <Link to="/book-consultation" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    Book Consultation
                  </Link>
                </div>
              </div>

              {/* COMPANY */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-medium leading-4 text-slate-500">COMPANY</p>
                <div className="flex flex-col gap-3">
                  <Link to="/about" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    About
                  </Link>
                  <Link to="/services" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    Services
                  </Link>
                  <Link to="/results" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    Results
                  </Link>
                  <Link to="/contact" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar — pt-10 border-t border-slate-600 */}
          <div className="pt-10 border-t border-slate-600 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <p className="text-sm font-normal leading-5 text-stone-100/50">
              © 2026 Get-Hired. All rights reserved.
            </p>

            {/* Socials — p-1.5 bg-slate-500 rounded-md gap-5, icon size-5 */}
            <div className="flex items-start gap-5">
              <a
                href="https://linkedin.com/company/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-1.5 bg-slate-500 rounded-md flex justify-center items-center hover:bg-slate-400 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="size-5 fill-slate-900">
                  <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.5 17.5h-2.4V10h2.4v7.5zM7.3 8.9a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8zm10.2 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.5 1-1.5 2v3.8H10V10h2.3v1h.1c.3-.6 1.1-1.2 2.3-1.2 2.4 0 2.9 1.6 2.9 3.7v4z" />
                </svg>
              </a>

              <a
                href="https://instagram.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-1.5 bg-slate-500 rounded-md flex justify-center items-center hover:bg-slate-400 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="size-5 fill-slate-900">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z" />
                </svg>
              </a>

              <a
                href="https://x.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="p-1.5 bg-slate-500 rounded-md flex justify-center items-center hover:bg-slate-400 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="size-5 fill-slate-900">
                  <path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L2.2 3h6.4l4.4 5.9L17.5 3zm-1.1 16.1h1.7L7.7 4.7H5.9l10.5 14.4z" />
                </svg>
              </a>

              <a
                href="https://youtube.com/@your-handle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-1.5 bg-slate-500 rounded-md flex justify-center items-center hover:bg-slate-400 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="size-5 fill-slate-900">
                  <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8l5.2 3.2-5.2 3.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Footer;