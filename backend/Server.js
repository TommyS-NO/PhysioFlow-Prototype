import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import surveyRoutes from "./routes/surveyRoute.js";
import exerciseRoutes from "./routes/exerciseRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Sikkerhet
app.use(helmet()); // Setter sikkerhetsheadere
app.use(cors());
app.use(morgan("combined")); // Logger alle HTTP-forespørsler

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutter
	max: 100, // Limit hver IP til 100 forespørsler per tidsvindu
});
app.use(limiter);

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

// Ruter
app.use("/api/survey", surveyRoutes);
app.use("/api/exercises", exerciseRoutes);

// 404 - Ikke funnet håndtering
app.use((req, res) => {
	res.status(404).send("Siden ble ikke funnet!");
});

// Generell feilhåndtering
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Noe gikk galt!");
});

// Start serveren
app.listen(PORT, () => {
	console.log(`Server kjører på http://localhost:${PORT}`);
});
