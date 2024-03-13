import Markdown from "react-markdown";

type Props = {
  markdown: string;
};

const MarkdownViewer = ({ markdown }: Props) => {
  return <Markdown>{markdown}</Markdown>;
};

export default MarkdownViewer;
