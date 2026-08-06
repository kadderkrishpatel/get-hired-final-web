import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Link, useLocation } from "react-router-dom";
import Reveal from "../animations/Reveal";
import { useLenis } from "../animations/SmoothScroll";

const CHART_H = 520;
const REST_PROGRESS = 0.58;

const Footer = () => {
  const location = useLocation();
  const assetBaseUrl = import.meta.env.VITE_IMAGES;
  const img = (name) => `${assetBaseUrl}/images/${name}`;
  const socialLinks = [
    {
      label: "LinkedIn",
      url: import.meta.env.VITE_LINKEDIN_URL,
      icon: "LinkedIn.svg",
    },
    {
      label: "Instagram",
      url: import.meta.env.VITE_INSTAGRAM_URL,
      icon: "Insta.svg",
    },
    {
      label: "X",
      url: import.meta.env.VITE_X_URL,
      icon: "X.svg",
    },
    {
      label: "YouTube",
      url: import.meta.env.VITE_YOUTUBE_URL,
      icon: "YouTube.svg",
    },
  ];

  const currentYear = new Date().getFullYear();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const reduceMotion = useReducedMotion();
  const lenis = useLenis();

  const trackRef = useRef(null);
  const contentRef = useRef(null);
  const idleTimerRef = useRef(null);
  const progressRef = useRef(0);
  const [cardHeight, setCardHeight] = useState(0);

  // Reset scroll progress when navigating to another route
  useEffect(() => {
    progressRef.current = 0;
  }, [location.pathname]);

  // Measure footer card height for sticky positioning
  useEffect(() => {
    if (!contentRef.current) return;
    const updateHeight = () => {
      if (contentRef.current) setCardHeight(contentRef.current.offsetHeight);
    };
    updateHeight();

    const ro = new ResizeObserver(updateHeight);
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  const scaleY = useTransform(scrollYProgress, [REST_PROGRESS, 1], [0, 1]);
  const chartHeight = useTransform(scrollYProgress, [REST_PROGRESS, 1], [0, CHART_H]);

  // Release-snap: when user pulls/scrolls into bottom overscroll area and releases,
  // smooth-snap back to standard resting footer view (with 25% zoom safety guard).
  useEffect(() => {
    if (!lenis || reduceMotion) return undefined;

    const getRestScrollY = () => {
      const track = trackRef.current;
      if (!track) return undefined;
      const rect = track.getBoundingClientRect();
      const trackTop = rect.top + lenis.scroll;
      const travel = track.offsetHeight - window.innerHeight;
      // Guard against 25% zoom or ultra-tall viewports where travel is tiny/negative
      if (travel < 100) return undefined;
      return trackTop + REST_PROGRESS * travel;
    };

    const snapToStickyRest = () => {
      if (progressRef.current <= REST_PROGRESS + 0.02) return;
      const targetY = getRestScrollY();
      if (targetY === undefined) return;

      lenis.scrollTo(targetY, {
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      });
    };

    const onScroll = () => {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        if (Math.abs(lenis.velocity) > 0.35) return;
        snapToStickyRest();
      }, 90);
    };

    const unsub = lenis.on("scroll", onScroll);
    return () => {
      unsub();
      window.clearTimeout(idleTimerRef.current);
    };
  }, [lenis, reduceMotion]);

  const stickyTop = cardHeight
    ? `max(1rem, calc(100vh - ${cardHeight}px - var(--footer-pb, 1.5rem)))`
    : undefined;

  return (
    <section id="contact" className="bg-cream px-3 pt-12 sm:px-6 sm:pt-16">
      <div
        ref={trackRef}
        className="relative h-[150vh] max-h-[1600px] min-h-[900px]"
      >
        <div
          className="sticky z-10 pb-3 sm:pb-6 [--footer-pb:0.75rem] sm:[--footer-pb:1.5rem]"
          style={{ top: stickyTop }}
        >
          <Reveal className="relative w-full bg-slate-900 rounded-[20px] overflow-hidden">
            <div
              ref={contentRef}
              className="relative z-10 w-full px-6 sm:px-10 lg:px-14 pt-14 sm:pt-16 lg:pt-20 pb-16 flex flex-col gap-16"
            >
              {/* Top row */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
                {/* Left: logo + description */}
                <div className="w-full lg:w-96 lg:pr-10 flex flex-col gap-10">
                  <img
                    src={img("logo-white.svg")}
                    alt="Get-Hired"
                    className="w-44 h-auto"
                  />
                  <p className="text-base font-normal leading-6 text-stone-100/60">
                    Career guidance, resume optimization, and interview preparation
                    for international students entering the US job market.
                  </p>
                </div>

                {/* Right: columns */}
                <div className="flex flex-wrap sm:flex-nowrap justify-between lg:justify-end gap-10 lg:gap-20 lg:pl-28 w-full lg:w-auto">
                  {/* SERVICES */}
                  <div className="flex flex-col gap-4">
                    <p className="text-xs font-medium leading-4 text-slate-500">SERVICES</p>
                    <div className="flex flex-col gap-3">
                      <Link to="/services/resume-preparation" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">Resume Preparation</Link>
                      <Link to="/services/cover-letter-upgrade" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">Cover Letter Upgrade</Link>
                      <Link to="/services/linkedin-makeover" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">LinkedIn Makeover</Link>
                      <Link to="/services/job-portal-profile-makeover" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">Job Portal Profile Makeover</Link>
                    </div>
                  </div>

                  {/* RESOURCES */}
                  <div className="flex flex-col gap-4">
                    <p className="text-xs font-medium leading-4 text-slate-500">RESOURCES</p>
                    <div className="flex flex-col gap-3">
                      <Link to="/career-insights" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">Career Insights</Link>
                      <Link to="/success-stories" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">Success Stories</Link>
                      <Link to="/faq" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">FAQ</Link>
                      <Link to="/book-consultation" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">Book Consultation</Link>
                    </div>
                  </div>

                  {/* COMPANY */}
                  <div className="flex flex-col gap-4">
                    <p className="text-xs font-medium leading-4 text-slate-500">COMPANY</p>
                    <div className="flex flex-col gap-3">
                      <Link to="/about" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">About</Link>
                      <Link to="/services" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">Services</Link>
                      <Link to="/results" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">Results</Link>
                      <Link to="/contact" onClick={scrollToTop} className="text-xl font-medium leading-8 text-stone-100/90 hover:text-white transition-colors">Contact</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="pt-10 border-t border-slate-600 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <p className="text-sm font-normal leading-5 text-stone-100/50">
                  © {currentYear} Get-Hired. All rights reserved.
                </p>
                <div className="flex items-start gap-5">
                  {socialLinks.map((link) =>
                    link.url ? (
                      <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="p-1.5 bg-slate-500 rounded-md flex justify-center items-center hover:bg-slate-400 transition-colors">
                        <img src={img(link.icon)} className="size-5" alt={link.label} />
                      </a>
                    ) : (
                      <span key={link.label} aria-label={link.label} className="p-1.5 bg-slate-500 rounded-md flex justify-center items-center">
                        <img src={img(link.icon)} className="size-5" alt={link.label} />
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Scroll-linked expanding chart animation (replaces old static growBar bars) */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none relative w-full origin-bottom overflow-hidden will-change-transform"
              style={{ height: reduceMotion ? CHART_H : chartHeight }}
            >
              <motion.div
                className="absolute bottom-0 left-0 right-0 flex origin-bottom items-end"
                style={{ height: CHART_H, scaleY: reduceMotion ? 1 : scaleY }}
              >
                <img
                  src={img("footer-bars.png")}
                  alt=""
                  draggable={false}
                  className="h-full w-full max-w-none select-none object-cover object-bottom"
                />
              </motion.div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Footer;
