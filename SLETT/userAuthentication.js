// import { Firestore } from "@google-cloud/firestore";
// import admin from "firebase-admin";
// import { ValidationError } from "../../utils/customError.js";

// const db = new Firestore();

// export const register = async (req, res, next) => {
// 	const { email, password, username, age, weight, height, gender, birthday } =
// 		req.body;
// 	if (!email || !password || !username || !birthday) {
// 		return next(
// 			new ValidationError(
// 				"E-post, passord, brukernavn og fødselsdato må oppgis",
// 			),
// 		);
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
// 			message: "Bruker registrert og data lagret i Firestore",
// 			userId,
// 		});
// 	} catch (error) {
// 		console.error("Registreringsfeil:", error);
// 		next(new ValidationError("Feil under registrering av bruker"));
// 	}
// };

// export const deleteUser = async (req, res, next) => {
// 	const { id } = req.params;
// 	// Verifiser token og sjekk brukerens rolle
// 	if (!req.user || (req.user.uid !== id && !req.user.isAdmin)) {
// 		return res
// 			.status(403)
// 			.json({ message: "Ikke autorisert til å utføre denne handlingen" });
// 	}
// 	try {
// 		await admin.auth().deleteUser(id);
// 		res.status(200).json({ message: "Bruker slettet" });
// 	} catch (error) {
// 		console.error("Slettefeil:", error);
// 		next(new ValidationError("Feil ved sletting av bruker"));
// 	}
// };

// // export const deleteUser = async (req, res, next) => {
// // 	const { id } = req.params;
// // 	const requestingUser = req.user;
// // 	if (requestingUser.uid !== id && !requestingUser.isAdmin) {
// // 		return res
// // 			.status(403)
// // 			.json({ message: "Ikke autorisert til å utføre denne handlingen" });
// // 	}
// // 	try {
// // 		await admin.auth().deleteUser(id);
// // 		res.status(200).json({ message: "Bruker slettet" });
// // 	} catch (error) {
// // 		console.error("Slettefeil:", error); // Log the error details securely
// // 		next(new ValidationError("Feil ved sletting av bruker"));
// // 	}
// // };
