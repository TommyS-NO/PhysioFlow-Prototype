import { db } from "../../firebase/firebaseAdmin.js";

export const getGeneralQuestions = async (req, res) => {
	try {
		const generalQuestionsRef = db.doc("generalQuestions/general");
		const doc = await generalQuestionsRef.get();

		if (!doc.exists) {
			return res.status(404).json({ message: "General questions not found." });
		}

		res.json(doc.data());
	} catch (error) {
		console.error("Error fetching general questions:", error);
		res.status(500).json({ error: error.message });
	}
};

export const getQuestionsByFocusArea = async (req, res) => {
	const focusArea = req.params.focusArea;
	try {
		const focusAreaRef = db.collection("focusAreas").doc(focusArea);
		const doc = await focusAreaRef.get();
		if (!doc.exists) {
			console.log(`Focus area ${focusArea} not found in Firestore`);
			return res.status(404).json({ message: "Focus area not found." });
		}
		console.log(`Fetched data for focus area ${focusArea}:`, doc.data());
		res.json(doc.data());
	} catch (error) {
		console.error(
			`Error fetching questions for focus area ${focusArea}:`,
			error,
		);
		res.status(500).json({ error: error.message });
	}
};

export const getIndividualQuestion = async (req, res) => {
	const { focusArea, questionId } = req.params;

	try {
		const questionRef = db
			.collection("focusAreas")
			.doc(focusArea)
			.collection("questionsById")
			.doc(questionId);
		const doc = await questionRef.get();

		if (!doc.exists) {
			return res.status(404).json({ message: "Question not found." });
		}

		res.json(doc.data());
	} catch (error) {
		console.error(`Error fetching individual question ${questionId}:`, error);
		res.status(500).json({ error: error.message });
	}
};

export const getFollowUpQuestions = async (req, res) => {
	// Oppdaterer funksjonen for å inkludere håndtering av `followUpQuestions` samling
	const { focusArea, questionId } = req.params;

	try {
		const followUpsRef = db
			.collection("focusAreas")
			.doc(focusArea)
			.collection("questionsById")
			.doc(questionId)
			.collection("followUpQuestions");

		const snapshot = await followUpsRef.get();

		if (snapshot.empty) {
			return res.status(404).json({ message: "No follow-up questions found." });
		}

		const followUps = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		res.json(followUps);
	} catch (error) {
		console.error(
			`Error fetching follow-up questions for question ${questionId}:`,
			error,
		);
		res.status(500).json({ error: error.message });
	}
};

export const handleAnswer = async (req, res) => {
	const { focusArea, questionId, answer } = req.body;

	try {
		const questionRef = db
			.collection("focusAreas")
			.doc(focusArea)
			.collection("questionsById")
			.doc(questionId);

		const doc = await questionRef.get();

		if (!doc.exists) {
			return res.status(404).json({ message: "Question not found." });
		}

		const questionData = doc.data();

		const followUpId = questionData.followUp[answer];

		if (!followUpId) {
			return res.status(404).json({
				message: "Follow-up question not found based on the given answer.",
			});
		}
		const followUpRef = db
			.collection("focusAreas")
			.doc(focusArea)
			.collection("questionsById")
			.doc(followUpId);

		const followUpDoc = await followUpRef.get();

		if (!followUpDoc.exists) {
			return res.status(404).json({ message: "Follow-up question not found." });
		}

		res.json(followUpDoc.data());
	} catch (error) {
		console.error(`Error handling answer for question ${questionId}:`, error);
		res.status(500).json({ error: error.message });
	}
};
