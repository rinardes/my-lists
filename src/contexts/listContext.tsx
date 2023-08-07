import { ReactNode, createContext, useEffect, useState } from "react";
import * as DBOperations from "../services/indexedDB";
import { ListItemType, ListType, ListsType } from "../types/listTypes";

export interface ContextType {
  list: ListType;
  userLists: ListsType | undefined;
  setList: (list: ListType) => void;
  addToGeneralList: (item: ListItemType) => void;
  removeFromGeneralList: (item: ListItemType) => void;
  toogleItemToBuy: (item: ListItemType) => void;
  toogleItemisBuyDone: (item: ListItemType) => void;
  createList: (list: ListType) => void;
  resetAllItems: () => void;
  thereIsAValidList: () => boolean;
  deleteList: (list: ListType) => void;
}

const ListContext = createContext<ContextType | undefined>(undefined);

const ListProvider = ({ children }: { children: ReactNode }) => {
  const [list, setList] = useState<ListType>({
    name: "",
    value: [],
    id: 0,
  });
  const [userLists, setUserLists] = useState<ListsType | undefined>(undefined);

  const addToGeneralList = (item: ListItemType) => {
    let newListWithItem: ListType = {
      name: list.name,
      value: [...list.value, item],
      id: list.id,
    };
    setList(newListWithItem);
    DBOperations.updatedList(newListWithItem);
  };

  const removeFromGeneralList = (item: ListItemType) => {
    let newListWithoutItem: ListType = {
      name: list.name,
      id: list.id,
      value: list.value.filter((i) => {
        return i != item;
      }),
    };
    setList(newListWithoutItem);
    DBOperations.updatedList(newListWithoutItem);
  };

  const thereIsAValidList = () => {
    if (!userLists) return false;
    else {
      if (userLists.length == 0) return false;
      if (userLists[0].name == "") {
        removeListsWithoutName();
        return false;
      }
    }
    return true;
  };

  const deleteList = (list: ListType) => {
    //Delete and update list
    DBOperations.deleteList(list).then(() => {
      DBOperations.getAllLists().then((l) => {
        setUserLists(l);
      });
    });
  };

  const removeListsWithoutName = () => {
    DBOperations.getAllLists().then((l) => {
      let filteredList = l.filter((i) => {
        return i.name == "";
      });
      filteredList.forEach((l) => DBOperations.deleteList(l));
    });
  };

  const createList = (list: ListType) => {
    DBOperations.createList(list).then((id) => {
      let newList: ListType = { name: list.name, value: list.value, id: id };
      setUserLists([...userLists!, newList]);
      setList(newList);
    });
  };

  const resetAllItems = () => {
    list.value = list.value.map((e) => {
      return { name: e.name, isBuyDone: false, addedToBuyList: false };
    });
    DBOperations.updatedList(list);
  };

  const toogleItemToBuy = (itemToChange: ListItemType) => {
    let itemOnlist = list.value.find((i) => {
      return i.name == itemToChange.name;
    });
    if (itemOnlist) {
      itemOnlist.addedToBuyList = !itemOnlist.addedToBuyList;
    }
    DBOperations.updatedList(list);
    setList({ name: list.name, id: list.id, value: [...list.value] });
  };

  const toogleItemisBuyDone = (itemToChange: ListItemType) => {
    let itemOnlist = list.value.find((i) => {
      return i.name == itemToChange.name;
    });
    if (itemOnlist) {
      itemOnlist.isBuyDone = !itemOnlist.isBuyDone;
    }
    DBOperations.updatedList(list);
  };

  useEffect(() => {
    DBOperations.getAllLists()
      .then((lists) => {
        setUserLists(lists);
        setList(lists[0]);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        addToGeneralList,
        removeFromGeneralList,
        toogleItemToBuy,
        toogleItemisBuyDone,
        userLists,
        createList,
        resetAllItems,
        thereIsAValidList,
        deleteList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export { ListContext, ListProvider };
