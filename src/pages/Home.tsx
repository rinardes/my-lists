import List from "../components/list";
import useList from "../hooks/useList";
import ListCreation from "@/components/listCreation";

export default function Home() {
  const { thereIsAValidList } = useList();

  return (
    <div className="max-w-3xl min-h-screen relative mx-auto">
      {thereIsAValidList() ? <List /> : <ListCreation />}
    </div>
  );
}
