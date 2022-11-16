// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const KEYS = ["top_rated", "popular", "upcoming", "now_playing"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  let query_type = query?.type ?? "popular";
  let page = query?.page ?? 1;
  try {
    const data = await fetch(
      `${process.env.TMDB_URL}/movie/${query_type}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
    );
    const results = await data.json();
    return res.status(200).json(results);
  } catch (e) {
    res
      .status(500)
      .json({ error: "Something went wrong...", status: 500, description: e });
  }
}
