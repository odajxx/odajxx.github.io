ddocument.addEventListener("DOMContentLoaded", () => {
    /**
     * Toggles mobile menu visibility and updates accessibility attributes.
     */
    const menu = document.querySelector("#mobile-menu");
    const menuLinks = document.querySelector(".nav-menu");

    menu?.addEventListener("click", () => {
        menu.classList.toggle("is-active");
        menuLinks.classList.toggle("active");

        // Update accessibility attribute dynamically
        const expanded = menu.getAttribute("aria-expanded") === "true";
        menu.setAttribute("aria-expanded", !expanded);
    });

    /**
     * Toggles between dark and light themes when the theme icon is clicked.
     */
    const themeIcon = document.getElementById("icon");
    themeIcon?.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        // Switch icon classes
        if (document.body.classList.contains("dark-theme")) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
        }
    });

    /**
     * Highlights the active navigation link based on the current page.
     */
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-links").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === currentPage);
    });
});
