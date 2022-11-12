// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //
  const data = await fetch(
    `${process.env.TMDB_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );
  const d = await data.json();
  return res.status(200).json(d);
}
