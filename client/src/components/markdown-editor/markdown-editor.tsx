import { useTheme } from "@/features/theme/theme.provider";
import { cn } from "@/lib/utils";
import {
  MDXEditor,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  headingsPlugin,
  KitchenSinkToolbar,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import { materialDark } from "@uiw/codemirror-theme-material";

type Props = {
  className?: string;
  id?: string;
  markdown?: string;
  changeMarkdown?: (value: string) => void;
};

const MarkdownEditor = ({
  className = "rounded  overflow-hidden",
  markdown = "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changeMarkdown = (_) => null,
  ...props
}: Props) => {
  const { mode } = useTheme();

  let editorTheme = mode;

  if (mode === "system") {
    editorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return (
    <MDXEditor
      {...props}
      markdown={markdown}
      onChange={changeMarkdown}
      className={cn(`${editorTheme}-theme`, className)}
      plugins={[
        toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({
          imageAutocompleteSuggestions: [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
          ],
        }),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            css: "CSS",
            txt: "text",
            tsx: "TypeScript",
          },
          codeMirrorExtensions: [materialDark],
        }),
        diffSourcePlugin({
          viewMode: "rich-text",
          diffMarkdown: "boo",
          codeMirrorExtensions: [materialDark],
        }),
        markdownShortcutPlugin(),
      ]}
      contentEditableClassName="prose"
    />
  );
};

export default MarkdownEditor;
