// const { admin, db } = require("./firebase/firebaseAdmin");

// const registerUser = async ({
// 	username,
// 	email,
// 	password,
// 	gender,
// 	height,
// 	weight,
// 	birthday,
// }) => {
// 	if (!username || !email || !password) {
// 		return {
// 			success: false,
// 			message: "Username, email, and password are required.",
// 		};
// 	}

// 	try {
// 		const usersRef = db.collection("users");
// 		const snapshot = await usersRef.where("username", "==", username).get();
// 		if (!snapshot.empty) {
// 			return { success: false, message: "Username is already taken." };
// 		}

// 		const userRecord = await admin.auth().createUser({ email, password });
// 		const userId = userRecord.uid;

// 		await db.collection("users").doc(userId).set({
// 			username,
// 			email,
// 			gender,
// 			height,
// 			weight,
// 			birthday,
// 		});

// 		return { success: true, userId };
// 	} catch (error) {
// 		console.error("Error registering user:", error);
// 		if (error.code === "auth/email-already-exists") {
// 			return { success: false, message: "Email is already in use." };
// 		}
// 		return {
// 			success: false,
// 			message: "An error occurred during registration.",
// 		};
// 	}
// };
// module.exports = registerUser;
