// ============================================================
// SHIBANSHI — SCRIPT, VIDEO PLAYERS & CINEMA MODAL
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimation();
  initFilters();
  initCopyEmail();
  initInCardVideoPlayers();
  initCinemaModal();
});

/* ------------------------------------------------------------
   1. Clean Hero Entrance Animation
   ------------------------------------------------------------ */
function initHeroAnimation() {
  if (typeof gsap === "undefined") return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".status-pill", {
    opacity: 0,
    y: 10,
    duration: 0.5,
  })
  .from(".hero-heading", {
    opacity: 0,
    y: 20,
    duration: 0.7,
  }, "-=0.2")
  .from(".hero-subtext", {
    opacity: 0,
    y: 15,
    duration: 0.6,
  }, "-=0.3")
  .from(".hero-actions .btn", {
    opacity: 0,
    y: 10,
    duration: 0.4,
    stagger: 0.08,
  }, "-=0.3")
  .from(".stat-item", {
    opacity: 0,
    y: 10,
    duration: 0.5,
    stagger: 0.08,
  }, "-=0.2");
}

/* ------------------------------------------------------------
   2. In-Card Interactive Video Players
   ------------------------------------------------------------ */
function initInCardVideoPlayers() {
  const playerContainers = document.querySelectorAll(".card-video-player");

  playerContainers.forEach((container) => {
    const video = container.querySelector(".video-element");
    const playBtn = container.querySelector(".play-btn-circle");
    const soundBtn = container.querySelector(".sound-toggle-btn");
    const progressFill = container.querySelector(".video-progress-fill");
    const cinemaBtn = container.querySelector(".cinema-mode-btn");

    if (!video) return;

    // Start video muted by default so browsers allow playback
    video.muted = true;

    // Toggle Play / Pause on click
    const togglePlay = (e) => {
      // Avoid triggering when clicking sound toggle or cinema mode button
      if (e.target.closest(".sound-toggle-btn") || e.target.closest(".cinema-mode-btn")) return;

      if (video.paused) {
        // Pause all other playing videos first so sounds don't overlap
        pauseAllVideos(video);
        video.play().then(() => {
          container.classList.add("is-playing");
        }).catch(() => {});
      } else {
        video.pause();
        container.classList.remove("is-playing");
      }
    };

    if (playBtn) playBtn.addEventListener("click", togglePlay);
    container.addEventListener("click", togglePlay);

    // Sound toggle
    if (soundBtn) {
      soundBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (!video.muted) {
          container.classList.add("is-unmuted");
          if (video.paused) {
            pauseAllVideos(video);
            video.play();
            container.classList.add("is-playing");
          }
        } else {
          container.classList.remove("is-unmuted");
        }
      });
    }

    // Cinema Mode button in card
    if (cinemaBtn) {
      cinemaBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const videoSrc = container.getAttribute("data-video");
        const title = container.getAttribute("data-title") || "";
        const desc = container.getAttribute("data-desc") || "";
        openCinema(videoSrc, title, desc);
      });
    }

    // Progress bar update
    if (progressFill) {
      video.addEventListener("timeupdate", () => {
        if (!video.duration) return;
        const pct = (video.currentTime / video.duration) * 100;
        progressFill.style.width = `${pct}%`;
      });

      video.addEventListener("ended", () => {
        container.classList.remove("is-playing");
        progressFill.style.width = "0%";
      });
    }
  });

  // Handle AI Card clicks (open Picsart or local file)
  const aiCards = document.querySelectorAll(".ai-player-card");
  aiCards.forEach((card) => {
    card.addEventListener("click", () => {
      const extLink = card.getAttribute("data-external");
      if (extLink) {
        window.open(extLink, "_blank");
      }
    });
  });
}

function pauseAllVideos(exceptVideo = null) {
  const allVideos = document.querySelectorAll(".video-element");
  allVideos.forEach((v) => {
    if (v !== exceptVideo && !v.paused) {
      v.pause();
      const parent = v.closest(".card-video-player");
      if (parent) parent.classList.remove("is-playing");
    }
  });
}

/* ------------------------------------------------------------
   3. Cinema / Theater Lightbox Modal
   ------------------------------------------------------------ */
let modalVideo = null;
let cinemaModal = null;
let cinemaTitle = null;
let cinemaDesc = null;

function initCinemaModal() {
  cinemaModal = document.getElementById("cinemaModal");
  modalVideo = document.getElementById("modalVideoPlayer");
  cinemaTitle = document.getElementById("cinemaTitle");
  cinemaDesc = document.getElementById("cinemaDesc");

  const closeBtn = document.getElementById("closeCinemaBtn");
  const backdrop = cinemaModal ? cinemaModal.querySelector(".cinema-backdrop") : null;

  if (closeBtn) closeBtn.addEventListener("click", closeCinema);
  if (backdrop) backdrop.addEventListener("click", closeCinema);

  // Keyboard shortcut: Escape to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cinemaModal && cinemaModal.classList.contains("open")) {
      closeCinema();
    }
  });

  // "Open Cinema Mode" buttons in card footer
  const modalBtns = document.querySelectorAll(".open-modal-btn");
  modalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".project-card");
      if (!card) return;
      const player = card.querySelector(".card-video-player");
      if (!player) return;

      const videoSrc = player.getAttribute("data-video");
      const title = player.getAttribute("data-title") || "";
      const desc = player.getAttribute("data-desc") || "";
      openCinema(videoSrc, title, desc);
    });
  });
}

function openCinema(src, title, desc) {
  if (!cinemaModal || !modalVideo || !src) return;

  // Pause in-card videos
  pauseAllVideos();

  modalVideo.src = src;
  modalVideo.muted = false; // unmuted by default in cinema mode!

  if (cinemaTitle) cinemaTitle.textContent = title;
  if (cinemaDesc) cinemaDesc.textContent = desc;

  cinemaModal.classList.add("open");
  document.body.style.overflow = "hidden"; // Prevent background scroll

  modalVideo.play().catch(() => {});
}

function closeCinema() {
  if (!cinemaModal || !modalVideo) return;

  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();

  cinemaModal.classList.remove("open");
  document.body.style.overflow = "";
}

/* ------------------------------------------------------------
   4. Clean Category Filters
   ------------------------------------------------------------ */
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      cards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
          // If video was playing in hidden card, pause it
          const vid = card.querySelector("video");
          if (vid && !vid.paused) {
            vid.pause();
            const parent = card.querySelector(".card-video-player");
            if (parent) parent.classList.remove("is-playing");
          }
        }
      });
    });
  });
}

/* ------------------------------------------------------------
   5. Copy Email Toast Notification
   ------------------------------------------------------------ */
function initCopyEmail() {
  const toast = document.getElementById("toast");
  const emailBtns = document.querySelectorAll(".copy-email-btn");
  let timer;

  function showToast(text) {
    if (!toast) return;
    const toastText = toast.querySelector(".toast-text");
    if (toastText) toastText.textContent = text;

    toast.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  emailBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email") || "edits.shibanshi@gmail.com";
      navigator.clipboard.writeText(email)
        .then(() => showToast(`Copied ${email}!`))
        .catch(() => showToast("Email: edits.shibanshi@gmail.com"));
    });
  });
}
