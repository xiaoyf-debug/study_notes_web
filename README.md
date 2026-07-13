# 个人学习知识库

一个面向日常复习的纯前端离线知识管理工具，用于整理章节笔记、考试错题和复盘记录。项目无需服务器或数据库，学习数据默认保存在浏览器本地。

## 已实现功能

- 新增、编辑和删除章节笔记
- 新增、编辑和删除错题记录
- 按学科、章节、标签和正文关键词检索
- TXT/Markdown 文本拖拽导入
- 笔记与错题数量统计
- JSON 数据导入与导出
- Python 示例数据备份脚本
- Python JSON 数据结构测试

## 技术栈

- HTML5 / CSS3
- JavaScript
- LocalStorage
- Python 3 标准库

## 本地运行

直接双击 `index.html` 即可使用，也可以在项目目录启动静态服务器：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 数据脚本

```bash
python scripts/export_backup.py
python -m unittest tests/test_data.py
```

备份文件会生成到 `results` 目录。`data` 中的数据仅作为结构示例；网页实际数据存储在浏览器 LocalStorage 中，可通过网页的导入/导出功能迁移。

## 后续计划

- 增加 Markdown 渲染与代码高亮
- 优化移动端交互
- 增加复习状态和时间维度统计
- 探索 AI 辅助摘要与错因归类
