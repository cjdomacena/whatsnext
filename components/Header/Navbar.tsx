import { IoSearchOutline, IoNotificationsSharp, IoApps } from "react-icons/io5";
import NavExpanded from "./NavExpanded";
import { MOVIE_GENRES, TV_GENRES } from "../../lib/constants/genres";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <header className="p-2 border-b border-b-neutral-800">
      <nav className=" mx-auto p-4 flex justify-between items-center">
        <div className="flex gap-12 items-center">
          <h4 className="text-xl uppercase tracking-wider font-black text-white ">
            WhatsNext
          </h4>
          <ul className="flex gap-2 items-center text-xs uppercase font-semibold tracking-wider">
            <li>
              <NavExpanded items={MOVIE_GENRES} href="/movie" title="movies" />
            </li>

            <li>
              <NavExpanded
                items={TV_GENRES}
                href="/tv-shows"
                title="TV SHOWS"
              />
            </li>
            <li>
              <NavLinks href="/animations">Discussions</NavLinks>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 text-neutral-300">
          <button className="hover:text-neutral-100">
            <IoSearchOutline className="w-5 h-5" />
          </button>
          <button className="hover:text-neutral-100">
            <IoNotificationsSharp className="w-5 h-5" />
          </button>
          <button className="hover:text-neutral-100">
            <IoApps className="w-5 h-5" />
          </button>

          <button className="text-sm text-amber-500 font-bold">Log In</button>
          <div className="border-r border-neutral-500" />
          <button className="text-sm">Register</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
