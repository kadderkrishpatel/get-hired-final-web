// To connect your real WordPress site, replace this URL with your WordPress API endpoint:
// Example: "https://yourblogdomain.com/wp-json/wp/v2"
const WP_API_URL = import.meta.env.VITE_WORDPRESS_API_URL;

// High-quality mock posts acting as fallback data
const MOCK_WP_POSTS = [
  {
    id: 101,
    tag: "Resume",
    title: "7 ATS Mistakes That Get International Resumes Rejected",
    date: "Jun 24, 2026",
    rawDate: "2026-06-24",
    readTime: "6 min read",
    image: "/images/blog/Insights01.png",
    gradient: "from-blue-200 via-indigo-100 to-slate-200",
    emoji: "📄",
    featured: true,
    content: `
      <p>Landing a job in the US as an international candidate starts with a resume that survives the Application Tracking System (ATS). Most top companies use automated software to scan resumes before a human recruiter ever sees them. Unfortunately, up to 75% of resumes are rejected during this stage.</p>
      
      <h3>1. Using Complex Tables and Formatting</h3>
      <p>While a double-column resume with visual progress bars might look attractive to human eyes, ATS parsers often struggle to read them. The software reads left-to-right, meaning columns get merged and scrambled. Keep it simple and use a single-column layout.</p>
      
      <h3>2. Leaving Out Key Match Keywords</h3>
      <p>ATS algorithms rank resumes based on keyword density matching the job description. If the job description asks for "React.js" and "Redux", writing "Frontend developer with JavaScript framework experience" is a missed opportunity. Match the terms exactly as written.</p>
      
      <h3>3. Including Custom Headers and Footers</h3>
      <p>Do not place vital contact details like your email, phone number, or LinkedIn URL in the header or footer section. Some older ATS parsers ignore these sections completely, leaving you with an anonymous profile.</p>

      <h3>4. Saving as Unreadable File Formats</h3>
      <p>Unless the portal explicitly requests a PDF, standard ATS parsers do best with clean Microsoft Word (.docx) files. If you do use a PDF, ensure the text is highlightable and not converted into an image.</p>
    `,
    link: "/blog/101"
  },
  {
    id: 102,
    tag: "Interviews",
    title: 'How to Answer "Do You Need Sponsorship?" Without Losing the Offer',
    date: "Jun 10, 2026",
    rawDate: "2026-06-10",
    readTime: "8 min read",
    image: "/images/blog/Insights02.png",
    gradient: "from-emerald-100 via-teal-100 to-sky-200",
    emoji: "🤝",
    featured: false,
    content: `
      <p>One of the most intimidating questions for international students is the dreaded question about work authorization and visa sponsorship. If you handle this incorrectly, companies might filter you out immediately out of fear of legal costs or paperwork. Here is how to navigate it confidently.</p>
      
      <h3>The Legal Context</h3>
      <p>Under US law, you have the right to work during your OPT and STEM extension without requiring immediate visa sponsorship. This gives you a critical window of 1 to 3 years to prove your value before the H-1B lottery is even required.</p>
      
      <h3>Step-by-Step Response Strategy</h3>
      <p>Instead of answering with a simple "yes," outline your current authorization structure to put the employer's mind at ease:</p>
      <ul>
        <li><strong>Acknowledge your current authorization:</strong> Explain that you are fully authorized to work in the US for up to 3 years via OPT/STEM OPT, which requires zero cost or legal paperwork from their end.</li>
        <li><strong>Focus on immediate impact:</strong> Emphasize that you can start working immediately and deliver results, which mitigates their short-term risk.</li>
        <li><strong>Address the long term:</strong> Mention that while you will eventually need H-1B sponsorship down the road, it is a straightforward process that you can discuss once you've proven your fit.</li>
      </ul>
    `,
    link: "/blog/102"
  },
  {
    id: 103,
    tag: "Job Search",
    title: "The 90-Day OPT Job Search Plan, Week by Week",
    date: "May 28, 2026",
    rawDate: "2026-05-28",
    readTime: "10 min read",
    image: "/images/blog/insights03.png",
    gradient: "from-amber-100 via-orange-100 to-rose-100",
    emoji: "🗓️",
    featured: false,
    content: `
      <p>The 90-day unemployment clock starts ticking the day your OPT begins. To secure a role before your time runs out, you need a disciplined, metrics-driven approach. Here is your week-by-week strategy to transition from student to professional.</p>
      
      <h3>Weeks 1-3: Rebuilding the Foundation</h3>
      <p>Before submitting hundreds of applications, optimize your assets. Spend these weeks tailoring your resume, cleaning up your LinkedIn, and compiling a target list of 50 companies known to hire international candidates.</p>
      
      <h3>Weeks 4-7: Outbound Outreach & Networking</h3>
      <p>Cold applying has a 2% conversion rate. Increase your odds by sending personalized LinkedIn messages to alumni and engineering managers at your target companies. Request informational interviews rather than job referrals immediately.</p>
      
      <h3>Weeks 8-10: Interview Prep & Mock Runs</h3>
      <p>With responses coming in, practice your delivery. Conduct mock technical runs, prepare stories for behavioral loops (using the STAR method), and clarify your visa status explanation.</p>
    `,
    link: "/blog/103"
  },
  {
    id: 104,
    tag: "OPT & Visa",
    title: "Navigating STEM OPT Extension & Employer E-Verify Rules",
    date: "May 15, 2026",
    rawDate: "2026-05-15",
    readTime: "7 min read",
    image: "/images/blog/Insights01.png",
    gradient: "from-purple-100 via-violet-100 to-indigo-200",
    emoji: "🛡️",
    featured: false,
    content: `
      <p>Transitioning from initial 12-month OPT to the 24-month STEM extension requires specific employer eligibility. Here is what every STEM graduate must verify when evaluating tech job offers.</p>
      
      <h3>What is E-Verify?</h3>
      <p>E-Verify is an Internet-based system operated by DHS that allows enrolled employers to confirm the eligibility of their employees to work in the US. For STEM OPT extension, your employer MUST be enrolled in E-Verify.</p>

      <h3>Form I-983 Training Plan</h3>
      <p>Your employer must complete Form I-983 with you, detailing formal training goals, mentorship, and supervision. Ensuring your manager is prepared to sign this form prevents last-minute filing bottlenecks.</p>
    `,
    link: "/blog/104"
  },
  {
    id: 105,
    tag: "Networking",
    title: "How to Build a High-Converting LinkedIn Network for US Tech Roles",
    date: "Apr 22, 2026",
    rawDate: "2026-04-22",
    readTime: "5 min read",
    image: "/images/blog/Insights02.png",
    gradient: "from-cyan-100 via-sky-100 to-blue-200",
    emoji: "🚀",
    featured: false,
    content: `
      <p>Over 80% of unadvertised tech roles are filled through internal referrals. Learn how to write connection requests that get answered and convert connection notes into referral recommendations.</p>
      
      <h3>1. The 300-Character Hook</h3>
      <p>Never send blank connection requests. Reference shared university background, specific open-source work, or recent posts published by the senior engineer.</p>

      <h3>2. Conducting Effective Informational Interviews</h3>
      <p>Keep initial calls to 15 minutes. Ask about team structure, challenges, and tech stack—never demand a job on minute 1. Ask for referral advice near the conclusion of the conversation.</p>
    `,
    link: "/blog/105"
  },
  {
    id: 106,
    tag: "Resume",
    title: "Action Verbs & Impact Metrics: Transform Your Bullet Points",
    date: "Apr 04, 2026",
    rawDate: "2026-04-04",
    readTime: "6 min read",
    image: "/images/blog/insights03.png",
    gradient: "from-teal-100 via-emerald-100 to-green-200",
    emoji: "📊",
    featured: false,
    content: `
      <p>Vague resume bullet points like "responsible for writing code" fail to excite hiring managers. Discover the X-Y-Z formula recommended by top tech recruiters to showcase quantifiable impact.</p>

      <h3>The Google X-Y-Z Formula</h3>
      <p>Format every bullet point as: <em>Accomplished [X] as measured by [Y], by doing [Z]</em>.</p>
      <p>Example: "Optimized database query performance by 40% (Y) by refactoring legacy SQL joins into indexed Redis caches (Z), reducing end-user latency from 450ms to 90ms (X)."</p>
    `,
    link: "/blog/106"
  }
];

