#!/usr/bin/env node
import { ArgumentParser } from "argparse";
import { __version__ } from "./index.js";
import { precompile } from "./utils.js";
export default function main() {
    const parser = new ArgumentParser({ description: "Creating predist directory" });
    parser.add_argument('--src', '-s', { type: 'str', help: 'Source directory with extension files' });
    parser.add_argument('--pre-dist', '-p', { type: 'str', help: 'Directory for preparing files for assembly' });
    parser.add_argument('--clean', '-c', { action: 'store_true', help: 'Delete pre_dist directory',
        dest: 'clean_pre_dist' });
    parser.add_argument('--version', '-v', { action: 'version', version: __version__ });
    precompile(parser.parse_args());
}
main();
//# sourceMappingURL=precompile.js.map