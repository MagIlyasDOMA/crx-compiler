interface PackageCrxConfig {
    src: string;
    pre_dist: string;
    dist: string;
    key_file: string;
    manifest: string;
}

type PackageCrxOptions = Partial<PackageCrxConfig>;

interface Manifest {
    name: string;
    version: string;
    [key: string]: any;
}

interface KeygenArgs {
    private_key_path: string;
    public_key_path: string;
}
