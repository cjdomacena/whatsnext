import React, {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useState,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  setter: Dispatch<SetStateAction<string>>;
  value: string;
  id: string;
  className?: string;
  isPassword?: boolean;
}

const InputField: React.FC<Props> = ({
  id,
  className,
  value,
  setter,
  isPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] =
    useState<typeof props.type>("password");
  props.type = isPassword ? showPassword : props.type;
  return (
    <>
      <input
        className={`appearance-none bg-transparent focus:outline-none ${className}
        bg-neutral-900/5 ring-1 ring-white/10  rounded p-3 w-full placeholder:text-neutral-500 
        focus:ring-amber-900/50
        disabled:bg-neutral-800
         autofill:bg-neutral-800
        `}
        id={id}
        value={value}
        onChange={(e) => setter(e.target.value)}
        {...props}
      />
      {isPassword && value.length !== 0 ? (
        <button
          type="button"
          className="absolute right-4 top-0 -bottom-7 text-xs"
          onClick={() =>
            setShowPassword((prev) =>
              prev === "password" ? "text" : "password"
            )
          }
        >
          <p className="bg-neutral-800 h-fit px-2 py-1 rounded ring-1 ring-neutral-600">
            {showPassword === "password" ? "Show" : "Hide"}
          </p>
        </button>
      ) : null}
    </>
  );
};

export default InputField;
