export interface ListType {
  id?: number; // What to do with that id?
  name: string;
  value: ListItemType[];
}

export interface ListItemType {
  name: string;
  addedToBuyList: boolean;
  isBuyDone: boolean;
}

export type ListsType = ListType[];
