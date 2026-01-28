import os
from pathlib import Path

def create_directory_structure(start_path, output_file='structure.txt', indent_level=0):
    """
    Рекурсивно создает структуру директорий и файлов
    """
    try:
        items = sorted(os.listdir(start_path))
    except PermissionError:
        return

    for item in items:
        # Пропускаем скрытые файлы/папки, начинающиеся с точки
        if item.startswith('.'):
            continue

        item_path = os.path.join(start_path, item)
        indent = "    " * indent_level

        if os.path.isdir(item_path):
            # Это директория
            with open(output_file, 'a', encoding='utf-8') as f:
                f.write(f"{indent}📁 {item}/\n")
            # Рекурсивно обрабатываем поддиректорию
            create_directory_structure(item_path, output_file, indent_level + 1)
        else:
            # Это файл
            with open(output_file, 'a', encoding='utf-8') as f:
                f.write(f"{indent}📄 {item}\n")

def main():
    # Укажите путь к корневой директории
    root_directory = input("Введите путь к корневой директории (по умолчанию текущая): ").strip()

    if not root_directory:
        root_directory = "."

    root_directory = os.path.abspath(root_directory)

    if not os.path.exists(root_directory):
        print(f"Ошибка: Директория '{root_directory}' не существует!")
        return

    output_file = "structure.txt"

    # Очищаем файл перед записью
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"Структура директории: {root_directory}\n")
        f.write("=" * 50 + "\n\n")

    print(f"Создание структуры для: {root_directory}")
    print("Это может занять некоторое время...")

    create_directory_structure(root_directory, output_file)

    print(f"\nСтруктура сохранена в файл: {output_file}")
    print(f"Абсолютный путь: {os.path.abspath(output_file)}")

if __name__ == "__main__":
    main()
