// import openai from "./openAIConfig.js";

// async function chatWithBot(userInput) {
// 	try {
// 		const completion = await openai.chat.completions.create({
// 			model: "gpt-3.5-turbo-0125",
// 			messages: [
// 				{
// 					role: "user",
// 					content: userInput,
// 				},
// 			],
// 			max_tokens: 800,
// 			temperature: 0.7,
// 			top_p: 1,
// 			frequency_penalty: 0,
// 			presence_penalty: 0.6,
// 		});
// 		const response = completion.choices[0].message.content;
// 		return response;
// 	} catch (error) {
// 		console.error("Failed to create completion:", error);
// 	}
// }

// export default chatWithBot;