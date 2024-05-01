import { collection, getDocs } from "firebase/firestore";

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

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		await admin.auth().deleteUser(id);
		await db.collection("users").doc(id).delete();
		res
			.status(200)
			.json({ message: "Brukeren og deres autentiseringsdata ble slettet." });
	} catch (error) {
		console.error("Feil under sletting av bruker: ", error);
		res.status(500).json({ message: "Noe gikk galt ved sletting.", error });
	}
};

export const getUserDiagnoses = async (req, res) => {
	const { userId } = req.params;

	try {
		const snapshot = await db
			.collection("users")
			.doc(userId)
			.collection("diagnoses")
			.get();
		const diagnoses = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		res.status(200).json(diagnoses);
	} catch (error) {
		console.error("Feil ved henting av diagnoser: ", error);
		res.status(500).json({ message: "Feil ved henting av diagnoser", error });
	}
};

export const getUserExercises = async (req, res) => {
	const { userId } = req.params;

	try {
		const snapshot = await db
			.collection("users")
			.doc(userId)
			.collection("exercises")
			.get();
		const exercises = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		res.status(200).json(exercises);
	} catch (error) {
		console.error("Feil ved henting av øvelser: ", error);
		res.status(500).json({ message: "Feil ved henting av øvelser", error });
	}
};

export const updateCompletedExercise = async (req, res) => {
	const { userId, completedExerciseId, updateData } = req.body;

	try {
		await db
			.collection("users")
			.doc(userId)
			.collection("completedExercises")
			.doc(completedExerciseId)
			.update(updateData);
		res
			.status(200)
			.json({ message: "Gjennomført øvelse oppdatert suksessfullt." });
	} catch (error) {
		console.error("Feil ved oppdatering av gjennomført øvelse: ", error);
		res
			.status(500)
			.json({ message: "Feil ved oppdatering av gjennomført øvelse", error });
	}
};

// Funksjon for å lagre en ny diagnose for en bruker
export const saveDiagnosisForUser = async (req, res) => {
	const { userId } = req.params;
	const { diagnosis } = req.body;

	try {
		const diagnosisRef = await db
			.collection("users")
			.doc(userId)
			.collection("diagnoses")
			.add(diagnosis);
		res.status(201).json({ message: "Diagnose lagret", id: diagnosisRef.id });
	} catch (error) {
		console.error("Feil ved lagring av diagnose: ", error);
		res.status(500).json({ message: "Feil ved lagring av diagnose", error });
	}
};

// Funksjon for å lagre en ny øvelse for en bruker
export const saveExerciseForUser = async (req, res) => {
	const { userId } = req.params;
	const { exercise } = req.body;

	try {
		const exerciseRef = await db
			.collection("users")
			.doc(userId)
			.collection("exercises")
			.add(exercise);
		res.status(201).json({ message: "Øvelse lagret", id: exerciseRef.id });
	} catch (error) {
		console.error("Feil ved lagring av øvelse: ", error);
		res.status(500).json({ message: "Feil ved lagring av øvelse", error });
	}
};

// Funksjon for å hente alle gjennomførte øvelser for en bruker
export const getCompletedExercisesForUser = async (req, res) => {
	const { userId } = req.params;

	try {
		const completedExercisesSnapshot = await db
			.collection("users")
			.doc(userId)
			.collection("completedExercises")
			.get();
		const completedExercises = completedExercisesSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		res.status(200).json({ completedExercises });
	} catch (error) {
		console.error("Feil ved henting av gjennomførte øvelser: ", error);
		res
			.status(500)
			.json({ message: "Feil ved henting av gjennomførte øvelser", error });
	}
};

// Funksjon for å lagre en gjennomført øvelse for en bruker
export const saveCompletedExerciseForUser = async (req, res) => {
	const { userId } = req.params;
	const { completedExercise } = req.body;

	if (!completedExercise.id) {
		console.error("Error: completedExercise.id is undefined");
		return res
			.status(400)
			.json({ message: "completedExercise.id is undefined" });
	}

	// Få tilgang til øvelsen fra selectedExercises basert på exerciseId
	const exercise = selectedExercises.find(
		(ex) => ex.id === completedExercise.id,
	);

	// Sjekk om øvelsen eksisterer
	if (!exercise) {
		console.error(
			"Error: Exercise not found when trying to complete an exercise.",
		);
		return;
	}

	// Lag en ny ID ved å kombinere øvelsens navn og ID
	completedExercise.id = `${exercise.name}_${completedExercise.id}`;

	try {
		await db
			.collection("users")
			.doc(userId)
			.collection("completedExercises")
			.doc(completedExercise.id)
			.collection("responses")
			.add({
				...completedExercise,
				completedAt: admin.firestore.FieldValue.serverTimestamp(),
			});
		res.status(201).json({
			message: "Gjennomført øvelse lagret",
			id: completedExercise.id,
		});
	} catch (error) {
		console.error("Feil ved lagring av gjennomført øvelse: ", error);
		res
			.status(500)
			.json({ message: "Feil ved lagring av gjennomført øvelse", error });
	}
};
export const getUserResponses = async (userId, exerciseId) => {
	try {
		const responsesSnapshot = await getDocs(
			collection(
				db,
				"users",
				userId,
				"completedExercises",
				exerciseId,
				"responses",
			),
		);
		const responses = responsesSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return responses;
	} catch (error) {
		console.error("Feil ved henting av brukerens svar: ", error);
	}
};
