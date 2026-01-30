#!/usr/bin/env node
import {exec, execSync} from 'child_process'
import fs from 'fs'
import path from 'path'
import archiver from 'archiver'
import {ArgumentParser as BaseParser, Namespace} from "argparse";
import {__version__} from "./index.js";
import {createDirs, getConfig, getPackage, removeDir, precompile} from "./utils.js";
import { PackageCrxConfig, CompilerArgs } from "./types";

export class ArgumentParser extends BaseParser {
    parse_args(args?: string[], ns?: Namespace | object): CompilerArgs {
        const output: CompilerArgs = super.parse_args(args, ns);
        if (this.isIncompatible(output))
            throw new Error('The arguments are incompatible')
        return output;
    }

    private isIncompatible(output: CompilerArgs): boolean {
        return [
            output.only_crx && output.only_zip,
            output.clean_all && output.clean_pre_dist,
            output.clean_all && output.clean_dist,
            output.clean_pre_dist && output.clean_dist
        ].some(Boolean)
    }
}

export default function main() {
    const parser = new ArgumentParser({description: 'Chrome extension compiler'});

    parser.add_argument('--src', '-s', {type: 'str', help: 'Source directory with extension files'});
    parser.add_argument('--pre-dist', '-p', {type: 'str', help: 'Directory for preparing files for assembly'});
    parser.add_argument('--dist', '-d', {type: 'str', help: 'Directory for output files (.crx, .zip)'});
    parser.add_argument('--key-file', '-k', {type: 'str', help: 'File with private key for signing CRX'});
    parser.add_argument('--manifest', '-m', {type: 'str', help: 'Path to the manifest.json file'})
    parser.add_argument('--version', '-v', {action: 'version', version: __version__})

    parser.add_argument('--only-crx', '-c', {action: 'store_true', help: 'Don\'t create a zip file'})
    parser.add_argument('--only-zip', '-z', {action: 'store_true', help: 'Don\'t create a crx file'})

    parser.add_argument('--clean', '-C', {action: 'store_true', help: 'Delete pre_dist and dist directories', dest: 'clean_all'})
    parser.add_argument('--clean-pre-dist', '-P', {action: 'store_true', help: 'Delete pre_dist directory'})
    parser.add_argument('--clean-dist', '-D', {action: 'store_true', help: 'Delete dist directory'})

    const config: PackageCrxConfig = getConfig(parser.parse_args())
    const manifest = getPackage();
    const extensionFile = path.join(config.dist, `${manifest.name || 'extension'}-${manifest.version || '1.0.0'}`)

    removeDir(config.dist)
    createDirs(config.src, config.pre_dist, config.dist)
    precompile(config)

    if (config.filetypeOnly('crx')) {
        exec(`crx3 pack ${config.pre_dist} -p ${config.key_file} -o ${extensionFile}.crx`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error creating CRX: ${error}`);
                return;
            }
            console.log('CRX file created');
        })
    }
    if (config.filetypeOnly('zip')) {
        const output = fs.createWriteStream(extensionFile + '.zip');
        const archive = archiver('zip', {zlib: {level: 9}});

        output.on('close', () => {
            console.log(`Archive created: ${archive.pointer()} bytes`);
        });

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(output);
        archive.directory(config.pre_dist, false);
        archive.finalize();
    }
}

main()
