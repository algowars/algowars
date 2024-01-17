import { FormEvent } from "react";

export interface FormInputProps {
  value?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
}
