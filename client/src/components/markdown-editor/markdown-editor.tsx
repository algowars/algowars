import { useTheme } from "@/features/theme/theme.provider";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  InsertCodeBlock,
  MDXEditor,
  UndoRedo,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  headingsPlugin,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

const MarkdownEditor = () => {
  const { mode } = useTheme();

  let editorTheme = mode;

  if (mode === "system") {
    editorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return (
    <MDXEditor
      markdown="# Hello world"
      className={`${editorTheme}-theme`}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <InsertCodeBlock />
            </>
          ),
        }),
        quotePlugin(),
        headingsPlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
};

export default MarkdownEditor;
