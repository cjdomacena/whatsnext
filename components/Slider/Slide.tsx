import React from "react";
import Image from "next/image";
import { MovieInterface } from "../../lib/types";

type Props = {
  width: number;
  path: string;
  result: MovieInterface;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const Slide: React.FC<Props> = ({ width, path, result }) => {
  return (
    <div
      className="keen-slider__slide cursor-pointer relative rounded-lg
     group max-w-sm h-[500px]
    "
    >
      <Image
        src={`https://image.tmdb.org/t/p/w${width}${path}`}
        alt=""
        className="rounded-lg group-hover:scale-125 transition-transform object-cover"
        loading="eager"
        fill
      />
      <div className="absolute bottom-6 left-8 z-40 text-white w-80 space-y-2">
        <h2 className="text-2xl font-black">{result.title}</h2>
        <p className=" line-clamp-2 text-xs">{result.overview}</p>
      </div>
      <div className="w-full h-full bg-black z-10 absolute top-0 left-0 opacity-50 group-hover:opacity-10 transition-opacity rounded"></div>
    </div>
  );
};

export const SlideLoading: React.FC = () => {
  return (
    <div className="w-[500px] h-[300px] bg-neutral-800 rounded animate-pulse keen-slider__slide flex-grow"></div>
  );
};

export default Slide;
