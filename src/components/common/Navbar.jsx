// Get Hired Navbar

import { useState, useEffect, useCallback, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useArrayTranslation } from "./hooks/useArrayTranslation";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { ArrowUpRight } from "../ui/Icons";

const Navbar = () => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;
  const img = (name) => `${assetBaseUrl}/images/${name}`;

  const getConsultation = useArrayTranslation("get_consultation");
  const reduceMotion = useReducedMotion();
  const navRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleScrollToSection = (sectionId) => (e) => {
    if (e) e.preventDefault();
    if (isHomePage) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const sectionHashes = ["#about", "#services", "#results", "#contact","#blog"];
  const activeSection = useScrollSpy(sectionHashes);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      const scrolledDown = currentY > lastY;
      const pastThreshold = currentY > 120;

      if (mobileOpen) {
        setHidden(false);
      } else if (scrolledDown && pastThreshold) {
        setHidden(true);
      } else if (!scrolledDown) {
        setHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileOpen]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleMenuClose = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileOpen &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  // FAST & SNAPPY VARIANTS
  const menuVariants = {
    closed: {
      opacity: 0,
      scaleY: 0.95,
      transition: {
        duration: 0.15, // Immediate collapse
        ease: "easeIn",
      },
    },
    open: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    closed: { 
      opacity: 0, 
      transition: { duration: 0.1 } // Immediate fade on close
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.nav
      ref={navRef}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
      }
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-dark-bg/85 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          : "bg-cream/60 dark:bg-dark-bg/60"
      } backdrop-blur-md`}
    >
      <div className="w-full mx-auto px-5 sm:px-[40px] py-[9px] flex items-center justify-between">
        {/* LOGO + MOBILE HAMBURGER */}
        <div className="flex items-center gap-6">
          
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex justify-center items-center w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer outline-none"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }} // Fast Icon rotation
              className="w-6 h-5 relative flex flex-col justify-between items-center"
            >
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 9, width: "24px" }
                    : { rotate: 0, y: 0, width: "24px" }
                }
                transition={{ duration: 0.18 }}
                className="h-0.5 bg-navy dark:bg-cream rounded block origin-center"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.1 }}
                className="h-0.5 w-4 bg-navy dark:bg-cream rounded block self-end origin-right"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -9, width: "24px" }
                    : { rotate: 0, y: 0, width: "24px" }
                }
                transition={{ duration: 0.18 }}
                className="h-0.5 bg-navy dark:bg-cream rounded block origin-center"
              />
            </motion.div>
          </button>

          <Link
            to="/"
            onClick={scrollToTop}
            className="inline-flex items-center justify-center shrink-0 h-[42px]"
          >
            <img
              src={img("logo.svg")}
              alt="Get-Hired"
              className="w-20 h-10 object-contain"
            />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
          <NavLink
            to="/#about"
            onClick={handleScrollToSection("about")}
            className={`relative px-3 py-3 text-xs font-bold uppercase tracking-[0.16em] leading-4 transition-colors ${
              activeSection === "#about"
                ? "text-primary"
                : "text-slate-900 dark:text-slate-200 hover:text-primary"
            }`}
          >
            About
            {activeSection === "#about" && (
              <motion.span
                layoutId="nav-active-dot"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32 }
                }
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
              />
            )}
          </NavLink>

          <NavLink
            to="/#services"
            onClick={handleScrollToSection("services")}
            className={`relative px-3 py-3 text-xs font-bold uppercase tracking-[0.16em] leading-4 transition-colors ${
              activeSection === "#services"
                ? "text-primary"
                : "text-slate-900 dark:text-slate-200 hover:text-primary"
            }`}
          >
            Services
            {activeSection === "#services" && (
              <motion.span
                layoutId="nav-active-dot"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32 }
                }
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
              />
            )}
          </NavLink>

          <NavLink
            to="/#results"
            onClick={handleScrollToSection("results")}
            className={`relative px-3 py-3 text-xs font-bold uppercase tracking-[0.16em] leading-4 transition-colors ${
              activeSection === "#results"
                ? "text-primary"
                : "text-slate-900 dark:text-slate-200 hover:text-primary"
            }`}
          >
            Results
            {activeSection === "#results" && (
              <motion.span
                layoutId="nav-active-dot"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32 }
                }
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
              />
            )}
          </NavLink>

          <NavLink
            to="/contact"
            onClick={scrollToTop}
            className={`relative px-3 py-3 text-xs font-bold uppercase tracking-[0.16em] leading-4 transition-colors ${
              location.pathname === "/contact"
                ? "text-primary"
                : "text-slate-900 dark:text-slate-200 hover:text-primary"
            }`}
          >
            Contact
            {location.pathname === "/contact" && (
              <motion.span
                layoutId="nav-active-dot"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32 }
                }
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
              />
            )}
          </NavLink>
       
          <NavLink
            to="/blog"
            className={`relative px-3 py-3 text-xs font-bold uppercase tracking-[0.16em] leading-4 transition-colors ${
              location.pathname.startsWith("/blog")
                ? "text-primary"
                : "text-slate-900 dark:text-slate-200 hover:text-primary"
            }`}
          >
            Blog
            {location.pathname.startsWith("/blog") && (
              <motion.span
                layoutId="nav-active-dot"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32 }
                }
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
              />
            )}
          </NavLink>
       
       
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            onClick={scrollToTop}
            className="hidden md:inline-flex items-center justify-center gap-2 h-10 px-4 py-2.5 bg-primary hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled rounded-xl text-white text-sm font-bold font-display whitespace-nowrap transition-colors shadow-[0_8px_20px_rgba(195,47,38,0.25)]"
          >
            {getConsultation}
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden overflow-hidden origin-top bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl border-t border-slate-100 dark:border-white/10 shadow-2xl"
          >
            <div className="flex flex-col px-6 py-5 gap-1">
              
              <motion.div variants={itemVariants}>
                <NavLink
                  to="/#about"
                  onClick={(e) => {
                    handleMenuClose();
                    handleScrollToSection("about")(e);
                  }}
                  className={`flex items-center justify-between py-3.5 font-bold font-display text-base border-b border-slate-100 dark:border-white/10 ${
                    activeSection === "#about"
                      ? "text-primary"
                      : "text-navy dark:text-slate-100"
                  }`}
                >
                  <span>About</span>
                  <span className="text-xs opacity-40">↗</span>
                </NavLink>
              </motion.div>

              <motion.div variants={itemVariants}>
                <NavLink
                  to="/#services"
                  onClick={(e) => {
                    handleMenuClose();
                    handleScrollToSection("services")(e);
                  }}
                  className={`flex items-center justify-between py-3.5 font-bold font-display text-base border-b border-slate-100 dark:border-white/10 ${
                    activeSection === "#services"
                      ? "text-primary"
                      : "text-navy dark:text-slate-100"
                  }`}
                >
                  <span>Services</span>
                  <span className="text-xs opacity-40">↗</span>
                </NavLink>
              </motion.div>

              <motion.div variants={itemVariants}>
                <NavLink
                  to="/#results"
                  onClick={(e) => {
                    handleMenuClose();
                    handleScrollToSection("results")(e);
                  }}
                  className={`flex items-center justify-between py-3.5 font-bold font-display text-base border-b border-slate-100 dark:border-white/10 ${
                    activeSection === "#results"
                      ? "text-primary"
                      : "text-navy dark:text-slate-100"
                  }`}
                >
                  <span>Results</span>
                  <span className="text-xs opacity-40">↗</span>
                </NavLink>
              </motion.div>

              <motion.div variants={itemVariants}>
                <NavLink
                  to="/contact"
                  onClick={() => {
                    handleMenuClose();
                    scrollToTop();
                  }}
                  className={`flex items-center justify-between py-3.5 font-bold font-display text-base border-b border-slate-100 dark:border-white/10 ${
                    location.pathname === "/contact"
                      ? "text-primary"
                      : "text-navy dark:text-slate-100"
                  }`}
                >
                  <span>Contact</span>
                  <span className="text-xs opacity-40">↗</span>
                </NavLink>
              </motion.div>

              <motion.div variants={itemVariants}>
                <NavLink
                  to="/blog"
                  onClick={() => handleMenuClose()}
                  className={`flex items-center justify-between py-3.5 font-bold font-display text-base border-b border-slate-100 dark:border-white/10 ${
                    location.pathname.startsWith("/blog")
                      ? "text-primary"
                      : "text-navy dark:text-slate-100"
                  }`}
                >
                  <span>Blog</span>
                  <span className="text-xs opacity-40">↗</span>
                </NavLink>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4 pb-2">
                <NavLink
                  to="/contact"
                  onClick={() => {
                    handleMenuClose();
                    scrollToTop();
                  }}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold font-display rounded-xl px-5 py-3.5 shadow-[0_8px_20px_rgba(195,47,38,0.25)] active:scale-[0.98] transition-all"
                >
                  {getConsultation}
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </NavLink>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;