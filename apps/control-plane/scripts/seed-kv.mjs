import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const filePath = process.env.VERIFY_FILE_PATH;
if (!filePath) {
  console.error('Missing VERIFY_FILE_PATH env var (path to the Apple partner domain verification file).');
  process.exit(1);
}
const key = process.env.KV_KEY || 'applepay:partner-verification-file';

const abs = path.resolve(filePath);
const data = await readFile(abs, 'utf8');

const result = spawnSync(
  'npx',
  ['wrangler', 'kv:key', 'put', key, data, '--binding', 'APPLEPAY_KV'],
  { stdio: 'inherit' }
);

process.exit(result.status ?? 0);
