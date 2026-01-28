import path from "path";
import fs from "fs";

const file = fs.readdirSync(process.cwd()).find(f => path.extname(f) === '.tgz')

if (!file) {
    console.error("Could not find file");
    process.exit(1);
}

try {
    fs.renameSync(file, 'crx-compiler-dist.tgz')
    console.log('crx-compiler-dist.tgz')
} catch (error) {
    console.error("Rename error", error);
}
