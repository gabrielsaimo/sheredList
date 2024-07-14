import { ListItem } from "./ListItem.model";

export type List = {
  map?: any;
  id: number;
  name: string;
  creator: string;
  id_creator: number;
  items: ListItem[];
};
