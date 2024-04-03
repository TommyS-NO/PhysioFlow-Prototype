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
			return res.status(404).json({ message: "Focus area not found." });
		}

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

		const followUps = [];
		for (const doc of snapshot.docs) {
			followUps.push(doc.data());
		}

		res.json(followUps);
	} catch (error) {
		console.error(
			`Error fetching follow-up questions for question ${questionId}:`,
			error,
		);
		res.status(500).json({ error: error.message });
	}
};
