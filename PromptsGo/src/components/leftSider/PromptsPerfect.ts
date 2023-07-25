interface RequestBody {
  data: {
    prompt: string
    targetModel: string
  }
}

async function promptperfect(
  prompt: string,
  targetModel: string,
  apiKey: string
): Promise<Response> {
  const requestBody: RequestBody = {
    data: {
      prompt,
      targetModel,
    },
  }

  const response = fetch("https://api.promptperfect.jina.ai/optimize", {
    headers: {
      "x-api-key": `token ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      data: {
        prompt: prompt,
        targetModel: targetModel,
      },
    }),
    method: "POST",
  })

  return response
}
export default promptperfect
