const express = require("express");
const cors = require("cors");
const { authenticateUser } = require("./Auth/authController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
	const { username, password } = req.body;
	const user = authenticateUser(username, password);

	if (user) {
		res.json({ message: "Suksess", token: "en-tilfeldig-token-her" }); // Token kan implementeres senere
	} else {
		res.status(401).json({ message: "Feil brukernavn eller passord" });
	}
});

app.get("/", (req, res) => {
	res.send("Hello, World!");
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
