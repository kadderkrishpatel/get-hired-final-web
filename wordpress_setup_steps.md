# Step-by-Step WordPress Headless Backend Configuration Guide

This guide walks you through setting up a fresh or existing self-hosted WordPress site to work with your React frontend.

---

## Step 1: Enable Pretty Permalinks
This is required to activate the clean `/wp-json/` REST API paths.

1. Log in to your **WordPress Admin Dashboard**.
2. In the left-side menu, go to **Settings > Permalinks**.
3. Under **Common Settings**, select **Post name**.
4. Click **Save Changes** at the bottom of the page.

---

## Step 2: Enable CORS (Prevent Browser Blockages)
You must allow your React website to request data from your WordPress site.

1. In your WordPress Admin Dashboard, go to **Appearance > Theme File Editor**.
2. In the right-hand list of files, locate and click on **Theme Functions (functions.php)**.
3. Scroll to the very bottom of the file and paste this code:
   ```php
   // Enable CORS for React Frontend API Requests
   function add_cors_http_header(){
       header("Access-Control-Allow-Origin: *");
       header("Access-Control-Allow-Methods: GET");
       header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
   }
   add_action('init', 'add_cors_http_header');
   ```
4. Click the **Update File** button.

---

## Step 3: Create Categories to Match Your React Frontend
Your React layout has specific categories (like "Resume", "Interviews", "Job Search"). Create these in WordPress.

1. Go to **Posts > Categories** in the left menu.
2. Under **Add New Category**:
   * **Name**: Type `Resume` (Match spelling and capitalization).
   * Leave other fields blank.
   * Click **Add New Category**.
3. Repeat the process to add:
   * `Interviews`
   * `Job Search`

---

## Step 4: Write and Publish Your First Blog Post

1. Go to **Posts > Add New**.
2. **Title**: Enter your title (e.g., *7 ATS Mistakes That Get International Resumes Rejected*).
3. **Body Content**: Write or paste your article text. Use standard headers (`Heading 3` is recommended) and paragraphs.
4. On the right-hand settings panel, select the **Post** tab:
   * **Categories**: Check the box for **Resume**.
   * **Featured Image**: Click *Set featured image*, upload your image (e.g., a photo of someone reading a resume), and click *Set featured image*.
5. Click the blue **Publish** button at the top right, and click **Publish** again to confirm.

---

## Step 5: Test the WordPress API Endpoint
Verify that your post is visible in the public JSON feed.

1. Open a new browser tab and navigate to:
   ```
   https://<your-wordpress-domain>/wp-json/wp/v2/posts?_embed
   ```
   *(Replace `<your-wordpress-domain>` with your actual WordPress site URL, e.g., `blog.gethired.com`)*
2. You should see a JSON block of text showing the details of the post you just published, including your title, date, categories, and featured image URL.

---

## Step 6: Connect to React Frontend

1. Open your React codebase.
2. Open the file **[wordpress.js](file:///C:/Users/Krish%20Patel/Desktop/Get%20Hired%20App%20development/gethired_react_website/src/services/wordpress.js)**.
3. Locate line 3 and replace the empty string with your WordPress API base URL:
   ```javascript
   const WP_API_URL = "https://<your-wordpress-domain>/wp-json/wp/v2";
   ```
4. Save the file. Your website is now fully connected to WordPress!
