# Novel Writer Style CN - 项目工作流程与目录结构

## 目录结构规范（v0.22.0+）

从 v0.22.0 开始，项目采用规范化的数据处理流水线，文件组织反映实际的处理流程：

```
my-novel-project/
├── samples/              # 📚 原始样本文件（只读）
│   ├── jinyong/
│   │   ├── 射雕英雄传.txt
│   │   ├── 天龙八部.txt
│   │   └── 笑傲江湖.txt
│   └── luoyao/
│       └── 平凡的世界.txt
│
├── clean/                # ✨ 预处理后的文本（CLI 自动生成）
│   ├── jinyong/
│   │   ├── 射雕英雄传.txt
│   │   ├── 天龙八部.txt
│   │   └── 笑傲江湖.txt
│   └── luoyao/
│       └── 平凡的世界.txt
│
├── nlp/                  # 📊 NLP 分析结果（CLI 自动生成）
│   ├── jinyong/
│   │   ├── 射雕英雄传.json
│   │   ├── 天龙八部.json
│   │   └── 笑傲江湖.json
│   └── luoyao/
│       └── 平凡的世界.json
│
├── output/               # 📝 AI 创作输出（可选）
│   ├── jinyong-style/
│   │   ├── 第1章-初入江湖.md
│   │   └── 第2章-武林风云.md
│   └── drafts/
│
├── .claude/              # AI 平台配置
│   ├── commands/
│   └── settings.json
│
└── knowledge/            # 知识库
    ├── characters/
    ├── world/
    └── plot/
```

## 完整工作流程

### 阶段 1：样本准备

```bash
# 1. 创建作者目录
mkdir -p samples/jinyong

# 2. 放入原始样本文件
# 将 射雕英雄传.txt 放入 samples/jinyong/
```

**目录状态**：
```
samples/jinyong/射雕英雄传.txt  ✓ 已准备
```

---

### 阶段 2：文本预处理（CLI）

```bash
# 自动输出到 clean/ 目录
novel preprocess samples/jinyong/射雕英雄传.txt

# 或手动指定输出路径
novel preprocess samples/jinyong/射雕英雄传.txt -o clean/jinyong/射雕英雄传.txt
```

**处理内容**：
- 移除目录、页码、页眉页脚
- 标准化标点符号
- 统一换行格式
- 清理多余空白

**目录状态**：
```
samples/jinyong/射雕英雄传.txt  ✓ 原始文件
clean/jinyong/射雕英雄传.txt    ✓ 预处理完成
```

---

### 阶段 3：NLP 分析（CLI）

```bash
# 自动输出到 nlp/ 目录
novel analyze clean/jinyong/射雕英雄传.txt --verbose

# 或手动指定输出路径
novel analyze clean/jinyong/射雕英雄传.txt -o nlp/jinyong/射雕英雄传.json
```

**分析维度**：
- **词汇分析**：词频、词汇丰富度、高频词
- **句法分析**：句长分布、句式结构
- **情感分析**：情感倾向、情感得分

**目录状态**：
```
samples/jinyong/射雕英雄传.txt  ✓ 原始文件
clean/jinyong/射雕英雄传.txt    ✓ 预处理完成
nlp/jinyong/射雕英雄传.json     ✓ NLP 分析完成
```

---

### 阶段 4：风格分析（AI）

在 AI 助手（Claude Code、Cursor 等）中执行：

```
/novel.style-analyze clean/jinyong/射雕英雄传.txt
```

**AI 会分析**：
- 叙事节奏
- 对话风格
- 描写手法
- 人物塑造
- 情节推进

**注意**：使用 `clean/` 目录中的预处理文件，而不是 `samples/` 原始文件。

---

### 阶段 5：风格学习（AI）

```
/novel.style-learn clean/jinyong/ --name="金庸风格"
```

**AI 会学习**：
- 整合 NLP 分析数据（`nlp/jinyong/*.json`）
- 提取风格特征向量
- 建立风格模型
- 保存到记忆系统

**目录状态**：
```
samples/jinyong/射雕英雄传.txt  ✓ 原始文件
clean/jinyong/射雕英雄传.txt    ✓ 预处理完成
nlp/jinyong/射雕英雄传.json     ✓ NLP 分析完成
memory/styles/金庸风格.json     ✓ 风格模型已保存
```

---

### 阶段 6：风格化创作（AI）

```
/novel.write-styled 第1章 初入江湖 --style="金庸风格"
```

**AI 会创作**：
- 应用学习的风格特征
- 保持词汇、句法、情感一致性
- 生成符合目标风格的内容

**输出位置**：
```
output/jinyong-style/第1章-初入江湖.md
```

---

### 阶段 7：一致性检测（CLI）

```bash
novel check-style output/jinyong-style/第1章-初入江湖.md nlp/jinyong/射雕英雄传.json
```

