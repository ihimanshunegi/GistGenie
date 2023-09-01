// DOM elements
const summarizeButton = document.querySelector(".summarizeBtn");
const summaryOutput = document.querySelector(".summary");
const loader = document.getElementById("loader");
const copyButton = document.querySelector('.copyButton');
copyButton.classList.remove("active");

// Initialize a variable to store the web content
let webContent = null;

// Add event listener to the Summarize button
summarizeButton.addEventListener("click", handleSummarize);

// Add event listener to the Copy button
copyButton.addEventListener('click', handleCopy);

async function handleSummarize() {
    loader.classList.remove("hidden");
    copyButton.classList.remove("active");
    copyButton.innerHTML = "Copy";
    summaryOutput.classList.add("hidden");
    window.errorModule.clearError();

    try {
        const [activeTabInfo] = await chrome.tabs.query({ active: true, currentWindow: true });
        const { id: tabId, url: tabUrl } = activeTabInfo;

        if (isSpecialPage(tabUrl)) {
            window.errorModule.showError("New page or special page detected");
            return;
        }

        const summaryType = document.getElementById("summaryType").value;
        const summaryLang = document.getElementById("summaryLang").value;

        const cacheKey = await window.cacheModule.generateCacheKey(tabId, tabUrl, summaryType, summaryLang);
        const cachedSummary = await window.cacheModule.getSummaryFromCache(cacheKey);

        if (cachedSummary) {
            displaySummary(cachedSummary);
        } else {
            // Check if web content is already available
            if (!webContent) {
                const injectionResults = await window.content.executeContentReadingScript(tabId);

                if (injectionResults && injectionResults.result) {
                    webContent = injectionResults.result;
                } else {
                    window.errorModule.showError("Content Reading Script Error");
                    return;
                }
            }

            const summary = await window.summarizeModule.summarizeWebContent(webContent, summaryType, summaryLang);
            await saveAndDisplaySummary(tabId, tabUrl, summaryType, summaryLang, summary);
        }
    } catch (error) {
        window.errorModule.showError(error);
    }
}

async function handleCopy() {
    copyButton.classList.add('active');
    if (copyButton.innerHTML === "Copy") {
        copyButton.innerHTML  = "Copied!";
        try {
            await navigator.clipboard.writeText(summaryOutput.innerText);
        } catch (error) {
            alert(`Error copying text ${error}`);
        }
    }
}

function isSpecialPage(url) {
    return url.startsWith("chrome://") || url.startsWith("chrome-extension://") || url === "about:blank";
}

function displaySummary(summary) {
    loader.classList.add("hidden");
    summaryOutput.classList.remove("hidden");
    summaryOutput.innerHTML = summary;
}

async function saveAndDisplaySummary(tabId, tabUrl, summaryType, summaryLang, summary) {
    await window.cacheModule.saveSummaryToCache(tabId, tabUrl, summaryType, summaryLang, summary);
    loader.classList.add("hidden");
    summaryOutput.classList.remove("hidden");
    await showTypingEffect(summary, summaryOutput, summaryLang);
}

// Function to show typing effect
async function showTypingEffect(text, element, summaryLang) {
    element.classList.add("blinking-cursor");
    element.innerHTML = ''; // Clear the element's content
    element.lang = summaryLang;

    const typingSpeed = 30; // Adjust typing speed in milliseconds

    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        await sleep(typingSpeed);
    }

    element.classList.remove('blinking-cursor');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
