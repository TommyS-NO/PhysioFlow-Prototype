// import express from "express";
// import { startSession, sendMessage } from "../utils/chatService.js";

// const router = express.Router();

// router.post("/start", async (req, res) => {
// 	try {
// 		const chatSession = startSession(req.body.userId);
// 		res
// 			.status(200)
// 			.json({ message: "Chat started successfully", session: chatSession });
// 	} catch (error) {
// 		res
// 			.status(500)
// 			.json({ error: "Failed to start AI chat", details: error.toString() });
// 	}
// });

// router.post("/:sessionId/message", async (req, res) => {
// 	try {
// 		const { userMessage, aiMessage } = await sendMessage(
// 			req.params.sessionId,
// 			req.body.message,
// 		);
// 		res.status(200).json({ userMessage, aiMessage });
// 	} catch (error) {
// 		res
// 			.status(500)
// 			.json({ error: "Failed to send message", details: error.toString() });
// 	}
// });

// export default router;
