import elasticClient from "../elasticClient.js";

export const searchSimple = async (req,res) => {
    try {
        // Extract query parameters from the request
        const { query } = req.query;

        // Execute the search query
        const searchResults = await elasticClient.search({
            index: 'shakespeareplays', // Replace with your index name
            body: {
                query: {
                    match: {
                        playerline: query
                    }
                }
            }
        });

        // Extract and send back the search results
        const hits = searchResults;
        res.json({ results: hits });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'An error occurred while searching' });
    }
}