const fs = require("fs");
const path = require("path");

// Hjelpefunksjon for å lese brukerdata fra JSON-fil
const getUsers = () => {
	const usersPath = path.join(__dirname, "..", "data", "users.json");
	const usersData = fs.readFileSync(usersPath);
	return JSON.parse(usersData);
};

// Hjelpefunksjon for å skrive brukerdata til JSON-fil
const saveUsers = (users) => {
	const usersPath = path.join(__dirname, "..", "data", "users.json");
	fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

// Funksjon for å autentisere en bruker
const authenticateUser = (username, password) => {
	const users = getUsers();
	return users.find(
		(user) => user.username === username && user.password === password,
	);
};

// Funksjon for å sjekke om et brukernavn allerede eksisterer
const isUsernameTaken = (username) => {
	const users = getUsers();
	return users.some((user) => user.username === username);
};

// Funksjon for å registrere en ny bruker
const registerUser = (username, password) => {
	const users = getUsers();

	// Finn maksimalt ID blant eksisterende brukere og legg til 1 for ny bruker
	const newId =
		users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

	const newUser = { id: newId, username, password };
	users.push(newUser);
	saveUsers(users);

	return newUser;
};

module.exports = { authenticateUser, isUsernameTaken, registerUser };
