import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { caption } = await request.json();
    console.log(caption);
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a knowledgable assistant that provides the best quality information",
          },
          {
            role: "user",
            content: `Tell about ${caption}. You can give an advice or fact about ${caption}. Be like human how to respon this content ${caption} on social media platform comments. If caption use spesific language like Indonesian, you can use Indonesian language.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const data = await response.data;
    const reply = data.choices[0].message.content;

    return NextResponse.json(reply, { status: 200 });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
