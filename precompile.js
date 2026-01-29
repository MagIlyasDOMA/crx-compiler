import { ArgumentParser } from "argparse";
import { execSync } from "child_process";
import { __version__ } from "./index.js";
import path from "path";
import fs from "fs-extra";
export function initParser() {
    const parser = new ArgumentParser({ description: "Creating predist directory" });
    parser.add_argument('--src', '-s', { type: 'str', help: 'Source directory with extension files' });
    parser.add_argument('--pre-dist', '-p', { type: 'str', help: 'Directory for preparing files for assembly' });
    parser.add_argument('--version', '-v', { action: 'version', version: __version__ });
    return parser.parse_args();
}
export function formatConfig(config) {
    return {
        src: config.src || 'src',
        pre_dist: config.pre_dist || 'pre_dist'
    };
}
export default function main(config) {
    if (!config)
        config = initParser();
    config = formatConfig(config);
    const src = config.src, pre_dist = config.pre_dist;
    execSync('tsc');
    try {
        fs.ensureDirSync(pre_dist);
        fs.copySync(src, pre_dist, {
            filter: (file) => {
                return path.extname(file) !== '.ts';
            }
        });
    }
    catch (e) {
        console.error(e);
    }
}
main();
//# sourceMappingURL=precompile.js.map