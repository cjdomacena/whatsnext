import * as Popover from "@radix-ui/react-popover";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import {
  IoCaretDown,
  IoExit,
  IoPersonOutline,
  IoSettings,
} from "react-icons/io5";
import Button from "../../buttons";
import UserAvatar from "./UserAvatar";

const UserNav = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  return session ? (
    <Popover.Root>
      <Popover.Trigger className="flex text-xs gap-2 items-center">
        <UserAvatar user={session.user} />
        <div>
          <div className="flex items-center gap-2">
            <h4>{session.user.user_metadata?.full_name}</h4>
            <IoCaretDown />
          </div>
          <div className="text-xs rounded-full text-amber-500 w-fit font-semibold">
            Free Tier
          </div>
        </div>
      </Popover.Trigger>
      {/* <Popover.Anchor /> */}
      <Popover.Portal>
        <Popover.Content className="absolute -right-24 top-4 bg-main rounded w-52 NavigationMenuContent text-sm  ring-1 ring-amber-900/10 shadow-lg space-y-1 py-1 text-neutral-300 ">
          <MenuList>
            <MenuItemHeader>
              <IoPersonOutline />
              My Stuff
            </MenuItemHeader>
            <MenuItemButton text="Profile" />
            <MenuItemButton text="Watchlist" />
          </MenuList>
          <Separator />
          <MenuList>
            <MenuItemHeader>
              <IoSettings />
              Settings
            </MenuItemHeader>
            <MenuItemButton text="Account Settings" />
          </MenuList>
          <Separator />
          <button
            className="hover:text-red-500 hover:bg-red-900/10 rounded px-3 py-2 w-full text-left  flex items-center gap-1"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                throw error;
              }
              router.push("/");
            }}
          >
            <IoExit className="" />
            Logout
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ) : (
    <div className="flex gap-2">
      <Button buttonType="outline" text="Login" path="/auth/login" isLink />
      <Button
        buttonType="primary"
        text="Register"
        path="/auth/register"
        isLink
      />
    </div>
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
