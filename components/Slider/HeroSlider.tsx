import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Slide, { SlideLoading } from "./Slide";
import { useGetTrending } from "../../lib/api/useGetTrending";
import { MovieSchema } from "../../lib/types";

const HeroSlider: React.FC = () => {
  const { data, isError, status, error } = useGetTrending({
    key: ["trending", "day", "all"],
    time_window: "day",
    media_type: "all",
  });
  const [ref] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    mode: "snap",
    breakpoints: {
      // 400px and up
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      // 1000px and up
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 5 },
      },
    },
    // Default behaviour
    slides: {
      perView: 1,
      spacing: 15,
    },
  });

  if (isError) {
    return <h1>{}</h1>;
  }
  switch (status) {
    case "loading": {
      return (
        <div className="overflow-x-hidden">
          <div className="my-8 px-2 relative rounded">
            <div className="flex gap-4">
              <SlideLoading />
              <SlideLoading />
              <SlideLoading />
            </div>
          </div>
        </div>
      );
    }
    case "success": {
      return (
        <div className="overflow-x-hidden">
          <div className="my-4 relative  px-2">
            <Slider data={data} />
          </div>
        </div>
      );
    }
  }
};

const Slider = ({ data }: { data: MovieSchema<"all"> | undefined }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    mode: "snap",
    breakpoints: {
      // 400px and up
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      // 1000px and up
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 5 },
      },
    },
    // Default behaviour
    slides: {
      perView: 1,
      spacing: 15,
    },
  });
  return (
    <div ref={ref} className="keen-slider h-auto gap-1 ">
      {data && data.results
        ? data.results.map((movie, index: number) => (
            <Slide
              width={1280}
              path={movie.backdrop_path ?? ""}
              key={movie.id}
              result={movie}
            />
          ))
        : null}
    </div>
  );
};

export default HeroSlider;
