import { CompilerArgs, FileType, Manifest, PackageCrxConfig } from "./types.js";
export declare function getFileTypes(args: CompilerArgs): FileType | void;
export declare function getConfig(args: CompilerArgs): PackageCrxConfig;
export declare function getManifest(filename: string): Manifest;
export declare function createDirs(...paths: string[]): void;
export declare function getPackage(): Manifest;
//# sourceMappingURL=utils.d.ts.map