import { tags as t } from "@lezer/highlight";
import { CreateThemeOptions } from "@uiw/codemirror-themes";

type Theme = {
  light: CreateThemeOptions;
  dark: CreateThemeOptions;
};

export const themes: Record<string, Theme> = {
  zinc: {
    light: {
      theme: "light",
      settings: {
        background: "hsl(var(--background))",
        backgroundImage: "",
        foreground: "#75baff",
        caret: "#5d00ff",
        selection: "#036dd626",
        selectionMatch: "hsl(var(--primary))",
        lineHighlight: "hsl(var(--accent))",
        gutterBackground: "hsl(var(--background))",
        gutterForeground: "hsl(var(--foreground))",
      },
      styles: [
        { tag: t.comment, color: "#787b8099" },
        { tag: t.variableName, color: "#0080ff" },
        { tag: [t.string, t.special(t.brace)], color: "#5c6166" },
        { tag: t.number, color: "#5c6166" },
        { tag: t.bool, color: "#5c6166" },
        { tag: t.null, color: "#5c6166" },
        { tag: t.keyword, color: "#5c6166" },
        { tag: t.operator, color: "#5c6166" },
        { tag: t.className, color: "#5c6166" },
        { tag: t.definition(t.typeName), color: "#5c6166" },
        { tag: t.typeName, color: "#5c6166" },
        { tag: t.angleBracket, color: "#5c6166" },
        { tag: t.tagName, color: "#5c6166" },
        { tag: t.attributeName, color: "#5c6166" },
      ],
    },
    dark: {
      theme: "light",
      settings: {
        background: "#ffffff",
        backgroundImage: "",
        foreground: "#75baff",
        caret: "#5d00ff",
        selection: "#036dd626",
        selectionMatch: "#036dd626",
        lineHighlight: "#8a91991a",
        gutterBackground: "#fff",
        gutterForeground: "#8a919966",
      },
      styles: [
        { tag: t.comment, color: "#787b8099" },
        { tag: t.variableName, color: "#0080ff" },
        { tag: [t.string, t.special(t.brace)], color: "#5c6166" },
        { tag: t.number, color: "#5c6166" },
        { tag: t.bool, color: "#5c6166" },
        { tag: t.null, color: "#5c6166" },
        { tag: t.keyword, color: "#5c6166" },
        { tag: t.operator, color: "#5c6166" },
        { tag: t.className, color: "#5c6166" },
        { tag: t.definition(t.typeName), color: "#5c6166" },
        { tag: t.typeName, color: "#5c6166" },
        { tag: t.angleBracket, color: "#5c6166" },
        { tag: t.tagName, color: "#5c6166" },
        { tag: t.attributeName, color: "#5c6166" },
      ],
    },
  },
};
