import { ApiKey } from "@/app/dashboard/keys/page";
import { BACKEDNURL } from "@/utils/url";

interface GenerateApiKeyResposne {
    message : string,
    apikey? : string,
    success : boolean
}

export const GenerateApiKey = async (
    title : string
) : Promise<GenerateApiKeyResposne>=> {
    let genApiKeyResult : GenerateApiKeyResposne ;
    try{
        const res = await fetch(`${BACKEDNURL}/api/v1/user/generate-api`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "token" : localStorage.getItem("token") || ""
            },
            body : JSON.stringify({
                title
            })
        });
        const json = await res.json();
        if(res.ok){
            genApiKeyResult = {
                message : json.message,
                apikey : json.api_key,
                success : true
            }
            return genApiKeyResult;
        }else{
            genApiKeyResult = {
                message : json.message || "Something Went Wrong",
                success : false
            }
            return genApiKeyResult;
        }

    }catch(e){
        console.log(e);
        genApiKeyResult = {
            message : "Internal Server Error",
            success : false
        }
        return genApiKeyResult;
    }
}


interface SuccessAPIResponse{
    message : string;
    apiKey? : ApiKey[]
    success : boolean;
}
export const GetUserAPIkey = async () : Promise<SuccessAPIResponse> => {
    let result : SuccessAPIResponse; 
    try{
        const res = await fetch(`${BACKEDNURL}/api/v1/user/get-api`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "token" : localStorage.getItem("token") || ""
            },
        });
        const json = await res.json();
        if(res.ok){
            result = {
                message : json.message || "Fetch Successfully",
                apiKey : json.api_key,
                success : true
            }
            return result;
        }else{
            result = {
                message : json.message || "Error While Getting",
                apiKey : json.api_key,
                success : false
            }
            return result;
        }

    }catch(e){
        console.log(e);
        result = {
            message : "Internal Server Error",
            success : false
        }
        return result;
    }
};