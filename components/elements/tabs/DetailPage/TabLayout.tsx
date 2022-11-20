import { Root } from "@radix-ui/react-tabs";

export const TabLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Root
      defaultValue="overview"
      orientation="horizontal"
      className="space-y-2"
    >
      {children}
    </Root>
  );
};
