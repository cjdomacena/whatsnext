import * as Switch from "@radix-ui/react-switch";

const Toggle = () => {
  return (
    <Switch.Root className=" w-8 h-5 bg-amber-500/30 rounded-full relative focus:shadow-sm data-[state=checked]:bg-amber-500">
      <Switch.Thumb className=" block w-4 h-4 bg-white rounded-full shadow-xl transition-transform will-change-transform data-[state=checked]:translate-x-3 translate-x-0.5 " />
    </Switch.Root>
  );
};

export default Toggle;
