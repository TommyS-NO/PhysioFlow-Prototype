import { CustomError } from "./customError.js";

export function errorHandler(err, req, res, next) {
	const statusCode = err instanceof CustomError ? err.statusCode : 500;
	const message =
		err instanceof CustomError ? err.message : "Intern systemfeil";

	if (process.env.NODE_ENV === "development") {
		console.error(`[${new Date().toISOString()}] Feil:`, err);
	} else {
		console.error(`[${new Date().toISOString()}] Feil:`, message);
	}
	res.status(statusCode).json({ melding: message });
}
