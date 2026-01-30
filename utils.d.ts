import { CompilerArgs, FileType, Manifest, PackageCrxConfig, PrecompileConfig } from "./types.js";
export declare function getFileTypes(args: CompilerArgs): FileType | void;
export declare function getConfig(args: CompilerArgs): PackageCrxConfig;
export declare function getManifest(filename: string): Manifest;
export declare function createDirs(...paths: string[]): void;
export declare function getPackage(): Manifest;
export declare function removeDir(path: string): void;
export declare function precompileConfig(config: any): PrecompileConfig;
export declare function precompile(config: PrecompileConfig): void;
//# sourceMappingURL=utils.d.ts.map