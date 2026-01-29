import { fileURLToPath } from 'url';
import { dirname, join as path_join } from 'path';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const __version__ = JSON.parse(fs.readFileSync(
    path_join(__dirname, 'package.json'), 'utf-8')).version || '1.1.0';
