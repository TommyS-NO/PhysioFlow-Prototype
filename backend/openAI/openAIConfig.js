import { OpenAI } from "openai";
import dotenv from "dotenv";
import { ValidationError } from "../utils/customError.js";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
	throw new ValidationError("API-nøkkel for OpenAI mangler");
}

const openai = new OpenAI({
	apiKey,
	organization: process.env.OPENAI_ORG || undefined,
});

export default openai;
