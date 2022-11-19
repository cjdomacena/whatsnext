import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TimeWindow } from "../../pages/api/trending";
import { MediaType, MovieSchema } from "../types";

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
  retry: 1,
};
export const useGetTrending = <T extends keyof typeof MediaType | undefined>({
  key,
  time_window = "week",
  media_type = "all",
}: {
  key: string[];
  time_window?: keyof typeof TimeWindow;
  media_type?: T;
}): UseQueryResult<MovieSchema<"movie"> & MovieSchema<"tv">, Error> => {
  return useQuery(
    key,
    async () => {
      const req = await fetch(
        `/api/trending?time_window=${time_window}&media_type=${media_type}`
      );
      const res = await req.json();
      if (res.hasOwnProperty("error")) {
        throw new Error(res.error);
      }
      return res;
    },
    { ...queryConfig }
  );
};
