import openai from "../openAI/openAIConfig.js";

const chatSessions = new Map();

export const startSession = (userId) => {
	const sessionId = `session_${userId}_${Date.now()}`;
	const session = {
		sessionId,
		userId,
		startTime: new Date(),
		messages: [],
	};
	chatSessions.set(sessionId, session);
	console.log(`Session started: ${sessionId}, for user: ${userId}`);
	return session;
};

export const sendMessage = async (sessionId, message) => {
	console.log(`Attempting to send message to session ${sessionId}:`, message);
	const session = chatSessions.get(sessionId);

	if (!session) {
		console.error(`Session not found: ${sessionId}`);
		throw new Error(`No chat session found for ID: ${sessionId}`);
	}

	session.messages.push({
		role: "user",
		content: message,
	});

	try {
		console.log(`Fetching AI's response for session ${sessionId}`);
		console.log("Session messages:", session.messages);
		const chatCompletion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: session.messages,
			max_tokens: 150,
			temperature: 0.7,
			stop: ["\n"],
		});

		console.log("OpenAI response:", chatCompletion);

		if (!chatCompletion || !chatCompletion.choices) {
			// Check if the chatCompletion object and the choices array are valid
			throw new Error("AI completion response is not in the expected format.");
		}

		// Accessing the first choice's message content directly
		const aiMessageContent = chatCompletion.choices[0].message.content;

		if (aiMessageContent) {
			console.log(`AI's response: ${aiMessageContent}`);
			session.messages.push({
				role: "assistant",
				content: aiMessageContent,
			});
			console.log(`AI response logged to session ${sessionId}`);
		}

		return {
			messages: session.messages,
			aiResponse: aiMessageContent,
		};
	} catch (error) {
		console.error(`Error getting AI response for session ${sessionId}:`, error);
		throw error;
	}
};
