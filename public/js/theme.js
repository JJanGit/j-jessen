// sets bootstrap's "data-bs-theme" before first paint, stored choice wins over os preference.
// loaded without "defer" on purpose, otherwise dark-mode users would see a white flash.

(function () {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    // safari throws when storage is blocked
    const stored = () => {
      try {
        return localStorage.getItem("theme");
      }
      catch {
        return null;
      }
    };

    const apply = (theme) => {
        document.documentElement.setAttribute("data-bs-theme", theme);
    };

    apply(stored() || (query.matches ? "dark" : "light"));

    // follow os changes only while there is no manual choice
    query.addEventListener("change", (event) => {
        if (!stored()) apply(event.matches ? "dark" : "light");
    });

    // marks that js is running, css hides ".reveal" elements only then
    document.documentElement.classList.add("js");

    // failsafe, main.js clears this. without it a blocked or missing script leaves half the page invisible
    window.revealFailsafe = window.setTimeout(() => {
        document.documentElement.classList.remove("js");
    }, 2000);
})();
