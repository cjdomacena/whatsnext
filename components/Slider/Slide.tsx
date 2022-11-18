import React from "react";
import Image from "next/image";
import { MovieInterface, TVInterface } from "../../lib/types";
import Link from "next/link";
import { IoArrowForwardSharp, IoCaretForwardSharp } from "react-icons/io5";

type Props = {
  width: number;
  path: string;
  result: MovieInterface & TVInterface;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const Slide: React.FC<Props> = ({ width, path, result }) => {
  const getUrlPath = (title: string, id: string) => {
    const path = `${title}-${id}`;
    const t = path.split("-");
    return `${String(t[0].split(" ").join("-").toLowerCase())}-${
      t[t.length - 1]
    }`;
  };

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
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      />
      <div className="absolute bottom-6 left-8 z-40 text-white w-80 space-y-2">
        <h2 className="text-2xl font-black">{result.title ?? result.name}</h2>
        <p className=" line-clamp-2 text-xs">{result.overview}</p>
        <Link
          href={`${result.media_type}/${getUrlPath(
            result.name ?? result.title,
            String(result.id)
          )}`}
        >
          <p className="text-xs text-amber-500 font-bold mt-2 flex gap-2 items-center group bg-amber-900/50 w-fit rounded px-2 py-2 hover:bg-amber-900/90 transition-opacity">
            View Details
          </p>
        </Link>
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
