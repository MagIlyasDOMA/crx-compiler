<a id="doc_en"></a>
# CRX Compiler
#### [Документация на русском](#doc_ru)
## Description
CRX Compiler is a command-line tool for building Chrome extensions (CRX files) from TypeScript source code. The package provides utilities for generating signing keys, configuring TypeScript settings, and creating ready-to-use extensions.

## Installation
### Global installation
```shell
npm install -g crx-compiler
```

### Local installation
```shell
npm install --save-dev crx-compiler
```

## Main Commands
### `crx-compiler` - Extension Compiler
Compiles TypeScript code and creates a CRX file and a ZIP archive of the extension.

#### Usage:
```shell
crx-compiler [options]
```

#### Options:
- `--src`, `-s` - Source directory containing extension files (default: `src`)
- `--pre-dist`, `-p` - Directory for preparing files before build (default: `pre_dist`)
- `--dist`, `-d` - Output directory for files (.crx, .zip) (default: `dist`)
- `--key-file`, `-k` - File with the private key for signing the CRX (default: `key.pem`)
- `--manifest`, `-m` - Path to `manifest.json` file
- `--version`, `-v` - Show version

#### Mutually exclusive group of options:
- `--only-crx`, `-c` - Create only the CRX file (without ZIP archive)
- `--only-zip`, `-z` - Create only the ZIP archive (without CRX file)
  If none of these options are specified, both files (CRX and ZIP) are created.

#### Usage examples:
```shell
# 1. Create only CRX file:
crx-compiler --only-crx
# or
crx-compiler -c

# 2. Create only ZIP archive:
crx-compiler --only-zip
# or
crx-compiler -z

# 3. Create both files (default):
crx-compiler

# 4. Full example with options:
crx-compiler --src ./my-extension --dist ./build --key-file ./production-key.pem --only-zip
```

## File Types
### The package supports three operational modes:
1. `all` - creates both CRX and ZIP files (default mode)
2. `crx` - creates only a signed CRX file
3. `zip` - creates only a ZIP archive for upload to Chrome Web Store

### When to use different modes:
- Only CRX (--only-crx):
  - For local extension installation
  - When a signed version is needed
  - For distribution outside the Chrome Web Store
- Only ZIP (--only-zip):
  - For uploading to the Chrome Web Store
  - For distribution through other channels
  - When Chrome signing is not required
- Both files (default mode):
  - For a full distribution package
  - When both versions are needed
  - For testing different installation methods

### Example workflow:
```shell
# 1. Development - create both files for testing
crx-compiler --src ./src --dist ./dev-build

# 2. Preparation for publication - only ZIP for Web Store
crx-compiler --src ./src --dist ./release --only-zip

# 3. Distribution - only CRX for local installation
crx-compiler --src ./src --dist ./distribution --only-crx
```

### `crx-keygen` - Key Generator
Generates a key pair for signing Chrome extensions.

#### Usage:
```shell
crx-keygen [private_key_path] [public_key_path]
```

#### Arguments:
- `private_key_path` - Path to save the private key (default: `key.pem`)
- `public_key_path` - Path to save the public key (default: `public_key.pem`)

#### Options:
- `--private-key`, `--private` - Path to save the private key (overrides positional argument)
- `--public-key`, `--public` - Path to save the public key (overrides positional argument)
- `--version`, `-v` - Show version

#### Example:
```shell
crx-keygen ./keys/private.pem ./keys/public.txt
```

#### Result:
- Creates a private key in the specified file
- Creates a public key in base64 format for addition to `manifest.json`
- Outputs instructions in the console for adding the key to `manifest.json`

### `crx-tsc-init` - TypeScript Configuration Generator
Creates a `tsconfig.json` file for compiling the TypeScript code of a Chrome extension.

#### Usage:
```shell
crx-tsc-init [input_directory] [output_directory]
```
#### Arguments:
- `input_dir` - Root directory of the source code
- `output_dir` - Directory for compiled files

#### Options:
- `--input-dir`, `-i` - Root directory of the source code
- `--output-dir`, `-o` - Directory for compiled files

#### Example:
```shell
crx-tsc-init ./src ./dist
```

## Configuration via package.json
You can configure the compiler options in your project's `package.json` file:
```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "crxConfig": {
    "src": "src",
    "pre_dist": "pre_dist",
    "dist": "dist",
    "key_file": "key.pem",
    "manifest": "pre_dist/manifest.json"
  }
}
```

