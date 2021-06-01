export class DataBase {
  public db!: IDBDatabase;

  init(dbName: string, version?: number) {
    return new Promise((resolve, reject) => {
      const indexDB = window.indexedDB;
      const openRequest = indexDB.open(dbName, version);
      openRequest.onupgradeneeded = () => {
        const database = openRequest.result;
        const store = database.createObjectStore('Collection', { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name');
        store.createIndex('lastname', 'lastname');
        store.createIndex('email', 'email', { unique: true });
        store.createIndex('score', 'score');
        this.db = database;
        resolve(this.db);
      };
      openRequest.onsuccess = () => {
        this.db = openRequest.result;
        resolve(this.db);
      };
    });
  }

  write<RecordType>(UserData: RecordType): Promise<RecordType> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('Collection', 'readwrite');

      const store = transaction.objectStore('Collection');
      const res = store.add({});
      let transResult: RecordType;
      transaction.oncomplete = () => {
        resolve(transResult);
      };
      res.onsuccess = () => {
        const newRecord: RecordType = { ...UserData, id: res.result };
        transResult = newRecord;
        const result = store.put(newRecord);
        result.onsuccess = () => {
          console.log('complite', result.result);
        };
        result.onerror = () => {
          console.log('error', result.error);
        };
      };
    });
  }

  readAll() {
    const transaction = this.db.transaction('Collection', 'readonly');
    const store = transaction.objectStore('Collection');
    const result = store.getAll();
    result.onsuccess = () => {
      console.log(result.result);
    };
  }

  filter() {
    const transaction = this.db.transaction('Collection', 'readonly');
    const store = transaction.objectStore('Collection');
    const result = store.index('email').openCursor(null, 'next');
    const resData: Array<any> = [];
    result.onsuccess = () => {
      const cursor = result.result;
      if (cursor) {
        console.log(cursor.value);
        if (resData.length < 2) {
          resData.push(cursor.value);
        }
        cursor?.continue();
      }
    };
    transaction.oncomplete = () => {
      console.log(resData);
    };
  }
}
