// DOM elements
const summarizeButton = document.querySelector(".summarizeBtn");
const summaryOutput = document.querySelector(".summary");
const loader = document.getElementById("loader");
const copyButton = document.querySelector('.copyButton');
copyButton.classList.remove("active");

// Add event listener to the Summarize button
summarizeButton.addEventListener("click", async () => {
    // Show loader and reset copy button state
    loader.classList.remove("hidden");
    copyButton.classList.remove("active");
    copyButton.innerHTML = "Copy";
    summaryOutput.classList.add("hidden");
    
    // Get selected summary type and active tab information
    const summaryType = document.getElementById("summaryType").value;
    console.log("Summary Type:", summaryType);
    const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });
    const tabId = activeTab[0].id;
    const tabUrl = activeTab[0].url;
    
    // Generate cache key using tab details
    const cacheKey = await window.cacheModule.generateCacheKey(tabId, tabUrl, summaryType);
    
    // Check if summary is cached
    const cachedSummary = await window.cacheModule.getSummaryFromCache(cacheKey);

    if (cachedSummary) {
        // Display cached summary
        loader.classList.add("hidden");
        summaryOutput.classList.remove("hidden");
        summaryOutput.innerHTML = cachedSummary;
    } else {
        // Execute the content reading script
        const injectionResults = await window.content.executeContentReadingScript(tabId);
    
        if (injectionResults && injectionResults.result) {
            const webContent = await injectionResults.result;
            // Generate summary using background module
            const summary = await window.background.summarizeWebContent(webContent, summaryType);
            // Hide loader, display summary, and update cache
            loader.classList.add("hidden");
            summaryOutput.classList.remove("hidden");
            await window.cacheModule.saveSummaryToCache(tabId, tabUrl, summaryType, summary);
            await showTypingEffect(summary, summaryOutput);
        }
    }
});

// Add event listener to the Copy button
copyButton.addEventListener('click', async function() {
    this.classList.add('active');
    if (this.innerHTML === "Copy") {
        this.innerHTML = "Copied!";
        try {
            await navigator.clipboard.writeText(summaryOutput.innerText);
        } catch (error) {
            console.error("Error copying text:", error);
        }
    }
});

// Function to show typing effect
async function showTypingEffect(text, element) {
    console.log(text);
    // Add blinking cursor class
    element.classList.add("blinking-cursor");
    element.innerHTML = ''; // Clear the element's content
    
    const typingSpeed = 30; // Adjust typing speed in milliseconds
    
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
    }
    // Remove the blinking cursor class after text is fully typed
    element.classList.remove('blinking-cursor');
}
