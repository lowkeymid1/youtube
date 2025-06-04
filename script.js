document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('converter-form');
    const youtubeLinkInput = document.getElementById('youtube-link');
    const results = document.getElementById('results');
    const embedLinkInput = document.getElementById('embed-link');
    const nocookieLinkInput = document.getElementById('nocookie-link');
    const errorMessage = document.getElementById('error-message');
    const helpToggle = document.getElementById('help-toggle');
    const helpBox = document.getElementById('help');
    const secret = document.getElementById('secret');
    const essay = document.getElementById('essay');

    // Function to extract YouTube video ID
    function extractVideoID(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    // Function to copy text to clipboard
    function copyToClipboard(element) {
        const text = element.value;
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            alert('Failed to copy!');
            console.error('Error copying text: ', err);
        });
    }

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = youtubeLinkInput.value.trim();
        const videoID = extractVideoID(url);

        if (videoID) {
            const embedURL = `https://www.youtube.com/embed/${videoID}`;
            const nocookieURL = `https://www.youtube-nocookie.com/embed/${videoID}`;

            embedLinkInput.value = embedURL;
            nocookieLinkInput.value = nocookieURL;

            results.classList.remove('hidden');
            results.classList.add('fade-in');
            errorMessage.classList.add('hidden');
        } else {
            results.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }
    });

    // Toggle help box
    if (helpToggle && helpBox) {
        helpToggle.addEventListener('click', (e) => {
            e.preventDefault();
            helpBox.classList.toggle('hidden');
            helpBox.classList.toggle('fade-in');
        });
    }

    // Toggle secret essay
    if (secret && essay) {
        secret.addEventListener('click', () => {
            essay.classList.toggle('hidden');
            essay.classList.toggle('fade-in');
        });
    }

    // Add event listeners to all copy buttons
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetSelector = button.getAttribute('data-clipboard-target');
            const targetInput = document.querySelector(targetSelector);
            if (targetInput) {
                copyToClipboard(targetInput);
            }
        });
    });
});
