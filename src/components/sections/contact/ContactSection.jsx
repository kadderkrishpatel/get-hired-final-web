import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiChevronDown, FiArrowUpRight } from "react-icons/fi";
import { toast } from "react-toastify";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "Technical Training",
    subService: "Technical Training",
    message: "",
  });

  const [emailTouched, setEmailTouched] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [subServiceOpen, setSubServiceOpen] = useState(false);

  const serviceRef = useRef(null);
  const subServiceRef = useRef(null);

  const serviceOptions = [
    "Technical Training",
    "Resume Optimization",
    "LinkedIn Branding",
    "Interview Preparation",
    "Job Search Strategy",
  ];

  const subServiceOptions = [
    "Technical Training",
    "Resume Preparation",
    "Cover Letter Upgrade",
    "LinkedIn Makeover",
    "Job Portal Profile Makeover",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) {
        setServiceOpen(false);
      }
      if (subServiceRef.current && !subServiceRef.current.contains(event.target)) {
        setSubServiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isEmailInvalid =
    emailTouched && formData.email.length > 0 && !validateEmail(formData.email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectService = (value) => {
    setFormData((prev) => ({ ...prev, service: value }));
    setServiceOpen(false);
  };

  const handleSelectSubService = (value) => {
    setFormData((prev) => ({ ...prev, subService: value }));
    setSubServiceOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && !validateEmail(formData.email)) {
      setEmailTouched(true);
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you! Your message has been sent successfully.");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      service: "Technical Training",
      subService: "Technical Training",
      message: "",
    });
    setEmailTouched(false);
  };

  return (
    <section className="w-full pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-10 max-w-[1340px] mx-auto font-['Plus_Jakarta_Sans']">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* LEFT COLUMN - Contact Information */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          
          {/* Badge */}
          <span className="text-red-700 text-xs sm:text-sm font-extrabold font-['Plus_Jakarta_Sans'] uppercase leading-5 tracking-widest mb-2.5">
            CONTACT US
          </span>

          {/* Heading */}
          <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-[44px] font-semibold font-['Plus_Jakarta_Sans'] leading-tight lg:leading-[52px]">
            We’d love to hear from you!
          </h1>

          {/* Subtitle - Navy/50% */}
          <p className="mt-3.5 text-base sm:text-lg font-medium font-['Plus_Jakarta_Sans'] leading-relaxed text-[#080F31]/50">
            Tell us what you're building and where the gaps are. We'll reply within one business day with a clear next step.
          </p>

          {/* Divider */}
          <div className="w-full border-t border-slate-200/80 my-6" />

          {/* Contact Details */}
          <div className="flex flex-col gap-5 sm:gap-6 font-['Plus_Jakarta_Sans']">
            
            {/* EMAIL */}
            <div>
              <span className="block text-red-700 text-xs font-bold font-['Plus_Jakarta_Sans'] uppercase leading-4 tracking-widest mb-1">
                EMAIL
              </span>
              <a
                href="mailto:info@gethired.com"
                className="text-sm sm:text-base font-normal font-['Plus_Jakarta_Sans'] leading-6 text-[#080F31]/50 hover:text-red-700 transition-colors"
              >
                info@gethired.com
              </a>
            </div>

            {/* PHONE */}
            <div>
              <span className="block text-red-700 text-xs font-bold font-['Plus_Jakarta_Sans'] uppercase leading-4 tracking-widest mb-1">
                PHONE
              </span>
              <p className="text-sm sm:text-base font-normal font-['Plus_Jakarta_Sans'] leading-6 text-[#080F31]/50">
                +1 (307) 410-3484 <span className="text-[#080F31]/50">|</span> +91 90330 42743, +91 90330 42746
              </p>
            </div>

            {/* OFFICE */}
            <div>
              <span className="block text-red-700 text-xs font-bold font-['Plus_Jakarta_Sans'] uppercase leading-4 tracking-widest mb-2">
                OFFICE
              </span>
              
              <div className="space-y-3 font-['Plus_Jakarta_Sans']">
                {/* USA Address */}
                <div>
                  <span className="block text-slate-900 text-xs font-medium font-['Plus_Jakarta_Sans'] leading-4 mb-0.5">
                    USA:
                  </span>
                  <p className="text-sm sm:text-base font-normal font-['Plus_Jakarta_Sans'] leading-6 text-[#080F31]/50">
                    1309 Coffeen Ave, Suite 3060, Sheridan, WY, 82801
                  </p>
                  <p className="text-sm sm:text-base font-normal font-['Plus_Jakarta_Sans'] leading-6 text-[#080F31]/50">
                    2240 E 12th St Suite 101, Casper, WY, 82609
                  </p>
                </div>

                {/* India Address */}
                <div>
                  <span className="block text-slate-900 text-xs font-medium font-['Plus_Jakarta_Sans'] leading-4 mb-0.5">
                    India:
                  </span>
                  <p className="text-sm sm:text-base font-normal font-['Plus_Jakarta_Sans'] leading-6 text-[#080F31]/50">
                    4th Floor Shree Square A, Near GTPL House,
                  </p>
                  <p className="text-sm sm:text-base font-normal font-['Plus_Jakarta_Sans'] leading-6 text-[#080F31]/50">
                    off Sindhu Bhavan Marg, Ahmedabad, Gujarat. 380054
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN - Form Card directly matching Figma JSX Code */}
        <div className="lg:col-span-7 flex justify-center w-full font-['Plus_Jakarta_Sans']">
          <div className="w-full max-w-[660px] p-4 sm:p-8 md:p-11 relative bg-gradient-to-b from-[#EBF3FF] via-[#DBE8FE] to-[#BEDAFF] rounded-[24px] sm:rounded-[32px] flex justify-center items-center overflow-hidden shadow-sm">
            
            {/* Background Cloud graphic */}
            <img
              src="/images/our_consulting/Cloud_Large.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0 opacity-100"
            />

            {/* Inner White Form Card */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 w-full p-5 sm:p-8 md:p-9 bg-white rounded-[20px] shadow-[0px_0px_24px_6px_rgba(0,0,0,0.04)] outline outline-1 outline-offset-[-1px] outline-slate-100 flex flex-col justify-start items-start gap-6 overflow-hidden relative z-10"
            >
              {/* Header */}
              <div className="justify-start text-slate-900 text-2xl sm:text-3xl font-semibold font-['Plus_Jakarta_Sans'] leading-8 sm:leading-9">
                Get in Touch
              </div>

              {/* Form Input Fields Container */}
              <div className="self-stretch flex flex-col justify-start items-start gap-4 sm:gap-5">
                
                {/* Full Name */}
                <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                  <label htmlFor="fullName" className="justify-start text-slate-900 text-sm sm:text-base font-semibold font-['Plus_Jakarta_Sans'] leading-5 cursor-pointer">
                    Full Name
                  </label>
                  <div className="self-stretch h-11 sm:h-12 px-3 py-2.5 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-start items-center focus-within:outline-[#C32F26] transition-all">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Alex Prokhorov"
                      className="w-full bg-transparent outline-none text-slate-900 placeholder:text-neutral-500 text-sm font-normal font-['Plus_Jakarta_Sans'] leading-5"
                    />
                  </div>
                </div>

                {/* Email Address & Phone Number */}
                <div className="self-stretch flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-5">
                  
                  {/* Email Address */}
                  <div className="flex-1 w-full flex flex-col justify-start items-start gap-1.5">
                    <label htmlFor="email" className="justify-start text-slate-900 text-sm sm:text-base font-semibold font-['Plus_Jakarta_Sans'] leading-5 cursor-pointer">
                      Email Address
                    </label>
                    <div className={`self-stretch h-11 sm:h-12 px-3 py-2.5 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] ${
                      isEmailInvalid ? "outline-red-700" : "outline-neutral-200 focus-within:outline-[#C32F26]"
                    } flex justify-start items-center transition-all`}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => setEmailTouched(true)}
                        placeholder="alex@example.com"
                        className="w-full bg-transparent outline-none text-slate-900 placeholder:text-neutral-500 text-sm font-normal font-['Plus_Jakarta_Sans'] leading-5"
                      />
                    </div>
                    {isEmailInvalid && (
                      <div className="justify-start text-red-700 text-xs font-medium font-['Plus_Jakarta_Sans'] leading-4">
                        Please enter a valid email address
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex-1 w-full flex flex-col justify-start items-start gap-1.5">
                    <label htmlFor="phone" className="justify-start text-slate-900 text-sm sm:text-base font-semibold font-['Plus_Jakarta_Sans'] leading-5 cursor-pointer">
                      Phone Number
                    </label>
                    <div className="self-stretch h-11 sm:h-12 px-3 py-2.5 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-start items-center focus-within:outline-[#C32F26] transition-all">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-transparent outline-none text-slate-900 placeholder:text-neutral-500 text-sm font-normal font-['Plus_Jakarta_Sans'] leading-5"
                      />
                    </div>
                  </div>

                </div>

                {/* Select Service & Select Sub Service */}
                <div className="self-stretch flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-5">
                  
                  {/* Select Service */}
                  <div className="flex-1 w-full flex flex-col justify-start items-start gap-1.5 relative" ref={serviceRef}>
                    <label className="justify-start text-slate-900 text-sm sm:text-base font-semibold font-['Plus_Jakarta_Sans'] leading-5 cursor-pointer">
                      Select Service
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setServiceOpen(!serviceOpen);
                        setSubServiceOpen(false);
                      }}
                      className="self-stretch h-11 sm:h-12 px-3 py-2.5 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-between items-center w-full cursor-pointer hover:bg-neutral-100/60 focus:outline-[#C32F26] transition-all"
                    >
                      <span className="justify-start text-slate-900 text-sm font-normal font-['Plus_Jakarta_Sans'] leading-5 truncate">
                        {formData.service}
                      </span>
                      <motion.div animate={{ rotate: serviceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <FiChevronDown className="w-5 h-5 text-neutral-500 shrink-0" />
                      </motion.div>
                    </button>

                    {/* Animated Dropdown Menu */}
                    <AnimatePresence>
                      {serviceOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: -5, scale: 0.98 }}
                          animate={{ opacity: 1, y: 4, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 z-30 w-full bg-white border border-slate-200 rounded-lg shadow-xl py-1 overflow-hidden mt-1"
                        >
                          {serviceOptions.map((opt) => (
                            <li
                              key={opt}
                              onClick={() => handleSelectService(opt)}
                              className={`px-3.5 py-2.5 text-sm font-normal font-['Plus_Jakarta_Sans'] leading-5 cursor-pointer transition-colors ${
                                formData.service === opt
                                  ? "bg-red-700/10 text-red-700 font-semibold"
                                  : "text-slate-900 hover:bg-neutral-50"
                              }`}
                            >
                              {opt}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Select Sub Service */}
                  <div className="flex-1 w-full flex flex-col justify-start items-start gap-1.5 relative" ref={subServiceRef}>
                    <label className="justify-start text-slate-900 text-sm sm:text-base font-semibold font-['Plus_Jakarta_Sans'] leading-5 cursor-pointer">
                      Select Sub Service
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setSubServiceOpen(!subServiceOpen);
                        setServiceOpen(false);
                      }}
                      className="self-stretch h-11 sm:h-12 px-3 py-2.5 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-between items-center w-full cursor-pointer hover:bg-neutral-100/60 focus:outline-[#C32F26] transition-all"
                    >
                      <span className="justify-start text-slate-900 text-sm font-normal font-['Plus_Jakarta_Sans'] leading-5 truncate">
                        {formData.subService}
                      </span>
                      <motion.div animate={{ rotate: subServiceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <FiChevronDown className="w-5 h-5 text-neutral-500 shrink-0" />
                      </motion.div>
                    </button>

                    {/* Animated Dropdown Menu */}
                    <AnimatePresence>
                      {subServiceOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: -5, scale: 0.98 }}
                          animate={{ opacity: 1, y: 4, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 z-30 w-full bg-white border border-slate-200 rounded-lg shadow-xl py-1 overflow-hidden mt-1"
                        >
                          {subServiceOptions.map((opt) => (
                            <li
                              key={opt}
                              onClick={() => handleSelectSubService(opt)}
                              className={`px-3.5 py-2.5 text-sm font-normal font-['Plus_Jakarta_Sans'] leading-5 cursor-pointer transition-colors ${
                                formData.subService === opt
                                  ? "bg-red-700/10 text-red-700 font-semibold"
                                  : "text-slate-900 hover:bg-neutral-50"
                              }`}
                            >
                              {opt}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                {/* Your Message */}
                <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                  <label htmlFor="message" className="justify-start text-slate-900 text-sm sm:text-base font-semibold font-['Plus_Jakarta_Sans'] leading-5 cursor-pointer">
                    Your Message
                  </label>
                  <div className="self-stretch h-24 sm:h-28 px-3 py-2.5 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-start items-start focus-within:outline-[#C32F26] transition-all">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your goals..."
                      className="w-full h-full bg-transparent outline-none text-slate-900 placeholder:text-neutral-500 text-sm font-normal font-['Plus_Jakarta_Sans'] leading-5 resize-none"
                    />
                  </div>
                </div>

              </div>

              {/* Submit Button & Legal Footer */}
              <div className="self-stretch flex flex-col justify-start items-start gap-5 sm:gap-6">
                <button
                  type="submit"
                  className="self-stretch h-12 sm:h-14 px-6 py-3.5 bg-red-700 hover:bg-red-800 active:scale-[0.99] rounded-xl flex justify-center items-center gap-2 cursor-pointer transition-all shadow-md shadow-red-700/20"
                >
                  <span className="justify-start text-white text-base sm:text-lg font-bold font-['Plus_Jakarta_Sans']">
                    Send Message
                  </span>
                  <FiArrowUpRight className="w-5 h-5 text-white shrink-0" />
                </button>

                <div className="self-stretch text-center justify-start">
                  <span className="text-neutral-500 text-xs sm:text-sm font-normal font-['Plus_Jakarta_Sans'] leading-5">
                    By submitting the form, you agree to our{" "}
                  </span>
                  <a
                    href="#"
                    className="text-red-700 text-xs sm:text-sm font-normal font-['Plus_Jakarta_Sans'] underline leading-5 hover:text-red-800 transition-colors"
                  >
                    Terms of Service
                  </a>
                  <span className="text-neutral-500 text-xs sm:text-sm font-normal font-['Plus_Jakarta_Sans'] leading-5">
                    {" "}and acknowledge our{" "}
                  </span>
                  <a
                    href="#"
                    className="text-red-700 text-xs sm:text-sm font-normal font-['Plus_Jakarta_Sans'] underline leading-5 hover:text-red-800 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>

            </motion.form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
