const summarizeButton = document.querySelector(".summarizeBtn");
const summaryArea = document.querySelector(".summary");
const loader = document.getElementById("loader");
const copyButton = document.querySelector('.copyButton');
copyButton.classList.remove("active");

summarizeButton.addEventListener("click", async () => {
    loader.classList.remove("hidden");
    copyButton.classList.remove("active");
    copyButton.innerHTML = "Copy";
    summaryArea.classList.add("hidden");
    const summaryType = document.getElementById("summaryType").value;
    const tab = await chrome.tabs.query({ active: true, currentWindow: true });

    const tabId = tab[0].id;
    const tabUrl = tab[0].url;
    const cacheKey =  generateCacheKey(tabId, tabUrl, summaryType);
    const cachedSummary = await getSummaryFromCache(cacheKey);

    if (cachedSummary) {
        loader.classList.add("hidden");
        summaryArea.classList.remove("hidden");
        console.log("Using cached summary");
        summaryArea.innerHTML = cachedSummary;
    } else {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: summaryFun,
            args: [{ summaryType: summaryType, tabId: tabId }]
        }, async (injectionResults) => {
            const [data] = injectionResults;
            if (data.result) {
                loader.classList.add("hidden");
                console.log("Generated summary:", data.result);
                summaryArea.innerHTML = data.result;
                await saveSummaryToCache(tabId, tabUrl, summaryType, data.result);
            }
        });
    }
});

function generateCacheKey(tabId, tabUrl, summaryType) {
    return `summary_${tabId}_${tabUrl}_${summaryType}`;
}

async function getSummaryFromCache(cacheKey) {
    return new Promise((resolve) => {
        chrome.storage.local.get([cacheKey], (result) => {
            resolve(result[cacheKey]);
        });
    });
}

async function saveSummaryToCache(tabId, tabUrl, summaryType, summaryContent) {
    const cacheKey = generateCacheKey(tabId, tabUrl, summaryType);
    const cacheData = { [cacheKey]: summaryContent };
    chrome.storage.local.set(cacheData);
    console.log("Saved summary to cache");
}

async function summaryFun(args) {
    try {
        const headingsAndParagraphs = Array.from(document.querySelectorAll('h1, h2, h3, p'));
        const webpageText = headingsAndParagraphs.map(element => element.textContent).join('\n ');

        async function summarizeText(msgContent, summaryType) {
            const API_KEY = "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";
            const language = "English";
            const prompt = summaryType === 'general'
                ? `Instructions: Summarize this content in brief in ${language} language with correct grammar...`
                : "Summary Mode: Bullet-Points\n\nInstructions: Summarize the content in bullet-point format";
            const apiRequestBody = {
                "model": "gpt-3.5-turbo",
                "messages": [
                    { "role": "system", "content": prompt },
                    { "role": "user", "content": msgContent }
                ],
                max_tokens: 150
            };

            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });

            const data = await response.json();
            return data.choices[0].message.content;
        }
       
        if(args.summaryType === "general") {return summarizeText(webpageText, args.summaryType);}
            const rawSummaryContent = await summarizeText(webpageText, args.summaryType);
            const bulletPoints = rawSummaryContent.split('-').filter(item => item.trim() !== "");
            const orderedList = bulletPoints.map((point, index) => `<li>${point}</li>`).join("\n");
            const formattedSummary = `<ol>${orderedList}</ol>`;
            return formattedSummary.trim();
    
        
    } catch (e) {
        console.log("Error:", e);
    }
}



copyButton.addEventListener('click', function() {
  copyButton.classList.add('active');
  if (this.innerHTML = "Copy") {
    this.innerHTML = "Copied!";
    navigator.clipboard.writeText(summaryArea.innerText)
    console.log(summaryArea.innerText);
  }
})

