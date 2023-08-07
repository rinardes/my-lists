import ListCreation from "../listCreation";
import { Card, CardTitle } from "../ui/card";

export default function FirstListCreation() {
  return (
    <Card className="max-w-[350px] w-full flex flex-col gap-4 items-center justify-start p-4 ">
      <CardTitle>
        <p>Crie sua primeira lista!</p>
      </CardTitle>
      <div>
        <ListCreation />
      </div>
    </Card>
  );
}
