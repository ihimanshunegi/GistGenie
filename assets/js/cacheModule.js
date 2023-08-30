// Define the cacheModule under the window object
window.cacheModule = {
    // Generate a cache key based on tabId, tabUrl, and summaryType
    generateCacheKey: async function(tabId, tabUrl, summaryType) {
        return `summary_${tabId}_${tabUrl}_${summaryType}`;
    },

    // Retrieve summary from cache using cacheKey
    getSummaryFromCache: async function(cacheKey) {
        return new Promise((resolve) => {
            chrome.storage.local.get([cacheKey], (result) => {
                const cachedSummary = result[cacheKey]; // Get the value from the result object
                console.log("Cached summary:", cachedSummary);
                resolve(cachedSummary);
            });
        });
    },

    // Save summary to cache using tabId, tabUrl, summaryType, and summaryContent
    saveSummaryToCache: async function(tabId, tabUrl, summaryType, summaryContent) {
        const cacheKey = await this.generateCacheKey(tabId, tabUrl, summaryType);
        const cacheData = { [cacheKey]: summaryContent };
        chrome.storage.local.set(cacheData);
        console.log("Saved summary to cache");
    }
};
