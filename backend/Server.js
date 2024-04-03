import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Import your route modules
import userRoutes from "./api/routes/userRoute.js";
import questionRoutes from "./api/routes/questionRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Simple test route
app.get("/test", (req, res) => {
	res.send("Testruten fungerer!");
});

// Define the base path for your routes
app.use("/api/users", userRoutes);
app.use("/questions", questionRoutes);

// 404 Not Found handler
app.use((req, res) => {
	res.status(404).send("Siden ble ikke funnet!");
});

// Global error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Noe gikk galt!");
});

app.listen(PORT, () => {
	console.log(`Server kjører på http://localhost:${PORT}`);
});
