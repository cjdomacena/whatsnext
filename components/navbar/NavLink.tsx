import Link from "next/link";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

type Props = {
  href: string;
};

const NavLink: React.FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  const { isReady, asPath } = useRouter();
  const className: string =
    isReady && asPath === props.href
      ? "text-amber-500 hover:text-amber-600 bg-amber-900/20 p-3 rounded"
      : "text-neutral-300 hover:text-amber-500 hover:bg-amber-900/20 p-3 rounded";

  return (
    <Link href={props.href}>
      <p className={className + " transition-colors"}>{children}</p>
    </Link>
  );
};

export default NavLink;
