import { BACKEDNURL } from "@/utils/url";

export interface UsageResponse {
    id : string,
    modelname : string,
    modelversion : string,
    credit_used : string,
    total_token : string
    createdAt : string,
    updatedAt : string
}


export async function userUsage(
) : Promise<UsageResponse[] | null> {
    try{
        let usageResponse : UsageResponse[];
        const resposne =  await fetch(`${BACKEDNURL}/api/v1/usage/get-usage`, { 
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token") || ""
            }
        });
        if(resposne.ok){
            const json = await resposne.json();
            usageResponse = json.usage.map((item : UsageResponse) => ({
                id : item.id,
                modelname : item.modelname,
                modelversion : item.modelversion,
                credit_used : item.credit_used,
                total_token : item.total_token,
                createdAt : item.createdAt,
                updatedAt : item.updatedAt
            }))
           
            return usageResponse;
        }else {
            return null;
        }
    }catch(e){
        console.log(e);
        return null;
    }
}