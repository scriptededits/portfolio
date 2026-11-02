# Shibanshi — Video Editor & AI Storyteller Portfolio

A clean, modern, and high-performance video editor portfolio with **direct in-site video playback**, cinema theater mode, and Google Drive project integration.

---

## 🎬 Video Player Features
- **In-Site Video Playback**: Visitors can play your YouTube Shorts and edits directly on the page without redirecting or opening new tabs.
- **Cinema / Theater Lightbox Mode**: Click any video or the "Cinema" button to open a high-resolution vertical 9:16 theater modal with unmuted audio, scrubber, and fullscreen capabilities.
- **Audio & Mute Toggle**: Dedicated toggle on every video card to enable/disable sound.
- **Fast-Start H.264 Web Streaming**: Videos are optimized with fast-start streaming headers so they start playing instantly.
- **AI Storytelling Integration**: Dedicated cards showcasing your generative AI video creations with Picsart and local video support.

---

## 📁 File Structure
```
portfolio/
├── assets/
│   └── videos/
│       ├── thar-sunset.mp4       # Sunset Thar Edit (H.264 + AAC 1080x1920)
│       └── thar-viral.mp4        # Dynamic Thar Edit (H.264 + AAC 1080x1920)
├── index.html                    # Main HTML & Video Cards
├── style.css                     # Modern dark theme & video player styles
├── script.js                     # In-card player logic, cinema modal, & filters
└── README.md                     # Documentation
```

---

## 📹 How to Add More Local Videos (e.g. AI MP4s)
1. Export or download your AI video from Picsart/Runway as an `.mp4` file.
2. Place the video file inside `assets/videos/` (e.g., `assets/videos/ai-story-1.mp4`).
3. In `index.html`, replace the card's visual container with a `<video>` tag matching the existing cards:
```html
<video class="video-element" src="assets/videos/ai-story-1.mp4" poster="your-poster.jpg" preload="metadata" playsinline loop></video>
```

---

## 🌐 Free Hosting on GitHub Pages
1. Go to your repo: [github.com/scriptededits/portfolio/settings/pages](https://github.com/scriptededits/portfolio/settings/pages)
2. Under **Build and deployment** → **Branch**, select **`main`** and **`/(root)`**.
3. Click **Save**.
4. Your site will be live at: `https://scriptededits.github.io/portfolio/`
