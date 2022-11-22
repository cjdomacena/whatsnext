import HeroCarousel from "../components/ui/HeroCarousel";
import PopularMovies from "../components/ui/PopularMovies";
import TrendingTV from "../components/ui/TrendingTV";
import MetaHeader from "../lib/seo/MetaHeader";

export default function Home() {
  return (
    <div>
      <MetaHeader
        title="What's Next"
        description="Not sure what to watch next? "
      />
      <div className="my-4 w-full p-4 ">
        <div className="container mx-auto  p-4 rounded relative">
          <h1 className=" uppercase -tracking-wider font-bold whitespace-wrap break-words bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent 2xl:text-9xl  xl:text-9xl  lg:text-9xl  md:text-9xl  text-8xl ">
            Life is too short for ordinary apps
          </h1>
        </div>
      </div>
      <section>
        <HeroCarousel />
      </section>

      <section className="mx-4 my-4 space-y-4 text-neutral-200 ">
        <div>
          <div className="mx-auto  p-4 rounded relative">
            <h3 className=" text-6xl uppercase -tracking-wider font-bold whitespace-wrap break-words shadow">
              Popular Movies
            </h3>
            <PopularMovies />
          </div>
        </div>
      </section>
      <section className="mx-4 my-4 space-y-4 text-neutral-200">
        <div>
          <div className="mx-auto  p-4 rounded relative">
            <h3 className=" text-6xl uppercase font-bold whitespace-wrap break-words shadow -tracking-wider">
              Trending TV
            </h3>
            <TrendingTV />
          </div>
        </div>
      </section>
    </div>
  );
}
