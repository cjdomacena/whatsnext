import * as Avatar from "@radix-ui/react-avatar";
import { IoCaretDown } from "react-icons/io5";

const UserAvatar = () => (
  <Avatar.Root className=" w-10 h-10 rounded-full inline-flex">
    <Avatar.Image
      className="w-full h-full object-cover rounded-full"
      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      alt="Colm Tuite"
    />
    <Avatar.Fallback className="text-sm tracking-wider w-full h-full">
      CT
    </Avatar.Fallback>
  </Avatar.Root>
);

export default UserAvatar;
