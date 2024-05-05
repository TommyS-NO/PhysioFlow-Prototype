import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./utils/errorHandler.js";
import chatRoute from "./routes/chatRoute.js";
import surveyRoutes from "./routes/surveyRoute.js";
import exerciseRoutes from "./routes/exerciseRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});
app.use(limiter);

app.use("/api/chat", chatRoute);
app.use("/api/survey", surveyRoutes);
app.use("/api/exercises", exerciseRoutes);

app.use((req, res) =>
	res.status(404).json({ melding: "404 - Side ikke funnet" }),
);

app.use(errorHandler);

app.listen(PORT, () =>
	console.log(`Serveren kjører på http://localhost:${PORT}`),
);
