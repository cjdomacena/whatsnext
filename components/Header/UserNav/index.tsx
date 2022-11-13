import * as Popover from "@radix-ui/react-popover";
import { PropsWithChildren } from "react";
import { IoExit, IoPersonOutline, IoSettings } from "react-icons/io5";
import UserAvatar from "./UserAvatar";

const UserNav = () => {
  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <UserAvatar />
        </Popover.Trigger>
        {/* <Popover.Anchor /> */}
        <Popover.Portal className="relative">
          <Popover.Content className="absolute -right-4 top-0 bg-main rounded w-52 NavigationMenuContent text-sm  ring-1 ring-amber-900/10 shadow-lg space-y-1 py-1 text-neutral-300 ">
            <MenuList>
              <MenuItemHeader>
                <IoPersonOutline />
                My Stuff
              </MenuItemHeader>
              <MenuItemButton text="Profile" />
              <MenuItemButton text="Watchlist" />
            </MenuList>
            <Separator />
            {/* <MenuList>
              <MenuItemHeader>
                <IoEyedrop />
                Theme
              </MenuItemHeader>
              <MenuItemButton text="Nice" />
            </MenuList>
            <Separator /> */}
            <MenuList>
              <MenuItemHeader>
                <IoSettings />
                Settings
              </MenuItemHeader>
              <MenuItemButton text="Account Settings" />
            </MenuList>
            <Separator />
            <button className="hover:text-red-500 hover:bg-red-900/10 rounded px-3 py-2 w-full text-left  flex items-center gap-1">
              <IoExit className="" />
              Logout
            </button>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

const Separator = () => {
  return <hr className="border-t border-neutral-800" />;
};

const MenuList: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return <ul>{children}</ul>;
};

const MenuItemButton: React.FC<{ text: string }> = ({
  text,
}: {
  text: string;
}) => {
  return (
    <li>
      <button className="hover:text-amber-500 hover:bg-amber-900/20 rounded px-3 py-2 w-full text-left ">
        {text}
      </button>
    </li>
  );
};

const MenuItemHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <li className="text-xs text-neutral-400 flex gap-1 px-3 py-2 items-center">
      {children}
    </li>
  );
};

export default UserNav;
