<a id="doc_en"></a>
# CRX Compiler - Documentation
#### [Документация на русском](#doc_ru)
## 📦 Overview
CRX Compiler is a command-line tool for building and signing Chrome extensions. It automates the process of compiling TypeScript, packaging into CRX/ZIP formats, and generating keys for signing extensions.

## 🚀 Installation
### Global Installation
```shell
npm install -g crx-compiler
```

### Using in a Project
```shell
npm install --save-dev crx-compiler
```

## 🛠️ Main Commands
### 1. Creating TypeScript Configuration
```shell
# Creates tsconfig.json for Chrome extension
crx-tsc-init
# Or
crx-tsconfig

# With parameters
crx-tsc-init src pre_dist
crx-tsc-init --input-dir src --output-dir pre_dist
crx-tsc-init -i src -o pre_dist
```

#### Parameters:
- `input_dir`, `--input-dir`, `-i` - Input directory (default: src)
- `output_dir`, `--output-dir`, `-o` - Output directory (default: pre_dist)
- `--version`, `-v` - Show version

### 2. Key Generation
```shell
# Generating keys for signing the extension
crx-keygen

# Specifying paths
crx-keygen key.pem public_key.pem
crx-keygen --private-key key.pem --public-key public_key.pem
```

#### Parameters:
- `private_key_path`, `--private-key`, `--private` - Path to the private key (default: key.pem)
- `public_key_path`, `--public-key`, `--public` - Path to the public key (default: public_key.pem)

### 3. Precompilation
```shell
# Preparing files for build
crx-precompile

# With cleaning pre_dist directory
crx-precompile --clean
crx-precompile -c

# With parameters
crx-precompile --src src --pre-dist pre_dist --clean
crx-precompile -s src -p pre_dist -c
```

#### Parameters:
- `--src`, `-s` - Source directory (default: src)
- `--pre-dist`, `-p` - Preparation directory (default: pre_dist)
`--clean`, `-c` - Remove pre_dist directory before compilation
`--version`, `-v` - Show version

### 4. Full Extension Build
```shell
# Full build
crx-compiler

# Only CRX
crx-compiler --only-crx
crx-compiler -c
# Only ZIP
crx-compiler --only-zip
crx-compiler -z

# With cleaning of all directories
crx-compiler --clean
crx-compiler -C

# Cleaning only pre_dist
crx-compiler --clean-pre-dist
crx-compiler -P

# Cleaning only dist
crx-compiler --clean-dist
crx-compiler -D

# Combined commands
crx-compiler --only-crx --clean
crx-compiler --only-zip --clean-dist

# Custom paths
crx-compiler --src src --pre-dist pre_dist --dist dist --key-file key.pem --clean
crx-compiler -s src -p pre_dist -d dist -k key.pem -C
```

#### Parameters:
- `--src`, `-s` - Source directory
- `--pre-dist`, `-p` - Directory for preparation
- `--dist`, `-d` - Output directory
- `--key-file`, `-k` - Private key file
- `--manifest`, `-m` - Path to manifest.json
- `--only-crx`, `-c` - Build only CRX
- `--only-zip`, `-z` - Build only ZIP
- `--clean`, `-C` - Delete ALL directories (pre_dist and dist)
- `--clean-pre-dist`, `-P` - Delete only pre_dist directory
- `--clean-dist`, `-D` - Delete only dist directory

## ⚙️ Configuration via package.json
You can configure compilation parameters in your extension's `package.json`:
```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "crxConfig": {
    "src": "src",
    "pre_dist": "pre_dist",
    "dist": "dist",
    "key_file": "key.pem",
    "manifest": "pre_dist/manifest.json",
    "file_type": "all",
    "clean_pre_dist": false,
    "clean_dist": false
  }
}
```

## 📋 File types
- `crx` - Signed Chrome Extension (requires key)
- `zip` - Archive for upload to Chrome Web Store
- `all` - Both formats (default)

## 🔑 Key Generation
#### Keys are generated in RSA 2048 format:
- Private key is saved in PEM format
- Public key is converted to base64 for manifest.json and saved in PEM format

After generation, add to `manifest.json`:
```json
{
  "key": "your_public_key_in_base64"
}
```
## 🏗️ Workflow
#### 1. Initialize the project:
```shell
crx-tsc-init
```
#### 2. Generate keys:
```shell
crx-keygen
```
#### 3. Add the key to manifest.json
#### 4. Build the extension:
```shell
crx-compiler
```

