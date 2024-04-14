import { useQuery } from "@tanstack/react-query";
import { languageService } from "@/features/language/services/language.service";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/features/language/language.model";
import { useEffect, useState } from "react";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemLanguage = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );

  const {
    data: availableLanguages,
    error,
    isPending,
  } = useQuery({
    queryKey: ["languages"],
    queryFn: () => {
      return languageService.getAvailableLanguages();
    },
  });

  useEffect(() => {
    const JAVASCRIPT_ID = 93;
    const foundDefaultLanguage = availableLanguages?.find(
      (language) => language.id === JAVASCRIPT_ID
    );
    if (foundDefaultLanguage) {
      setSelectedLanguage(foundDefaultLanguage);
    }
  }, [availableLanguages]);

  useEffect(() => {
    if (
      selectedLanguage?.id &&
      createProblem.languageId !== selectedLanguage.id
    ) {
      changeCreateProblem("languageId", selectedLanguage.id);
    }
  }, [changeCreateProblem, selectedLanguage?.id]);

  const selectLanguage = (id: string) => {
    const foundLanguage = availableLanguages?.find(
      (language) => language.id === +id
    );

    if (foundLanguage) {
      setSelectedLanguage(foundLanguage);
    }
  };

  return (
    <>
      <ErrorAlertFixed error={error} showClose />
      <Select
        disabled={isPending || true}
        value={`${selectedLanguage?.id ?? ""}`}
        onValueChange={selectLanguage}
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {availableLanguages?.map((language: Language) => (
            <SelectItem key={language.id} value={`${language.id}`}>
              {language.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default CreateProblemLanguage;
