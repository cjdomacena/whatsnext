// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  try {
    if (query.hasOwnProperty("type") && query.hasOwnProperty("id")) {
      const id = (query.id as string).split("-");
      const query_id = id[id.length - 1];
      const data = await fetch(
        `${process.env.TMDB_URL}/${query.type}/${query_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      );
      const results = await data.json();
      return res.status(200).json(results);
    }
    return res.status(500).json({ error: "Invalid Parameters" });
  } catch (e) {
    res
      .status(500)
      .json({ error: "Something went wrong...", status: 500, description: e });
  }
}
