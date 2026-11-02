// ============================================================
// SCRIPTED EDITS (SHIBANSHI) — INTERACTIVE GSAP & SCROLLTRIGGER
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    initGSAPAnimations();
  }

  initCustomCursor();
  initScrollProgress();
  initProjectFiltering();
  initClipboardHandlers();
  initCardTilt();
});

/* ------------------------------------------------------------
   1. GSAP & SCROLLTRIGGER TIMELINES
   ------------------------------------------------------------ */
function initGSAPAnimations() {
  // Hero Entrance Timeline
  const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTL
    .from(".hero-badge-row .brutal-tag", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
    })
    .from(
      ".hero-title",
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.3"
    )
    .from(
      ".highlight-box",
      {
        scale: 0.8,
        rotation: 0,
        duration: 0.4,
        ease: "back.out(2)",
      },
      "-=0.4"
    )
    .from(
      ".hero-desc",
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.3"
    )
    .from(
      ".hero-actions .btn",
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      },
      "-=0.3"
    )
    .from(
      ".metric-card",
      {
        scale: 0.9,
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)",
      },
      "-=0.2"
    );

  // About Section ScrollTrigger
  gsap.from(".main-bio", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".pillar-card", {
    scrollTrigger: {
      trigger: ".pillars-column",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    x: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.7,
    ease: "power2.out",
  });

  // Project Cards Stagger ScrollTrigger
  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 60,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: "back.out(1.2)",
  });

  // Master Drive Banner Pop
  gsap.from(".master-drive-banner", {
    scrollTrigger: {
      trigger: ".master-drive-banner",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    scale: 0.92,
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.4)",
  });

  // Services Grid Stagger
  gsap.from(".service-box", {
    scrollTrigger: {
      trigger: ".services-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: "power2.out",
  });

  // Contact Section Box Entrance
  gsap.from(".contact-box", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });
}

/* ------------------------------------------------------------
   2. CUSTOM BRUTALIST CURSOR
   ------------------------------------------------------------ */
function initCustomCursor() {
  const dot = document.getElementById("cursorDot");
  const outline = document.getElementById("cursorOutline");

  // Skip on touch screens
  if (!dot || !outline || window.matchMedia("(pointer: coarse)").matches) {
    if (dot) dot.style.display = "none";
    if (outline) outline.style.display = "none";
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let outlineX = -100;
  let outlineY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Smooth trail for outer cursor ring
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;

    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(animateOutline);
  }
  requestAnimationFrame(animateOutline);

  // Expand cursor on interactive elements
  const hoverables = document.querySelectorAll(
    "a, button, .project-card, .metric-card, .pillar-card, .service-box"
  );
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => outline.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => outline.classList.remove("cursor-hover"));
  });
}

/* ------------------------------------------------------------
   3. SCROLL PROGRESS BAR
   ------------------------------------------------------------ */
function initScrollProgress() {
  const progressBar = document.getElementById("progressBar");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* ------------------------------------------------------------
   4. PROJECT CATEGORY FILTERING
   ------------------------------------------------------------ */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterVal === "all" || category === filterVal) {
          card.style.display = "flex";
          if (typeof gsap !== "undefined") {
            gsap.fromTo(
              card,
              { opacity: 0, scale: 0.95, y: 15 },
              { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power2.out" }
            );
          }
        } else {
          card.style.display = "none";
        }
      });

      // Refresh ScrollTrigger calculations
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    });
  });
}

/* ------------------------------------------------------------
   5. CLIPBOARD COPY & TOAST NOTIFICATION
   ------------------------------------------------------------ */
function initClipboardHandlers() {
  const toast = document.getElementById("toast");
  const toastMsg = toast ? toast.querySelector(".toast-msg") : null;
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // Copy email buttons
  const emailBtns = document.querySelectorAll(".copy-email-btn");
  emailBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email") || "edits.shibanshi@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      }).catch(() => {
        showToast("Email: edits.shibanshi@gmail.com");
      });
    });
  });

  // Copy individual project drive link buttons
  const copyLinkBtns = document.querySelectorAll(".copy-link-btn");
  copyLinkBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const link = btn.getAttribute("data-link") || window.location.href;
      navigator.clipboard.writeText(link).then(() => {
        showToast("Project Drive link copied!");
      });
    });
  });
}

/* ------------------------------------------------------------
   6. INTERACTIVE 3D SUBTLE CARD TILT ON HOVER
   ------------------------------------------------------------ */
function initCardTilt() {
  // Skip on touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cards = document.querySelectorAll(".project-card, .about-card, .metric-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      // Subtle tilt max 3 degrees for punchy brutalist feel
      const rotateX = -deltaY * 3;
      const rotateY = deltaX * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
