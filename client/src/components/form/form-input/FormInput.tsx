import { FormInputProps } from "./FormInputProps";

const FormInput = ({
  value,
  name,
  placeholder,
  className,
  onChange,
}: FormInputProps) => {
  const classNames = `p-3 border border-slate-300 dark:border-slate-500 rounded dark:bg-slate-800${
    className ? ` ${className}` : ""
  }`;
  if (typeof onChange === "function") {
    return (
      <input
        value={value}
        name={name}
        className={classNames}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  }
  return (
    <input
      value={value}
      name={name}
      className={classNames}
      placeholder={placeholder}
    />
  );
};

export default FormInput;
