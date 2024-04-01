import { db } from "../../firebase/firebaseAdmin.js";

export const getQuestionsByCategory = async (req, res) => {
	const { category } = req.params;

	try {
		const snapshot = await db.collection("questions").doc(category).get();
		if (!snapshot.exists) {
			return res.status(404).json({ message: "Kategorien ble ikke funnet." });
		}
		res.status(200).json(snapshot.data());
	} catch (error) {
		console.error("Feil under henting av spørsmål: ", error);
		res.status(500).json({ message: "Noe gikk galt", error });
	}
};

export const getNextQuestion = async (req, res) => {
	// Anta at request.body inneholder 'currentQuestionId' og 'answer'
	const { currentQuestionId, answer } = req.body;

	try {
		// Hent det aktuelle spørsmålet fra Firestore
		const currentQuestionDoc = await db
			.collection("questionsById")
			.doc(currentQuestionId)
			.get();
		if (!currentQuestionDoc.exists) {
			return res
				.status(404)
				.json({ message: "Aktuelt spørsmål ble ikke funnet." });
		}
		const currentQuestionData = currentQuestionDoc.data();

		// Finn IDen til oppfølgingsspørsmålet basert på svaret
		const followUpId = currentQuestionData.followUp[answer];
		if (!followUpId) {
			return res.status(404).json({
				message: "Oppfølgingsspørsmål ble ikke funnet for det gitte svaret.",
			});
		}

		// Hent oppfølgingsspørsmålet fra Firestore
		const followUpQuestionDoc = await db
			.collection("questionsById")
			.doc(followUpId)
			.get();
		if (!followUpQuestionDoc.exists) {
			return res
				.status(404)
				.json({ message: "Oppfølgingsspørsmål ble ikke funnet." });
		}

		// Send oppfølgingsspørsmålet til klienten
		res.status(200).json(followUpQuestionDoc.data());
	} catch (error) {
		console.error("Feil under henting av oppfølgingsspørsmål: ", error);
		res.status(500).json({
			message: "Noe gikk galt ved henting av oppfølgingsspørsmål.",
			error,
		});
	}
};
