import { FormEvent } from "react";
import { Link } from "react-router-dom";

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: ((event: FormEvent<HTMLButtonElement>) => void) | (() => void);
  disabled?: boolean;
}

const Button = ({
  children,
  className,
  href,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const buttonClass = `${className}`;
  if (typeof href === "string") {
    return (
      <Link to={href} className={buttonClass}>
        {children}
      </Link>
    );
  }
  if (typeof onClick === "function") {
    return (
      <button className={buttonClass} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }
  return (
    <button className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
