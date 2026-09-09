
// doubt ??  why usage parameter passed here ?
export const addChatTokenUsage = async(chat,usage)=>{
chat.usage.promptTokens+=usage.promptTokens;
chat.usage.completionTokens+=usage.completionTokens;
chat.usage.totalTokens+=usage.totalTokens;

await chat.save();
}

// i did not understand working and need of this function ?