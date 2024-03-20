// const fs = require("fs");
// const path = require("path");
// const usersFilePath = path.join(__dirname, "data", "users.json");

// const getUsers = () => {
// 	try {
// 		const usersData = fs.readFileSync(usersFilePath);
// 		return JSON.parse(usersData);
// 	} catch (error) {
// 		console.error("Kunne ikke lese brukerdata:", error);
// 		return [];
// 	}
// };

// const authenticateUser = (username, password) => {
// 	const users = getUsers();
// 	const user = users.find(
// 		(u) => u.username === username && u.password === password,
// 	);
// 	if (user) {
// 		return { success: true, user };
// 	}
// 	return { success: false, message: "Feil brukernavn eller passord." };
// };

// module.exports = {
// 	authenticateUser,
// };
