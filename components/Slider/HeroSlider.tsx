import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Slide, { SlideLoading } from "./Slide";
import { useQuery } from "@tanstack/react-query";
import { useMovies } from "../../lib/api/useGetMovies";
type Props = {};

const HeroSlider: React.FC<Props> = () => {
  const { data, isError, status } = useMovies({
    key: "popular-movie",
    type: "popular",
    page: 2,
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
        slides: { perView: 2, spacing: 5 },
      },
    },
    // Default behaviour
    slides: {
      perView: 1,
      spacing: 15,
    },
  });

  if (isError) {
    return <h1>Ooops.... Something went wrong.</h1>;
  }
  if (status === "success") {
    return (
      <div className="overflow-x-hidden">
        <div className="my-8 relative rounded">
          <div ref={ref} className="keen-slider h-auto gap-1 ">
            {data && data.results
              ? data.results.map((movie, index: number) =>
                  index < 6 ? (
                    <Slide
                      width={1280}
                      path={movie.backdrop_path ?? ""}
                      key={movie.id}
                      result={movie}
                    />
                  ) : null
                )
              : null}
          </div>
        </div>
      </div>
    );
  } else if (status === "loading") {
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
  } else {
    return (
      <div className=" overflow-x-hidden">
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
};

export default HeroSlider;
