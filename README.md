<div align="center">
  <img src="https://jvk6hm88bttdy90i.public.blob.vercel-storage.com/fastkv-transparent.png" width="400"/>
</div>

# FastKV

FastKV is a key-value store which offers the following features:

- Persistent storage in JSON files 📁
- Caching with in-memory storage 🕒

## Installation

Get FastKV via npm using your favourite package manager:

```sh
npm install fastkv
# or
yarn add fastkv
# or
pnpm add fastkv
```

## Example

```js
import { KV } from 'fastkv';

// For TypeScript users, the KV supports generics:
// const example = new KV<string>();

const kv = new KV('./db.json'); // Save the data. Path resolves with process.cwd()
const cache = new KV('::memory::'); // Keep the data in the system's memory.

// Set data
await kv.set('userSettings', { theme: 'dark' }); // => Promise<KV>

// Retreive data by a key
await kv.get('userSettings'); // => Promise resolving to { theme: 'dark' }

// Retreive all data
await kv.all(); // => Promise resolving an array: [{ key: 'userSettings', value: { theme: 'dark' } }]

// Clear the store
await kv.clear(); // => Promise<KV>
```