## 📂 Default Directory Structure
```text
project/
├── src/           # Extension source files
├── pre_dist/      # Prepared files (after tsc)
├── dist/          # Ready CRX/ZIP files
├── key.pem        # Private key
├── public_key.pem # Public key
└── tsconfig.json  # TypeScript configuration
```

## ⚠️ Restrictions
- Incompatible arguments: `--only-crx` and `--only-zip` cannot be used simultaneously
- The arguments `--clean`, `--clean-pre-dist`, and `--clean-dist` are also mutually exclusive
- Creating CRX files requires `crx3` to be installed
- TypeScript files are automatically excluded from copying to pre_dist

## 🔧 NPM Scripts (for development)
```json
{
  "scripts": {
    "precompile": "node precompile.js",
    "compile": "node compiler.js",
    "keygen": "node keygen.js",
    "create_tsconfig": "node tsc_init.js",
    "pack": "tsc && npm pack && node dev_scripts/rename_dist.js"
  }
}
```

## 🐛 Debugging
#### If you encounter issues:
1. Ensure all dependencies are installed
2. Check file permissions
3. Ensure the manifest.json is correct
4. Verify that the private key exists and is accessible

#### If cleaning errors occur:
1. **"The arguments are incompatible"** - Check the flag combinations
2. **Missing files after cleaning** - Make sure the necessary directories are recreated
3. **Access permission issues** - Check permissions for deleting directories

