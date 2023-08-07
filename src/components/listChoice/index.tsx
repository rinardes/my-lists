import useList from "@/hooks/useList";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ListType } from "@/types/listTypes";
import { useState } from "react";
import ListCreation from "../listCreation";
import DeleteListDialog from "../deleteLIstDialog";
import { Separator } from "../ui/separator";

export default function ListChoice() {
  const { userLists, deleteList, setList } = useList();
  const [isOpen, setIsOpen] = useState(false);

  const changeList = (list: ListType) => {
    setList({ name: list.name, id: list.id, value: list.value });
    setIsOpen(false);
  };

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-4 px-2">
            <p className="text-xs">Trocar</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Selecione uma lista</DialogTitle>
          </DialogHeader>

          <div className="">
            {userLists?.map((l) => {
              return (
                <div key={l.id}>
                  <div className="flex gap-8 items-center ">
                    <Button
                      onClick={() => {
                        changeList(l);
                      }}
                      variant={"ghost"}
                      className="flex-grow justify-start"
                    >
                      <p>{l.name}</p>
                    </Button>
                    <DeleteListDialog
                      deleteList={() => {
                        deleteList(l);
                      }}
                    />
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>
          <DialogFooter className="flex flex-row justify-between">
            <div></div>
            <ListCreation />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
