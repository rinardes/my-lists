import { useState } from "react";
import { ListItemType } from "../../types/listTypes";
import useList from "../../hooks/useList";
import { Checkbox } from "../ui/checkbox";

interface Props {
  item: ListItemType;
}

export default function ListItemOnBuy({ item }: Props) {
  const [toogleStatus, setToogleStatus] = useState(item.isBuyDone);
  const { toogleItemisBuyDone } = useList();

  const toogleChange = () => {
    setToogleStatus(!toogleStatus);
    toogleItemisBuyDone(item);
  };

  return (
    <div className="flex justify-between items-center">
      <div>{item.name}</div>
      <div className="flex items-center h-8">
        <Checkbox
          className=""
          checked={toogleStatus}
          onCheckedChange={toogleChange}
        />
      </div>
    </div>
  );
}
