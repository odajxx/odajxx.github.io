document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector("#mobile-menu");
    const menuLinks = document.querySelector(".nav-menu");
    const icon = document.getElementById("icon"); // Added for theme toggle

    // Mobile menu toggle
    menu.addEventListener("click", function() {
        menu.classList.toggle("is-active"); // Updated class name
        menuLinks.classList.toggle("active");

        // Toggle aria-expanded attribute for accessibility
        const expanded = menu.getAttribute("aria-expanded") === "true" || false;
        menu.setAttribute("aria-expanded", !expanded);
    });

    // Theme toggle
    icon.onclick = function() { // Using the icon element for theme toggle
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    };

    // Active link
    const currentPage = window.location.pathname; // Using pathname for better accuracy
    document.querySelectorAll('.nav-links').forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
});

