import Head from "next/head";
import HeroSlider from "../components/Slider/HeroSlider";
import MetaHeader from "../lib/seo/MetaHeader";
import { IoGrid, IoList } from "react-icons/io5";

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
      <section className="container mx-auto my-8">
        <div className="flex justify-between items-center gap-4">
          {/* TODO: Placeholder for now. Use Radix UI Select Component Here */}
          <select className="appearance-none bg-neutral-700 px-6 py-2 rounded">
            <option>Genre</option>
            <option>Action</option>
          </select>
          <hr className="flex-grow border-neutral-700 rounded" />
          <div className="flex gap-2">
            <button className="p-2 bg-neutral-700 rounded text-neutral-400">
              <IoGrid className="w-5 h-5" />
            </button>
            <button className="p-2 bg-neutral-700 rounded text-neutral-400">
              <IoList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
