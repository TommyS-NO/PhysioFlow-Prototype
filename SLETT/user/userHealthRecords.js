// import { Firestore } from "@google-cloud/firestore";
// import admin from "firebase-admin";
// import { ValidationError, NotFoundError } from "../../utils/customError.js";

// const db = new Firestore();

// export const getUserDiagnoses = async (req, res, next) => {
// 	const { userId } = req.params;
// 	try {
// 		const snapshot = await db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("diagnoses")
// 			.get();
// 		const diagnoses = snapshot.docs.map((doc) => ({
// 			id: doc.id,
// 			...doc.data(),
// 		}));
// 		res.status(200).json(diagnoses);
// 	} catch (error) {
// 		next(new ValidationError("Feil ved henting av brukerdiagnoser"));
// 	}
// };

// export const saveDiagnosisForUser = async (req, res, next) => {
// 	const { userId } = req.params;
// 	const diagnosis = req.body;
// 	if (!diagnosis || !diagnosis.title || !diagnosis.description) {
// 		return next(new ValidationError("Diagnosedata er ufullstendig"));
// 	}
// 	try {
// 		const diagnosisRef = await db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("diagnoses")
// 			.add({
// 				...diagnosis,
// 				createdAt: admin.firestore.FieldValue.serverTimestamp(),
// 			});
// 		res.status(201).json({ message: "Diagnose lagret", id: diagnosisRef.id });
// 	} catch (error) {
// 		next(new ValidationError("Feil ved lagring av diagnose"));
// 	}
// };

// export const deleteDiagnosisForUser = async (req, res, next) => {
// 	const { userId, diagnosisId } = req.params;
// 	try {
// 		const diagnosisRef = db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("diagnoses")
// 			.doc(diagnosisId);
// 		await diagnosisRef.delete();
// 		res.status(200).json({ message: "Diagnose slettet vellykket" });
// 	} catch (error) {
// 		next(new ValidationError("Feil ved sletting av diagnose"));
// 	}
// };

// export const getCompletedExercisesForUser = async (req, res, next) => {
// 	const { userId } = req.params;
// 	try {
// 		const snapshot = await db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("completedExercises")
// 			.get();
// 		const completedExercises = snapshot.docs.map((doc) => ({
// 			id: doc.id,
// 			...doc.data(),
// 		}));
// 		res.status(200).json(completedExercises);
// 	} catch (error) {
// 		next(new ValidationError("Feil ved henting av fullførte øvelser"));
// 	}
// };

// export const saveCompletedExerciseForUser = async (req, res, next) => {
// 	const { userId } = req.params;
// 	const { completedExercise } = req.body;
// 	if (!completedExercise || !completedExercise.name) {
// 		return next(
// 			new ValidationError("Data for fullført øvelse er ufullstendig"),
// 		);
// 	}
// 	try {
// 		await db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("completedExercises")
// 			.add({
// 				...completedExercise,
// 				completedAt: admin.firestore.FieldValue.serverTimestamp(),
// 			});
// 		res.status(201).json({ message: "Fullført øvelse lagret" });
// 	} catch (error) {
// 		next(new ValidationError("Feil ved lagring av fullført øvelse"));
// 	}
// };

// export const deleteExerciseForUser = async (req, res, next) => {
// 	const { userId, exerciseId } = req.params;
// 	try {
// 		const exerciseRef = db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("exercises")
// 			.doc(exerciseId);
// 		const exerciseDoc = await exerciseRef.get();
// 		if (!exerciseDoc.exists) {
// 			throw new NotFoundError(`Øvelse med ID ${exerciseId} ble ikke funnet`);
// 		}
// 		await exerciseRef.delete();
// 		res.status(200).json({ message: "Øvelse slettet vellykket" });
// 	} catch (error) {
// 		next(new ValidationError("Feil ved sletting av øvelse"));
// 	}
// };
