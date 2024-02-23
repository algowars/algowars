import { useEffect, useState } from "react";

export const useProblemCodeEditor = (initialCode: string) => {
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const changeCode = (value: string | undefined) => {
    setCode(value ?? "");
  };

  return { code, changeCode };
};
