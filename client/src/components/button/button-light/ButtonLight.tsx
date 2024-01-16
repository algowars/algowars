import Button, { ButtonProps } from "../Button";

interface Props extends ButtonProps {
  size?: string;
  hideUnerline?: boolean;
  spacing?: string;
}

const ButtonLight = ({
  children,
  className = "px-3 py-2",
  href,
  onClick,
  size = "",
  hideUnerline = false,
  spacing = "py-2 px-4",
}: Props) => {
  return (
    <Button
      href={href}
      onClick={onClick}
      className={`${className} ${size} text-black hover:text-indigo-800 ${
        hideUnerline ? "" : "hover:underline underline-offset-2"
      } hover:bg-indigo-100 active:bg-indigo-200 duration-200 ease-out ${spacing} rounded`}
    >
      {children}
    </Button>
  );
};
export default ButtonLight;
