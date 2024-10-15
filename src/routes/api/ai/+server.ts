import { error } from "@sveltejs/kit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLEAI_API_KEY } from "$env/static/private";

/** @type {import('./$types').RequestHandler} */ export async function GET({
  url,
}) {
  const postTitle = url.searchParams.get("postTitle") ?? "";
  const promptAdvice = url.searchParams.get("promptAdvice") ?? "";
  if (!postTitle) {
    throw error(400,"postTitle is required");
  }

  const generatedPostTitle = await generateRedditPostTitle(
    postTitle,
    promptAdvice
  );

  return new Response(JSON.stringify({ generatedPostTitle }));
}

async function generateRedditPostTitle(
  title: string,
  promptAdvice: string
): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(GOOGLEAI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `As an advertisement for our Discord server, we want to create a catchy Reddit post title. The current title is: "${title}". ${promptAdvice
      ? `Use this as help to guide this prompt: "${promptAdvice}".`
      : ""
      } We need a version that captures attention and encourages engagement. Return just a string of text with no special characters other than maybe an emoji or two.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error: any) {
    return title;
    // throw new Error(`Failed to generate Reddit post title: ${error.message}`);
  }
}
