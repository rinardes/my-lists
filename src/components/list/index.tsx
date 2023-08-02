import { useState } from "react";
import useList from "../../hooks/useList";
import { ListItemType } from "../../types/listTypes";
import ListItem from "../listItem";
import ListItemOnBuy from "../listItem/ListItemOnBuy";
import AddItemToListModal from "../AddItemToListModal";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ClearListDialog from "../clearListAlert";

export default function List() {
  const { list, resetAllItems } = useList();
  const [isBuyList, setIsBuyList] = useState(false);
  const [showAddToItemListModal, setShowAddToItemListModal] = useState(false);

  const toggleShowModal = () => {
    setShowAddToItemListModal(!showAddToItemListModal);
  };

  const toggleBuyList = () => {
    setShowAddToItemListModal(false);
    setIsBuyList(!isBuyList);
  };

  const concludeBuy = () => {
    resetAllItems();
    toggleBuyList();
  };

  const canGoToBuyList = () => {
    let result = list.value.some((e: ListItemType) => e.addedToBuyList);
    return result;
  };

  return (
    <div className="mx-8">
      <h1 className="text-center text-2xl mb-4">{list.name}</h1>
      <h2 className="mb-6 text-center">
        {isBuyList ? "Lista de Compras" : "Lista Geral"}
      </h2>
      <div>
        {list.name &&
          list.value.map((i: ListItemType) => {
            return (
              <div className="mb-4" key={i.name}>
                {isBuyList ? (
                  i.addedToBuyList && (
                    <div>
                      <ListItemOnBuy key={i.name} item={i} />
                      <Separator className="mt-2" />
                    </div>
                  )
                ) : (
                  <div>
                    <ListItem key={i.name} item={i} />
                    <Separator className="mt-2" />
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {isBuyList ? null : showAddToItemListModal ? (
        <AddItemToListModal toogleshowModal={toggleShowModal} />
      ) : (
        <div
          className=" flex items-center gap-2 cursor-pointer"
          onClick={toggleShowModal}
        >
          <Button className="rounded-full">+</Button>
          <p>Novo Item</p>
        </div>
      )}
      <div className="absolute bottom-8 right-4 flex flex-col gap-4">
        {isBuyList && <ClearListDialog concludeBuy={concludeBuy} />}
        <Button
          disabled={!canGoToBuyList()}
          className="rounded-full p-8"
          onClick={toggleBuyList}
        ></Button>
      </div>
    </div>
  );
}