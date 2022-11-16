import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { useGetMovies, MovieQueryType } from "../../lib/api/useGetMovies";
import { MovieResult, MovieSchema } from "../../lib/constants/types";
import SlideImage from "./SlideImage";

type CarouselProps = {
  data: MovieResult[];
};

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    mode: "snap",
    breakpoints: {
      // 400px and up
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 600px)": {
        slides: { perView: 3, spacing: 5 },
      },
      // 1000px and up
      "(min-width: 1000px)": {
        slides: { perView: 6, spacing: 15 },
      },
    },
    slides: {
      perView: 1,
      spacing: 15,
    },
  });

  return (
    <div className="overflow-x-hidden">
      <div className="my-4 relative w-full">
        <div
          ref={sliderRef}
          className="keen-slider h-[450px] grid w-full place-items-center min-w-[300px]"
        >
          {data
            ? data.map((movie) => (
                <CarouselSlide movie={movie} key={movie.id} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const CarouselSlide: React.FC<{ movie: MovieResult }> = ({ movie }) => {
  return (
    <div
      className="keen-slider__slide  cursor-pointer relative rounded w-auto h-fit
       max-w-sm max-h-[600px] group
    "
    >
      <SlideImage path={movie.poster_path ?? ""} width={342} />
    </div>
  );
};

export default Carousel;
