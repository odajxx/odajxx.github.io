const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");

menu.addEventListener("click", function() {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");

    // Toggle aria-expanded attribute for accessibility
    const expanded = menu.getAttribute("aria-expanded") === "true" || false;
    menu.setAttribute("aria-expanded", !expanded);
});

