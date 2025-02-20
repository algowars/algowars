import { ReactNode } from "react";
import { EditorTab } from "./editor-tab";

export type Tab = {
  component?: ReactNode;
  icon?: ReactNode;
  key?: string;
  children?: Tab[];
  name?: string;
  direction?: "horizontal" | "vertical";
  defaultSize?: number;
};

export type EditorProps = {
  tabs: Tab;
};

export const Editor = ({ tabs }: EditorProps) => {
  return <EditorTab tab={tabs} />;
};
