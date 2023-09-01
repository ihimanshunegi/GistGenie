// Define the background module under the window object
window.summarizeModule = {
    // Function to summarize web content
    summarizeWebContent: async function (webContent, summaryType, summaryLang) {
        const API_KEY = "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";
        
        // Set the desired max tokens value based on the language
        let maxTokens = 300;
        if (summaryLang === "hi") {
            maxTokens = 600;
        }

        // Language mapping for instructions
        const langMap = new Map([
            ["en", "English"],
            ["hi", "Hindi"],
            ["fr", "French"],
            ["de", "German"],
            ["ja", "Japanese"],
            ["es", "Spanish"]
        ]);
        const lang = langMap.get(summaryLang);

        // Generate prompt based on summary type
        const prompt = summaryType === 'general'
            ? `Please provide a concise summary in ${lang} language with correct grammar for the following content. Focus on capturing the essential points and key insights. Ensure the summary maintains clarity and coherence. If any information is irrelevant, feel free to omit it. Here is the content to be summarized:`
            : `Please summarize the following content in concise bulleted points in ${lang}. Include the most important details and key takeaways. Use clear and brief sentences. If any information is not relevant, you can omit it. Here is the content to summarize:`;
        
        // Prepare the API request body
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "system", "content": prompt },
                { "role": "user", "content": webContent }
            ],
            "max_tokens": maxTokens
        };

        try {
            // Fetch data from the API with error handling
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });

            if (!response.ok) {
                // Edge case: Summary Generation Failure
                throw new Error(`Summary Generation Failed with HTTP Status: ${response.status}`);
            }

            // Parse the API response
            const data = await response.json();

            const rawSummaryContent = data.choices[0].message.content;

            if (summaryType === "general") {
                return rawSummaryContent;
            } else {
                // Process bullet-point summary
                const lines = rawSummaryContent.substring(2).trim().split('\n-');

                // Remove empty lines
                const nonEmptyLines = lines.filter(line => line.trim() !== '');

                // Convert hyphens to numbered list
                const numberedLines = nonEmptyLines.map((line, index) => {
                    const content = line.trim();
                    return `${index + 1}. ${content}`;
                });

                // Join the lines to form the numbered list
                const formattedSummary = numberedLines.join('\n');

                return formattedSummary.trim();
            }
        }
        catch (error) {
            // Edge case: Network Connectivity Failure or summary generation failure error
            window.errorModule.showError(error);
            throw error;
        }
    }
}
