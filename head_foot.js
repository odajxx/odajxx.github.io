document.addEventListener("DOMContentLoaded", () => {
    function loadHTML(elementId, filePath, callback) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    console.error(`Error fetching ${filePath}: ${response.statusText}`);
                    return;
                }
                return response.text();
            })
            .then(html => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = html;
                    if (callback) callback(); // Execute callback after loading
                } else {
                    console.warn(`Element with ID '${elementId}' not found.`);
                }
            })
            .catch(error => console.error(`Fetch error: ${error.message}`));
    }

    // Dynamically determine base path
    const basePath = (() => {
        const depth = window.location.pathname.split("/").length - 2;
        return "../".repeat(depth);
    })();

    // Load header and footer, then initialize theme toggle
    loadHTML("header-placeholder", `${basePath}header.html`, initThemeToggle);
    loadHTML("footer-placeholder", `${basePath}footer.html`);

    function initThemeToggle() {
        const themeIcon = document.getElementById("icon");

        // Load and apply saved theme
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.body.classList.add(savedTheme);
        }
        updateIcon(savedTheme);

        if (themeIcon) {
            themeIcon.addEventListener("click", () => {
                document.body.classList.toggle("dark-theme");

                // Save the new theme in localStorage
                const currentTheme = document.body.classList.contains("dark-theme") ? "dark-theme" : "";
                localStorage.setItem("theme", currentTheme);

                updateIcon(currentTheme);
            });
        } else {
            console.error("Theme toggle icon not found!");
        }
    }

    function updateIcon(theme) {
        const themeIcon = document.getElementById("icon");
        if (!themeIcon) return;

        if (theme === "dark-theme") {
            themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
        }
    }
});
