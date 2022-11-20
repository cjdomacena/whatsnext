import { IoSearchOutline, IoSunny } from "react-icons/io5";
import NavExpanded from "./NavExpanded";
import Link from "next/link";
import UserNav from "./UserNav";
import Search from "../inputs/Search";

const Navbar = () => {
  return (
    <header className="p-2 border-b border-b-neutral-800 shadow">
      <nav className=" mx-auto p-2 flex justify-between items-center">
        <div className="flex gap-12 items-center">
          <h4 className="text-xl uppercase tracking-wider font-black text-white ">
            <Link href="/">WhatsNext</Link>
          </h4>
          <NavExpanded />
        </div>

        <div className=" gap-4 text-neutral-300 items-center 2xl:flex xl:flex lg:flex hidden">
          {/* <Search />
          <button className="hover:text-neutral-100">
            <IoSunny className="w-5 h-5" />
          </button> */}
          {/* <div className="h-full py-4 border-r border-r-neutral-700 rounded" /> */}
          <UserNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
