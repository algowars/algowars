import { Link } from "@/components/ui/link";
import { Tag } from "../../models/tag.model";
import { Badge } from "@/components/ui/badge";

type ProblemEditorTagsProps = {
  tags: Tag[];
};

export const ProblemEditorTags = ({ tags }: ProblemEditorTagsProps) => {
  return (
    <ul className="flex items-center gap-3 px-5">
      {tags.map((tag) => (
        <li key={tag.id}>
          <Link to={"/"}>
            <Badge variant="secondary">{tag.name}</Badge>
          </Link>
        </li>
      ))}
    </ul>
  );
};
