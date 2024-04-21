import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import surveyRoutes from "./routes/surveyRoute.js";
import exerciseRoutes from "./routes/exerciseRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

3;
app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/api/survey", surveyRoutes);
app.use("/api/exercises", exerciseRoutes);

app.use((req, res) => {
	res.status(404).send("Siden ble ikke funnet!");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Noe gikk galt!");
});

app.listen(PORT, () => {
	console.log(`Server kjører på http://localhost:${PORT}`);
});
