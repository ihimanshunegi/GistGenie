// Define the content module under the window object
window.content = {
    // Function to execute content reading script
    executeContentReadingScript: async function (tabId) {
        return new Promise((resolve, reject) => {
            // Execute the content reading script using chrome.scripting.executeScript
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: readContent // Specify the readContent function to be executed
            }, (injectionResults) => {
                if (chrome.runtime.lastError) {
                    // Handle script execution error
                    console.error("Content Reading Script Error:", chrome.runtime.lastError);
                    reject("Content Reading Script Error");
                } else {
                    const result = injectionResults[0]; // Get the injection result
                    resolve(result); // Resolve the promise with the injection result
                }
            });
        });
    }
};

// Define the readContent function to be executed in the content script
const readContent = async function () {
    try {
        // Select headings (h1, h2, h3) and paragraphs (p) from the webpage
        const headingsAndParagraphs = Array.from(document.querySelectorAll('h1, h2, h3, p'));
        // Extract text content from the selected elements and join with line breaks
        const webpageText = headingsAndParagraphs.map(element => element.textContent).join('\n');
        return webpageText; // Return the extracted webpage text
    } catch (e) {
        console.error("Content Reading Script Error:", e); // Log any errors that occur during execution
        throw e; // Rethrow the error to be caught in executeContentReadingScript
    }
};
