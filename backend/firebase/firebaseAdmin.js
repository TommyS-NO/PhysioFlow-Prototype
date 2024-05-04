import admin from "firebase-admin";
import dotenv from "dotenv";
import { CustomError } from "../utils/customError.js";

dotenv.config();

const serviceAccount = {
	type: "service_account",
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key:
		process.env.FIREBASE_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
} catch (error) {
	console.error("Firebase-initialisering feilet", error);
	throw new CustomError(500, "Firebase-initialisering feilet", error);
}

const db = admin.firestore();

export { admin, db };
