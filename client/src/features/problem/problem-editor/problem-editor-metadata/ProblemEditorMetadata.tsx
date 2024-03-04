import { Input } from "@/components/ui/input";

type Props = {
  title: string;
  changeTitle: (v: string) => void;
  slug: string;
  changeSlug: (v: string) => void;
};

const ProblemEditorMetadata = ({
  title,
  changeTitle,
  slug,
  changeSlug,
}: Props) => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <label htmlFor="title">Problem Title</label>
        <Input
          value={title}
          onChange={(e) => changeTitle(e.target.value)}
          placeholder="Title..."
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="title">Problem URL Slug</label>
        <Input
          value={slug}
          onChange={(e) => changeSlug(e.target.value)}
          placeholder="Slug..."
        />
      </div>
    </div>
  );
};

export default ProblemEditorMetadata;
