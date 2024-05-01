const vectorStoreService = require("../services/vectorStoreService");

exports.searchData = async (req, res) => {
	const query = req.query.q;
	if (!query) {
		return res.status(400).send({ error: "Query parameter is missing" });
	}

	try {
		const results = vectorStoreService.search(query);
		res.json(results);
	} catch (err) {
		res.status(500).send({ error: `Error processing search request: ${err}` });
	}
};
