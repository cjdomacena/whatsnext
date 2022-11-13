import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { MOVIE_GENRES, TV_GENRES } from "../../lib/constants/genres";

import NavLink from "./NavLink";

const NavExpanded = () => {
  return (
    <NavigationMenu.Root
      className="relative transition-all text-xs"
      orientation="horizontal"
    >
      <NavigationMenu.List className="flex items-center gap-2">
        <NavigationMenu.Item className="relative">
          <NavigationMenu.Trigger className="uppercase">
            <NavLink href="/movies">Movies</NavLink>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className="NavigationMenuContent 
          absolute top-12 left-0 bg-main w-auto h-auto rounded shadow-xl shadow-neutral-900 flex gap-4"
          >
            <div className="p-4 relative">
              <ul className="text-xs text-neutral-300 font-medium whitespace-nowrap grid grid-flow-col grid-rows-4">
                {MOVIE_GENRES.map((genre) => (
                  <li key={genre.id}>
                    <NavLink
                      href={`/${genre.name.split(" ").join("-").toLowerCase()}`}
                    >
                      {genre.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="absolute -top-2 left-4 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-[#1c1c1e]  z-10"></div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="relative">
          <NavigationMenu.Trigger className="uppercase">
            <NavLink href="/tv-shows">TV Shows</NavLink>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className="NavigationMenuContent 
          absolute top-12 left-0 bg-main w-auto h-auto rounded shadow-xl shadow-neutral-900 flex gap-4"
          >
            <div className="p-4 relative">
              <ul className="text-xs text-neutral-300 font-medium whitespace-nowrap grid grid-flow-col grid-rows-4">
                {TV_GENRES.map((genre) => (
                  <li key={genre.id}>
                    <NavLink
                      href={`/${genre.name.split(" ").join("-").toLowerCase()}`}
                    >
                      {genre.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="absolute -top-2 left-4 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-[#1c1c1e]  z-10"></div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="text-sm">
          <NavLink href="/discussion">Discussion</NavLink>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavExpanded;
