document.addEventListener("DOMContentLoaded", () => {
    /**
     * Mobile Menu Toggle
     * Enhances accessibility and toggles menu visibility.
     */
    const menu = document.querySelector("#mobile-menu");
    const menuLinks = document.querySelector(".nav-menu");

    if (menu && menuLinks) {
        menu.addEventListener("click", () => {
            const expanded = menu.classList.toggle("is-active");
            menuLinks.classList.toggle("active");
            menu.setAttribute("aria-expanded", expanded);
        });
    }

    /**
     * Dark Mode Toggle
     * Switches between dark and light themes.
     */
    // const themeIcon = document.getElementById("icon");

    // // Load saved theme
    // if (localStorage.getItem("theme") === "dark") {
    //     document.body.classList.add("dark-theme");
    //     themeIcon.classList.replace("fa-moon", "fa-sun");
    // }

    // if (themeIcon) {
    //     themeIcon.addEventListener("click", () => {
    //         document.body.classList.toggle("dark-theme");

    //         // Ensure the correct class toggling
    //         if (document.body.classList.contains("dark-theme")) {
    //             themeIcon.classList.remove("fa-moon");
    //             themeIcon.classList.add("fa-sun");
    //         } else {
    //             themeIcon.classList.remove("fa-sun");
    //             themeIcon.classList.add("fa-moon");
    //         }
    //     });
    // } else {
    //     console.error("Theme toggle icon not found!");
    // }

    /**
     * Active Navigation Link Highlight
     * Highlights the nav link corresponding to the current page.
     */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});
