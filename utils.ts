import fs from "fs";
import path from "path";
import {CompilerArgs, FileType, Manifest, PackageCrxConfig} from "./types.js";

export function getFileTypes(args: CompilerArgs): FileType | void {
    if (args.only_crx) return 'crx';
    else if (args.only_zip) return 'zip';
}

export function getConfig(args: CompilerArgs): PackageCrxConfig {
    const config: PackageCrxConfig = JSON.parse(fs.readFileSync('package.json', 'utf-8')).crxConfig || {};
    const preDistDirectory = args.pre_dist || config.pre_dist || 'pre_dist'
    return {
        src: args.src || config.src || 'src',
        pre_dist: preDistDirectory,
        dist: args.dist || config.dist || 'dist',
        key_file: args.key_file || config.key_file || 'key.pem',
        manifest: args.manifest || config.manifest || path.join(preDistDirectory, 'manifest.json'),
        file_type: getFileTypes(args) || config.file_type || 'all',
        clean_pre_dist: args.clean_pre_dist || args.clean_all || config.clean_pre_dist || false,
        clean_dist: args.clean_dist || args.clean_all || config.clean_dist || false,
        filetypeOnly: function (fileType: FileType) {
            return [fileType, 'all'].includes(fileType);
        }
    };
}

export function getManifest(filename: string): Manifest {
    return JSON.parse(fs.readFileSync(filename, 'utf-8'));
}

export function createDirs(...paths: string[]) {
    for (const path of paths) if (!fs.existsSync(path)) fs.mkdirSync(path, {recursive: true});
}

export function getPackage(): Manifest {
    const config = JSON.parse(fs.readFileSync('package.json', 'utf-8')) || {};
    return {
        name: config.name || 'extension',
        version: config.version || '1.0.0',
    }
}

export function removeDir(path: string): void {
    fs.rmSync(path, {recursive: true, force: true});
}
