import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { MovieSchema } from "../constants/types";

enum MovieQueryType {
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

export const useMovies = ({
  key,
  type = "popular",
  page = 1,
}: {
  key: string;
  type?: keyof typeof MovieQueryType;
  page?: number;
}): UseQueryResult<MovieSchema> => {
  return useQuery(
    [key],
    async () => {
      const req = await fetch(`/api/movies?type=${type}&page=${page}`);
      const res = await req.json();
      return res;
    },
    { ...queryConfig }
  );
};
