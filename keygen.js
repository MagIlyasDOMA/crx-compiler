#!/usr/bin/env node
import { ArgumentParser as BaseParser } from "argparse";
import crypto from 'crypto';
import fs from 'fs';
import path from "path";
import { __version__ } from "./index.js";
export class ArgumentParser extends BaseParser {
    parseArgs() {
        const args = this.parse_args();
        return {
            publicKey: args.publicKey || args.public_key_path || 'public_key.pem',
            privateKey: args.privateKey || args.private_key_path || 'key.pem',
        };
    }
}
export function generateChromeExtensionKey(config) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: ''
        }
    });
    const publicKeyDer = Buffer.from(publicKey
        .replace(/-----BEGIN PUBLIC KEY-----/, '')
        .replace(/-----END PUBLIC KEY-----/, '')
        .replace(/\n/g, ''), 'base64');
    const publicKeyBase64 = publicKeyDer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    fs.writeFileSync(config.privateKey, privateKey);
    fs.writeFileSync(config.publicKey, path.extname(config.publicKey) === '.pem' ? publicKey : publicKeyBase64);
    console.log('✅ Keys generated:');
    console.log(`   • ${config.privateKey} - private key`);
    console.log(`   • ${config.publicKey} - public key for manifest.json`);
    console.log('\n📋 Add to manifest.json:');
    console.log(`"key": "${publicKeyBase64}"`);
}
export default function main() {
    const parser = new ArgumentParser({ description: "Chrome extension key generator" });
    parser.add_argument('private_key_path', { type: 'str', help: 'Path to private key file',
        nargs: '?', default: 'key.pem' });
    parser.add_argument('public_key_path', { type: 'str', help: 'Path to public key file',
        nargs: '?', default: 'public_key.pem' });
    parser.add_argument('--private-key', '--private', { type: 'str', help: 'Path to private key file',
        dest: 'privateKey' });
    parser.add_argument('--public-key', '--public', { type: 'str', help: 'Path to public key file',
        dest: 'publicKey' });
    parser.add_argument('--version', '-v', { action: 'version', version: __version__ });
    generateChromeExtensionKey(parser.parseArgs());
}
main();
//# sourceMappingURL=keygen.js.map