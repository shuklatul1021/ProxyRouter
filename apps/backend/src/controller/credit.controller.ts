export function CreditController(
  inputToken: number,
  outputToken: number,
  llmType: string,
): number {
  /**
   * This Credit System is Not that Good 
   * Todo : 
   *      1. Implement a Better Credit System
   *      2. Implement a Credit System that is Based on the Model Used and the Tokens Used
   */
  let creditUsed: number;
  let creditUsedInput: number;
  let creditUsedOutput: number;
  // Google Deepmind Credit Calculation Logic
  if (llmType === "googledeepmind") {
    creditUsedInput = Number(inputToken) * 0.000002;
    creditUsedOutput = Number(outputToken) * 0.00000600;
    creditUsed = creditUsedInput + creditUsedOutput;
    
    // Grok Credit Calculation Logic
  } else if (llmType === "grok") {
    creditUsedInput = Number(inputToken) * 0.000002;
    creditUsedOutput = Number(outputToken) * 0.00000600;
    creditUsed = creditUsedInput + creditUsedOutput;

    // Claude Credit Calculation Logic
  } else if (llmType === "claude") {
    creditUsedInput = Number(inputToken) * 0.000003;
    creditUsedOutput = Number(outputToken) * 0.000015;
    creditUsed = creditUsedInput + creditUsedOutput;

    // Deepseek Credit Calculation Logic
  } else if (llmType === "deepseek") {
    // Logic To Complete For Deepseek Credit Calculation
    creditUsedInput = Number(inputToken) * 0.00000014;
    creditUsedOutput = Number(outputToken) * 0.000000028;
    creditUsed = creditUsedInput + creditUsedOutput;

    // ChatGPT Credit Calculation Logic
  } else if (llmType === "chatgpt") {
    creditUsedInput = Number(inputToken) * 0.0000025;
    creditUsedOutput = Number(outputToken) * 0.000015;
    creditUsed = creditUsedInput + creditUsedOutput;
  } else {
    creditUsed = 0;
  }

  return creditUsed;
}
