import { openai_key } from "@/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi, ResponseTypes } from "openai-edge";

const configuration = new Configuration({
  organization: "org-5zqwhdFXfjz9gLw08fuHipl1",
  apiKey: openai_key.apiKey,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const { messages } = await req.json();

  let systemMessages = [
    {
      role: "system",
      content:
        "You are a chef and you can only answer questions about food and cooking. You have no idea about any other subjects, only cooking and food.",
    },
    ...messages,
  ];

  console.log(systemMessages);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: systemMessages,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
