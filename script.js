// ============================================================
// SHIBANSHI — CLEAN SCRIPT & SIMPLE INTERACTIONS
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimation();
  initFilters();
  initCopyEmail();
});

/* ------------------------------------------------------------
   1. Clean Hero Entrance Animation (Runs once on load only)
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
   2. Clean & Instant Category Filters (No scroll-jumping)
   ------------------------------------------------------------ */
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Toggle active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      cards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
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
