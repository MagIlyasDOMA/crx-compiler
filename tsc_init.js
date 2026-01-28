#!/usr/bin/env node
import { ArgumentParser } from "argparse";
import { getConfig } from "./utils.js";
import { writeFileSync } from "fs";
import { __version__ } from "./index.js";
export default function main() {
    const parser = new ArgumentParser({ description: "TypeScript config generator for Chrome extensions" });
    parser.add_argument('input_dir', { type: 'str', help: 'Path to root directory', nargs: '?' });
    parser.add_argument('output_dir', { type: 'str', help: 'Path to output directory', nargs: '?' });
    parser.add_argument('--input-dir', '-i', { type: 'str', help: 'Path to root directory', dest: 'input_dir_flag' });
    parser.add_argument('--output-dir', '-o', { type: 'str', help: 'Path to output directory', dest: 'output_dir_flag' });
    parser.add_argument('--version', '-v', { action: 'version', version: __version__ });
    const args = parser.parse_args();
    const config = getConfig({});
    const inputDir = args.input_dir_flag || args.input_dir || config.src;
    const outputDir = args.output_dir_flag || args.output_dir || config.pre_dist;
    writeFileSync('tsconfig.json', `{
      "compilerOptions": {
        "target": "es6",
        "module": "es6",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "${outputDir}",
        "rootDir": "${inputDir}",
        "moduleResolution": "node"
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules"]
    }`, 'utf-8');
}
main();
//# sourceMappingURL=tsc_init.js.map