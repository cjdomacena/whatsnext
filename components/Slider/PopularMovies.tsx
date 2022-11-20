import { useGetMovies } from "../../lib/api/useGetMovies";
import Carousel from "./Carousel";
import DefaultLoader from "./DefaultLoader";

const PopularMovies: React.FC = () => {
  const { data, isError, error, status } = useGetMovies({
    key: ["popular", "movies"],
    type: "popular",
    page: 2,
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

export default PopularMovies;
