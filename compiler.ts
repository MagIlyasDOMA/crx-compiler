#!/usr/bin/env node
import {exec, execSync} from 'child_process'
import fs from 'fs'
import path from 'path'
import archiver from 'archiver'
import {ArgumentParser} from "argparse";
import {__version__} from "./index.js";
import {createDirs, getConfig, getPackage} from "./utils.js";
import { PackageCrxConfig } from "./types.js";


function main() {
    const parser = new ArgumentParser({description: 'Chrome extension compiler'});
    
    parser.add_argument('--src', '-s', {type: 'str', help: 'Source directory with extension files'});
    parser.add_argument('--pre-dist', '-p', {type: 'str', help: 'Directory for preparing files for assembly'});
    parser.add_argument('--dist', '-d', {type: 'str', help: 'Directory for output files (.crx, .zip)'});
    parser.add_argument('--key-file', '-k', {type: 'str', help: 'File with private key for signing CRX'});
    parser.add_argument('--manifest', '-m', {type: 'str', help: 'Path to the manifest.json file'})
    parser.add_argument('--version', '-v', {action: 'version', version: __version__})

    const config: PackageCrxConfig = getConfig(parser.parse_args())
    const manifest = getPackage();
    const extensionFile = path.join(config.dist, `${manifest.name || 'extension'}-${manifest.version || '1.0.0'}`)

    createDirs(config.src, config.pre_dist, config.dist)

    execSync('tsc')

    exec(`crx3 pack ${config.pre_dist} -p ${config.key_file} -o ${extensionFile}.crx`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error creating CRX: ${error}`);
            return;
        }
        console.log('CRX file created');

        // Создаем архив
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
    })
}

main()
