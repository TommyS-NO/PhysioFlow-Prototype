import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import chatRoute from "./routes/chatRoute.js";
import surveyRoutes from "./routes/surveyRoute.js";
import exerciseRoutes from "./routes/exerciseRoute.js";
import userRoutes from "./routes/userRoute.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});
app.use(limiter);

// Routes
app.use("/api/chat", chatRoute);
app.use("/api/survey", surveyRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/users", userRoutes);

// 404 Middleware
app.use((req, res) => {
	res.status(404).send("404 Not Found");
});

// Error Handling Middleware
app.use(errorHandler);

// Server Listener
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
