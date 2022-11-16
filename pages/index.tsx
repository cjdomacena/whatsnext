import Head from "next/head";
import HeroSlider from "../components/Slider/HeroSlider";
import MetaHeader from "../lib/seo/MetaHeader";
import Carousel from "../components/Slider/Carousel";
import PopularMovies from "../components/Slider/PopularMovies";
import TrendingMovies from "../components/Slider/TrendingMovies";

export default function Home() {
  return (
    <div>
      <MetaHeader
        title="What's Next"
        description="Not sure what to watch next? "
      />
      <section>
        <HeroSlider />
      </section>
      {/* TODO: Look for a way to make it dynamic */}
      <section className="mx-4 my-4 space-y-4 text-neutral-200">
        <div>
          <h2 className="font-bold">Popular Movies</h2>
          <PopularMovies />
        </div>
      </section>
      <section className="mx-4 my-4 space-y-4 text-neutral-200">
        <div>
          <h2 className="font-bold">Trending Movies</h2>
          <TrendingMovies />
        </div>
      </section>
    </div>
  );
}
