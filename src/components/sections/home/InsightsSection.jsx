import { useState, useEffect } from "react";
import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import SectionHeading from "../../ui/SectionHeading";
import OutlineButton from "../../ui/OutlineButton";
import BlogCard from "../../ui/BlogCard";
import Reveal from "../../animations/Reveal";
import { motion } from "motion/react";
import { fadeLeft, fadeRight, staggerContainer, VIEWPORT_ONCE } from "../../animations/motionVariants";
import { fetchLatestPosts } from "../../../services/wordpress";

const InsightsSection = () => {
  const insightsSection = useArrayTranslation("insights_section");
  const insightsPosts = useArrayTranslation("insights_posts");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const wpPosts = await fetchLatestPosts(3);
      if (wpPosts && wpPosts.length > 0) {
        setPosts(wpPosts);
      } else {
        // Fallback to static translated posts from locales/en.json with mock IDs 101, 102, 103
        const mappedStaticPosts = (insightsPosts || []).map((post, idx) => ({
          ...post,
          id: 101 + idx
        }));
        setPosts(mappedStaticPosts);
      }
      setLoading(false);
    };

    if (Array.isArray(insightsPosts) && insightsPosts.length > 0) {
      loadPosts();
    }
  }, []);

  return (
    <section id="blog" className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      {/* Heading row */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <Reveal variants={fadeLeft}>
          <SectionHeading
            label={insightsSection?.label}
            title={insightsSection?.title}
          />
        </Reveal>
        <Reveal variants={fadeRight}>
          <OutlineButton className="shrink-0">
            {insightsSection?.cta}
          </OutlineButton>
        </Reveal>
      </div>

      {/* Post cards — stagger in one by one */}
      {loading ? (
        <div className="mt-12 flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {Array.isArray(posts) &&
            posts.map((post) => <BlogCard key={post.title || post.id} post={post} />)}
        </motion.div>
      )}
    </section>
  );
};

export default InsightsSection;
