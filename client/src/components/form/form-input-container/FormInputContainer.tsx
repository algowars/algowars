import FormInput from "../form-input/FormInput";
import { FormInputContainerProps } from "./FormInputContainerProps";

const FormInputContainer = ({
  value,
  name,
  placeholder,
  label,
  onChange,
}: FormInputContainerProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name}>{label}</label>
      <FormInput
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInputContainer;
