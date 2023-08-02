import { useState } from "react";
import useList from "../../hooks/useList";
import { ListType } from "../../types/listTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ListCreation() {
  const [name, setName] = useState("");
  const { createList, userLists } = useList();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const createNewList = () => {
    let newList: ListType = { name: name, value: [] };
    createList(newList);
  };

  const cancelListCreation = () => {
    console.log("canceling");
  };

  const canCancel = () => {
    if (userLists && userLists.length == 0) return false;
    return true;
  };

  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Escolha um nome para sua lista</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input type="text" value={name} onChange={onChangeName} />
        </CardContent>
        <CardContent className="flex justify-between">
          <Button onClick={cancelListCreation} disabled={!canCancel()}>
            Cancelar
          </Button>
          <Button onClick={createNewList}>Criar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
