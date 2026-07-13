"""校验示例 JSON 数据可读取且包含页面所需字段。"""

import json
from pathlib import Path
import unittest


PROJECT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_DIR / "data"


class DataSchemaTest(unittest.TestCase):
    def load(self, name: str) -> list[dict]:
        with (DATA_DIR / name).open(encoding="utf-8") as file:
            data = json.load(file)
        self.assertIsInstance(data, list)
        return data

    def test_notes_schema(self) -> None:
        required = {"subject", "chapter", "tags", "content", "createTime"}
        for item in self.load("notes.json"):
            self.assertTrue(required.issubset(item))
            self.assertIsInstance(item["tags"], list)

    def test_questions_schema(self) -> None:
        required = {
            "subject", "chapter", "question", "wrongAns", "rightAns",
            "errReason", "collect", "createTime"
        }
        for item in self.load("wrong_questions.json"):
            self.assertTrue(required.issubset(item))
            self.assertIsInstance(item["collect"], bool)


if __name__ == "__main__":
    unittest.main()
