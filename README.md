# Shibanshi — Video Editor Portfolio

A clean, modern, and minimalist portfolio website built with HTML5, CSS3, JavaScript, and subtle GSAP ScrollTrigger animations.

Designed specifically for **Shibanshi (Scripted Edits)** to showcase video editing projects with direct Google Drive links.

---

## 🌟 Highlights
- **Clean & Minimal Aesthetic**: Dark obsidian background with subtle borders, glassmorphic floating navigation, and crisp typography.
- **Google Drive Project Integration**: Cards designed for quick preview with one-click **"Watch on Google Drive"** buttons.
- **Smooth GSAP & ScrollTrigger**: Subtle fade-and-rise animations on page load and as you scroll down.
- **Interactive Project Filters**: Instant filter tabs for All, YouTube, Short-Form (9:16), and Commercial.
- **Copy Email**: One-click email copy with clean toast feedback.
- **Responsive**: Fully optimized for mobile phones, tablets, and desktop displays.

---

## 📁 File Structure
```
portfolio/
├── index.html        # Main structure, bio, and project cards
├── style.css         # Modern dark-mode styling & responsive rules
├── script.js         # GSAP animations, filter tabs, & copy button
└── README.md         # Documentation
```

---

## 🔗 How to Update Your Google Drive Links
In `index.html`, find the `<div class="projects-grid">` section. Update the placeholder links (`https://drive.google.com`) with your actual Google Drive video share links:

```html
<a href="YOUR_ACTUAL_DRIVE_LINK_HERE" target="_blank" rel="noopener noreferrer" class="drive-link-btn">
  <span>Watch on Google Drive</span>
  ...
</a>
```

To update your **Master Drive Reel** link at the top, change the `href` in:
```html
<a href="YOUR_MASTER_DRIVE_FOLDER_LINK" target="_blank" class="btn btn-secondary">
  Master Drive Reel ↗
</a>
```

---

## 🌐 Free Hosting on GitHub Pages
1. Go to your repo: [github.com/scriptededits/portfolio/settings/pages](https://github.com/scriptededits/portfolio/settings/pages)
2. Under **Build and deployment** → **Branch**, select **`main`** and **`/(root)`**.
3. Click **Save**.
4. Your site will be live at: `https://scriptededits.github.io/portfolio/`
