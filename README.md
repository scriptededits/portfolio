# ⚡ SCRIPTED EDITS — Neo-Brutalist Video Editor Portfolio

A high-voltage, responsive portfolio website built with pure **HTML5**, **CSS3**, **JavaScript**, and **GSAP (ScrollTrigger)** for **Shibanshi (Scripted Edits)**.

---

## 🎨 Visual Aesthetic & Features
- **Authentic Neo-Brutalism**: Heavy black borders (`3px`/`4px`), hard-edge drop shadows (`box-shadow: 8px 8px 0px #000`), punchy accent colors (Acid Yellow, Hot Magenta, Mint Green, Cyan), and sticker tags.
- **GSAP & ScrollTrigger Animations**:
  - Hero staggered entrance animation.
  - ScrollTriggered slide-ins and bounce reveals for bio, service pillars, and project monitors.
  - Infinite software & skill marquee ticker (`Premiere Pro`, `After Effects`, `DaVinci Resolve`, `Sound Design`, etc.).
- **Google Drive Project Showcase**:
  - Custom video monitor cassettes with timecodes (`TC 00:04:12:09`), aspect ratio indicators (`16:9`, `9:16`), and recording badges (`● REC`).
  - Interactive project filtering by category (`YouTube Longform`, `Shorts & Reels`, `Commercial & Ad`, `Cinematic & Motion`).
  - One-click **"WATCH ON DRIVE ↗"** buttons and quick copy-link buttons.
  - Master Archive banner linking to the full Google Drive vault.
- **Micro-Interactions**:
  - Custom brutalist trailing cursor.
  - Dynamic scroll progress bar at the top of the viewport.
  - 3D interactive subtle card tilt on hover.
  - One-click copy email button with instant toast notification.

---

## 📁 File Structure
```
portfolio/
├── index.html        # Main HTML structure, project cards, and content
├── style.css         # Neo-brutalist CSS design system & responsive rules
├── script.js         # GSAP timelines, ScrollTrigger, custom cursor, & filters
└── README.md         # Documentation & setup guide
```

---

## 🛠️ How to Customize Your Google Drive Links

All projects are organized in `index.html`. To link your actual videos:

1. Open `index.html`.
2. Locate any project card under the `<div class="projects-grid">` section.
3. Replace the placeholder URL `https://drive.google.com` with your Google Drive shareable link:

```html
<!-- Inside any project card in index.html -->
<a href="YOUR_GOOGLE_DRIVE_VIDEO_LINK_HERE" target="_blank" rel="noopener noreferrer" class="btn btn-project-drive">
  WATCH ON DRIVE ↗
</a>
<button class="btn btn-icon copy-link-btn" data-link="YOUR_GOOGLE_DRIVE_VIDEO_LINK_HERE" title="Copy Drive Link">
  🔗
</button>
```

4. For the **Master Drive Folder** buttons (in the hero and banner), update `masterDriveBtn` and `btn-banner` with your main portfolio folder link.

---

## 🌐 How to Enable Free GitHub Pages (Make It Live on the Web!)

You can host this site for free directly on GitHub Pages in 30 seconds:

1. Go to your repository on GitHub: **[github.com/scriptededits/portfolio](https://github.com/scriptededits/portfolio)**
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** → **Branch**, select **`main`** and folder **`/ (root)`**.
5. Click **Save**.
6. In about 60 seconds, your site will be live at:
   `https://scriptededits.github.io/portfolio/`

---

## 💻 Local Preview
To preview locally on your Mac:
- Simply double click `index.html` to open it in Chrome, Safari, or Brave.
- Or run a quick local server:
  ```bash
  python3 -m http.server 8000
  ```
  Then visit `http://localhost:8000`.
