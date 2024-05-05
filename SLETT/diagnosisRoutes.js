// import express from "express";
// import {
// 	getDiagnoses,
// 	addDiagnosis,
// } from "../controllers/diagnosisController.js";

// const router = express.Router();

// // Hent alle diagnoser
// router.get("/", (res, next) => {
// 	try {
// 		const diagnoses = getDiagnoses();
// 		res.json(diagnoses);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// // Legg til en ny diagnose
// router.post("/", (req, res, next) => {
// 	try {
// 		const newDiagnosis = addDiagnosis(req.body);
// 		res.status(201).json(newDiagnosis);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// export default router;
