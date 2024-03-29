import Link from "next/link";
import UserNav from "../elements/header/usernav";
import Search from "../elements/inputs/Search";

const Navbar = () => {
  return (
    <header className="p-2 border-b border-b-neutral-800 shadow">
      <nav className=" mx-auto p-2 flex justify-between items-center gap-2">
        <div className="flex gap-4 items-center">
          <h4 className="text-xl uppercase tracking-wider font-black text-white ">
            <Link href="/">WhatsNext</Link>
          </h4>

          {/* <NavExpanded /> */}
        </div>
        <Search />

        <div className=" gap-4 text-neutral-300 items-center 2xl:flex xl:flex lg:flex hidden">
          <UserNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
