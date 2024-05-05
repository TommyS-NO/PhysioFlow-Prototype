import { CustomError } from "./customError.js";

export function errorHandler(err, req, res, next) {
	const statusCode = err instanceof CustomError ? err.statusCode : 500;
	const message =
		err instanceof CustomError ? err.message : "Internal Server Error";

	if (process.env.NODE_ENV === "development") {
		console.error(`[${new Date().toISOString()}] Error:`, err);
	} else {
		console.error(`[${new Date().toISOString()}] Error:`, message);
	}

	res.status(statusCode).json({ message });
}
