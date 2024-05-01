import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import AiRoute from "./routes/AiRoute.js";
import surveyRoutes from "./routes/surveyRoute.js";
import exerciseRoutes from "./routes/exerciseRoute.js";
import { loadData, search } from "./utils/vectorStoreService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutter
	max: 100,
});
app.use(limiter);
loadData();

app.use("/api/chat", AiRoute);
app.use("/api/survey", surveyRoutes);
app.use("/api/exercises", exerciseRoutes);

app.use((req, res) => {
	res.status(404).send("404 Not Found");
});

app.use((error, req, res, next) => {
	console.error("Error:", error);
	res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
