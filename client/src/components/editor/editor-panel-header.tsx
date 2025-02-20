import { Button } from "../ui/button";
import { Tab } from "./editor";

type EditorPanelHeaderProps = {
  tab: Tab;
  currentTabIndex: number;
  setCurrentTab: (index: number) => void;
};

export const EditorPanelHeader = ({
  tab,
  currentTabIndex,
  setCurrentTab,
}: EditorPanelHeaderProps) => {
  if (tab.children) {
    return (
      <nav className="px-2 py-1 flex items-center gap-1 border-b">
        {tab.children.map((t, index) => (
          <Button
            variant="ghost"
            className={`h-7 px-3 py-1 ${
              index === currentTabIndex
                ? "text-primary"
                : "text-muted-foreground"
            }`}
            key={t.key}
            onClick={() => setCurrentTab(index)}
          >
            {t && <span className="mr-1">{t.icon}</span>}
            {t.name}
          </Button>
        ))}
      </nav>
    );
  }
  return (
    <nav className="px-2 py-1 flex items-center gap-5 border-b">
      <Button variant="ghost" className="h-7 px-3 py-1">
        {tab && <span className="mr-1">{tab.icon}</span>}
        {tab.name}
      </Button>
    </nav>
  );
};
