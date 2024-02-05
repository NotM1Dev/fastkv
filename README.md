<div align="center">
  <img src="https://jvk6hm88bttdy90i.public.blob.vercel-storage.com/fastkv-transparent.png" width="400"/>
</div>

# FastKV

FastKV is a key-value store which offers the following features:

-   Supports temporary in-memory storage 🕒
-   Supports persistent storage with JSON files 📁
-   Lightweight with no dependencies ⚡

## Installation

Get FastKV via npm using your favourite package manager:

```sh
npm install fastkv
# or
yarn add fastkv
# or
pnpm add fastkv
# or
bun add fastkv
```

## Example

```js
import { KV } from 'fastkv';

// For TypeScript users, the KV supports generics:
// const example = new KV<string>();
// Or: example.get<string>('my-key-name');

const kv = new KV('./db.json'); // Save the data. Path resolves with process.cwd()
const cache = new KV('::memory::'); // Keep the data in the system's memory.

// Set data
kv.set('userSettings', { theme: 'dark' });

// Retreive data by a key
kv.get('userSettings'); // -> { theme: 'dark' }

// Retreive all data
kv.all(); // -> [{ key: 'userSettings', value: { theme: 'dark' } }]

// Clear the store
kv.clear();
```
