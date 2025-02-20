import { Fragment, useState } from "react";
import { Card } from "../ui/card";
import { Tab } from "./editor";
import { EditorPanelHeader } from "./editor-panel-header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

type EditorTabProps = {
  tab: Tab;
};

export const EditorTab = ({ tab }: EditorTabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  if (tab?.direction) {
    return (
      <ResizablePanelGroup direction={tab.direction}>
        {tab.children?.map((t, index) => (
          <Fragment key={t.key}>
            <ResizablePanel defaultSize={t.defaultSize} minSize={10}>
              <EditorTab tab={t} />
            </ResizablePanel>
            {tab.children && index !== tab?.children?.length - 1 ? (
              <ResizableHandle className="p-2 bg-inherit hover:bg-muted" />
            ) : null}
          </Fragment>
        ))}
      </ResizablePanelGroup>
    );
  }

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const currentTab = tab.children ? tab.children[activeTab] : tab;

  return (
    <Card className="overflow-hidden bg-sidebar h-full">
      <EditorPanelHeader
        tab={tab}
        currentTabIndex={activeTab}
        setCurrentTab={handleTabClick}
      />
      {currentTab.component}
    </Card>
  );
};
