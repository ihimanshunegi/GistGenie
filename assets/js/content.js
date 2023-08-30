// Define the content module under the window object
window.content = {
    // Function to execute content reading script
    executeContentReadingScript: async function (tabId) {
        return new Promise((resolve) => {
            // Execute the content reading script using chrome.scripting.executeScript
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: readContent // Specify the readContent function to be executed
            }, (injectionResults) => {
                resolve(injectionResults[0]); // Resolve the promise with the injection result
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
        const webpageText = headingsAndParagraphs.map(element => element.textContent).join('\n ');
        return webpageText; // Return the extracted webpage text
    } catch (e) {
        console.log("Error:", e); // Log any errors that occur during execution
    }
};
