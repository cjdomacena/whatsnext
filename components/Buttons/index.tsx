import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

enum ButtonType {
  "primary",
  "outline",
}

type LinkProps = {
  path: string;
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: keyof typeof ButtonType;
  text: string;
  path: string;
  isLink?: boolean;
}

const Button: React.FC<Props> = ({
  buttonType = "primary",
  text,
  path,
  isLink = false,
  ...props
}) => {
  const primary =
    "bg-amber-900/20 ring-1 ring-amber-900 text-amber-500 hover:bg-amber-900";

  const outline = " hover:text-amber-500";

  return isLink ? (
    <Link href={path} legacyBehavior passHref>
      <a
        className={`px-6 py-3 text-sm  transition-colors rounded font-medium ${
          buttonType === "primary" ? primary : outline
        }`}
      >
        {text}
      </a>
    </Link>
  ) : (
    <button
      className={`px-6 py-3 text-sm  transition-colors rounded font-medium ${
        buttonType === "primary" ? primary : outline
      }`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
