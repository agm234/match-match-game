export class DataBase {
  public db!: IDBDatabase;

  public store!: IDBObjectStore;

  init(dbName: string, version?: number): Promise<IDBDatabase> {
    return new Promise((resolve) => {
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
    return new Promise((resolve) => {
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
        this.store.put(newRecord);
      };
    });
  }

  putNewScore<RecordType>(UserData: RecordType): Promise<RecordType> {
    return new Promise((resolve) => {
      const transaction = this.db.transaction('Collection', 'readwrite');
      this.store = transaction.objectStore('Collection');
      this.store.put(UserData);
      let transResult: RecordType;
      transaction.oncomplete = () => {
        resolve(transResult);
      };
    });
  }

  read<RecordType>(key: string): Promise<Array<RecordType>> {
    return new Promise((resolve) => {
      const transaction = this.db.transaction('Collection', 'readonly');
      this.store = transaction.objectStore('Collection');
      const result = this.store.index('email').getAll(key);
      result.onsuccess = () => {
        resolve(result.result);
      };
    });
  }

  readfiltred<RecordType>(): Promise<Array<RecordType>> {
    return new Promise((resolve) => {
      const transaction = this.db.transaction('Collection', 'readonly');
      this.store = transaction.objectStore('Collection');
      const result = this.store.index('score').openCursor(null, 'prev');
      const resData: Array<RecordType> = [];
      result.onsuccess = () => {
        const cursor = result.result;
        if (cursor) {
          if (resData.length < 10) {
            resData.push(cursor.value);
          }
          cursor?.continue();
        }
      };
      transaction.oncomplete = () => {
        resolve(resData);
      };
    });
  }
}