export const fetchLatestPosts = async (count = 3) => {
  if (!WP_API_URL) {
    return MOCK_WP_POSTS.slice(0, count);
  }

  try {
    const response = await fetch(`${WP_API_URL}/posts?_embed&per_page=${count}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    const posts = await response.json();
    return posts.map((post) => {
      const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
      const imageUrl = featuredMedia?.source_url || null;
      const category = post._embedded?.["wp:term"]?.[0]?.map(cat => cat.name)?.[0] || "General";
      
      const wordCount = post.content?.rendered?.split(/\s+/)?.length || 0;
      const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

      return {
        id: post.id,
        tag: Array.isArray(category) ? category[0] : category,
        title: post.title.rendered,
        date: new Date(post.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        rawDate: post.date,
        readTime: `${readTimeMinutes} min read`,
        image: imageUrl,
        gradient: "from-blue-200 via-indigo-100 to-slate-200",
        emoji: "📄",
        link: `/blog/${post.id}`,
      };
    });
  } catch (error) {
    console.error("Error fetching from WordPress, falling back to mock posts:", error);
    return MOCK_WP_POSTS.slice(0, count);
  }
};

export const fetchAllPosts = async ({ category = "All", search = "", sort = "newest" } = {}) => {
  let posts = [];

  if (!WP_API_URL) {
    posts = [...MOCK_WP_POSTS];
  } else {
    try {
      const response = await fetch(`${WP_API_URL}/posts?_embed&per_page=100`);
      if (response.ok) {
        const wpData = await response.json();
        posts = wpData.map((post) => {
          const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
          const imageUrl = featuredMedia?.source_url || null;
          const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "General";
          const wordCount = post.content?.rendered?.split(/\s+/)?.length || 0;
          const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

          return {
            id: post.id,
            tag: categoryName,
            title: post.title.rendered,
            date: new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            rawDate: post.date,
            readTime: `${readTimeMinutes} min read`,
            image: imageUrl,
            gradient: "from-blue-200 via-indigo-100 to-slate-200",
            emoji: "📄",
            content: post.content.rendered,
            link: `/blog/${post.id}`,
          };
        });
      } else {
        posts = [...MOCK_WP_POSTS];
      }
    } catch (e) {
      console.error("Error fetching all posts from WP:", e);
      posts = [...MOCK_WP_POSTS];
    }
  }

  // Filter by Category
  if (category && category !== "All") {
    posts = posts.filter(
      (p) => p.tag && p.tag.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by Search Query
  if (search.trim()) {
    const q = search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.tag && p.tag.toLowerCase().includes(q)) ||
        (p.content && p.content.toLowerCase().includes(q))
    );
  }

  // Sort by Date
  posts.sort((a, b) => {
    const dateA = new Date(a.rawDate || a.date).getTime();
    const dateB = new Date(b.rawDate || b.date).getTime();
    return sort === "oldest" ? dateA - dateB : dateB - dateA;
  });

  return posts;
};

export const fetchPostById = async (id) => {
  const numericId = Number(id);

  if (!WP_API_URL) {
    return MOCK_WP_POSTS.find(p => p.id === numericId) || null;
  }

  try {
    const response = await fetch(`${WP_API_URL}/posts/${id}?_embed`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    const post = await response.json();
    
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    const imageUrl = featuredMedia?.source_url || null;
    const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "General";
    
    const wordCount = post.content?.rendered?.split(/\s+/)?.length || 0;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    return {
      id: post.id,
      tag: category,
      title: post.title.rendered,
      date: new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      readTime: `${readTimeMinutes} min read`,
      image: imageUrl,
      gradient: "from-blue-200 via-indigo-100 to-slate-200",
      emoji: "📄",
      content: post.content.rendered,
      link: `/blog/${post.id}`,
    };
  } catch (error) {
    console.error(`Error fetching post ${id} from WordPress, falling back to mock post:`, error);
    return MOCK_WP_POSTS.find(p => p.id === numericId) || null;
  }
};

