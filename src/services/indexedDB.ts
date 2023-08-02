import { ListType, ListsType } from "../types/listTypes";

const dbName = "lists";
const dbVersion = 1;

export async function openDataBase() {
  let request = indexedDB.open(dbName, dbVersion);
  return new Promise<IDBDatabase>((resolve, reject) => {
    request.onupgradeneeded = (e) => {
      const db: IDBDatabase = (e.target! as IDBOpenDBRequest).result;
      const objectStore = db.createObjectStore("lists", {
        keyPath: "id",
        autoIncrement: true,
      });

      objectStore.createIndex("value", "value", { unique: false });
      objectStore.createIndex("name", "name", { unique: true });

      objectStore.transaction.oncomplete = () => {
        resolve(db);
      };
    };

    request.onerror = () => {
      reject("Your database was not initiated");
    };

    request.onsuccess = (e) => {
      const db: IDBDatabase = (e.target! as IDBOpenDBRequest).result;
      resolve(db);
    };
  });
}

export function updatedList(list: ListType) {
  let request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = (e) => {
    const db: IDBDatabase = (e.target! as IDBOpenDBRequest).result;
    let store = db.transaction("lists", "readwrite").objectStore("lists");
    let listOnStoreRequest = store.get(list.id!);
    listOnStoreRequest.onsuccess = () => {
      let putRequest = store.put(list);
      putRequest.onsuccess = () => {};
    };
    db.close();
  };
}

export async function createList(list: ListType): Promise<number> {
  let request = indexedDB.open(dbName, dbVersion);
  return new Promise((res) => {
    request.onsuccess = (e) => {
      let db: IDBDatabase = (e.target! as IDBOpenDBRequest).result;
      let store = db.transaction("lists", "readwrite").objectStore("lists");
      let putRequest = store.put(list);
      putRequest.onsuccess = (e) => {
        res((e.target! as IDBRequest).result);
      };
      db.close();
    };
  });
}

export async function getAllLists() {
  return new Promise<ListsType>((resolve, reject) => {
    openDataBase().then((db) => {
      let hasStore = db.objectStoreNames.contains("lists");
      if (!hasStore) reject(null);
      else {
        let listsStore = db
          .transaction("lists", "readonly")
          .objectStore("lists");
        listsStore.getAll().onsuccess = (e) => {
          resolve((e.target! as IDBRequest).result);
        };
      }
    });
  });
}
