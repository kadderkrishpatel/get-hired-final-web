import SEO from "../components/common/SEO";
import ContactSection from "../components/sections/contact/ContactSection";
import BrandsSection from "../components/sections/home/BrandsSection";

const Contact = () => {
  return (
    <div className="w-full overflow-x-clip bg-cream min-h-screen">
      <SEO
        seo={{
          metaTitle: "Contact Us | Get-Hired - Master the US Career Arena",
          metaDescription:
            "We'd love to hear from you! Tell us what you're building and where the gaps are. We'll reply within one business day with a clear next step.",
          canonicalURL: `${import.meta.env.VITE_SITE_URL || window.location.origin}/contact`,
        }}
      />
      <ContactSection />
      <div className="pt-6 pb-12">
        <BrandsSection />
      </div>
    </div>
  );
};

export default Contact;
