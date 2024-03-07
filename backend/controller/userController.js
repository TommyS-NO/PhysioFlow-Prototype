const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "data", "users.json");

// Funksjon for å lese brukerdata fra filen

const getUsers = () => {
	try {
		const usersData = fs.readFileSync(usersFilePath);
		return JSON.parse(usersData);
	} catch (error) {
		console.error("Could not read user data:", error);
		return [];
	}
};

// Funksjon for å lagre brukerdata til filen
const saveUsers = (users) => {
	try {
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
	} catch (error) {
		console.error("Could not save user data:", error);
	}
};

// Sjekker om brukernavnet allerede er tatt
const isUsernameTaken = (username) => {
	const users = getUsers();
	return users.some((user) => user.username === username);
};

// Registrering av ny bruker med grunnleggende validering

const registerUser = ({
	username,
	password,
	email,
	gender,
	height,
	weight,
	birthday,
}) => {
	if (!username || !password || !email) {
		return {
			success: false,
			message: "Username, password, and email are required.",
		};
	}

	const users = getUsers();

	if (isUsernameTaken(username)) {
		return { success: false, message: "Username is already taken." };
	}

	// Grunnleggende validering for
	// Utvid med mer omfattende validering!!

	if (!email.includes("@")) {
		return { success: false, message: "Invalid email format." };
	}

	const newUser = {
		id: users.length + 1, // Enkel metode for å generere unik ID
		username,
		password, // OBS: Passord MÅ hashes
		email,
		gender,
		height,
		weight,
		birthday,
	};

	users.push(newUser);
	saveUsers(users);

	return { success: true, newUser };
};

// Funksjon for å finne en bruker basert på ID
const getUserById = (id) => {
	const users = getUsers();
	const user = users.find((user) => user.id === parseInt(id));
	return user || null;
};

// Oppdaterer en eksisterende bruker

const updateUser = (id, updates) => {
	const users = getUsers();
	const index = users.findIndex((user) => user.id === parseInt(id));

	if (index === -1) {
		return { success: false, message: "Bruker ikke funnet." };
	}
	users[index] = { ...users[index], ...updates };
	saveUsers(users);

	return { success: true, updatedUser: users[index] };
};

// Sletter en bruker basert på ID
const deleteUser = (id) => {
	let users = getUsers();
	const index = users.findIndex((user) => user.id === parseInt(id));

	if (index === -1) {
		return { success: false, message: "Bruker ikke funnet." };
	}

	users = users.filter((user) => user.id !== parseInt(id));
	saveUsers(users);

	return { success: true, message: "Bruker slettet" };
};

module.exports = {
	registerUser,
	getUserById,
	updateUser,
	deleteUser,
};
