import { BACKEDNURL } from "@/utils/url";
import { Flag } from "lucide-react";


interface RegisterResposne{
    message : string;
    success : boolean;
}
export const RegisterUser = async (
    name : String,
    username : String,
    companyname : String,
    email : string,
    password : string
) : Promise<RegisterResposne> => {
    let result : RegisterResposne;
    try{
        const respone = await fetch(`${BACKEDNURL}/api/v1/auth/sign-up`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ name, username, companyName : companyname, email, password })
        });
        const json = await respone.json();
        if(respone.ok){
            result = { message : "User Registation Successfully", success : true }
            return result;
        }else{
            result = { message : json.message, success : false }
            return result;
        }
    }catch(e){
        result = { message : "Internal Server Error", success : false }
        return result;
    }
}

interface LoginResponse {
    message : string,
    token? : string,
    success : boolean
}

export const LoginUser = async (
    email : string,
    password : string
) : Promise<LoginResponse> => {
    let result : LoginResponse;
    try{
        const respone = await fetch(`${BACKEDNURL}/api/v1/auth/log-in`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ email, password })
        });
        const json = await respone.json();
        if(respone.ok){
            const token = json.token;
            localStorage.setItem("token" , token);
            result = { message : json.message, success : true }
            return result;
        }else{
            result = { message : json.message, success : false }
            return result;
        }
    }catch(e){
        result = { message : "Internal Server Error", success : false }
        return result;
    }
}

interface UserResponseInfo{
    message : string;
    user? : string;
    success : boolean;
}

export  const getUserInfo = async (
) : Promise<UserResponseInfo> =>{
    let getUserResult : UserResponseInfo;
    try{
        const res = await fetch(`${BACKEDNURL}/api/v1/auth/get-info`, {
            method : "GET",
            headers : {
                token : localStorage.getItem("token") || "",
            }
        });
        const json = await res.json();
        if(res.ok){
            getUserResult = {
                message : json.message,
                user : json.user,
                success : true
            }
            return getUserResult;
        }else{
            getUserResult = {
                message : json.message,
                user : json.user,
                success : false
            }
            return getUserResult;
        }

    }catch(e){
        console.log(e);
        getUserResult = {
                message : "Internal Server Error",
                success : false
            }
        return getUserResult;
    
    }
}