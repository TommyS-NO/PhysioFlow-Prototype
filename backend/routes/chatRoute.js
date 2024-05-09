import express from "express";
import {
	startSession,
	sendMessage,
} from "../controllers/chatSessionController.js";

const router = express.Router();

// Start en chat-økt
router.post("/start", async (req, res, next) => {
	try {
		const chatSession = startSession(req.body.userId);
		res.status(200).json({ session: chatSession });
	} catch (error) {
		next(error);
	}
});

// Send en melding i en chat-økt
router.post("/:sessionId/message", async (req, res, next) => {
	try {
		const { messages, aiResponse } = await sendMessage(
			req.params.sessionId,
			req.body.message,
		);
		res.status(200).json({ messages, aiResponse });
	} catch (error) {
		next(error);
	}
});

export default router;
