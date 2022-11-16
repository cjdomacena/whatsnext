import React from "react";
import Image from "next/image";
import { MovieResult } from "../../lib/constants/types";
type Props = {
  width: number;
  path: string;
  result: MovieResult;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const Slide: React.FC<Props> = ({ width, path, result }) => {
  const height = width * 0.8;
  return (
    <div
      className="keen-slider__slide h-auto  cursor-pointer relative rounded-lg
     group
    "
    >
      <Image
        src={`https://image.tmdb.org/t/p/w${width}${path}`}
        alt=""
        width={width}
        height={500}
        className="rounded-lg   group-hover:scale-125 transition-transform"
        loading="lazy"
      />
      <div className="absolute bottom-6 left-8 z-40 text-white w-80 space-y-2">
        <h2 className="text-2xl font-black">{result.title}</h2>
        <p className=" line-clamp-2 text-xs">{result.overview}</p>
      </div>
      <div className="w-full h-full bg-black z-10 absolute top-0 left-0 opacity-40 group-hover:opacity-10 transition-opacity rounded"></div>
    </div>
  );
};

export const SlideLoading: React.FC = () => {
  return (
    <div className="w-[500px] h-[300px] bg-neutral-800 rounded animate-pulse keen-slider__slide flex-grow"></div>
  );
};

export default Slide;
