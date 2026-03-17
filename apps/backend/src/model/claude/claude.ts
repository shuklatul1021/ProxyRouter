import type {
  ErrorResponseStucture,
  RouterSchema,
  SuccessResponseStucture,
} from "../../types/type.js";
import Anthropic from "@anthropic-ai/sdk";

export async function Claude_Model_Implementation(
  model: RouterSchema,
): Promise<SuccessResponseStucture | ErrorResponseStucture> {
  const anthropic = new Anthropic();

  try {
    const response = await anthropic.messages.create({
      model: `${model.modelVersion}`,
      max_tokens: 1000,
      system: `${model.systemPrompt}`,
      messages: [{ role: "user", content: `${model.userPrompt}` }],
    });

    const claudeResponse: SuccessResponseStucture = {
      id: response.id,
      type: response.type,
      model: response.model,
      content: [
        {
          type: "text",
          //@ts-ignore
          text: response?.content[0]?.text as String,
        },
      ],
      usage: {
        input_token: String(response.usage.input_tokens),
        output_token: String(response.usage.output_tokens),
        total_token: String(
          response.usage.input_tokens + response.usage.output_tokens,
        ),
      },
      success: true,
    };

    console.log(response);
    return claudeResponse;
  } catch (error) {
    const typedError = error as { type?: string; message?: string };

    return {
      type: "error",
      error: {
        type: typedError.type ?? "anthropic_error",
        message: typedError.message ?? "Unknown error from Claude API",
      },
      success: false,
    };
  }
}
