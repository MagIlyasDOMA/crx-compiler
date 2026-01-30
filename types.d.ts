export type FileType = 'zip' | 'crx' | 'all';
export interface PrecompileConfig {
    src: string;
    pre_dist: string;
    clean_pre_dist: boolean;
}
export interface BasePackageCrxConfig extends PrecompileConfig {
    dist: string;
    key_file: string;
    manifest: string;
    clean_dist: boolean;
}
export interface CompilerArgs extends Partial<BasePackageCrxConfig> {
    only_crx?: boolean;
    only_zip?: boolean;
    clean_all?: boolean;
}
export interface PackageCrxConfig extends BasePackageCrxConfig {
    file_type: FileType;
    filetypeOnly(fileType: FileType): boolean;
}
export interface Manifest {
    name: string;
    version: string;
    [key: string]: any;
}
export interface KeygenConfig {
    publicKey: string;
    privateKey: string;
}
export interface KeygenArgs extends Partial<KeygenConfig> {
    private_key_path: string;
    public_key_path: string;
}
//# sourceMappingURL=types.d.ts.map