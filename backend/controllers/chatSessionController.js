import openai from "../openAI/openAIConfig.js";
import { ValidationError, NotFoundError } from "../utils/customError.js";

const chatSessions = new Map();

export const startSession = (userId) => {
	if (!userId) {
		throw new ValidationError("Missing user ID at session start");
	}

	const sessionId = `session_${userId}_${Date.now()}`;
	const session = {
		sessionId,
		userId,
		startTime: new Date(),
		messages: [],
	};

	chatSessions.set(sessionId, session);
	return session;
};

export const sendMessage = async (sessionId, message) => {
	const session = chatSessions.get(sessionId);

	if (!session) {
		throw new NotFoundError(`No chat session found for ID: ${sessionId}`);
	}

	session.messages.push({
		role: "user",
		content: message,
	});

	const chatCompletion = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: session.messages,
		max_tokens: 650,
		temperature: 0.9,
		stop: ["\n"],
		user: session.userId,
	});

	if (
		!chatCompletion ||
		!chatCompletion.choices ||
		!chatCompletion.choices[0].message
	) {
		throw new Error("AI completion response is not in the expected format.");
	}

	const aiMessageContent = `BobAi: ${chatCompletion.choices[0].message.content}`;

	session.messages.push({
		role: "assistant",
		content: aiMessageContent,
	});

	return {
		messages: session.messages,
		aiResponse: aiMessageContent,
	};
};
