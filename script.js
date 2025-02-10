document.addEventListener("DOMContentLoaded", () => {
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