**检测内容**：
- 词汇一致性
- 句法一致性
- 情感一致性
- 综合相似度评分

---

## 路径规则总结

### CLI 命令自动路径映射

| 输入路径 | 输出路径 | 说明 |
|---------|---------|------|
| `samples/author/book.txt` | `clean/author/book.txt` | 预处理自动映射 |
| `clean/author/book.txt` | `nlp/author/book.json` | 分析自动映射 |
| 其他路径 | `原路径.clean.txt` / `原路径.analysis.json` | 保持原位置 |

### AI 命令路径约定

| 命令 | 推荐路径 | 说明 |
|-----|---------|------|
| `/novel.style-analyze` | `clean/author/book.txt` | 使用预处理文件 |
| `/novel.style-learn` | `clean/author/` | 使用预处理目录 |
| `/novel.write-styled` | 自动输出到 `output/` | AI 自动管理 |

---

## 快速开始示例

### 完整流程（金庸风格）

```bash
# 1. 准备样本
mkdir -p samples/jinyong
# 将 射雕英雄传.txt 放入 samples/jinyong/

# 2. 预处理（自动输出到 clean/）
novel preprocess samples/jinyong/射雕英雄传.txt

# 3. NLP 分析（自动输出到 nlp/）
novel analyze clean/jinyong/射雕英雄传.txt --verbose

# 4. 在 AI 助手中执行
# /novel.style-analyze clean/jinyong/射雕英雄传.txt
# /novel.style-learn clean/jinyong/ --name="金庸风格"
# /novel.write-styled 第1章 初入江湖 --style="金庸风格"

# 5. 检测一致性
novel check-style output/jinyong-style/第1章-初入江湖.md nlp/jinyong/射雕英雄传.json
```

---

## 目录管理最佳实践

### 1. 保持原始样本不变

```bash
# ✓ 正确：只读原始文件
novel preprocess samples/jinyong/射雕英雄传.txt

# ✗ 错误：不要修改原始文件
# 不要直接编辑 samples/ 中的文件
```

### 2. 使用预处理文件进行 AI 学习

```bash
# ✓ 正确：使用 clean/ 目录
/novel.style-learn clean/jinyong/

# ✗ 错误：不要直接使用原始文件
# /novel.style-learn samples/jinyong/  # 可能包含噪音数据
```

### 3. 批量处理多个样本

```bash
# 预处理所有样本
for file in samples/jinyong/*.txt; do
    novel preprocess "$file"
done

# 分析所有预处理文件
for file in clean/jinyong/*.txt; do
    novel analyze "$file" --verbose
done
```

### 4. 版本控制建议

```gitignore
# .gitignore
samples/          # 原始样本可能很大，不提交
clean/            # 预处理结果可重新生成
nlp/              # 分析结果可重新生成
output/           # 创作输出按需提交
```

---

## 常见问题

### Q1: 为什么要分 samples、clean、nlp 三个目录？

**A**: 反映数据处理流水线：
- `samples/` - 原始数据（不可变）
- `clean/` - 预处理数据（可重新生成）
- `nlp/` - 分析结果（可重新生成）

这样可以：
- 保护原始数据不被修改
- 清晰追踪处理流程
- 方便重新生成中间结果

### Q2: 可以跳过预处理直接分析吗？

**A**: 可以，但不推荐：

```bash
# 可以直接分析原始文件
novel analyze samples/jinyong/射雕英雄传.txt

# 但预处理可以提高分析质量
novel preprocess samples/jinyong/射雕英雄传.txt
novel analyze clean/jinyong/射雕英雄传.txt  # 推荐
```

### Q3: 如何处理已有项目的文件？

**A**: 使用迁移脚本：

```bash
# 将根目录的 clean.txt 移动到规范位置
mkdir -p clean/default
mv clean.txt clean/default/sample.txt

# 重新分析
novel analyze clean/default/sample.txt
```

### Q4: AI 命令找不到文件怎么办？

**A**: 检查路径：

```bash
# 1. 确认文件存在
ls -la clean/jinyong/射雕英雄传.txt

# 2. 使用相对路径
/novel.style-analyze clean/jinyong/射雕英雄传.txt

# 3. 或使用绝对路径
/novel.style-analyze /path/to/project/clean/jinyong/射雕英雄传.txt
```

---

## 版本历史

- **v0.22.0** - 引入规范化目录结构（clean/、nlp/）
- **v0.21.8** - 添加自动模型配置读取
- **v0.21.0** - 初始 NLP 分析功能

---

## 相关文档

- [使用指南](./usage-guide.md) - 详细命令说明
- [NLP 分析流程](./nlp-analysis-flow.md) - 分析算法详解
- [第三方 API 配置](./THIRD_PARTY_API.md) - API 配置说明
