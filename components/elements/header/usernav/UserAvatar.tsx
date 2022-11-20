import * as Avatar from "@radix-ui/react-avatar";
import { User } from "@supabase/supabase-js";
import { IoCaretDown } from "react-icons/io5";
type UserAvatarProps = {
  user: User;
};
const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => (
  <Avatar.Root className=" w-10 h-10 rounded-full inline-flex">
    <Avatar.Image
      className="w-full h-full object-cover rounded-full"
      src={user?.user_metadata?.avatar_url}
      alt="Colm Tuite"
    />
    <Avatar.Fallback className="text-sm font-semibold text-amber-500 ring-2 ring-amber-600 tracking-wider w-full h-full grid place-content-center bg-amber-900/50  rounded-full ">
      CT
    </Avatar.Fallback>
  </Avatar.Root>
);

export default UserAvatar;
