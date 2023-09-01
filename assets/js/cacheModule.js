// Define the cacheModule under the window object
window.cacheModule = {
    // Generate a cache key based on tabId, tabUrl, summaryType, and summaryLang
    generateCacheKey: async function(tabId, tabUrl, summaryType, summaryLang) {
        return `summary_${tabId}_${tabUrl}_${summaryType}_${summaryLang}`;
    },

    // Retrieve summary from cache using cacheKey
    getSummaryFromCache: async function(cacheKey) {
        return new Promise((resolve) => {
            // Retrieve data from Chrome's local storage
            chrome.storage.local.get([cacheKey], (result) => {
                const cachedSummary = result[cacheKey]; // Get the value from the result object
                resolve(cachedSummary);
            });
        });
    },

    // Save summary to cache using tabId, tabUrl, summaryType, summaryLang, and summaryContent
    saveSummaryToCache: async function(tabId, tabUrl, summaryType, summaryLang, summaryContent) {
        const cacheKey = await this.generateCacheKey(tabId, tabUrl, summaryType, summaryLang);
        const cacheData = { [cacheKey]: summaryContent };
        
        // Store data in Chrome's local storage
        chrome.storage.local.set(cacheData);
    }
};
