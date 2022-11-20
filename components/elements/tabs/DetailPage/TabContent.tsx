import { Content } from "@radix-ui/react-tabs";
import { PropsWithChildren } from "react";

type TabContentProps = {
  value: string;
};

export const TabContent: React.FC<PropsWithChildren<TabContentProps>> = ({
  value,
  children,
}) => {
  return (
    <Content value={value} className="min-h-[450px]">
      {children}
    </Content>
  );
};