## 📄 License
GPL-3.0-only - See [LICENSE](https://github.com/MagIlyasDOMA/crx-compiler/blob/main/LICENSE) for details

## 🤝 Contributing to the project
Bug reports and feature requests are accepted via [GitHub Issues](https://github.com/MagIlyasDOMA/crx-compiler/issues)

---

<a id="doc_ru"></a>
# CRX Compiler - Документация
#### [Documentation in English](#doc_en)
## 📦 Обзор
CRX Compiler - это инструмент командной строки для сборки и подписи Chrome расширений. Он автоматизирует процесс компиляции TypeScript, упаковки в CRX/ZIP форматы и генерации ключей для подписи расширений.

## 🚀 Установка
### Глобальная установка
```shell
npm install -g crx-compiler
```

### Использование в проекте
```shell
npm install --save-dev crx-compiler
```

## 🛠️ Основные команды
### 1. Создание конфигурации TypeScript
```shell
# Создает tsconfig.json для Chrome расширения
crx-tsc-init
# Или
crx-tsconfig

# С параметрами
crx-tsc-init src pre_dist
crx-tsc-init --input-dir src --output-dir pre_dist
crx-tsc-init -i src -o pre_dist
```

#### Параметры:
- `input_dir`, `--input-dir`, `-i` - Исходная директория (по умолчанию: src)
- `output_dir`, `--output-dir`, `-o` - Выходная директория (по умолчанию: pre_dist)
- `--version`, `-v` - Показать версию

### 2. Генерация ключей
```shell
# Генерация ключей для подписи расширения
crx-keygen

# С указанием путей
crx-keygen key.pem public_key.pem
crx-keygen --private-key key.pem --public-key public_key.pem
```

#### Параметры:
- `private_key_path`, `--private-key`, `--private` - Путь к приватному ключу (по умолчанию: key.pem)
- `public_key_path`, `--public-key`, `--public` - Путь к публичному ключу (по умолчанию: public_key.pem)

### 3. Предварительная компиляция
```shell
# Подготовка файлов к сборке
crx-precompile

# С очисткой pre_dist директории
crx-precompile --clean
crx-precompile -c

# С параметрами
crx-precompile --src src --pre-dist pre_dist --clean
crx-precompile -s src -p pre_dist -c
```

#### Параметры:
- `--src`, `-s` - Исходная директория (по умолчанию: src)
- `--pre-dist`, `-p` - Директория для подготовки (по умолчанию: pre_dist)
`--clean`, `-c` - Удалить pre_dist директорию перед компиляцией
`--version`, `-v` - Показать версию

### 4. Полная сборка расширения
```shell
# Полная сборка
crx-compiler

# Только CRX
crx-compiler --only-crx
crx-compiler -c

# Только ZIP
crx-compiler --only-zip
crx-compiler -z

# С очисткой всех директорий
crx-compiler --clean
crx-compiler -C

# Очистка только pre_dist
crx-compiler --clean-pre-dist
crx-compiler -P

# Очистка только dist
crx-compiler --clean-dist
crx-compiler -D

# Комбинированные команды
crx-compiler --only-crx --clean
crx-compiler --only-zip --clean-dist

# С кастомными путями
crx-compiler --src src --pre-dist pre_dist --dist dist --key-file key.pem --clean
crx-compiler -s src -p pre_dist -d dist -k key.pem -C
```

#### Параметры:
- `--src`, `-s` - Исходная директория
- `--pre-dist`, `-p` - Директория для подготовки
- `--dist`, `-d` - Выходная директория
- `--key-file`, `-k` - Файл с приватным ключом
- `--manifest`, `-m` - Путь к manifest.json
- `--only-crx`, `-c` - Собрать только CRX
- `--only-zip`, `-z` - Собрать только ZIP
- `--clean`, `-C` - Удалить ВСЕ директории (pre_dist и dist)
- `--clean-pre-dist`, `-P` - Удалить только pre_dist директорию
- `--clean-dist`, `-D` - Удалить только dist директорию

## ⚙️ Конфигурация через package.json
Вы можете настроить параметры компиляции в `package.json` вашего расширения:
```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "crxConfig": {
    "src": "src",
    "pre_dist": "pre_dist",
    "dist": "dist",
    "key_file": "key.pem",
    "manifest": "pre_dist/manifest.json",
    "file_type": "all",
    "clean_pre_dist": false,
    "clean_dist": false
  }
}
```

## 📋 Типы файлов
- `crx` - Подписанный Chrome Extension (требует ключа)
- `zip` - Архив для загрузки в Chrome Web Store
- `all` - Оба формата (по умолчанию)

## 🔑 Генерация ключей
#### Ключи генерируются в формате RSA 2048:
- Приватный ключ сохраняется в PEM формате
- Публичный ключ конвертируется в base64 для manifest.json и сохраняется в PEM формате

После генерации добавьте в `manifest.json`:
```json
{
  "key": "ваш_публичный_ключ_в_base64"
}
```

## 🏗️ Рабочий процесс
#### 1. Инициализация проекта:
```shell
crx-tsc-init
```
#### 2. Генерация ключей:
```shell
crx-keygen
```
#### 3. Добавьте ключ в manifest.json
#### 4. Сборка расширения:
```shell
crx-compiler
```

## 📂 Структура директорий по умолчанию
```text
project/
├── src/           # Исходные файлы расширения
├── pre_dist/      # Подготовленные файлы (после tsc)
├── dist/          # Готовые CRX/ZIP файлы
├── key.pem        # Приватный ключ
├── public_key.pem # Публичный ключ
└── tsconfig.json  # Конфигурация TypeScript
```

## ⚠️ Ограничения
- Несовместимые аргументы: `--only-crx` и `--only-zip` нельзя использовать одновременно
- Аргументы `--clean`, `--clean-pre-dist` и `--clean-dist` также взаимоисключающие
- Для создания CRX файлов требуется установленный `crx3`
- TypeScript файлы автоматически исключаются из копирования в pre_dist

## 🔧 NPM Scripts (для разработки)
```json
{
  "scripts": {
    "precompile": "node precompile.js",
    "compile": "node compiler.js",
    "keygen": "node keygen.js",
    "create_tsconfig": "node tsc_init.js",
    "pack": "tsc && npm pack && node dev_scripts/rename_dist.js"
  }
}
```

## 🐛 Отладка
#### Если возникают проблемы:
1. Убедитесь, что все зависимости установлены
2. Проверьте права доступа к файлам
3. Убедитесь, что manifest.json корректен
4. Проверьте, что приватный ключ существует и доступен

#### Если возникают ошибки очистки:
1. **"The arguments are incompatible"** - Проверьте комбинацию флагов
2. **Отсутствуют файлы после очистки** - Убедитесь, что нужные директории создаются заново
3. **Проблемы с правами доступа** - Проверьте права на удаление директорий 

## 📄 Лицензия
GPL-3.0-only - См. файл [LICENSE](https://github.com/MagIlyasDOMA/crx-compiler/blob/main/LICENSE) для подробностей

## 🤝 Вклад в проект
Сообщения об ошибках и запросы на доработку принимаются через [GitHub Issues](https://github.com/MagIlyasDOMA/crx-compiler/issues)
