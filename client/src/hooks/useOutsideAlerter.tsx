import { useEffect } from "react";

export const useOutsideAlerter = (
  ref: React.RefObject<HTMLElement>,
  executable: (arg0: void) => void,
  allowedTargets: string[]
) => {
  useEffect(() => {
    const handleOutsideClick = (event: TouchEvent | MouseEvent) => {
      const target = (event.target as HTMLElement) ?? "";
      if (
        ref.current &&
        !ref.current.contains(target) &&
        !allowedTargets.includes(target.id)
      ) {
        executable();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);
};
