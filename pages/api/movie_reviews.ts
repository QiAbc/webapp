import { NextApiRequest, NextApiResponse } from "next";

import connection from "../../lib/db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  try {
    let query = `SELECT * FROM movie_reviews WHERE movie_id = ${id} ORDER BY review_time DESC;`;
    const [rows] = await connection.query(query);

    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ error: "Database query failed" + error });
  }
}
