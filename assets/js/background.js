// Define the background module under the window object
window.background = {
    // Function to summarize web content
    summarizeWebContent: async function (webContent, summaryType) {
        const API_KEY = "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";
        const language = "English";
        const maxTokens = 300; // Set the desired max tokens value
        
        // Generate prompt based on summary type
        const prompt = summaryType === 'general'
            ? `Instructions: Summarize this content concisely in ${language} language with correct grammar...`
            : `Summary Mode: Bullet-Points in ${language} language with correct grammar\n\nInstructions: Summarize the content in bullet-point format`;
        
        // Prepare the API request body
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "system", "content": prompt },
                { "role": "user", "content": webContent }
            ],
            "max_tokens": maxTokens
        };
        
        // Fetch data from the API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        });
        
        // Parse the API response
        const data = await response.json();
        
        const rawSummaryContent = data.choices[0].message.content;

        if (summaryType === "general") {
            return rawSummaryContent;
        } else {
            console.log(rawSummaryContent);
            const lines = rawSummaryContent.substring(2).trim().split('\n-');
            console.log(lines);
            
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
};
