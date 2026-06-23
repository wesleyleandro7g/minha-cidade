#!/usr/bin/env node
/**
 * Reads seed SQL and prints MCP apply_migration arguments as JSON to stdout.
 * Used to verify payload size; actual MCP call is made via CallMcpTool.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const query = fs.readFileSync(path.join(root, 'seed_demo_data.sql'), 'utf8');
const payload = {
  project_id: 'jpkcupyugbbzwdykwsxh',
  name: 'seed_demo_data',
  query,
};
process.stdout.write(JSON.stringify(payload));
