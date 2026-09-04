const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // respect users choice... I guess

// ---------- animations ----------
const reveal = (targets) => {
    anime.animate(targets, {
        opacity: [0, 1],
        y: [12, 0],
        duration: 600,
        delay: anime.stagger(90),
        ease: "outQuad"
    });
};

// ---------- theme ----------
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-bs-theme", next);
  try {
    localStorage.setItem("theme", next);
  }
  catch { } // somehow a empty catch is allowed

    if (!reducedMotion) {
        anime.animate(themeToggle, {
            scale: [0.85, 1],
            duration: 300,
            ease: "outBack"
        });
        reveal("#hero .reveal");
    }
});

// ---------- reveal ----------
const projects = document.getElementById("projekte");

if (reducedMotion) {
    root.classList.remove("js");
} else {
    reveal("#hero .reveal");

    // cards wait until they scroll into view, only on pages that have them
    if (projects) {
        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) return;
            reveal("#projekte .reveal");
            observer.disconnect();
        }, { threshold: 0.2 });
        observer.observe(projects);
    }
}
