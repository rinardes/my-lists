import { useState } from "react";
import useList from "../../hooks/useList";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AddItemToListModal({
  toogleshowModal,
}: {
  toogleshowModal: () => void;
}) {
  const { addToGeneralList } = useList();
  const [name, setName] = useState("");

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const insertNewItem = () => {
    addToGeneralList({
      name: name,
      isBuyDone: false,
      addedToBuyList: false,
    });
    clearFields();
    toogleshowModal();
  };

  const clearFields = () => {
    setName("");
  };

  return (
    <div className="">
      <div className="mb-2">
        <Input
          placeholder="Insira o nome do item"
          type="text"
          value={name}
          onChange={onNameChange}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button
          onClick={() => {
            toogleshowModal();
          }}
        >
          X
        </Button>
        <Button className="" onClick={insertNewItem}>
          +
        </Button>
      </div>
    </div>
  );
}
