// const { db } = require("../backend/firebase/firebaseAdmin");

// async function getQuestions(path) {
// 	const doc = await db.collection("questions").doc(path).get();
// 	return doc.exists ? doc.data() : null;
// }

// function determineNextPath(currentPath, answer) {
// 	if (currentPath === "general") {
// 		if (answer === "Ja") {
// 			return "neck_yesPath";
// 		}
// 		return "neck_noPath";
// 	}

// 	return null;
// }
// async function saveUserResponses(userId, responses) {
// 	const userDocRef = db.collection("users").doc(userId);
// 	await userDocRef.set({ responses }, { merge: true });
// }

// module.exports = {
// 	getQuestions,
// 	determineNextPath,
// 	saveUserResponses,
// };
