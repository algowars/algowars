import { useRef } from "react";
import { useOutsideAlerter } from "../hooks/useOutsideAlerter";

type Props = {
  children?: React.ReactNode;
  executable: (arg0: void) => void;
  allowedTargets?: string[];
  className?: string;
};

const OutsideAlerter = ({
  children,
  executable,
  allowedTargets = [],
  className = "",
}: Props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, executable, allowedTargets);
  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default OutsideAlerter;
