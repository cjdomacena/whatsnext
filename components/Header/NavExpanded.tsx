import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import NavLinks from "./NavLinks";
type Props = {
  title: string;
  items: { id: number; name: string }[];
  href: string;
};
const NavExpanded = ({ title, items, href }: Props) => {
  return (
    <NavigationMenu.Root
      className="relative transition-all "
      orientation="horizontal"
    >
      <NavigationMenu.List className="flex items-center">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="uppercase">
            <NavLinks href={href}>{title}</NavLinks>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className="NavigationMenuContent 
          absolute top-12 left-0 bg-[#1c1c1e] w-auto h-auto rounded shadow-xl shadow-neutral-900 flex gap-4"
          >
            <div className="p-4 relative">
              <ul className="text-xs text-neutral-300 font-medium whitespace-nowrap grid grid-flow-col grid-rows-4">
                {items.map((genre) => (
                  <li key={genre.id}>
                    <NavLinks
                      href={`/${genre.name.split(" ").join("-").toLowerCase()}`}
                    >
                      {genre.name}
                    </NavLinks>
                  </li>
                ))}
              </ul>
              <div className="absolute -top-2 left-4 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-[#1c1c1e]  z-10"></div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavExpanded;
