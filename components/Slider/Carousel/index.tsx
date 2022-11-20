import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { TrendingResult } from "../../../lib/types";
import { MEDIA_TYPE } from "../../../lib/constants/enums";
import CarouselSlide from "./CarouselSlide";

type CarouselProps<T extends keyof typeof MEDIA_TYPE> = {
  data: TrendingResult<T>[];
};

const Carousel: React.FC<CarouselProps<"all">> = ({ data }) => {
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
            ? data.map((movie) => <CarouselSlide data={movie} key={movie.id} />)
            : null}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
