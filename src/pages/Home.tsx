import List from "../components/list";
import useList from "../hooks/useList";
import FirstListCreation from "@/components/firstListCreation";

export default function Home() {
  const { thereIsAValidList } = useList();

  return (
    <div className="max-w-3xl pt-8 min-h-screen relative px-4 mx-auto">
      {thereIsAValidList() ? (
        <List />
      ) : (
        <div className=" flex flex-col min-h-screen justify-center items-center">
          <FirstListCreation />
        </div>
      )}
    </div>
  );
}
