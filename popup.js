const summarizeButton= document.querySelector(".summarizeBtn");
const summaryArea= document.querySelector(".summary");
const loader = document.getElementById("loader");



summarizeButton.addEventListener("click", async ()=>{
    
    loader.classList.remove("hidden");
    const summaryType= document.getElementById("summaryType").value;
    let tab = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: { tabId: tab[0].id },
        function: summaryFun,
        args: [{ summaryType: summaryType }]
    },
    async (injectionResults)=>{
        const [data]= injectionResults;
        if(data.result){
            loader.classList.add("hidden");
            summaryArea.innerText=data.result;
            
        }
    });
});

async function summaryFun(args){
    try{

        const headingsAndParagraphs = await Array.from(document.querySelectorAll('h1, h2, h3, p'));
        const webpageText = headingsAndParagraphs.map(element => element.textContent).join('\n ');
        console.log("WebPageText::", webpageText);

        //summary function
        async function summarizeText(msgContent, summaryType) {
            const API_KEY = "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";
          
          const language = "English";
          const prompt = summaryType === 'general'
            ? `Instructions: Summarize this content in brief in ${language} language with correct grammar. Your response should provide an overview of the information presented in the content and should not include personal comments.`
            : "Summary Mode: Bullet-Points\n\nInstructions: Summarize the content in bullet-point format";
          
            const apiRequestBody = {
              "model": "gpt-3.5-turbo",
              "messages": [
                  { "role": "system", "content": prompt },
                  { "role": "user", "content": msgContent }
              ],
              max_tokens: 150
          };
          
          // Return the fetch promise to handle the asynchronous response
          return fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                  "Authorization": "Bearer " + API_KEY,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(apiRequestBody)
          })
          .then(response => response.json())
          .then(data => data.choices[0].message.content);
          }
          
        return await summarizeText(webpageText,args.summaryType)
   
    }
    catch(e){console.log("why error",e);}
}

