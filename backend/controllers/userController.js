import { admin, db } from "../firebase/firebaseAdmin.js";

export const register = async (req, res) => {
	const { email, password, username, age, weight, height, gender, birthday } =
		req.body;

	try {
		const userRecord = await admin.auth().createUser({ email, password });
		const userId = userRecord.uid;

		await db.collection("users").doc(userId).set({
			username,
			email,
			age,
			weight,
			height,
			gender,
			birthday,
		});

		res.status(200).json({
			message: "Bruker registrert og data lagret i Firestore",
			userId,
		});
	} catch (error) {
		console.error("Feil under oppretting av bruker: ", error);
		res.status(500).json({ message: "Feil under oppretting av bruker", error });
	}
};

export const getUser = async (req, res) => {
	const { id } = req.params;

	try {
		const doc = await db.collection("users").doc(id).get();
		if (!doc.exists) {
			return res.status(404).json({ message: "Brukeren ble ikke funnet." });
		}
		res.status(200).json(doc.data());
	} catch (error) {
		console.error("Feil under henting av brukerdata: ", error);
		res.status(500).json({ message: "Noe gikk galt", error });
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;
	const userData = req.body;

	try {
		await db.collection("users").doc(id).update(userData);
		res.status(200).json({ message: "Brukeren ble oppdatert." });
	} catch (error) {
		console.error("Feil under oppdatering av bruker: ", error);
		res.status(500).json({ message: "Noe gikk galt ved oppdatering.", error });
	}
};

// Slette en bruker
export const deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		// Sletter brukeren fra Firebase Auth
		await admin.auth().deleteUser(id);
		// Sletter brukerens data fra Firestore
		await db.collection("users").doc(id).delete();
		res
			.status(200)
			.json({ message: "Brukeren og deres autentiseringsdata ble slettet." });
	} catch (error) {
		console.error("Feil under sletting av bruker: ", error);
		res.status(500).json({ message: "Noe gikk galt ved sletting.", error });
	}
};
