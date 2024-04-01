import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from "./api/routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Bruk brukerruter definert i userRoutes.js
app.use(userRoutes);

// Håndtere 404 Not Found
app.use((req, res) => {
	res.status(404).send("Siden ble ikke funnet!");
});

// Global feilhåndtering
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Noe gikk galt!");
});

app.listen(PORT, () => {
	console.log(`Server kjører på http://localhost:${PORT}`);
});
