// ============================================================
// SHIBANSHI — SCRIPT & GSAP ANIMATIONS
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initGSAP();
  initFilters();
  initCopyEmail();
});

/* ------------------------------------------------------------
   1. Clean GSAP & ScrollTrigger Animations
   ------------------------------------------------------------ */
function initGSAP() {
  if (typeof gsap === "undefined") return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero Entrance
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".status-pill", {
    opacity: 0,
    y: 12,
    duration: 0.6,
  })
  .from(".hero-heading", {
    opacity: 0,
    y: 25,
    duration: 0.8,
  }, "-=0.3")
  .from(".hero-subtext", {
    opacity: 0,
    y: 18,
    duration: 0.7,
  }, "-=0.4")
  .from(".hero-actions .btn", {
    opacity: 0,
    y: 15,
    duration: 0.5,
    stagger: 0.1,
  }, "-=0.4")
  .from(".stat-item", {
    opacity: 0,
    y: 15,
    duration: 0.6,
    stagger: 0.1,
  }, "-=0.3");

  // ScrollTrigger reveals
  if (typeof ScrollTrigger !== "undefined") {
    // About Card
    gsap.from(".about-card", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
    });

    // Project Cards Stagger
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 35,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Service Cards
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 25,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Contact Card
    gsap.from(".contact-card", {
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
    });
  }
}

/* ------------------------------------------------------------
   2. Category Filter Tabs
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
          if (typeof gsap !== "undefined") {
            gsap.fromTo(
              card,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
            );
          }
        } else {
          card.style.display = "none";
        }
      });

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    });
  });
}

/* ------------------------------------------------------------
   3. Copy Email with Toast Feedback
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
