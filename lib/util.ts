export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
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
