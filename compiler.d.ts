#!/usr/bin/env node
import { ArgumentParser as BaseParser, Namespace } from "argparse";
import { CompilerArgs } from "./types";
export declare class ArgumentParser extends BaseParser {
    parse_args(args?: string[], ns?: Namespace | object): CompilerArgs;
}
export default function main(): void;
//# sourceMappingURL=compiler.d.ts.map