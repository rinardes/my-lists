import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { ListChecks } from "lucide-react";

interface Props {
  concludeBuy: () => void;
}

export default function ClearListDialog({ concludeBuy }: Props) {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className=" h-14 w-14 rounded-full" size={"icon"}>
            <ListChecks />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Concluir lista de compras?</AlertDialogTitle>
            <AlertDialogDescription>
              Isso removerá todos os items dessa lista de compras, mas eles
              continuarão na lista geral.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={concludeBuy}>Concluir</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
