import { ListType } from "@/types/listTypes";
import useList from "../../hooks/useList";

export default function UserLists() {
  const { userLists, setList } = useList();
  return (
    <div>
      {userLists &&
        userLists.map((l: ListType) => (
          <div
            key={l.id}
            onClick={() => {
              setList(l);
            }}
          >
            {l.name}
          </div>
        ))}
    </div>
  );
}
