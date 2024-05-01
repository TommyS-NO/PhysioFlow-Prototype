// import express from "express";
// import { startSession, sendMessage } from "../utils/chatService.js";

// const router = express.Router();

// router.post("/start", async (req, res) => {
// 	console.log(
// 		"Received request to start chat session for user:",
// 		req.body.userId,
// 	);
// 	try {
// 		const chatSession = startSession(req.body.userId);
// 		console.log("Chat session started:", chatSession);
// 		res
// 			.status(200)
// 			.json({ message: "Chat started successfully", session: chatSession });
// 	} catch (error) {
// 		console.error("Failed to start AI chat:", error);
// 		res
// 			.status(500)
// 			.json({ error: "Failed to start AI chat", details: error.toString() });
// 	}
// });

// router.post("/:sessionId/message", async (req, res) => {
// 	console.log(
// 		"Received message for session:",
// 		req.params.sessionId,
// 		"Message:",
// 		req.body.message,
// 	);
// 	try {
// 		const { messages, aiResponse } = await sendMessage(
// 			req.params.sessionId,
// 			req.body.message,
// 		);
// 		console.log("AI response:", aiResponse);
// 		res.status(200).json({ messages, aiResponse });
// 	} catch (error) {
// 		console.error("Failed to send message:", error);
// 		res
// 			.status(500)
// 			.json({ error: "Failed to send message", details: error.toString() });
// 	}
// });

// export default router;
