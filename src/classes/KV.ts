import type { Entry } from '../types';
import path from 'node:path';
import fs from 'node:fs';

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

        if (location !== '::memory::') {
            this.#location = path.resolve(process.cwd(), this.#location);
            this.#data = this.#load();
        }
    }

    #load(): Record<string, T> {
        if (this.#location === '::memory::') return {};

        try {
            const data = fs.readFileSync(this.#location, 'utf8');
            return JSON.parse(data) || {};
        } catch {
            return {};
        }
    }

    #save(): void {
        if (this.#location !== '::memory::') {
            fs.writeFileSync(this.#location, JSON.stringify(this.#data), 'utf8');
        }
    }

    /**
     * Sets a value to a key.
     * @param key - The name of the key.
     * @param value - The value to store.
     * @returns The value.
     */
    public set(key: string, value: T): T {
        this.#data[key] = value;
        this.#save();

        return value;
    }

    /**
     * Gets data by a key.
     * @param key - The existing key's name.
     * @returns The found data, or null.
     */
    public get<U = T>(key: string): U | null {
        return (this.#data[key] as unknown as U) ?? null;
    }

    /**
     * Gets all data in the store.
     * @returns An array of Entry objects [{ key: string, value: T }].
     */
    public all(): Entry<T>[] {
        return Object.entries(this.#data).map(([key, value]) => ({ key, value }));
    }

    /**
     * Clears all data in the store.
     * @returns The KV instance.
     */
    public clear(): this {
        this.#data = {};
        this.#save();

        return this;
    }
}
