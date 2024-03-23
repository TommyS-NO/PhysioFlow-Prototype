require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { admin, db } = require("./firebase/firebaseAdmin");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
	const { email, password, username, age, weight, height, gender, birthday } =
		req.body;
	console.log("Forsøker å registrere bruker med data:", req.body);

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
		res.status(500).json({ message: "Feil under oppretting av bruker", error });
	}
});

app.get("/users/:id", async (req, res) => {
	const uid = req.params.id;

	try {
		const doc = await db.collection("users").doc(uid).get();
		if (doc.exists) {
			res.status(200).json(doc.data());
		} else {
			res.status(404).json({ message: "Brukeren ble ikke funnet." });
		}
	} catch (error) {
		res.status(500).json({ message: "Noe gikk galt", error });
	}
});

app.put("/users/:id", async (req, res) => {
	const uid = req.params.id;
	const userData = req.body;

	try {
		await db.collection("users").doc(uid).update(userData);
		res.status(200).json({ message: "Brukeren ble oppdatert." });
	} catch (error) {
		res.status(500).json({ message: "Noe gikk galt ved oppdatering.", error });
	}
});

app.delete("/users/:id", async (req, res) => {
	const uid = req.params.id;

	try {
		await admin.auth().deleteUser(uid);
		await db.collection("users").doc(uid).delete();
		res
			.status(200)
			.json({ message: "Brukeren og deres autentiseringsdata ble slettet." });
	} catch (error) {
		res.status(500).json({ message: "Noe gikk galt ved sletting.", error });
	}
});

app.use((req, res) => res.status(404).send("Siden ble ikke funnet!"));

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Noe gikk galt!");
});

app.listen(PORT, () => {
	console.log(`Server kjører på http://localhost:${PORT}`);
	console.log("Koble til Firebase...");
});
