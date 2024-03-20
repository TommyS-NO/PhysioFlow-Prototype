const axios = require("axios");
const QDRANT_HOST = "http://localhost:6333";

const createVector = async (collectionName, documentId, vector) => {
	try {
		const response = await axios.post(
			`${QDRANT_HOST}/collections/${collectionName}/points`,
			{
				id: documentId,
				vector,
				payload: {},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error creating vector in Qdrant:", error);
		throw error;
	}
};

const searchVectors = async (collectionName, queryVector, topK = 5) => {
	try {
		const response = await axios.post(
			`${QDRANT_HOST}/collections/${collectionName}/points/search`,
			{
				vector: queryVector,
				top: topK,
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error searching vectors in Qdrant:", error);
		throw error;
	}
};

module.exports = {
	createVector,
	searchVectors,
};
