import Link from "next/link";
import Image from "next/image";
import { BLUR_DATA } from "../../../../lib/constants/config";
import { getGenres } from "../../../../lib/util";
import Ratings from "../../../Utils/Ratings";
import { TrendingResult } from "../../../../lib/types";
type CarouselSlideProps = {
  data: TrendingResult<"all">;
};
const CarouselSlide: React.FC<CarouselSlideProps> = ({ data }) => {
  const score = Math.ceil(data.vote_average) / 2;
  const genres = getGenres(data.genre_ids, data?.media_type);
  const title = data.media_type === "tv" ? data.name : data.title;
  return (
    <Link href={`/${data.media_type ?? "movie"}/${data.id}`}>
      <div className="keen-slider__slide rounded bg-neutral-900/60 backdrop-blur group h-full">
        <div className="text-center">
          <h4 className="line-clamp-1 font-semibold"></h4>
        </div>
        <div className="relative">
          <Image
            src={`https://image.tmdb.org/t/p/original${data.poster_path ?? ""}`}
            alt={`${title}`}
            className=" transition-transform w-full h-full object-fill bg-neutral-900 p-2 rounded-xl"
            loading="lazy"
            width={500}
            height={450}
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA}
          />
          <div className=" p-4 bg-neutral-900/60 backdrop-blur absolute bottom-0 left-0 w-full">
            <div className=" h-fit w-full">
              <h4 className=" line-clamp-1 text-neutral-50 text-lg font-bold">
                {title}
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
    </Link>
  );
};

export default CarouselSlide;
