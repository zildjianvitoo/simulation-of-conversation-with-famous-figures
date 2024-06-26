import { StreamingTextResponse, LangChainStream } from "ai";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { MemoryManager } from "@/lib/memory-gemini";
import { rateLimit } from "@/lib/rate-limit";
import prismadb from "@/lib/prismadb";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { prompt } = await request.json();
    const user = await currentUser();

    if (!user || !user.firstName || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const identifier = request.url + "-" + user.id;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit tercapai", { status: 429 });
    }

    const companion = await prismadb.famousFigure.update({
      where: {
        id: params.chatId,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: "user",
            userId: user.id,
          },
        },
      },
    });

    if (!companion) {
      return new NextResponse("Tokoh terkenal tidak ditemukan", {
        status: 404,
      });
    }

    const name = companion.id;
    const companion_file_name = name + ".txt";

    const companionKey = {
      companionName: name!,
      userId: user.id,
      modelName: "gemini-pro-vision",
    };

    const memoryManager = await MemoryManager.getInstance();

    const records = await memoryManager.readLatestHistory(companionKey);
    if (records.length === 0) {
      await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey);
    }
    await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);

    // Query Pinecone

    const recentChatHistory = await memoryManager.readLatestHistory(
      companionKey
    );

    // Sekarang preamble sudah include kedalam similarity search, tapi
    // bukan issue

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      companion_file_name
    );

    let relevantHistory = "";
    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    }
    const { handlers } = LangChainStream();
    // Panggil Replicate for inference
    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      maxOutputTokens: 2048,
      apiKey: process.env.GEMINI_API_KEY,
      // callbacks: [new ConsoleCallbackHandler()],
      // streaming: true
    });

    // Setting verbose untuk debugging di terminal
    model.verbose = true;

    const resp = await model
      .invoke([
        [
          "human",
          `ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix.

          ${companion.instructions}

          Below are relevant details about ${companion.name}'s past and the conversation you are in.
          ${relevantHistory}

          ${recentChatHistory}\n${companion.name}:`,
        ],
      ])
      .catch((err) => console.log(err));

    const response = resp?.lc_kwargs.content;
    console.log("Ini console server Response", resp);

    if (response !== undefined && response.length > 1) {
      await memoryManager.writeToHistory("" + response.trim(), companionKey);
      var Readable = await require("stream").Readable;

      let s = new Readable();
      s.push(response);
      s.push(null);
      memoryManager.writeToHistory("" + response.trim(), companionKey);

      await prismadb.famousFigure.update({
        where: {
          id: params.chatId,
        },
        data: {
          messages: {
            create: {
              content: response.trim(),
              role: "system",
              userId: user.id,
            },
          },
        },
      });
      return new StreamingTextResponse(s);
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
