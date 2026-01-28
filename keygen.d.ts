#!/usr/bin/env node
import { ArgumentParser as BaseParser } from "argparse";
import { KeygenConfig } from "./types.js";
export declare class ArgumentParser extends BaseParser {
    parseArgs(): KeygenConfig;
}
export declare function generateChromeExtensionKey(config: KeygenConfig): void;
export default function main(): void;
//# sourceMappingURL=keygen.d.ts.map