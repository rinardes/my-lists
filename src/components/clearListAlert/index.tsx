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
          <Button className="rounded-full" size={"icon"}>
            <ListChecks />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que quer concluir?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação removera todos os itens da sua lista de compras e é
              irreversível.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={concludeBuy}>Continuar</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
