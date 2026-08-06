# Get-Hired — React Website

> **Master the US Career Arena** — A production-ready React + Vite website for Get-Hired.

## Tech Stack

- React 18 + Vite
- Tailwind CSS v4
- Framer Motion (motion/react)
- React Router v6
- i18next (all content in `en.json`)
- Axios (API calls)
- React Helmet Async (SEO)
- React Toastify (notifications)
- WordPress REST API (blog posts)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build
```

## Environment Variables

Create a `.env` file in the root:

```env
VITE_IMAGES="http://localhost:5173"
VITE_API_URL="http://localhost:5000"
VITE_SITE_URL="https://www.gethired.com"
VITE_WORDPRESS_API_URL="https://yourblog.wordpress.com/wp-json/wp/v2"
VITE_LINKEDIN_URL="https://www.linkedin.com/company/get-hired-us"
VITE_INSTAGRAM_URL="https://www.instagram.com/gethired.us/"
VITE_X_URL="https://twitter.com/gethired"
VITE_YOUTUBE_URL="https://www.youtube.com/@gethired"
```

## Folder Structure

```
gethired_react_website/
├── App.jsx                   ← Routes
├── i18n.jsx                  ← i18next setup
├── index.html
├── .env
├── tailwind.config.js
├── public/
│   └── images/
│       ├── hero/             ← Mobile.png, chips, job cards
│       ├── brands/           ← marquee logos
│       ├── capabilities/     ← accordion images
│       ├── stories/          ← success story images
│       ├── blog/             ← insight card covers
│       └── why/              ← section background
└── src/
    ├── main.jsx              ← entry (HelmetProvider + ThemeProvider + BrowserRouter)
    ├── context/
    │   └── ThemeContext.jsx  ← light/dark mode state
    ├── locales/en.json       ← ALL website text + image paths
    ├── services/
    │   ├── api.js            ← axios instance
    │   └── wordpress.js      ← WordPress REST API + mock fallback
    ├── styles/index.css      ← Tailwind tokens + dark mode + global CSS
    ├── pages/
    │   ├── Home.jsx
    │   ├── BlogList.jsx
    │   ├── BlogDetail.jsx
    │   ├── Contact.jsx
    │   └── NotFound.jsx
    └── components/
        ├── layouts/          ← MainLayout (Navbar + Outlet + Footer)
        ├── common/           ← Navbar, Footer, SEO, ScrollToTop
        │   └── hooks/        ← useArrayTranslation, useScrollSpy
        ├── animations/
        │   └── home/         ← AnimatedLogoMarquee, CapabilityVideo, StatCounter
        ├── sections/
        │   ├── hero/         ← HeroSection, HeroContent, HeroVisual, HeroClouds
        │   ├── home/         ← BrandsSection, CapabilitiesSection, WhyGetHiredSection,
        │   │                    SuccessStoriesSection, ConsultingEcosystemSection,
        │   │                    InsightsSection, GetStartedSection
        │   └── contact/      ← ContactSection
        └── ui/               ← Button, OutlineButton, TextLink, SectionBadge,
                                 SectionHeading, BlogCard, StoryCard, EcosystemCard, Icons
```

## How Content Works

All text lives in `src/locales/en.json`. Use the `useArrayTranslation` hook:

```jsx
const heroSection = useArrayTranslation("hero_section");
// heroSection.title_line1, heroSection.description ...
```

To change ANY text → edit `en.json` only. No JSX changes needed.

## How Images Work

Image paths are stored in `en.json`, built with `VITE_IMAGES` base from `.env`:

```jsx
const assetBaseUrl = import.meta.env.VITE_IMAGES;
<img src={`${assetBaseUrl}${story.image}`} />
```

To swap an image — overwrite the file in `public/images/` with the same name. To use a CDN later, set `VITE_IMAGES="https://cdn.gethired.com"` — zero code changes.

## Dark Mode

Theme toggle is in the Navbar (sun/moon icon). State is saved in `localStorage` so it persists on refresh. Powered by `ThemeContext` + Tailwind `darkMode: "class"`.

## Blog (WordPress)

Blog posts are fetched from WordPress REST API via `src/services/wordpress.js`.

- If `VITE_WORDPRESS_API_URL` is set → fetches live posts
- If not set or API fails → falls back to built-in mock posts automatically

## Adding a New Page

1. Create sections in `src/components/sections/<pagename>/`
2. Create `src/pages/<PageName>.jsx`
3. Register the route in `App.jsx`
4. Add the link to `nav_links` in `en.json`

## Deploy

```bash
npm run build   # outputs to dist/
```

Deploy `dist/` to Vercel, Netlify, or AWS Amplify. Set all `.env` variables in the hosting dashboard.
