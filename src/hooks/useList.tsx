import { useContext } from "react";
import { ContextType, ListContext } from "../contexts/listContext";

const useList = () => {
  const {
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
  } = useContext(ListContext) as ContextType;

  return {
    list,
    addToGeneralList,
    removeFromGeneralList,
    toogleItemToBuy,
    toogleItemisBuyDone,
    userLists,
    setList,
    createList,
    resetAllItems,
    thereIsAValidList,
  };
};

export default useList;
