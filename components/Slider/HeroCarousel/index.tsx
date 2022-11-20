import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Slide from "./Slide";
import { useGetTrending } from "../../../lib/api/useGetTrending";
import Loader from "./../Loader";

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
      return <Loader />;
    }
    case "success": {
      return (
        <div className="overflow-x-hidden">
          <div className="my-4 relative  px-2">
            <div ref={ref} className="keen-slider h-auto gap-1 ">
              {data && data.results
                ? data.results.map((movie) => (
                    <Slide
                      width={1280}
                      path={movie.backdrop_path ?? ""}
                      key={movie.id}
                      result={movie}
                      type={movie.media_type}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      );
    }
  }
};
export default HeroSlider;
