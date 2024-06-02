import CreateProblemLanguage from "../create-problem-language/create-problem-language";
import CreateProblemSetupTestSetup from "./create-problem-setup-test-setup/create-problem-setup-test-setup";
import CreateProblemSetupInitialCode from "./create-problem-setup-initial-code/create-problem-setup-initial-code";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CreateProblemSetup = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const changeTab = (index: number) => {
    if (tabs[index]) {
      setSelectedTab(index);
    }
  };

  const tabs = [
    {
      name: "Initial Code",
      element: (
        <div>
          <h4 className="font-semibold mb-3">Initial Code</h4>
          <CreateProblemSetupInitialCode />
        </div>
      ),
    },
    {
      name: "Test Setup",
      element: (
        <div>
          <h4 className="font-semibold mb-3">Test Setup</h4>
          <CreateProblemSetupTestSetup />
        </div>
      ),
    },
  ];

  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between items-center gap-5">
        <ul className="flex items-center gap-3">
          {tabs.map((tab, index) => (
            <li key={tab.name}>
              <Button
                variant={selectedTab === index ? "secondary" : "ghost"}
                className="w-24 py-2 h-9"
                onClick={() => changeTab(index)}
              >
                {tab.name}
              </Button>
            </li>
          ))}
        </ul>
        <CreateProblemLanguage />
      </div>

      <div>{tabs[selectedTab].element}</div>
    </section>
  );
};

export default CreateProblemSetup;
