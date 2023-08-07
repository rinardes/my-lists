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
import { RefreshCcw } from "lucide-react";
import { ListType } from "@/types/listTypes";
import { useState } from "react";
import ListCreation from "../listCreation";
import DeleteListDialog from "../deleteLIstDialog";

export default function ListChoice() {
  const { userLists, deleteList, setList } = useList();
  const [isOpen, setIsOpen] = useState(false);

  const changeList = (list: ListType) => {
    setList({ name: list.name, id: list.id, value: list.value });
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <RefreshCcw />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Selecione uma lista</DialogTitle>
          </DialogHeader>

          <div className="">
            {userLists?.map((l) => {
              return (
                <div key={l.id} className="flex gap-8 ">
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
              );
            })}
          </div>
          <DialogFooter>
            <ListCreation />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
