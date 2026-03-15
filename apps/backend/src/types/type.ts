



export enum Model{
    CHATGPT,
    CLAUDE,
    DEEPSHEEK,
    GOOGLEDEEPMIND,
    GROK,
}

export interface RouterSchema {
    userPrompt : String;
    systemPrompt? : String;
    modelVersion : String;
}

export interface ResponseStucture {
    id : string;
    type : string;
    model : string;
    content : [
        {
            type : "text" | "image" | "video";
            text : String
        }
    ];
    usage : {
        input_token : string;
        output_token : string;
        total_token : string; 
    }
    success : boolean;
}