const express = require("express");
const router = express.Router();
const { getEmbedding } = require("../util/tensorflowUtil");
const { createVector } = require("../util/qdrantUtil");

router.post("/upload", async (req, res) => {
	const { navn, kategori, beskrivelse, gjentakelser } = req.body;

	try {
		const embedding = await getEmbedding([beskrivelse]);
		const vector = embedding[0];
		const documentId = navn.replace(/\s+/g, "_").toLowerCase();

		const result = await createVector("exercises", documentId, vector, {
			kategori,
			beskrivelse,
			gjentakelser,
		});
		res.json({ message: "Øvelse lastet opp", result });
	} catch (error) {
		console.error("Feil ved opplasting av øvelse:", error);
		res.status(500).json({ error: "Kunne ikke laste opp øvelse" });
	}
});

module.exports = router;
