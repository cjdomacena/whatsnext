import { PropsWithChildren } from "react";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container mx-auto h-full min-h-screen overflow-x-hidden grid place-items-center">
      <div className="w-[450px] mx-auto  px-8 py-4 rounded">{children}</div>
    </div>
  );
};

export default AuthLayout;
