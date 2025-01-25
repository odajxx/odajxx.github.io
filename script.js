document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menu = document.querySelector("#mobile-menu");
    const menuLinks = document.querySelector(".nav-menu");
    const icon = document.getElementById("icon"); // Theme toggle icon

    // Mobile menu event listener
    menu.addEventListener("click", () => {
        menu.classList.toggle("is-active");
        menuLinks.classList.toggle("active");

        // Toggle aria-expanded attribute for accessibility
        const expanded = menu.getAttribute("aria-expanded") === "true" || false;
        menu.setAttribute("aria-expanded", !expanded);
    });

    // Theme toggle logic
    icon.onclick = () => {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    };

    // Highlight active link
    const currentPage = window.location.pathname.split("/").pop(); // Get current file name
    document.querySelectorAll('.nav-links').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Ensure only one active class
        }
    });
});
