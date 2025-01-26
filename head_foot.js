// Function to load external HTML into placeholders
document.addEventListener("DOMContentLoaded", () => {
    /**
     * Function to load external HTML content into placeholders.
     * @param {string} elementId - The ID of the element to populate.
     * @param {string} filePath - The path to the HTML file to fetch.
     */
    function loadHTML(elementId, filePath) {
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
                } else {
                    console.warn(`Element with ID '${elementId}' not found.`);
                }
            })
            .catch(error => console.error(`Fetch error: ${error.message}`));
    }

    // Calculate the base path dynamically based on the directory depth.
    const basePath = (() => {
        const depth = window.location.pathname.split("/").length - 2; // Adjust depth based on '/' in path.
        return "../".repeat(depth);
    })();

    // Load header and footer components.
    loadHTML("header-placeholder", `${basePath}header.html`);
    loadHTML("footer-placeholder", `${basePath}footer.html`);
});

