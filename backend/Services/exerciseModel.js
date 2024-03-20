const { getEmbedding } = require("./tensorflowUtil");
const { createVector, searchVectors } = require("./qdrantUtil");

const COLLECTION_NAME = "exercises";

const addExercise = async (exercise) => {
	const embedding = await getEmbedding([exercise.description]);
	const vector = embedding[0];
	return await createVector(COLLECTION_NAME, exercise.id, vector);
};

const findSimilarExercises = async (description) => {
	const embedding = await getEmbedding([description]);
	const queryVector = embedding[0];
	return await searchVectors(COLLECTION_NAME, queryVector);
};

module.exports = {
	addExercise,
	findSimilarExercises,
};
