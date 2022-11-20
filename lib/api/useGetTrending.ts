import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TimeWindow } from "../../pages/api/trending";
import { TResult } from "../types";
import { MEDIA_TYPE } from "../constants/enums";

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
  media_type?: keyof typeof MEDIA_TYPE;
}): UseQueryResult<TResult<"all">, Error> => {
  return useQuery(
    key,
    async () => {
      const url = `/api/trending?time_window=${time_window}&media_type=${media_type}`;
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
