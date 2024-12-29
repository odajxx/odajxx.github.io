const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");

menu.addEventListener("click", function() {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");

    // Toggle aria-expanded attribute for accessibility
    const expanded = menu.getAttribute("aria-expanded") === "true" || false;
    menu.setAttribute("aria-expanded", !expanded);
});

// Add 'active' class to the current page's link
const currentPage = window.location.pathname;
document.querySelectorAll('.nav-links').forEach(link => {
    if (link.href.includes(currentPage)) {
        link.classList.add('active');
    }
});


// theme Icon configuration
var icon = document.getElementById("icon");

icon.onclick = function() {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}