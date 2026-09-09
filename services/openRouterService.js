import  {openRouter} from "../config/openRouter.js";

export const generateAIResponse= async ({model,messages})=>{
//    console.log("this is in openRouter Servise");
    // console.log(model)
    console.log(messages)
    const completion = await openRouter.chat.send({

        chatRequest: {
         model:'meta-llama/llama-3.1-8b-instruct',
         messages:messages,

        }
     
      });


    const aiReply =await completion.choices[0]?.message?.content;

    if(!aiReply){
        throw new Error("AI response is empty");
    }

    const promptTokens=completion.usage?.promptTokens || 0;
    const completionTokens= completion.usage?.completionTokens || 0;

    return{
        aiReply,
        usage:{
            promptTokens,
            completionTokens,
            totalTokens:promptTokens+completionTokens,
        },
    };
}

