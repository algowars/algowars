import { Badge } from "@/components/ui/badge";
import { Tag } from "@/features/tag/tag.model";

type Props = {
  tags?: Tag[];
};

const ProblemEditorTags = ({ tags = [] }: Props) => {
  if (!tags || !tags.length) {
    return null;
  }

  return (
    <ul className="flex gap-5 items-center">
      {tags.map((tag) => (
        <li key={tag.name}>
          <Badge>{tag.name}</Badge>
        </li>
      ))}
    </ul>
  );
};

export default ProblemEditorTags;
