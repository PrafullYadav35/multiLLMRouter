
//reset user token 
export const resetUsageIfNeeded = async (user)=>{
   const now = new Date();
   if(now >user.resetAT ) {
    user.usage.tokenUsed = 0;
    user.usage.resetAT=new Date(Date.now() + 5 * 60 * 60 * 1000);
    await user.save();
   }
}

//check user token limit 

export const hasTokenLimitReached = (user)=>{
    return user.usage.tokenUsed>= user.usage.tokenLimit;
}

//increases user  Token  count after chat with ai 


//??? muje samaj nhi ayaya is function me totaltoken parameter kyo pass kiya gaya hai ?
export const adduserTokenUsage= async (user,totalTokens)=>{

    user.tokenUsed+=totalTokens;
    user.totalTokenUsed += totalTokens;

    await user.save();

};