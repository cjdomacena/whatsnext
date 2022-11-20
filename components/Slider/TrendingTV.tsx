import { useGetTrending } from "../../lib/api/useGetTrending";
import Carousel from "./Carousel";
import DefaultLoader from "./DefaultLoader";

const TrendingTV: React.FC = () => {
  const { data, isError, error, status } = useGetTrending({
    key: ["trending", "tv", "week"],
    time_window: "week",
    media_type: "tv",
  });
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  switch (status) {
    case "loading": {
      return <DefaultLoader />;
    }
    case "success": {
      return <Carousel data={data.results} />;
    }
  }
};

export default TrendingTV;
