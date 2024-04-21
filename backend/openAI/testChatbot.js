import readline from "readline";
import chatWithBot from "./chatbot.js";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.setPrompt("You: ");
rl.prompt();

rl.on("line", async (line) => {
	if (line.toLowerCase() === "exit") {
		rl.close();
	} else {
		const response = await chatWithBot(line);
		console.log("Bot:", response);
		rl.prompt();
	}
}).on("close", () => {
	console.log("Session ended. Goodbye!");
	process.exit(0);
});
