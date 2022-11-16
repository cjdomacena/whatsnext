import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { MovieResult } from "../../lib/constants/types";
import SlideImage from "./SlideImage";
import { GiPopcorn } from "react-icons/gi";

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
  const getColor = (vote: number) => {
    if (vote < 6) {
      return "outline-orange-500";
    } else if (vote >= 6 && vote < 8) {
      return "outline-yellow-500";
    } else {
      return "outline-green-500";
    }
  };
  return (
    <div
      className="keen-slider__slide  cursor-pointer relative rounded w-auto h-fit
       max-w-sm max-h-[600px] group
    "
    >
      <SlideImage path={movie.poster_path ?? ""} width={342} />
      <div className="w-full p-4 bg-black/60 absolute left-0 -bottom-0 backdrop-blur-sm flex items-center gap-2">
        <div
          className={`outline outline-2 ${getColor(
            movie.vote_average
          )} rounded-full w-9 h-9 grid place-items-center relative `}
        >
          <p className="text-xs after:content-['%']  z-40 font-bold">
            {Math.ceil(movie.vote_average * 10)}
          </p>
          <GiPopcorn className="text-neutral-500 absolute w-6 h-6 z-10" />
        </div>
        <div className="text-sm w-3/4">
          <h3 className="font-semibold truncate text-lg">{movie.title}</h3>
          <p className=" line-clamp-2 text-xs">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
