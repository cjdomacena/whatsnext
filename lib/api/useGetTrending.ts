import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { MediaType, TimeWindow } from "../../pages/api/trending";
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
  retry: 1,
};

export const useGetTrending = ({
  key,
  time_window = "week",
  media_type = "all",
}: {
  key: string[];
  time_window?: keyof typeof TimeWindow;
  media_type?: keyof typeof MediaType;
}): UseQueryResult<MovieSchema, Error> => {
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
