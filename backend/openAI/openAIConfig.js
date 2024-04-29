import { OpenAI } from "openai";

console.log("Initializing OpenAI with API key:");

const openai = new OpenAI({
	apiKey: "sk-proj-c24xDyXNf3dsMw5YRVhmT3BlbkFJh3kv6kwWsBm3R2Yu1YTs",
	// organization: "org-KqrXXRgN8pcoRj8kMJHtuRw7",
});

export default openai;
