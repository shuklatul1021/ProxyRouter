export function CreditController(
  inputToken: number,
  outputToken: number,
  llmType: string,
): number {
  let creditUsed: number;
  let creditUsedInput: number;
  let creditUsedOutput: number;
  // Google Deepmind Credit Calculation Logic
  if (llmType === "googledeepmind") {
    creditUsedInput = Number(inputToken) * 0.000002;
    creditUsedOutput = Number(outputToken) * 0.00000600;
    creditUsed = creditUsedInput + creditUsedOutput;
    
  } else if (llmType === "grok") {
    creditUsedInput = Number(inputToken) * 0.000002;
    creditUsedOutput = Number(outputToken) * 0.00000600;
    creditUsed = creditUsedInput + creditUsedOutput;

  } else if (llmType === "claude") {
    creditUsedInput = Number(inputToken) * 0.000003;
    creditUsedOutput = Number(outputToken) * 0.000015;
    creditUsed = creditUsedInput + creditUsedOutput;

  } else if (llmType === "deepseek") {
    // Logic To Complete For Deepseek Credit Calculation
    creditUsedInput = Number(inputToken) * 0.00000014;
    creditUsedOutput = Number(outputToken) * 0.000000028;
    creditUsed = creditUsedInput + creditUsedOutput;

  } else if (llmType === "chatgpt") {
    creditUsedInput = Number(inputToken) * 0.0000025;
    creditUsedOutput = Number(outputToken) * 0.000015;
    creditUsed = creditUsedInput + creditUsedOutput;
  } else {
    creditUsed = 0;
  }

  return creditUsed;
}
