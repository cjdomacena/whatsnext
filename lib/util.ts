import { DetailsProps } from "../pages/[type]/[id]";
import { MEDIA_TYPE } from "./constants/enums";
import { MOVIE_GENRES, TV_GENRES } from "./constants/genres";

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export const getYear = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(new Date(date));
};

export const getUserScoreTemp = (vote: number) => {
  if (vote < 5) {
    return "text-orange-500";
  } else if (vote >= 5 && vote < 7.5) {
    return "text-yellow-500";
  } else if (vote >= 7.5) {
    return "text-emerald-500";
  }
};

export const getGenres = (ids: number[], type: keyof typeof MEDIA_TYPE) => {
  const genres: { id: number; name: string }[] = [];
  const genreList = type === "tv" ? TV_GENRES : MOVIE_GENRES;
  ids.map((id) => {
    genreList.map((value) => {
      if (value.id === id) {
        genres.push(value);
      }
    });
  });

  return genres.sort((a, b) => a.name.length - b.name.length);
};

export const textColor = (vote: number) => {
  if (vote < 5) {
    return "text-orange-500";
  } else if (vote >= 5 && vote < 7.5) {
    return "text-yellow-500";
  } else if (vote >= 7.5) {
    return "text-green-500";
  }
};

export const parseMeta = ({
  details,
  type,
}: {
  details?: DetailsProps;
  type: string | string[] | undefined;
}): { title: string | null; date: string | null } => {
  if (details && typeof type === "string") {
    if (type === "movie") {
      return { title: details.title, date: details.release_date ?? null };
    } else if (type === "tv") {
      return { title: details.name, date: details.first_air_date ?? null };
    }
  }
  return { title: null, date: null };
};