## Project Structure
Recommended structure for a Chrome extension project:
```text
my-extension/
├── package.json
├── tsconfig.json
├── key.pem
├── src/
│   ├── manifest.json
│   ├── background.ts
│   ├── popup.ts
│   └── content.ts
├── pre_dist/ (created automatically)
└── dist/ (created automatically)
```

## Error Handling
- When creating only the CRX file, if a signing error occurs, the process stops
- When creating only the ZIP file, the CRX file is not created and not deleted (as it is not needed)
- In default mode, both files are created independently of each other

## Workflow
#### 1. Key generation (once):
```shell
crx-keygen
```

#### 2. Adding the public key to manifest.json:
```json
{
  "name": "My Extension",
  "version": "1.0.0",
  "key": "your_public_key_base64"
}
```

#### 3. Initializing TypeScript configuration:
```shell
crx-tsc-init
```

#### 4. Building the extension:
```shell
crx-compiler
```

## Dependencies
- Node.js 14+
- TypeScript 5.9+
- Chrome for testing extensions

## License
[GPL-3.0-only](https://github.com/MagIlyasDOMA/crx-compiler/blob/main/LICENSE)

## Author
Маг Ильяс DOMA (MagIlyasDOMA)

## Repository
[https://github.com/MagIlyasDOMA/crx-compiler](https://github.com/MagIlyasDOMA/crx-compiler)

## Support
To report bugs and suggestions, use Issues on GitHub:
[https://github.com/MagIlyasDOMA/crx-compiler/issues](https://github.com/MagIlyasDOMA/crx-compiler/issues)

<a id="doc_ru"></a>
# CRX Compiler
#### [Documentation in English](#doc_en)
## Описание
CRX Compiler - это инструмент командной строки для сборки Chrome расширений (CRX файлов) из исходного кода TypeScript. Пакет предоставляет утилиты для генерации ключей подписи, настройки TypeScript конфигурации и создания готовых расширений.

## Установка
### Глобальная установка
```shell
npm install -g crx-compiler
```

### Локальная установка
```shell
npm install --save-dev crx-compiler
```

## Основные команды
### `crx-compiler` - Компилятор расширений
Компилирует TypeScript код и создает CRX файл и ZIP архив расширения.

#### Использование:
```shell
crx-compiler [опции]
```

#### Опции:
- `--src`, `-s` - Исходная директория с файлами расширения (по умолчанию: `src`)
- `--pre-dist`, `-p` - Директория для подготовки файлов перед сборкой (по умолчанию: `pre_dist`)
- `--dist`, `-d` - Выходная директория для файлов (.crx, .zip) (по умолчанию: `dist`)
- `--key-file`, `-k` - Файл с приватным ключом для подписи CRX (по умолчанию: `key.pem`)
- `--manifest`, `-m` - Путь к файлу `manifest.json`
- `--version`, `-v` - Показать версию

#### Взаимоисключающая группа опций:
- `--only-crx`, `-c` - Создать только CRX файл (без ZIP архива)
- `--only-zip`, `-z` - Создать только ZIP архив (без CRX файла)
Если ни одна из этих опций не указана, создаются оба файла (CRX и ZIP).

#### Примеры использования:
```shell
# 1. Создать только CRX файл:
crx-compiler --only-crx
# или
crx-compiler -c

# 2. Создать только ZIP архив:
crx-compiler --only-zip
# или
crx-compiler -z

# 3. Создать оба файла (по умолчанию):
crx-compiler

# 4. Полный пример с опциями:
crx-compiler --src ./my-extension --dist ./build --key-file ./production-key.pem --only-zip
```

## Типы файлов
### Пакет поддерживает три режима работы:
1. `all` - создает и CRX, и ZIP файлы (режим по умолчанию)
2. `crx` - создает только подписанный CRX файл
3. `zip` - создает только ZIP архив для загрузки в Chrome Web Store

### Когда использовать разные режимы:
- Только CRX (--only-crx):
  - Для локальной установки расширения
  - Когда нужна подписанная версия
  - Для распространения вне Chrome Web Store
- Только ZIP (--only-zip):
  - Для загрузки в Chrome Web Store
  - Для распространения через другие каналы
  - Когда не требуется подпись Chrome
- Оба файла (режим по умолчанию):
  - Для полного пакета распространения
  - Когда нужны обе версии
  - Для тестирования разных способов установки

### Пример рабочего процесса:
```shell
# 1. Разработка - создаем оба файла для тестирования
crx-compiler --src ./src --dist ./dev-build

# 2. Подготовка к публикации - только ZIP для Web Store
crx-compiler --src ./src --dist ./release --only-zip

# 3. Распространение - только CRX для локальной установки
crx-compiler --src ./src --dist ./distribution --only-crx
```

### `crx-keygen` - Генератор ключей
Генерирует пару ключей для подписи Chrome расширений.

#### Использование:
```shell
crx-keygen [путь_к_приватному_ключу] [путь_к_публичному_ключу]
```

#### Аргументы:
- `private_key_path` - Путь для сохранения приватного ключа (по умолчанию: `key.pem`)
- `public_key_path` - Путь для сохранения публичного ключа (по умолчанию: `public_key.pem`)

#### Опции:
- `--private-key`, `--private` - Путь для сохранения приватного ключа (переопределяет позиционный аргумент)
- `--public-key`, `--public` - Путь для сохранения публичного ключа (переопределяет позиционный аргумент)
- `--version`, `-v` - Показать версию

#### Пример:
```shell
crx-keygen ./keys/private.pem ./keys/public.txt
```

#### Результат:
- Создает приватный ключ в указанном файле
- Создает публичный ключ в формате base64 для добавления в manifest.json
- Выводит в консоль инструкцию для добавления ключа в manifest.json

### `crx-tsc-init` - Генератор конфигурации TypeScript
Создает файл `tsconfig.json` для компиляции TypeScript кода Chrome расширения.

#### Использование:
```shell
crx-tsc-init [входная_директория] [выходная_директория]
```

#### Аргументы:
- `input_dir` - Корневая директория с исходным кодом
- `output_dir` - Директория для скомпилированных файлов

#### Опции:
- `--input-dir`, `-i` - Корневая директория с исходным кодом
- `--output-dir`, `-o` - Директория для скомпилированных файлов

#### Пример:
```shell
crx-tsc-init ./src ./dist
```

## Конфигурация через package.json
Вы можете настроить параметры компилятора в файле `package.json` вашего проекта:
```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "crxConfig": {
    "src": "src",
    "pre_dist": "pre_dist",
    "dist": "dist",
    "key_file": "key.pem",
    "manifest": "pre_dist/manifest.json"
  }
}
```

## Структура проекта
Рекомендуемая структура проекта Chrome расширения:
```text
my-extension/
├── package.json
├── tsconfig.json
├── key.pem
├── src/
│   ├── manifest.json
│   ├── background.ts
│   ├── popup.ts
│   └── content.ts
├── pre_dist/ (создается автоматически)
└── dist/ (создается автоматически)
```

## Обработка ошибок
- При создании только CRX файла, если возникает ошибка подписи, процесс останавливается
- При создании только ZIP файла, CRX файл создается и не удаляется (так как он не нужен)
- В режиме по умолчанию создаются оба файла независимо друг от друга

## Процесс работы
#### 1. Генерация ключей (один раз):
```shell
crx-keygen
```

#### 2. Добавление публичного ключа в manifest.json:
```json
{
  "name": "My Extension",
  "version": "1.0.0",
  "key": "ваш_публичный_ключ_base64"
}
```

#### 3. Инициализация TypeScript конфигурации:
```shell
crx-tsc-init
```

#### 4. Сборка расширения:
```shell
crx-compiler
```

## Зависимости
- Node.js 14+
- TypeScript 5.9+
- Chrome для тестирования расширений

## Лицензия
[GPL-3.0-only](https://github.com/MagIlyasDOMA/crx-compiler/blob/main/LICENSE)

## Автор
Маг Ильяс DOMA (MagIlyasDOMA)

## Репозиторий
[https://github.com/MagIlyasDOMA/crx-compiler](https://github.com/MagIlyasDOMA/crx-compiler)

## Поддержка
Для сообщения об ошибках и предложений используйте Issues на GitHub:

[https://github.com/MagIlyasDOMA/crx-compiler/issues](https://github.com/MagIlyasDOMA/crx-compiler/issues)
