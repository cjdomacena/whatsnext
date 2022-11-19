import React from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { MovieInterface, TVInterface } from "../../lib/types";

import Link from "next/link";

type CarouselProps<T> = {
  data: T;
};

const Carousel: React.FC<CarouselProps<MovieInterface[] | TVInterface[]>> = ({
  data,
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
      <div className="my-4 relative w-full">
        <div
          ref={sliderRef}
          className="keen-slider h-[450px] grid w-full place-items-center min-w-[300px] pr-4 py-4 "
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

const CarouselSlide: React.FC<{ movie: MovieInterface | TVInterface }> = ({
  movie,
}) => {
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
      <Link href={`/${movie.media_type ?? "movie"}/${movie.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path ?? ""}`}
          //@ts-ignore
          alt={`${movie.title ?? movie.name}`}
          className="rounded-lg transition-transform w-full object-cover object-center p-2 bg-neutral-900 "
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />

        <div className="w-full p-4 bg-neutral-900 absolute left-0 -bottom-0 space-y-4  ">
          <div>
            <h2 className="text-center line-clamp-1 text-lg font-bold">
              {/*@ts-ignore */}
              {movie.title ?? movie.name}
            </h2>
          </div>
          <div className="flex gap-4 justify-evenly">
            <div className={` text-center relative mt-2`}>
              <p className="text-sm   z-40 font-normal">
                {Math.ceil(movie.vote_average)}
              </p>
              <p className="text-xs text-neutral-500">User Score</p>
            </div>
            <div className={`text-center relative mt-2`}>
              <p className="text-sm  z-40 font-normal">0%</p>
              <p className="text-xs text-neutral-500">Moist Meter</p>
            </div>
            <div className={`text-center relative mt-2`}>
              <p className="text-sm before:content-['#'] z-40 font-normal">
                {Math.ceil(movie.popularity)}
              </p>
              <p className="text-xs text-neutral-500">Popularity</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Carousel;
