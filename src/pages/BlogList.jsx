import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { fetchAllPosts } from "../services/wordpress";
import SEO from "../components/common/SEO";
import BlogCard from "../components/ui/BlogCard";
import SectionBadge from "../components/ui/SectionBadge";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "../components/animations/motionVariants";

const htmlToText = (html = "") => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const CATEGORIES = ["All", "Resume", "Interviews", "Job Search", "OPT & Visa", "Networking"];

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "oldest"

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const data = await fetchAllPosts({
        category: selectedCategory,
        search: searchQuery,
        sort: sortOrder,
      });
      setPosts(data);
      setLoading(false);
    };

    const timer = setTimeout(() => {
      loadPosts();
    }, 150);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortOrder]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortOrder("newest");
  };

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const gridPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-cream/40 pt-[100px] pb-24">
      <SEO
        seo={{
          metaTitle: "Career Insights & Blog | Get-Hired",
          metaDescription:
            "Expert advice, resume optimization strategies, interview tips, and visa guidance for international candidates.",
          canonicalURL: `${window.location.origin}/blog`,
        }}
      />

      <main className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionBadge>Career Insights & Advice</SectionBadge>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-navy tracking-tight leading-tight">
            Latest Articles & Guides
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Proven strategies for international students navigating US job hunting, resume screening, interviews, and visa extensions.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80 mb-12 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <svg
                className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, keyword, or ATS tips..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 text-navy placeholder-slate-400 text-sm font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold bg-slate-200 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Date Sorting Filter Dropdown */}
            <div className="flex items-center gap-3 shrink-0">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                Filter by Date:
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 text-navy text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0">
              Category:
            </span>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Showing <span className="text-navy font-bold">{posts.length}</span> articles
            {selectedCategory !== "All" && (
              <span> in <span className="text-primary font-bold">{selectedCategory}</span></span>
            )}
            {searchQuery && (
              <span> matching &quot;<span className="text-primary font-bold">{searchQuery}</span>&quot;</span>
            )}
          </p>

          {(selectedCategory !== "All" || searchQuery || sortOrder !== "newest") && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-slate-300 px-5">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-navy">No matching articles found</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any posts matching your search criteria or category filter. Try clearing your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-md shadow-primary/20 cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Post Card (shown when no specific search is active or on top result) */}
            {featuredPost && !searchQuery && selectedCategory === "All" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200/70 grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto overflow-hidden relative">
                    <img
                      src={
                        featuredPost.image?.startsWith("http")
                          ? featuredPost.image
                          : `${import.meta.env.VITE_IMAGES || ""}${featuredPost.image}`
                      }
                      alt={htmlToText(featuredPost.title)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-lg shadow-md">
                      Featured Post
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <span className="inline-block bg-lilac text-navy text-xs font-bold px-3 py-1 rounded-lg mb-4">
                        {featuredPost.tag}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-navy group-hover:text-primary transition-colors leading-tight">
                        <Link to={`/blog/${featuredPost.id}`}>
                          {htmlToText(featuredPost.title)}
                        </Link>
                      </h2>
                      <p className="mt-4 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {htmlToText(featuredPost.content).substring(0, 180)}...
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        {featuredPost.date} · {featuredPost.readTime}
                      </span>
                      <Link
                        to={`/blog/${featuredPost.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
                      >
                        Read Full Article →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid of Articles */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {(searchQuery || selectedCategory !== "All" ? posts : gridPosts).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogList;
