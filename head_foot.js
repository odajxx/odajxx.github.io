// Function to load external HTML into placeholders
document.addEventListener("DOMContentLoaded", () => {
    function loadHTML(elementId, filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = html;
                } else {
                    console.error(`Element with ID '${elementId}' not found.`);
                }
            })
            .catch(error => console.error(error.message));
    }

    // Determine the base path for header and footer files
    const basePath = (() => {
        // Count the number of slashes in the path to determine the depth
        const depth = window.location.pathname.split("/").length - 2; // Adjust depth based on '/' in path
        return "../".repeat(depth); // Generate "../" for each directory level
    })();

    // Load Header and Footer with the correct path
    loadHTML("header-placeholder", `${basePath}header.html`);
    loadHTML("footer-placeholder", `${basePath}footer.html`);
});

