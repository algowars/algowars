import React from "react";
import Button, { ButtonProps } from "../Button";

interface Props extends ButtonProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  size?: string;
}

const ButtonLightOutline = ({
  children,
  className = "px-3 py-2",
  href,
  onClick,
  size = "",
}: Props) => {
  return (
    <Button
      href={href}
      onClick={onClick}
      className={`text-indigo-700 dark:text-indigo-300 border border-indigo-700 dark:border-indigo-300 hover:bg-indigo-700 hover:dark:bg-indigo-300 hover:underline underline-offset-2  hover:text-white dark:hover:text-black active:bg-indigo-200 duration-200 ease-out py-2 px-4 rounded ${size} ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonLightOutline;
