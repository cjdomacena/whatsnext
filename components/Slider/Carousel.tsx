import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { MovieInterface, TVInterface } from "../../lib/types";
import Image from "next/image";
import Ratings from "../Utils/Ratings";
import { getGenres } from "../../lib/util";

type CarouselProps<T> = {
  data: T;
  type: "tv" | "movie";
};

const Carousel: React.FC<CarouselProps<MovieInterface[] | TVInterface[]>> = ({
  data,
  type,
}) => {
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
        slides: { perView: 4, spacing: 25 },
      },
      "(min-width: 1440px)": {
        slides: { perView: 6, spacing: 25 },
      },
    },
    slides: {
      perView: 1,
      spacing: 15,
    },
  });

  return (
    <div className="overflow-x-hidden">
      <div className="my-4 relative w-full h-auto">
        <div
          ref={sliderRef}
          className="keen-slider h-full grid w-full place-items-center min-w-[300px] pr-4 py-4 "
        >
          {data
            ? data.map((movie) => (
                <CarouselSlide movie={movie} key={movie.id} type={type} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const CarouselSlide: React.FC<{
  movie: MovieInterface | TVInterface;
  type: "movie" | "tv";
}> = ({ movie, type }) => {
  const textColor = (vote: number) => {
    if (vote < 5) {
      return "text-orange-500";
    } else if (vote >= 5 && vote < 7.5) {
      return "text-yellow-500";
    } else if (vote >= 7.5) {
      return "text-green-500";
    }
  };
  const score = Math.ceil(movie.vote_average) / 2;
  const genres = getGenres(movie.genre_ids, type);
  return (
    <div className="keen-slider__slide rounded bg-neutral-900/60 backdrop-blur group h-full">
      <div className="text-center">
        <h4 className="line-clamp-1 font-semibold"></h4>
      </div>
      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path ?? ""}`}
          //@ts-ignore
          alt={`${movie.title ?? movie.name}`}
          className=" transition-transform w-full h-full object-fill bg-neutral-900 p-2 rounded-xl"
          loading="lazy"
          width={500}
          height={450}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRsoCAABXRUJQVlA4WAoAAAAgAAAAEQEAtgAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCCMAAAA0A4AnQEqEgG3AD7tdrhWqaclI6AoATAdiWlu4XaxG0AJ7APfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+sAAD+/3QpAAAAAAAAAAA="
        />
        <div className=" p-4 bg-neutral-900/60 backdrop-blur absolute bottom-0 left-0 w-full">
          <div className=" h-fit w-full">
            <h4 className=" line-clamp-1 text-neutral-50 text-lg font-bold">
              {/* @ts-ignore */}
              {movie.title ?? movie.name}
            </h4>

            <Ratings score={String(score).split(".")} />
            <div className="flex justify-between items-center">
              <ul className="flex gap-2 mt-2 items-center flex-wrap">
                {genres.map((value, index) =>
                  index < 2 ? (
                    <li
                      key={value.id}
                      className="text-xs p-1 bg-neutral-800 rounded"
                    >
                      {value.name}
                    </li>
                  ) : null
                )}
                {genres.length - 2 !== 0 ? (
                  <li className="text-xs p-1 bg-neutral-800 rounded">
                    +{genres.length - 2}
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
