// const fs = require("fs");
// const { getEmbedding } = require("../util/tensorflowUtil");
// const { createVector } = require("./qdrantUtil");

// const rawdata = fs.readFileSync("data/exercise.json");
// const exercises = JSON.parse(rawdata).fysioterapiOvelser;

// async function uploadExercises() {
// 	for (const exercise of exercises) {
// 		const embedding = await getEmbedding([exercise.beskrivelse]);
// 		const vector = embedding[0];
// 		const documentId = exercise.navn.replace(/\s+/g, "_").toLowerCase();

// 		try {
// 			await createVector("exercises", documentId, vector, {
// 				navn: exercise.navn,
// 				kategori: exercise.kategori,
// 				beskrivelse: exercise.beskrivelse,
// 				gjentakelser: exercise.gjentakelser,
// 			});
// 			console.log(`Lastet opp øvelse: ${exercise.navn}`);
// 		} catch (error) {
// 			console.error("Kunne ikke laste opp øvelse:", error);
// 		}
// 	}
// }

// uploadExercises().catch(console.error);
