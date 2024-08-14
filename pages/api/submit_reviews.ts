import { NextApiRequest, NextApiResponse } from "next";

import connection from "../../lib/db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { rating, review_content, user_name, movie_id } = req.body;

  try {
    const query = `INSERT INTO movie_reviews (rating, review_content, user_name, movie_id) VALUES ( ${rating}, '${review_content}',' ${user_name}', ${movie_id} );`;
    const [rows] = await connection.query(query);

    const movie_reviews_query = `SELECT * FROM movie_reviews WHERE movie_id = ${movie_id}`;
    const [movie_reviews_rows]: any =
      await connection.query(movie_reviews_query);

    const totalValue = movie_reviews_rows.reduce(
      (accumulator: any, currentObject: { rating: any }) => {
        return Number(accumulator) + Number(currentObject.rating);
      },
      0,
    );
    const averageRating = (totalValue / movie_reviews_rows.length).toFixed(1);

    const update_movie_query = `UPDATE movies SET rating = ${averageRating} WHERE id = ${movie_id}`;

    await connection.query(update_movie_query);

    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ error: "Database query failed" + error });
  }
}
