const INCLUDES_BASE_PATH = 'http://localhost:5500/includes';

function stringToHTML (text) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(text, 'text/html');
	return doc.body.firstChild;
}

async function loadInclude(name) {
    try {
        const response = await fetch(`${INCLUDES_BASE_PATH}/${name}_include.html`);
        const data = await response.text();
        return stringToHTML(data);
    } catch (error) {
        console.error(`Error loading include ${name}:`, error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Load header content
    const header = await loadInclude('header');
    const headerWrapper = document.querySelector('header');
    if (header && headerWrapper) {
        headerWrapper.innerHTML = ''; // Clear existing content
        headerWrapper.appendChild(header);
    }

    // Load call to action content
    const callToAction = await loadInclude('calltoaction');
    const callToActionWrapper = document.querySelector('.cta-wrapper');
    if (callToAction && callToActionWrapper) {
        callToActionWrapper.innerHTML = ''; // Clear existing content
        callToActionWrapper.appendChild(callToAction);
    }

    // Load footer content
    const footer = await loadInclude('footer');
    const footerWrapper = document.querySelector('.footer-wrapper');
    if (footer && footerWrapper) {
        footerWrapper.innerHTML = ''; // Clear existing content
        footerWrapper.appendChild(footer);
    }
});
