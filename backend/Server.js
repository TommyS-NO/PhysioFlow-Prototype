import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import surveyRoutes from "./routes/surveyRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use the API routes
app.use("/api/survey", surveyRoutes);

// 404 Not Found handler
app.use((req, res) => {
	res.status(404).send("Siden ble ikke funnet!");
});

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Noe gikk galt!");
});

app.listen(PORT, () => {
	console.log(`Server kjører på http://localhost:${PORT}`);
});
