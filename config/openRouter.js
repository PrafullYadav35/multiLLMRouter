import { configDotenv } from "dotenv";
import { OpenRouter } from '@openrouter/sdk';
configDotenv();

if(!process.env.OPEN_ROUTER_KEY){
    throw new Error("OPENROUTER_API_KEY is missing");
}


export const openRouter = new OpenRouter({
    apiKey:process.env.OPEN_ROUTER_KEY ,
    httpReferer: '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
    appTitle: '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
  });








// //using API KEY  METHOD 
// const histry=[];
// export const llmCall=async (inp)=>{
//     //   console.log(inp);
//     try{
//         const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//        method: 'POST',
//        headers: {
//          Authorization: process.env.OPEN_ROUTER_KEY,
//          'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
//          'X-OpenRouter-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
//          'Content-Type': 'application/json',
//        },
//        body: JSON.stringify({
//          model: 'meta-llama/llama-3.1-8b-instruct',
//          messages: [
//           ...histry,
//           {
//             role: "user",
//             content: inp,
//           }
//          ],
         
//        }),
//      });
    
//      const data =await response.json();

//     //  console.log(data);
//      const msg= await data?.choices[0]?.message.content;
    
//      // user message and llm reply only storing for context not it used in function call 
//      histry.push({ role:"user", content:inp,});
//      histry.push(msg);
//      console.log(msg);
  
//      return msg;
//     }catch(err){
//       console.log(res.message);
//     }
//     }