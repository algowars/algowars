import { Tag } from "./tag.model";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  question: string;
  createdBy?: string;
  initialCode?: string;
  tags?: Tag[];
}
