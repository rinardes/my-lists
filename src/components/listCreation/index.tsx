import { useState } from "react";
import useList from "../../hooks/useList";
import { ListType } from "../../types/listTypes";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AlertCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function ListCreation() {
  const [name, setName] = useState("");
  const { createList, thereIsAValidList } = useList();
  const [isInvalidName, setIsInvalidName] = useState<null | boolean>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newName = e.target.value;
    nameValidation(newName);
    setName(newName);
  };

  const createNewList = () => {
    let newList: ListType = { name: name, value: [] };
    createList(newList);
    setIsOpen(false);
  };

  const cancelListCreation = () => {
    setIsOpen(false);
  };

  const canCancel = () => {
    if (!thereIsAValidList()) return false;
    return true;
  };

  const nameValidation = (newName: string) => {
    let verifiedString = newName.trim();
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Criar</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Escolha um nome para sua lista</DialogTitle>
          </DialogHeader>
          <Input type="text" value={name} onChange={onChangeName} />
          <div
            className={twMerge(
              "mt-2 items-center gap-2 text-red-600 hidden text-sm",
              `${isInvalidName && "flex"}`
            )}
          >
            <AlertCircle className="h-4 w-4" />
            <p>Nome de lista Inválido</p>
          </div>
          <div className="flex justify-between">
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
