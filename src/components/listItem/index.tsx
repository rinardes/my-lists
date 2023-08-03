import { useState } from "react";
import { ListItemType } from "../../types/listTypes";
import useList from "../../hooks/useList";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Trash2, ArrowRight } from "lucide-react";
import { Toggle } from "../ui/toggle";

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
          <Trash2 />
        </Button>
        <Toggle
          onPressedChange={toogleChange}
          variant="outline"
          aria-label="Toggle italic"
          pressed={toogleStatus}
          className="data-[state=on]:bg-sky-400"
        >
          <ArrowRight />
        </Toggle>
        {/* <Checkbox
          className=""
          checked={toogleStatus}
          onCheckedChange={toogleChange}
        /> */}
      </div>
    </div>
  );
}
