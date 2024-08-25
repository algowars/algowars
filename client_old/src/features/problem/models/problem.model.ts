import { Tag } from "@/features/tag/tag.model";

export interface Problem {
  id: string;
  title: string;
  question: string;
  slug: string;
  rating: number;
  tags?: Tag[];
}
