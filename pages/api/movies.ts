import { NextApiRequest, NextApiResponse } from "next";

import connection from "../../lib/db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, title } = req.query;

  try {
    let query = `SELECT * FROM movies`;

    if (id) {
      query += ` WHERE id = ${id}`;
    } else if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }
    const [rows] = await connection.query(query);

    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ error: "Database query failed" + error });
  }
}
