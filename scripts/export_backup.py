"""将 data 目录中的学习数据打包为带时间戳的 ZIP 备份。"""

from datetime import datetime
from pathlib import Path
import zipfile


PROJECT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_DIR / "data"
RESULTS_DIR = PROJECT_DIR / "results"
DATA_FILES = ("notes.json", "wrong_questions.json")


def main() -> None:
    RESULTS_DIR.mkdir(exist_ok=True)
    missing = [name for name in DATA_FILES if not (DATA_DIR / name).exists()]
    if missing:
        raise FileNotFoundError(f"缺少数据文件：{', '.join(missing)}")

    output = RESULTS_DIR / f"backup_{datetime.now():%Y%m%d_%H%M%S}.zip"
    with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as archive:
        for name in DATA_FILES:
            archive.write(DATA_DIR / name, arcname=name)
    print(f"备份完成：{output}")


if __name__ == "__main__":
    main()
