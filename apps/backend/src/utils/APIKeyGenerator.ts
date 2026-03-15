export const GenerateApiKey = () : String | null => {
    let api_key = "sk-pxy-api-";
    const word_count = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    for(let i = 0; i < 48; i++){
        api_key += word_count.charAt(Math.floor(Math.random() * word_count.length));
    }
     console.log(api_key);
    return api_key
   
}