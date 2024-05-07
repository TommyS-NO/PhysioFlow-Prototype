// import { Firestore } from "@google-cloud/firestore";
// import admin from "firebase-admin";
// import { ValidationError, NotFoundError } from "../utils/customError.js";

// const db = new Firestore();

// // Registrer en ny bruker
// export const register = async (req, res, next) => {
// 	const { email, password, username, age, weight, height, gender, birthday } =
// 		req.body;

// 	if (!email || !password) {
// 		return next(new ValidationError("Missing email or password"));
// 	}

// 	try {
// 		const userRecord = await admin.auth().createUser({ email, password });
// 		const userId = userRecord.uid;

// 		await db.collection("users").doc(userId).set({
// 			username,
// 			email,
// 			age,
// 			weight,
// 			height,
// 			gender,
// 			birthday,
// 		});

// 		res.status(201).json({
// 			message: "User registered and data saved in Firestore",
// 			userId,
// 		});
// 	} catch (error) {
// 		next(new ValidationError("Error registering user", error.message));
// 	}
// };

// // Hent brukerdata
// export const getUser = async (req, res, next) => {
// 	const { id } = req.params;

// 	try {
// 		const doc = await db.collection("users").doc(id).get();
// 		if (!doc.exists) {
// 			throw new NotFoundError("User not found");
// 		}
// 		res.status(200).json(doc.data());
// 	} catch (error) {
// 		next(new ValidationError("Error fetching user data", error.message));
// 	}
// };

// // Oppdater brukerdata
// export const updateUser = async (req, res, next) => {
// 	const { id } = req.params;
// 	const userData = req.body;

// 	try {
// 		await db.collection("users").doc(id).update(userData);
// 		res.status(200).json({ message: "User updated successfully" });
// 	} catch (error) {
// 		next(new ValidationError("Error updating user", error.message));
// 	}
// };

// // Slett en bruker og all tilhørende data
// export const deleteUser = async (req, res, next) => {
// 	const { id } = req.params;
// 	const requestingUser = req.user;

// 	if (requestingUser.uid !== id && !requestingUser.isAdmin) {
// 		return res
// 			.status(403)
// 			.json({ message: "Not authorized to perform this action" });
// 	}

// 	const userDocRef = db.collection("users").doc(id);

// 	try {
// 		await db.runTransaction(async (transaction) => {
// 			const userDoc = await transaction.get(userDocRef);
// 			if (!userDoc.exists) {
// 				throw new NotFoundError("User not found in Firestore");
// 			}
// 			transaction.delete(userDocRef);
// 			await admin.auth().deleteUser(id);
// 		});

// 		res.status(200).json({ message: "User and all associated data deleted" });
// 	} catch (error) {
// 		next(new ValidationError("Error deleting user", error.message));
// 	}
// };

// // Hent brukerens diagnoser
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
// 		next(new ValidationError("Error fetching user diagnoses", error.message));
// 	}
// };

// // Lagre en diagnose for en bruker
// export const saveDiagnosisForUser = async (req, res, next) => {
// 	const { userId } = req.params;
// 	const diagnosis = req.body;

// 	if (!diagnosis || !diagnosis.title || !diagnosis.description) {
// 		return next(new ValidationError("Incomplete diagnosis data"));
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

// 		res.status(201).json({ message: "Diagnosis saved", id: diagnosisRef.id });
// 	} catch (error) {
// 		next(new ValidationError("Error saving diagnosis", error.message));
// 	}
// };

// // Hent brukerens øvelser
// export const getUserExercises = async (req, res, next) => {
// 	const { userId } = req.params;

// 	try {
// 		const snapshot = await db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("exercises")
// 			.get();
// 		const exercises = snapshot.docs.map((doc) => ({
// 			id: doc.id,
// 			...doc.data(),
// 		}));
// 		res.status(200).json(exercises);
// 	} catch (error) {
// 		next(new ValidationError("Error fetching user exercises", error.message));
// 	}
// };

// // Lagre en øvelse for en bruker
// export const saveExerciseForUser = async (req, res, next) => {
// 	const { userId } = req.params;
// 	const { exercise } = req.body;

// 	if (!exercise || !exercise.name || !exercise.instructions) {
// 		return next(new ValidationError("Incomplete exercise data"));
// 	}

// 	try {
// 		const exerciseRef = await db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("exercises")
// 			.add(exercise);
// 		res.status(201).json({ message: "Exercise saved", id: exerciseRef.id });
// 	} catch (error) {
// 		next(new ValidationError("Error saving exercise", error.message));
// 	}
// };

// // Hent fullførte øvelser for en bruker
// export const getCompletedExercisesForUser = async (req, res, next) => {
// 	const { userId } = req.params;

// 	try {
// 		const completedExercisesSnapshot = await db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("completedExercises")
// 			.get();
// 		const completedExercises = completedExercisesSnapshot.docs.map((doc) => ({
// 			id: doc.id,
// 			...doc.data(),
// 		}));
// 		res.status(200).json({ completedExercises });
// 	} catch (error) {
// 		next(
// 			new ValidationError("Error fetching completed exercises", error.message),
// 		);
// 	}
// };

// // Lagre en fullført øvelse for en bruker
// export const saveCompletedExerciseForUser = async (req, res, next) => {
// 	const { userId } = req.params;
// 	const { completedExercise } = req.body;

// 	if (!completedExercise || !completedExercise.name) {
// 		return next(new ValidationError("Incomplete completed exercise data"));
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
// 		res.status(201).json({ message: "Completed exercise saved" });
// 	} catch (error) {
// 		next(new ValidationError("Error saving completed exercise", error.message));
// 	}
// };

// // Slett en øvelse
// export const deleteExercise = async (req, res, next) => {
// 	const { userId, exerciseId } = req.params;

// 	try {
// 		const exerciseDoc = await db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("exercises")
// 			.doc(exerciseId)
// 			.get();

// 		if (!exerciseDoc.exists) {
// 			throw new NotFoundError(`Exercise with ID ${exerciseId} not found`);
// 		}

// 		await db
// 			.collection("users")
// 			.doc(userId)
// 			.collection("exercises")
// 			.doc(exerciseId)
// 			.delete();

// 		res.status(200).json({ message: "Exercise deleted successfully" });
// 	} catch (error) {
// 		next(new ValidationError("Error deleting exercise", error.message));
// 	}
// };
