# CRX Compiler
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
- При создании только ZIP файла, CRX файл создается, но удаляется (так как он не нужен)
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
