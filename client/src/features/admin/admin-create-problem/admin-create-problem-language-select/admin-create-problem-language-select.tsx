import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";
import { createProblemRenderProps } from "../api/create-problem";

type AdminCreateProblemLanguageSelectProps = {
  field: ControllerRenderProps<createProblemRenderProps, "languageId">;
};

export const AdminCreateProblemLanguageSelect = ({
  field,
}: AdminCreateProblemLanguageSelectProps) => {
  const changeLanguage = (value: string) => {
    field.onChange(+value);
  };

  return (
    <Select value={`${field.value}`} onValueChange={changeLanguage} disabled>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="93">JavaScript (Node.js 18.5.0)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
