import express from "express";
import { getExerciseDetails } from "../controllers/exerciseController.js";

const router = express.Router();

// Henter detaljer for en liste med øvelser
router.post("/details", getExerciseDetails);

export default router;
