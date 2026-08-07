import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { fadeUp } from "../animations/motionVariants";

const htmlToText = (html = "") => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Blog/insight card (image path comes from en.json or WP REST API)
// Inherits the scroll-stagger trigger from the parent grid via variants.
const BlogCard = ({ post }) => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES || "";
  const imageUrl = post?.image?.startsWith("http")
    ? post.image
    : `${assetBaseUrl}${post?.image}`;
  const postTitle = htmlToText(post?.title);

  return (
    <Link to={`/blog/${post?.id}`} className="block group cursor-pointer">
      <motion.article variants={fadeUp}>
        <div className="h-48 rounded-xl overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={postTitle}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <span className="inline-block mt-4 bg-lilac text-navy text-xs font-bold px-3 py-1.5 rounded-lg">
          {post?.tag}
        </span>

        <h3 
          className="mt-3 text-xl sm:text-[22px] leading-snug font-semibold text-navy group-hover:text-primary transition-colors">
          {postTitle}
        </h3>

        <p className="mt-3 text-xs text-slate-400 font-semibold">
          {post?.date} · {post?.readTime}
        </p>
      </motion.article>
    </Link>
  );
};

export default BlogCard;
