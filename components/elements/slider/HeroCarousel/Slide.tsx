import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA } from "../../../../lib/constants/config";
import { TrendingResult } from "../../../../lib/types";
import { parseMeta } from "../../../../lib/util";

type Props = {
  width: number;
  path: string;
  result: TrendingResult<"all">;
  type: "tv" | "movie";
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const Slide: React.FC<Props> = ({ width, path, result, type }) => {
  const { title, date } = parseMeta({ details: result, type: type });

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
        sizes="(max-width: 768px) 50vw,
              (max-width: 1200px) 50vw,
             100vw"
        placeholder="empty"
        blurDataURL={BLUR_DATA}
      />
      <div className="absolute bottom-6 left-8 z-40 text-white w-[400px] space-y-2">
        <h2 className="text-2xl font-black gap-1 line-clamp-1" title={title}>
          {title}
        </h2>
        <p className="text-xs uppercase">{result.media_type}</p>

        <p className=" line-clamp-2 text-xs">{result.overview}</p>
        <Link href={`${result.media_type}/${result.id}`}>
          <p className="text-xs text-amber-500 font-bold mt-2 flex gap-2 items-center group bg-amber-900/50 w-fit rounded px-2 py-2 hover:bg-amber-900/90 transition-opacity">
            View Details
          </p>
        </Link>
      </div>
      <div className="w-full h-full bg-black z-10 absolute top-0 left-0 opacity-50 group-hover:opacity-10 transition-opacity rounded"></div>
    </div>
  );
};

export default Slide;
