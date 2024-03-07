const express = require("express");
const cors = require("cors");
const authController = require("./controller/authController");
const userController = require("./controller/userController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Autentisering av bruker
app.post("/login", (req, res) => {
	const { username, password } = req.body;
	const result = authController.authenticateUser(username, password);
	if (result.success) {
		res.json({ message: "Suksess", data: { token: "dummy-token-for-demo" } });
	} else {
		res.status(404).json({ message: result.message });
	}
});

// Registrering av bruker
app.post("/register", (req, res) => {
	const result = userController.registerUser(req.body);
	if (result.success) {
		res.json({ message: "Suksess", newUser: result.newUser });
	} else {
		res.status(400).json({ message: result.message });
	}
});

// CRUD-operasjoner for bruker
app.get("/users/:id", (req, res) => {
	const user = userController.getUserById(req.params.id);
	if (user) {
		res.json(user);
	} else {
		res.status(404).json({ message: "Brukeren ble ikke funnet." });
	}
});

app.put("/users/:id", (req, res) => {
	const result = userController.updateUser(req.params.id, req.body);
	if (result.success) {
		res.json({
			message: "Brukeren ble oppdatert.",
			updatedUser: result.updatedUser,
		});
	} else {
		res.status(404).json({ message: result.message });
	}
});

app.delete("/users/:id", (req, res) => {
	const result = userController.deleteUser(req.params.id);
	if (result.success) {
		res.json({ message: "Brukeren ble slettet." });
	} else {
		res.status(404).json({ message: result.message });
	}
});

app.use((req, res) => {
	res.status(404).send("Siden ble ikke funnet!");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Noe gikk galt!");
});

app.listen(PORT, () => {
	console.log(`Server kjører på http://localhost:${PORT}`);
});
