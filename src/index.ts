import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Represents a key-value store.
 * Initializing with `::memory::` uses in-memory storage.
 */
export class KV<T = any> {
  #location: string;
  #data: Record<string, T>;

  /**
   * Creates a new instance of the class.
   * @param location - Where the data will be stored.
   * Can be `::memory::` or a file location.
   */
  public constructor(location: string = '::memory::') {
    this.#location = location;
    this.#data = {};

    if (location != '::memory::') {
      this.#location = path.resolve(process.cwd(), this.#location);

      const setData = (data: Record<string, T>) => {
        this.#data = data;
      };

      this.#load()
        .then(setData)
        .catch(() => ({}));
    }
  }

  async #load(): Promise<Record<string, T>> {
    if (this.#location === '::memory::') return {};

    try {
      const data = await fs.readFile(this.#location, 'utf8');
      return JSON.parse(data) || {};
    } catch {
      return {};
    }
  }

  async #save(): Promise<void> {
    if (this.#location !== '::memory::') {
      await fs.writeFile(this.#location, JSON.stringify(this.#data), 'utf8');
    }
  }

  /**
   * Sets a value to a key.
   * @param key - The name of the key.
   * @param value - The value to store.
   * @returns A promise returning the KV instance.
   */
  public async set(key: string, value: T): Promise<this> {
    try {
      this.#data[key] = value;
      await this.#save();
      return this;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets data by a key.
   * @param key - The existing key's name.
   * @returns A promise returning the found key, or null.
   */
  public async get(key: string): Promise<T | null> {
    return this.#data[key] ?? null;
  }

  /**
   * Gets all data in the store.
   * @returns A promise returning an array of data.
   */
  public async all(): Promise<T[]> {
    return Object.values(this.#data);
  }

  /**
   * Clears all data in the store.
   * @returns A promise returning the KV instance.
   */
  public async clear(): Promise<this> {
    try {
      this.#data = {};
      await this.#save();
      return this;
    } catch (error) {
      throw error;
    }
  }
}

export default new KV();
