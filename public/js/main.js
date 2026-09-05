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
if (reducedMotion) {
    root.classList.remove("js");
}
else {
    reveal("#hero .reveal");

    // every other section waits until it scrolls into view, then stops being watched
    const observer = new IntersectionObserver((entries, self) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            reveal(entry.target.querySelectorAll(".reveal"));
            self.unobserve(entry.target);
        });
    }, {
      threshold: 0.2
    });

    // ":has" keeps sections without anything to reveal out of the observer
    document.querySelectorAll("section:not(#hero):has(.reveal)").forEach((section) => observer.observe(section));
}
