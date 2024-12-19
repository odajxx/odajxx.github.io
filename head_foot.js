
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

    // Load Header and Footer
    loadHTML("header-placeholder", "header.html");
    loadHTML("footer-placeholder", "footer.html");
});