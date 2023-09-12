import {Configuration, OpenAIApi} from "openai";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";

const configuration = new Configuration(
    {
        apiKey: process.env.OPENAI_API_KEY
    }
);

const openAi = new OpenAIApi(configuration);

export async function POST(
    req : Request
) {
    try {
        const { userId } = auth();
        const messages = await req.json();

         if(!userId) {
             return new NextResponse("Unauthorized", {status: 401})
         }

         if(!configuration.apiKey) {
             return new NextResponse("OpenAI API Key not configured", {status: 500})
         }

         if(!messages) {
             return new NextResponse("Messages are required", {status: 400})
         }

         const response = await openAi.createChatCompletion({
             model : "gpt-3.5-turbo",
             messages : messages.messages
         });

         return NextResponse.json(response.data.choices[0].message);
    }catch (error) {
        console.log("[CONVERSATION_ERROR]", error)
        return new NextResponse("Internal Error " + error, {status : 500})
    }
}