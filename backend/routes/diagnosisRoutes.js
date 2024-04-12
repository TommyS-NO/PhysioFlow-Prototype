// /api/routes/diagnosisRoutes.js
import express from "express";
import {
	getDiagnoses,
	addDiagnosis,
} from "../controllers/diagnosisController.js";

const router = express.Router();

// Hent alle diagnoser
router.get("/", getDiagnoses);

// Legg til en ny diagnose
router.post("/", addDiagnosis);

export default router;
