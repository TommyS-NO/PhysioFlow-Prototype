const tf = require("@tensorflow/tfjs-node");
const use = require("@tensorflow-models/universal-sentence-encoder");

let model;

const loadModel = async () => {
	if (!model) {
		model = await use.load();
		console.log("Universal Sentence Encoder model loaded");
	}
	return model;
};

const getEmbedding = async (texts) => {
	const model = await loadModel();
	const embeddings = await model.embed(texts);
	return embeddings.arraySync();
};

module.exports = {
	getEmbedding,
};
