export class DataBase {
  public db!: IDBDatabase;

  public store!: IDBObjectStore;

  init(dbName: string, version?: number) {
    return new Promise((resolve, reject) => {
      const indexDB = window.indexedDB;
      const openRequest = indexDB.open(dbName, version);
      openRequest.onupgradeneeded = () => {
        const database = openRequest.result;
        this.store = database.createObjectStore('Collection', { keyPath: 'id', autoIncrement: true });
        this.store.createIndex('name', 'name');
        this.store.createIndex('lastname', 'lastname');
        this.store.createIndex('email', 'email', { unique: true });
        this.store.createIndex('score', 'score');
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

      this.store = transaction.objectStore('Collection');
      const res = this.store.add({});
      let transResult: RecordType;
      transaction.oncomplete = () => {
        resolve(transResult);
      };
      res.onsuccess = () => {
        const newRecord: RecordType = { ...UserData, id: res.result };
        transResult = newRecord;
        const result = this.store.put(newRecord);
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
    this.store = transaction.objectStore('Collection');
    const result = this.store.getAll();
    result.onsuccess = () => {
      console.log(result.result);
    };
  }

  filter() {
    const transaction = this.db.transaction('Collection', 'readonly');
    this.store = transaction.objectStore('Collection');
    const result = this.store.index('email').openCursor(null, 'next');
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
