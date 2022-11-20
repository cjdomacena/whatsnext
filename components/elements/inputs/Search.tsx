import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <div className="w-72 rounded bg-main flex items-center ring-1 ring-neutral-800  px-2 focus-within:ring-neutral-600 text-sm transition-all font-medium tracking-widest">
      <label htmlFor="quick-search">
        <IoSearchOutline className="w-4 h-4 text-neutral-500" />
      </label>
      <input
        className="w-full h-full appearance-none py-3 px-2 focus:outline-none bg-transparent placeholder:text-neutral-500"
        id="quick-search"
        placeholder="Quick Search..."
      />
    </div>
  );
};

export default Search;
