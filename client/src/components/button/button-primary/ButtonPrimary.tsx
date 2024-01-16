import React from "react";
import Button, { ButtonProps } from "../Button";

interface Props extends ButtonProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonPrimary = ({
  children,
  className = "px-3 py-2",
  href,
  onClick,
  disabled = false,
}: Props) => {
  return (
    <Button
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={`text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 duration-200 ease-out py-2 px-4 rounded disabled:bg-indigo-400 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
