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
      let appendToQuery = query.withCredits ?? "";

      const data = await fetch(
        `${process.env.TMDB_URL}/${query.type}/${query.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=${appendToQuery}`
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
