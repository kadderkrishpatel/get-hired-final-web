import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import DOMPurify from "dompurify";
import { fetchPostById } from "../services/wordpress";
import SEO from "../components/common/SEO";
import OutlineButton from "../components/ui/OutlineButton";

const htmlToText = (html = "") => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      const data = await fetchPostById(id);
      setPost(data);
      setLoading(false);
    };
    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream/40 dark:bg-dark-bg/40 flex flex-col justify-center items-center py-24">
        {/* Sleek skeleton loader */}
        <div className="w-full max-w-3xl px-5 sm:px-8 space-y-6 animate-pulse">
          <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-10 w-3/4 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
          <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-72 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="space-y-3 pt-4">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-cream/40 dark:bg-dark-bg/40 flex flex-col justify-center items-center py-24 px-5 text-center">
        <h2 className="text-2xl font-bold text-navy dark:text-cream">Article Not Found</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">The article you are looking for does not exist or has been removed.</p>
        <Link to="/" className="mt-6">
          <OutlineButton>Back to Home</OutlineButton>
        </Link>
      </div>
    );
  }

  const postTitle = htmlToText(post.title);
  const postDescription = htmlToText(post.content).substring(0, 150);
  const sanitizedContent = DOMPurify.sanitize(post.content || "");

  return (
    <div className="min-h-screen bg-cream/40 dark:bg-dark-bg/40 pt-[90px] pb-24">
      <SEO
        seo={{
          metaTitle: `${postTitle} | Get-Hired Career Insights`,
          metaDescription: postDescription,
          canonicalURL: `${window.location.origin}/blog/${post.id}`,
        }}
      />

      <article className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Back navigation */}
        <div className="mb-8 flex items-center gap-4">
          <Link to="/blog">
            <button className="group inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors duration-200 cursor-pointer">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Blogs
            </button>
          </Link>
        </div>

        {/* Post category badge */}
        <span className="inline-block bg-lilac dark:bg-lilac/20 text-navy dark:text-lilac text-xs font-bold px-3.5 py-1.5 rounded-lg mb-4">
          {post.tag}
        </span>

        {/* Title */}
        <h1 
          className="text-3xl sm:text-4xl md:text-[44px] font-bold text-navy dark:text-cream leading-tight tracking-tight mb-4">
          {postTitle}
        </h1>

        {/* Date & read time */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 border-b border-slate-200/60 dark:border-white/10 pb-6">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        {/* Featured Image */}
        {post.image ? (
          <div className="h-64 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden shadow-lg mb-10">
            <img src={post.image} alt={postTitle} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className={`h-64 sm:h-96 md:h-[420px] rounded-2xl bg-gradient-to-br ${post.gradient} flex items-center justify-center shadow-lg mb-10`}>
            <span className="text-8xl opacity-80">{post.emoji}</span>
          </div>
        )}

        {/* Content body */}
        <div 
          className="prose prose-slate dark:prose-invert max-w-none text-navy/80 dark:text-slate-200/90 
            text-base sm:text-[17px] leading-relaxed space-y-6 
            prose-h3:text-xl prose-h3:font-semibold prose-h3:text-navy dark:prose-h3:text-cream prose-h3:mt-8 prose-h3:mb-3
            prose-p:mb-5
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </article>
    </div>
  );
};

export default BlogDetail;
