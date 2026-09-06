const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // respect users choice... I guess

// this file made it, so theme.js does not have to unhide anything on its own
clearTimeout(window.revealFailsafe);

// anime.js is what brings ".reveal" back, without it nothing may stay hidden
const animated = !reducedMotion && typeof anime !== "undefined";

// ---------- animations ----------

// fade in
const reveal = (targets) => {
    anime.animate(targets, {
        opacity: [0, 1],
        y: [12, 0],
        duration: 600,
        delay: anime.stagger(90),
        ease: "outQuad"
    });
};

// stack logos slide in sideways
const slideIn = (targets) => {
    anime.animate(targets, {
        opacity: [0, 1],
        x: [-16, 0],
        duration: 500, // slightly faster than reveal looks better
        delay: anime.stagger(45),
        ease: "outCubic"
    });
};

const animateSection = (section) => {
    if (section.id === "stack") {
        // stagger per row, so both rows start at the same time
        section.querySelectorAll(".logo-row").forEach((row) => {
            slideIn(row.querySelectorAll(".reveal"));
        });
    }
    else {
        reveal(section.querySelectorAll(".reveal"));
    }
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

    if (animated) {
        anime.animate(themeToggle, {
            scale: [0.85, 1],
            duration: 300,
            ease: "outBack"
        });
        reveal("#hero .reveal");
    }
});


// ---------- reveal ----------
if (!animated) {
    root.classList.remove("js");
}
else {
    reveal("#hero .reveal");

    // every other section waits until it scrolls into view, then stops being watched
    const observer = new IntersectionObserver((entries, self) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
            animateSection(entry.target);
            self.unobserve(entry.target);
        });
    }, {
      threshold: 0.2
    });

    // ":has" keeps sections without anything to reveal out of the observer
    document.querySelectorAll("section:not(#hero):has(.reveal)").forEach((section) => observer.observe(section));
}
