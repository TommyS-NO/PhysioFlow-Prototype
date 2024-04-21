import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
	apiKey: "sk-proj-pfPpGtX23xfJS7XhbErJT3BlbkFJ4v2uEs2hBTitqOR77V00",
	organization: "org-KqrXXRgN8pcoRj8kMJHtuRw7",
});

export default openai;
