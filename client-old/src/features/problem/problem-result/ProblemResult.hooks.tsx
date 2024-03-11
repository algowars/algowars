import { useEffect, useState } from "react";
import { AvailableTabs } from "./AvailableTabs";
import { SubmissionModel } from "@/models/SubmissionModel";

export const useProblemResult = (submission: SubmissionModel | null) => {
  const [currentTab, setCurrentTab] = useState<AvailableTabs>(
    AvailableTabs.TESTCASES
  );

  const changeTab = (newTab: AvailableTabs) => {
    setCurrentTab(newTab);
  };

  useEffect(() => {
    if (submission) {
      setCurrentTab(AvailableTabs.TEST_RESULTS);
    }
  }, [submission]);

  return { currentTab, changeTab };
};
