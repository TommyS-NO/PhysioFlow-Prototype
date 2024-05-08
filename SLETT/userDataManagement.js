// import { Firestore } from "@google-cloud/firestore";
// import { ValidationError, NotFoundError } from "../../utils/customError.js";

// const db = new Firestore();

// export const getUser = async (req, res, next) => {
// 	const { id } = req.params;
// 	try {
// 		const doc = await db.collection("users").doc(id).get();
// 		if (!doc.exists) {
// 			throw new NotFoundError("Brukeren ble ikke funnet");
// 		}
// 		res.status(200).json(doc.data());
// 	} catch (error) {
// 		if (error instanceof NotFoundError) {
// 			next(error);
// 		} else {
// 			next(new ValidationError("Feil under henting av brukerdata"));
// 		}
// 	}
// };

// export const updateUser = async (req, res, next) => {
// 	const { id } = req.params;
// 	const userData = req.body;
// 	try {
// 		await db.collection("users").doc(id).update(userData);
// 		res.status(200).json({ message: "Bruker oppdatert vellykket" });
// 	} catch (error) {
// 		next(new ValidationError("Feil ved oppdatering av bruker"));
// 	}
// };
