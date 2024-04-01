console.log("Starter tilkoblingen til Firebase...");

// Importerer Firebase admin og spørsmåldata
const { db } = require("./firebaseAdmin");
const { questionsData } = require("./focusNeckQuestion");

console.log(
	"Tilkobling til Firebase etablert. Begynner opplasting av spørsmål...",
);

async function uploadQuestions() {
	try {
		console.log("Laster opp generelle spørsmål...");
		await db.collection("questions").doc("general").set({
			questions: questionsData.generalQuestions,
		});
		console.log("Generelle spørsmål lastet opp.");

		console.log("Laster opp fokusområde for 'nakke'...");
		await db
			.collection("focusAreas")
			.doc("neck")
			.set(questionsData.focusAreas.neck);
		console.log("Fokusområde for 'nakke' lastet opp.");

		console.log(
			"Alle spørsmålene ble lastet opp suksessfullt. Opplasting fullført.",
		);
	} catch (error) {
		console.error("Feil under opplasting av spørsmål:", error);
	}
}

uploadQuestions()
	.then(() => {
		console.log("Opplastingsscript fullført. Avslutter Node.js-prosessen.");
		process.exit(0); // Avslutter prosessen med suksesskode
	})
	.catch((error) => {
		console.error("En feil oppstod under kjøring av scriptet:", error);
		process.exit(1); // Avslutter med feilkode
	});
