import { useState } from "react";
import useList from "../../hooks/useList";
import { ListType } from "../../types/listTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AlertCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function ListCreation() {
  const [name, setName] = useState("");
  const { createList, thereIsAValidList } = useList();
  const [isInvalidName, setIsInvalidName] = useState<null | boolean>(null);

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
    if (!thereIsAValidList()) return false;
    return true;
  };

  const nameValidation = () => {
    let verifiedString = name.trim();
    if (verifiedString.length == 0) {
      setIsInvalidName(true);
      return;
    }
    setIsInvalidName(false);
  };

  const canCreateList = () => {
    if (isInvalidName == null) return false;
    if (isInvalidName) return false;
    return true;
  };

  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Escolha um nome para sua lista</CardTitle>
        </CardHeader>
        <CardContent className="">
          <Input
            type="text"
            value={name}
            onChange={onChangeName}
            onBlur={nameValidation}
          />
          <div
            className={twMerge(
              "mt-2 items-center gap-2 text-red-600 hidden text-sm",
              `${isInvalidName && "flex"}`
            )}
          >
            <AlertCircle className="h-4 w-4" />
            <p>Nome de lista Inválido</p>
          </div>
        </CardContent>
        <CardContent className="flex justify-between">
          <div>
            <Button
              onClick={cancelListCreation}
              className={!canCancel() ? "hidden" : "block"}
            >
              Cancelar
            </Button>
          </div>
          <Button onClick={createNewList} disabled={!canCreateList()}>
            Criar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
