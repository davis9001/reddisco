import { error } from "@sveltejs/kit"
/** @type {import('./$types').RequestHandler} */ export function GET({ url }) {
  const min = Number(url.searchParams.get("min") ?? "0")
  const max = Number(url.searchParams.get("max") ?? "1")
  const d = max - min
  if (isNaN(d) || d < 0) {
    error(400, "min and max must be numbers, and min must be less than max")
  }
  const random = min + Math.random() * d
  return new Response(String(random))
}

// // server.ts
// import express from "express"
// import axios from "axios"

// const app = express()
// const port = 3000

// app.use(express.json())

// app.post("/generate-title", async (req, res) => {
//   const { title, promptAdvice } = req.body

//   try {
//     const generatedTitle = await generateRedditTitle(title, promptAdvice)
//     res.json({ generatedTitle })
//   } catch (error: any) {
//     res.status(500).json({ error: error.message })
//   }
// })

// async function generateRedditTitle(
//   title: string,
//   promptAdvice: string
// ): Promise<string> {
//   try {
//     // Replace 'YOUR_CHATGPT_API_KEY' with your actual ChatGPT API key
//     const response = await axios.post(
//       "https://api.openai.com/v1/completions",
//       {
//         model: "text-davinci-002",
//         prompt: `As an advertisement for our Discord server, we want to create a catchy Reddit post title. The current title is: "${title}". ${
//           promptAdvice
//             ? `Use this as help to guide this prompt: "${promptAdvice}".`
//             : ""
//         } We need a version that captures attention and encourages engagement.`,
//         max_tokens: 30,
//         n: 1,
//         temperature: 0.5,
//         stop: ["\n"],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     )

//     return response.data.choices[0].text.trim()
//   } catch (error: any) {
//     throw new Error(`Failed to generate Reddit post title: ${error.message}`)
//   }
// }

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`)
// })
