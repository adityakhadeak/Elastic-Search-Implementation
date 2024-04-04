import pool from '../database/db.js'

export const searchSimple = async (req, res) => {
  try {
    const { query } = req.query;
    const searchWords = query.split(' ').filter(word => word.length > 0);
    console.log(searchWords)
    const searchQuery = searchWords.map(word => `${word} `).join(' & ');
    console.log(searchQuery)

    const sql = `
          SELECT *
          FROM mytable
          WHERE document_search @@ to_tsquery('english', $1)
        `;
    const result = await pool.query(sql, [searchQuery]);

    res.json({ total_results: result.rowCount, movies: result.rows });
  } catch (error) {
    console.error('Error executing search query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const dynamicSearch = async (req, res) => {
  const { column, term } = req.query; // Get search column and term from query parameters
  try {
    let query
    const searchWords = term.split(' ').filter(word => word.length > 0)
    const searchValues = searchWords.map(word => `${word}`).join(' & ')
    if (column && term) {
      query = `SELECT * FROM actionmovies WHERE ${column}_search @@ to_tsquery('english',$1)`;

    }
    else if (term) {
      query = `
      SELECT *
      FROM actionmovies
      WHERE 
          movie_name_search @@ to_tsquery('english', $1) OR
          star_search @@ to_tsquery('english', $1) OR
          director_search @@ to_tsquery('english', $1) OR
          genre_search @@ to_tsquery('english', $1)
       `;
    }
    else {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    const result = await pool.query(query, [searchValues]);

    res.status(200).json({ total_results: result.rowCount, movies: result.rows });
  } catch (error) {
    console.error('Error executing search query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const combinedSearch = async (req, res) => {
  const { column, term } = req.query; // Get search column and term from query parameters
  try {
    let query
    const searchWords = term.split(' ').filter(word => word.length > 0)
    const searchValues = searchWords.map(word => `${word}`).join(' & ')
    if (column && term) {
      query = `SELECT * FROM actionmovies WHERE
      ${column}_search @@ to_tsquery('english', $1)
      OR similarity(${column}, $1) > 0.3`;

    }
    else if (term) {
      query = `
      SELECT *
      FROM actionmovies
      WHERE 
      movie_name_search @@ to_tsquery('english', $1)
      OR star_search @@ to_tsquery('english', $1)
      OR director_search @@ to_tsquery('english', $1)
      OR genre_search @@ to_tsquery('english', $1)
      OR similarity(movie_name, $1) > 0.3
      OR similarity(star, $1) > 0.3
      OR similarity(director, $1) > 0.3
      OR similarity(genre, $1) > 0.3
       `;
    }
    else {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    const result = await pool.query(query, [searchValues]);

    res.status(200).json({ total_results: result.rowCount, movies: result.rows });
  } catch (error) {
    console.error('Error executing search query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}