import { useRef, useState } from "react";
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
  const newItemRef = useRef<HTMLInputElement | null>(null);

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
    <div className="text-sm mb-16 h-[50vh] py-4">
      <div className="mb-2">
        <Input
          ref={newItemRef}
          placeholder="Insira o nome do item"
          type="text"
          value={name}
          onChange={onNameChange}
          autoFocus
          onFocus={() => {
            newItemRef?.current?.scrollIntoView();
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") insertNewItem();
          }}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button
          onClick={() => {
            toogleshowModal();
          }}
        >
          Cancelar
        </Button>
        <Button className="" onClick={insertNewItem}>
          Adicionar
        </Button>
      </div>
    </div>
  );
}
