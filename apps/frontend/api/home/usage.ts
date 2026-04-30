import { BACKEDNURL } from "@/utils/url";

interface UsageResponse {
    id : String,
    usageContent : String,
    createdAt : String,
    updatedAt : String
}


export async function GetUserUsage(
) : Promise<UsageResponse[] | undefined> {
    try{
        let usageResponse : UsageResponse[];
        const resposne =  await fetch(`${BACKEDNURL}/api/v1/user/usage`, { 
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token") || ""
            }
        });
        if(resposne.ok){
            const json = await resposne.json();
            usageResponse = json.usage.map((item : UsageResponse) => ({
                id : item.id,
                usageContent : item.usageContent,
                createdAt : item.createdAt,
                updatedAt : item.updatedAt
            }))
           
            return usageResponse;
        }
    }catch(e){
        console.log(e);
        return undefined;
    }
}