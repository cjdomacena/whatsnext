import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TrendingQueryResult } from "../types";

export enum MovieQueryType {
  "top_rated",
  "popular",
  "upcoming",
  "now_playing",
}
const queryConfig = {
  refetchOnWindowFocus: false,
  staleTime: 15 * 60 * 1000, // 15 minutes
  cacheTime: 15 * 60 * 1000,
};

export const useGetMovies = ({
  key,
  type = "popular",
  page = 1,
}: {
  key: string[];
  type?: keyof typeof MovieQueryType;
  page?: number;
}): UseQueryResult<TrendingQueryResult<"all">, Error> => {
  return useQuery(
    [key],
    async () => {
      const url = `/api/movies?type=${type}&page=${page}`;
      const req = await fetch(url);
      const res = await req.json();
      if (res.hasOwnProperty("error")) {
        throw new Error(res.error);
      }
      return res;
    },
    { ...queryConfig }
  );
};
