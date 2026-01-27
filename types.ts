export type FileType = 'zip' | 'crx' | 'all'

interface BasePackageCrxConfig {
    src: string;
    pre_dist: string;
    dist: string;
    key_file: string;
    manifest: string;
}

export interface CompilerArgs extends BasePackageCrxConfig {
    only_crx: boolean;
    only_zip: boolean;
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

export interface KeygenArgs {
    private_key_path: string;
    public_key_path: string;
}
