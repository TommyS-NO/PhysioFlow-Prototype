import { neckDiagnoses } from "../diagnoses/neckDiagnoses.js";

export const getDiagnoses = async (req, res) => {
	try {
		res.status(200).json(neckDiagnoses);
	} catch (error) {
		console.error("Feil under henting av diagnoser: ", error);
		res.status(500).json({ message: "Feil under henting av diagnoser", error });
	}
};

export const addDiagnosis = async (req, res) => {
	const newDiagnosis = req.body;

	try {
		res
			.status(201)
			.json({ message: "Ny diagnose lagt til", diagnosis: newDiagnosis });
	} catch (error) {
		console.error("Feil under legging til av ny diagnose: ", error);
		res
			.status(500)
			.json({ message: "Feil under legging til av ny diagnose", error });
	}
};
