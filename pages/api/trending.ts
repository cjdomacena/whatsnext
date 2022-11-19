import { NextApiRequest, NextApiResponse } from "next";

export enum TimeWindow {
  "day",
  "week",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  let time_window = query?.time_window ?? "week";
  let media_type = query?.media_type ?? "all";
  try {
    const data = await fetch(
      `${process.env.TMDB_URL}/trending/${media_type}/${time_window}?api_key=${process.env.TMDB_API_KEY}`
    );
    const results = await data.json();
    if (results.hasOwnProperty("success") && !results.success) {
      throw new Error(results.status_message);
    }
    return res.status(200).json(results);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({
        error: e.message,
        status: 500,
      });
    }
    return res
      .status(500)
      .json({ error: "Something went wrong...", status: 500 });
  }
}
