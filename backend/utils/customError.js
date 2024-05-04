export class CustomError extends Error {
	constructor(statusCode, message, details = null) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends CustomError {
	constructor(message = "Ressurs ikke funnet", details = null) {
		super(404, message, details);
	}
}

export class ValidationError extends CustomError {
	constructor(message = "Valideringsfeil", details = null) {
		super(400, message, details);
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message = "Uautorisert", details = null) {
		super(401, message, details);
	}
}

export class ForbiddenError extends CustomError {
	constructor(message = "Forbudt", details = null) {
		super(403, message, details);
	}
}
