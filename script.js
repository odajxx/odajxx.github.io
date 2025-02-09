document.addEventListener("DOMContentLoaded", () => {
    /**
     * Mobile Menu Toggle
     * Enhances accessibility and toggles menu visibility.
     */
    const menu = document.querySelector("#mobile-menu");
    const menuLinks = document.querySelector(".nav-menu");
    const navItems = document.querySelectorAll(".nav-links");

    if (menu && menuLinks) {
        menu.addEventListener("click", () => {
            const expanded = menu.classList.toggle("is-active");
            menuLinks.classList.toggle("active");
            menu.setAttribute("aria-expanded", expanded);
        });

        // Close menu when a link is clicked
        navItems.forEach(link => {
            link.addEventListener("click", () => {
                if (menu.classList.contains("is-active")) {
                    menu.classList.remove("is-active");
                    menuLinks.classList.remove("active");
                    menu.setAttribute("aria-expanded", "false");
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (!menu.contains(event.target) && !menuLinks.contains(event.target)) {
                menu.classList.remove("is-active");
                menuLinks.classList.remove("active");
                menu.setAttribute("aria-expanded", "false");
            }
        });

        // Keyboard accessibility (Escape key to close menu)
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menu.classList.contains("is-active")) {
                menu.classList.remove("is-active");
                menuLinks.classList.remove("active");
                menu.setAttribute("aria-expanded", "false");
            }
        });
    }
    
    /**
     * Highlight Active Navigation Link
     * Adds 'active' class to the current page link.
     */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});
