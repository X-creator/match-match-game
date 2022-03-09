import ScoreModelInterface from '../../pages/score/model/score-model-interface';

class MyDB {
  public db: IDBDatabase | null = null;

  constructor() {
    this.init();
  }

  init = (): Promise<void> => new Promise((resolve) => {
    const openRequest = indexedDB.open('x-creator');
    openRequest.onupgradeneeded = (): void => {
      this.db = openRequest.result;
      if (!this.db.objectStoreNames.contains('users')) {
        const store = this.db.createObjectStore('users',
          { autoIncrement: true, keyPath: 'email' });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('surname', 'surname', { unique: false });
        store.createIndex('email', 'email', { unique: false });
        store.createIndex('avatar', 'avatar', { unique: false });
        store.createIndex('score', 'score', { unique: false });
      }
    };
    openRequest.onsuccess = (): void => {
      this.db = openRequest.result;
      resolve();
    };
  });

  public getAll = async (): Promise<ScoreModelInterface[]> => new Promise((resolve) => {
    if (this.db) {
      const tx = this.db.transaction('users', 'readonly');
      const store = tx.objectStore('users');
      const result = store.getAll();
      tx.oncomplete = (): void => {
        resolve(result.result);
      };
    }
  });

  public add = async (value: ScoreModelInterface): Promise<IDBValidKey> => new Promise((resolve) => {
    if (this.db) {
      const tx = this.db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
      const result = store.add(value);
      tx.oncomplete = (): void => {
        resolve(result.result);
      };
    }
  });

  public put = async (value: ScoreModelInterface | null, id?: IDBValidKey | null): Promise<IDBValidKey> => new Promise((resolve) => {
    if (this.db) {
      const tx = this.db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
      const result = store.put(value, id!);
      tx.oncomplete = (): void => {
        resolve(result.result);
      };
    }
  });
}

export const DB = new MyDB();
