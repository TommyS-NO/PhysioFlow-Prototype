import natural from "natural";
import { promises as fs } from "fs";
import path from "path";

import { fileURLToPath } from "url";

const tfidf = new natural.TfIdf();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Funksjon for å laste og indeksere data fra JSON-filer
export const loadData = async () => {
	const directoryPath = path.join(__dirname, "../AiDATA");
	try {
		const files = await fs.readdir(directoryPath);
		console.log(`Found ${files.length} files in the directory.`);
		for (const file of files) {
			if (file.endsWith(".json")) {
				const dataPath = path.join(directoryPath, file);
				const fileData = await fs.readFile(dataPath, "utf8");
				const data = JSON.parse(fileData);
				console.log(`Indexing data from file: ${file}`);
				for (const key of Object.keys(data)) {
					const item = data[key];
					tfidf.addDocument(JSON.stringify(item));
				}
			}
		}
		console.log("Data loading and indexing complete.");
	} catch (err) {
		console.log(`Unable to scan directory: ${err}`);
	}
};

// Funksjon for å søke i indekserte data
export const search = (query) => {
	const results = [];
	tfidf.tfidfs(query, (i, measure) => {
		if (measure > 0.1) {
			results.push({ index: i, score: measure });
		}
	});
	return results;
};
