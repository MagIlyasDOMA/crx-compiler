#!/usr/bin/env node
import { ArgumentParser } from "argparse";
import * as crypto from 'crypto';
import * as fs from 'fs';
import { __version__ } from "./index";
function generateChromeExtensionKey(privatePath = 'key.pem', publicPath = 'public.txt') {
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
    fs.writeFileSync(privatePath, privateKey);
    fs.writeFileSync(publicPath, publicKeyBase64);
    console.log('✅ Keys generated:');
    console.log(`   • ${privatePath} - private key`);
    console.log(`   • ${publicPath} - public key for manifest.json`);
    console.log('\n📋 Add to manifest.json:');
    console.log(`"key": "${publicKeyBase64}"`);
}
function main() {
    const parser = new ArgumentParser();
    parser.add_argument('private_key_path', { type: 'str', help: 'Path to private key file',
        nargs: '?', default: 'key.pem' });
    parser.add_argument('public_key_path', { type: 'str', help: 'Path to public key file',
        nargs: '?', default: 'public_key.pem' });
    parser.add_argument('--version', '-v', { action: 'version', version: __version__ });
    const args = parser.parse_args();
    generateChromeExtensionKey(args.private_key_path, args.public_key_path);
}
main();
//# sourceMappingURL=keygen.js.map