import { useState } from "react";
import { ListItemType } from "../../types/listTypes";
import useList from "../../hooks/useList";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

interface Props {
  item: ListItemType;
}

export default function ListItem({ item }: Props) {
  const [toogleStatus, setToogleStatus] = useState(item.addedToBuyList);
  const { toogleItemToBuy, removeFromGeneralList } = useList();

  const toogleChange = () => {
    setToogleStatus(!toogleStatus);
    toogleItemToBuy(item);
  };

  const removeItem = () => {
    toogleItemToBuy(item);
    removeFromGeneralList(item);
  };

  return (
    <div className="flex justify-between items-center">
      <div>{item.name}</div>
      <div className="flex gap-2 items-center h-8">
        <Button onClick={removeItem} variant={"outline"} className="p-4 ">
          X
        </Button>
        <Checkbox
          className=""
          checked={toogleStatus}
          onCheckedChange={toogleChange}
        />
      </div>
    </div>
  );
}
