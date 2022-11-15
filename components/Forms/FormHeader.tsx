import Link from "next/link";
import React from "react";

type Props = {
  title: string;
};

const FormHeader: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  return (
    <div>
      <Link href="/">
        <span className="text-xs font-bold">What&apos;s Next</span>
      </Link>
      <h1 className="text-2xl">{title}</h1>
      {children}
    </div>
  );
};

export default FormHeader;
