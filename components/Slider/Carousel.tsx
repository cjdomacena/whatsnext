import React from "react";
import { useKeenSlider } from "keen-slider/react";
import SlideImage from "./SlideImage";
import { GiPopcorn } from "react-icons/gi";
import { MovieInterface } from "../../lib/types";
import { getUserScoreTemp } from "../../lib/util";

type CarouselProps = {
  data: MovieInterface[];
};

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    mode: "snap",
    breakpoints: {
      // 400px and up
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 15 },
      },
      "(min-width: 600px)": {
        slides: { perView: 3, spacing: 5 },
      },
      // 1000px and up
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 15 },
      },
      "(min-width: 1280px)": {
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

const CarouselSlide: React.FC<{ movie: MovieInterface }> = ({ movie }) => {
  const textColor = (vote: number) => {
    if (vote < 5) {
      return "text-orange-500";
    } else if (vote >= 5 && vote < 7.5) {
      return "text-yellow-500";
    } else if (vote >= 7.5) {
      return "text-green-500";
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
          className={`${textColor(
            movie.vote_average
          )} text-center relative self-center mt-2`}
        >
          <GiPopcorn className={` w-8 h-8 `} />
          <p className="text-sm after:content-['%']  z-40 font-bold">
            {Math.ceil(movie.vote_average * 10)}
          </p>
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
