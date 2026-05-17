



export enum Model{
    CHATGPT,
    CLAUDE,
    DEEPSHEEK,
    GOOGLEDEEPMIND,
    GROK,
}

export interface RouterSchema {
    userPrompt : string;
    systemPrompt? : string;
    modelVersion : string;
}

export interface SuccessResponseStucture {
    id : string;
    type? : string;
    model : string;
    content : [
        {
            type : "text" | "image" | "video";
            text : string
        }
    ];
    usage : {
        input_token : string;
        output_token : string;
        total_token : string; 
    }
    success : true;
}

export interface ErrorResponseStucture {
    type : string;
    error : {
        type : string,
        message : string
    }
    success : false;
}