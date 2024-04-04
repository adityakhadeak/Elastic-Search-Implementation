import pool from "../database/db.js" 
import elasticClient from "../elasticClient.js" 
export const indexData = async (req, res) => {

  try {
    // Query PostgreSQL to fetch data
    const queryResult = await pool.query('SELECT * FROM shakespeareplays limit 100') 
    const rows = queryResult.rows 
    console.log(rows)
    // Transform data and index in Elasticsearch
    const bulkBody = rows.flatMap((doc) => [
      { index: { _index: 'shakespeareplays', _id: doc.id } },
      doc,
    ]) 
    const bulkResponse = await elasticClient.bulk({ refresh: true, body: bulkBody }) 

    // Check for errors in Elasticsearch response
    if (bulkResponse.errors) {
      const errorMessages = bulkResponse.items.map((item) => item.index.error.reason) 
      throw new Error(`Failed to index some documents: ${errorMessages.join(', ')}`) 
    }

    res.status(200).json({ message: 'Data indexed successfully' }) 
  } catch (error) {
    console.error('Error indexing data:', error) 
    res.status(500).json({ error: 'Internal server error' }) 
  }
}