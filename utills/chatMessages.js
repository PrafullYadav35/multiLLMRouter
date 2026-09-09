

const SYSTEM_PROMPT = `
You are a helpful AI assistant.
Answer the user's question clearly and accurately.
If the user asks for code, provide clean and practical code.
If the user asks for explanation, explain in a simple and structured way.
If you are unsure, say that you are unsure instead of guessing.
`;

export const buildMessagesForAi=({chat,oldMessages,currentMessage})=>{

    const messages=[
        {
            "role":"system",
            "content":SYSTEM_PROMPT,
        }
    ];
   

    if(chat.summary && chat.summary.trim()!="" ){
        messages.push({
            "role":"system",
            "content":`Previous coversation summary :\n ${chat.summary}`,
        })
    }

    //doubt ? what is old message here samaj nhi aya ?
    // is old message are messages jinki summary not generated hai 

    for(const msg of oldMessages){
        messages.push(
            {
                "role":msg.role,
                "content":msg.content,
            }
        );
    }

    messages.push({
        "role":"user",
        "content":currentMessage,
    })



return messages;
}