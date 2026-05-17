
export function verifyGPTModelVersion(modelVersion : string) : boolean {
    const validModelVersions = [
        'gpt-5.5',
        'gpt-5.5-pro',
        'gpt-5.4',
        'gpt-5.4-pro',
        'gpt-5.4-mini',
        'gpt-5.4-nano',
        'gpt-5-mini',
        'gpt-5-nano',
        'gpt-5',
        'gpt-5.1',
        'gpt-5.2',
        'gpt-5.3-codex',
        'gpt-4.5',
        'gpt-4.1',
        'gpt-4.1-mini',
        'gpt-4o',
        'o3',
        'o3-pro',
        'o4-mini',
        'gpt-realtime-2',
        'gpt-realtime-translate',
        'gpt-realtime-whisper'
    ];
    return validModelVersions.includes(modelVersion);
}

export function verifyClaudeModelVersion(modelVersion : string) : boolean {
    const validModelVersions = [
        'claude-3-opus',
        'claude-3-sonnet',
        'claude-3-haiku',
        'claude-3.5-sonnet',
        'claude-3.5-haiku'
    ];
    return validModelVersions.includes(modelVersion);
}


export function verifyDeepseekModelVersion(modelVersion : string) : boolean {
    const validModelVersions = [
        'deepseek-chat',
        'deepseek-coder',
        'deepseek-coder-v2'
     
    ];
    return validModelVersions.includes(modelVersion);
}

export function verifyGoogleDeepmindModelVersion(modelVersion : string) : boolean {
    const validModelVersions = [
        'gemini-1.0-pro',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'gemini-2.0-pro',
        'gemini-2.0-flash',
        'gemini-3.1-flash-lite-preview'

    ];
    return validModelVersions.includes(modelVersion);
}
export function verifyGrokModelVersion(modelVersion : string) : boolean {
    const validModelVersions = [
        'grok-1',
        'grok-1.5',
        'grok-beta'
    ];
    return validModelVersions.includes(modelVersion);
}