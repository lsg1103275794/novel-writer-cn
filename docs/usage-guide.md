# Novel Writer Style CN - 完整使用指南

> v0.21.8+ 风格学习与写作完整流程

## 📖 目录

- [核心概念](#核心概念)
- [依赖关系图](#依赖关系图)
- [快速开始](#快速开始)
- [完整工作流程](#完整工作流程)
- [阶段详解](#阶段详解)
- [API 参考](#api-参考)
- [常见问题](#常见问题)

---

## 💡 核心概念

### 什么是文本预处理？

**文本预处理**是风格学习的第一步，就像给AI提供一本干净的教科书。

**类比**：
- 想象你要教AI学习书法
- 原始样本 = 有污渍、折痕、页码的字帖
- 预处理后 = 干净清晰的字帖，每个字都清晰可见

**具体作用**：
```
原始文本：
┌─────────────────────────────────────┐
│ 目录                                 │
│ 第一章 初入江湖 ............... 1   │
│ 第二章 武林大会 ............... 25  │
│                                      │
│ === 第一章 初入江湖 ===             │
│ Page 1                               │
│ 江湖之中，风云变幻。少年侠客...     │
│ - 123 -                              │
│ 他游历四方，见识了世间...           │
└─────────────────────────────────────┘
                  ↓ 预处理
┌─────────────────────────────────────┐
│ 第一章 初入江湖                     │
│                                      │
│ 江湖之中，风云变幻。少年侠客...     │
│ 他游历四方，见识了世间...           │
└─────────────────────────────────────┘
```

**为什么重要**：
- ❌ 不预处理：AI会学到"第一章"、"Page 1"等无关内容
- ✅ 预处理后：AI只学习纯粹的写作风格

---

### 什么是NLP分析？

**NLP分析**是将文本风格量化，给AI提供明确的学习目标。

**类比**：
- 想象你要教AI画画
- 没有NLP分析 = 告诉AI"画得像梵高"（模糊）
- 有NLP分析 = 告诉AI"笔触粗细2mm，色彩饱和度80%，构图黄金分割"（精确）

**具体作用**：

```
文本样本 → NLP分析 → 量化指标
                      ├─ 词汇丰富度: 16%
                      ├─ 平均句长: 15.2字
                      ├─ 短句比例: 30%
                      ├─ 中句比例: 50%
                      ├─ 长句比例: 20%
                      ├─ 情感倾向: 积极
                      └─ 情感强度: 0.65
```

**为什么重要**：
- ❌ 没有量化：AI不知道"句子应该多长"
- ✅ 有量化：AI知道"平均句长15字，短句占30%"

---

### 文本预处理和NLP分析的关系

```
┌─────────────────────────────────────────────────────┐
│                   风格学习流程                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  原始样本 (有噪音)                                   │
│       ↓                                              │
│  【文本预处理】← 清理数据，提供干净的教材           │
│       ↓                                              │
│  干净样本 (无噪音)                                   │
│       ↓                                              │
│  【NLP分析】← 量化特征，提供学习目标                 │
│       ↓                                              │
│  风格特征 (量化指标)                                 │
│       ↓                                              │
│  【AI风格学习】← 基于干净数据和量化目标学习         │
│       ↓                                              │
│  风格配置文件                                        │
│       ↓                                              │
│  【AI创作】← 使用学习的风格进行创作                  │
│       ↓                                              │
│  生成内容                                            │
│       ↓                                              │
│  【一致性检测】← 验证是否符合目标风格                │
│       ↓                                              │
│  质量报告 + 改进建议                                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 🔗 依赖关系图

---

## 🚀 快速开始

### 安装

```bash
npm install -g novel-writer-style-cn
```

### 最简单的使用方式

```bash
# 运行完整流程示例
node node_modules/novel-writer-style-cn/examples/complete-workflow.js
```

---

## 🎯 完整工作流程

v0.22.0 提供了一套完整的风格学习与写作流程，包含 6 个阶段：

```
样本准备 → 文本预处理 → NLP分析 → 风格学习 → AI创作 → 一致性检测
```

### 流程图

```
┌─────────────────┐
│  1. 样本准备     │  准备目标作者的作品样本
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. 文本预处理   │  novel preprocess <file>
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  3. NLP 分析     │  novel analyze <file>
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  4. 风格学习     │  /style-learn (AI 命令)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  5. AI 创作      │  /write-styled (AI 命令)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  6. 一致性检测   │  novel check-style <f> <s>
└─────────────────┘
```

### CLI 命令快速参考

| 命令 | 说明 | 示例 |
|------|------|------|
| `novel preprocess` | 预处理样本文本 | `novel preprocess samples/jinyong.txt -o clean.txt` |
| `novel analyze` | NLP 文本分析 | `novel analyze clean.txt --verbose` |
| `novel check-style` | 风格一致性检测 | `novel check-style chapter.txt style.json` |

### AI 斜杠命令格式

> ⚠️ **重要**：AI 斜杠命令格式因平台而异，请根据您使用的 AI 平台选择正确格式：

| AI 平台 | 命令格式 | 示例 |
|---------|----------|------|
| **Claude Code** | `/novel.命令名` | `/novel.style-learn` |
| **Gemini CLI** | `/novel:命令名` | `/novel:style-learn` |
| **Cursor/Windsurf** | `/命令名` | `/style-learn` |
| **Codex CLI** | `/novel-命令名` | `/novel-style-learn` |

**AI 斜杠命令**（在 AI 助手中使用）：

| 命令 | 说明 |
|------|------|
| `/style-analyze` | 深度分析文本风格特征 |
| `/style-learn` | 学习目标作者风格 |
| `/write-styled` | 使用学习的风格进行创作 |
| `/style-list` | 查看已学习的风格 |
| `/style-validate` | 验证创作的风格一致性 |

---

## 📝 阶段详解

### 阶段 1：样本准备

准备目标作者的作品样本文件。

**推荐样本量**：
- 最低：10,000 字
- 推荐：50,000 字以上
- 最佳：100,000 字以上

**示例**：

```javascript
import fs from 'fs';

// 读取样本文件
const rawSample = fs.readFileSync('samples/jinyong-raw.txt', 'utf-8');

console.log('样本长度:', rawSample.length, '字符');
```

**文件格式**：
- 支持 `.txt` 文本文件
- 编码：UTF-8
- 可以包含目录、页码等（会在预处理阶段自动清理）

---

### 阶段 2：文本预处理

自动清理样本文本，提升学习质量。

**功能**：
- ✅ 移除目录（"第一章...1"）
- ✅ 移除页码（"123"、"- 456 -"、"第789页"）
- ✅ 规范化章节标题
- ✅ 统一标点符号（半角→全角）
- ✅ 清理多余空白
- ✅ 质量评估与建议

#### CLI 命令方式（推荐）

```bash
# 基础预处理
novel preprocess samples/jinyong-raw.txt

# 预处理并输出到文件
novel preprocess samples/jinyong-raw.txt -o samples/jinyong-clean.txt

# 预处理并评估质量
novel preprocess samples/jinyong-raw.txt --quality -o samples/jinyong-clean.txt
```

**CLI 输出示例**：
```
📝 预处理结果

  原始长度: 50000 字符
  处理后长度: 42500 字符
  减少比例: 15.00%

处理步骤:
  ✓ 移除目录内容: 2500 字符
  ✓ 移除页码: 500 字符
  ✓ 规范化章节标题
  ✓ 统一标点符号为全角
  ✓ 移除多余空白: 4500 字符

质量评估:
  得分: 85/100 (良好)
```

#### 代码方式

```javascript
import TextPreprocessor from 'novel-writer-style-cn/dist/utils/text-preprocessor.js';

const preprocessor = new TextPreprocessor();

// 预处理文本
const result = preprocessor.preprocess(rawSample);

console.log('原文长度:', result.originalLength);
console.log('处理后长度:', result.processedLength);
console.log('减少比例:', result.reductionRate);
console.log('处理步骤:', result.steps);

// 质量评估
const quality = preprocessor.assessQuality(result.text);

console.log('质量得分:', quality.score, '分');
console.log('质量等级:', quality.level);
console.log('改进建议:', quality.suggestions);

// 保存清理后的样本
fs.writeFileSync('samples/jinyong-clean.txt', result.text);
```

**输出示例**：

```
原文长度: 228 字符
处理后长度: 176 字符
减少比例: 22.81%
处理步骤: [
  '移除目录内容: 30 字符',
  '移除页码: 19 字符',
  '规范化章节标题',
  '统一标点符号为全角',
  '移除多余空白: 3 字符'
]

质量得分: 70 分
质量等级: 一般
改进建议: [ '样本量不足，建议增加到至少 10,000 字' ]
```

---

### 阶段 3：NLP 分析

对清理后的样本进行深度语言学分析。

**分析维度**：
- **词汇层面**：中文分词、词频统计、词汇丰富度（TTR）
- **句法层面**：句长统计、句式分布、标点使用
- **情感层面**：情感倾向判断、情感得分计算

#### CLI 命令方式（推荐）

```bash
# 基础分析
novel analyze samples/jinyong-clean.txt

# 详细分析（显示高频词）
novel analyze samples/jinyong-clean.txt --verbose

# 分析并导出 JSON
novel analyze samples/jinyong-clean.txt --verbose -o analysis.json
```

**CLI 输出示例**：
```
📊 NLP 分析结果

词汇分析:
  总词数: 12500
  唯一词数: 4800
  词汇丰富度 (TTR): 38.4%

句法分析:
  总句数: 680
  平均句长: 18.4 字

情感分析:
  情感倾向: neutral
  情感得分: 0.12

高频词汇 (Top 10):
  1. 郭靖
  2. 黄蓉
  3. 武功
  4. 江湖
  ...
```

#### 代码方式

```javascript
import NLPAnalyzer from 'novel-writer-style-cn/dist/utils/nlp-analyzer.js';

const analyzer = new NLPAnalyzer();

// 分析样本
const analysis = analyzer.analyze(cleanSample);

console.log('=== 词汇分析 ===');
console.log('总词数:', analysis.vocabulary.totalTokens);
console.log('独特词数:', analysis.vocabulary.uniqueTokens);
console.log('词汇丰富度:', analysis.vocabulary.vocabularyRichness.toFixed(3));
console.log('高频词:', analysis.vocabulary.topWords.slice(0, 10));

console.log('\n=== 句法分析 ===');
console.log('平均句长:', analysis.syntax.avgSentenceLength.toFixed(2), '字');
console.log('句长分布:', analysis.syntax.lengthDistribution);
console.log('标准差:', analysis.syntax.stdDeviation.toFixed(2));

console.log('\n=== 情感分析 ===');
console.log('情感倾向:', analysis.sentiment.emotionalTone);
console.log('情感得分:', analysis.sentiment.sentimentScore);
```

**输出示例**：

```
=== 词汇分析 ===
总词数: 75
独特词数: 68
词汇丰富度: 0.907
高频词: [ '有人', '的', '江湖', '追求', '风云变幻', ... ]

=== 句法分析 ===
平均句长: 15.80 字
句长分布: { short: 0.36, medium: 0.55, long: 0.09 }
标准差: 7.05

=== 情感分析 ===
情感倾向: neutral
情感得分: 0
```

**性能**：
- 10,000 字 = 57ms（超快！）

---

### 阶段 4：风格学习与置信度评估

基于 NLP 分析结果生成风格配置，并评估学习质量。

**代码示例**：

```javascript
import StyleLearningIntegration from 'novel-writer-style-cn/dist/utils/style-learning-integration.js';

const integration = new StyleLearningIntegration();

// 生成风格配置
const styleConfig = integration.generateStyleConfig(
  '金庸风格',
  cleanSample,
  analysis
);

console.log('=== 风格配置 ===');
console.log('风格名称:', styleConfig.styleName);
console.log('样本字数:', styleConfig.sampleWordCount);

// 置信度评估
console.log('\n=== 置信度评估 ===');
console.log('综合置信度:', styleConfig.confidence.toFixed(1) + '%');
console.log('置信度等级:', styleConfig.confidenceLevel);

console.log('\n各维度得分:');
console.log('- 样本量充足度 (S):', (styleConfig.confidenceBreakdown.S * 100).toFixed(1) + '%');
console.log('- 特征一致性 (C):', (styleConfig.confidenceBreakdown.C * 100).toFixed(1) + '%');
console.log('- 风格独特性 (U):', (styleConfig.confidenceBreakdown.U * 100).toFixed(1) + '%');
console.log('- 数据完整性 (D):', (styleConfig.confidenceBreakdown.D * 100).toFixed(1) + '%');

// 保存风格配置
fs.writeFileSync(
  'styles/jinyong-style.json',
  JSON.stringify(styleConfig, null, 2)
);
```

**输出示例**：

```
=== 风格配置 ===
风格名称: 金庸风格
样本字数: 50000

=== 置信度评估 ===
综合置信度: 82.5%
置信度等级: 优秀

各维度得分:
- 样本量充足度 (S): 86.0%
- 特征一致性 (C): 81.7%
- 风格独特性 (U): 70.0%
- 数据完整性 (D): 100.0%
```

**置信度计算公式**：

```
Confidence = 0.3×S + 0.4×C + 0.2×U + 0.1×D
```

**置信度等级**：
- **优秀** (≥80%)：可直接使用
- **良好** (≥60%)：基本可用
- **一般** (≥40%)：建议增加样本
- **较低** (<40%)：需要更多样本

---

### 阶段 5：基于风格进行 AI 创作

在 AI 助手（Claude/Cursor/Gemini）中使用风格配置进行创作。

**使用方式**：

```markdown
# 在 Claude/Cursor/Gemini 中使用

请使用以下风格配置进行创作：

【风格配置】
风格名称：金庸风格
置信度：82.5%（优秀）

词汇特征：
- 词汇丰富度：0.85
- 高频词：江湖、侠义、武功、恩怨、情仇、刀光剑影

句法特征：
- 平均句长：19.2 字
- 句式分布：短句 30%、中句 50%、长句 20%
- 标准差：7.5

情感特征：
- 情感倾向：neutral
- 情感得分：0.0

请创作一段 500 字的武侠小说片段，描述少年侠客初入江湖的场景。
```

**AI 助手会根据风格配置生成符合目标风格的内容。**

---

### 阶段 6：实时一致性检测

检测创作内容与目标风格的匹配度，提供改进建议。

**功能**：
- ✅ 词汇匹配度检测（词汇丰富度 + 高频词重叠）
- ✅ 句法匹配度检测（平均句长 + 句长分布）
- ✅ 情感匹配度检测（情感倾向 + 情感得分）
- ✅ 节奏匹配度检测（句长标准差）
- ✅ 综合评分与改进建议

#### CLI 命令方式（推荐）

```bash
# 基础一致性检测
novel check-style my-chapter.txt styles/jinyong-style.json

# 检测并导出结果
novel check-style my-chapter.txt styles/jinyong-style.json -o result.json
```

**CLI 输出示例**：
```
🎯 风格一致性检测结果

  总体得分: 78.5% (基本一致)

各维度得分:
  词汇匹配: 72.3%
  句法匹配: 85.6%
  情感匹配: 80.0%
  节奏匹配: 76.2%

改进建议:
  - 词汇使用基本符合，可适当增加特色词汇
  - 句法结构优秀，与目标风格高度一致
  - 情感表达优秀，与目标风格一致
  - 节奏基本符合，可进一步优化
```

#### 代码方式

```javascript
import ConsistencyChecker from 'novel-writer-style-cn/dist/utils/consistency-checker.js';

const checker = new ConsistencyChecker();

// 读取风格配置
const targetStyle = JSON.parse(
  fs.readFileSync('styles/jinyong-style.json', 'utf-8')
);

// 检测创作内容
const myText = `
江湖之中，风云变幻莫测。少年侠客仗剑走天涯，心怀正义。
他游历四方，见识了世间的善恶美丑。有人追求武功，有人追求名利。
这个时代充满传奇，每个人都有自己的故事。刀光剑影，恩怨情仇。
侠客们行侠仗义，惩恶扬善，守护心中的信念。
`;

const result = checker.checkConsistency(myText, targetStyle);

console.log('=== 风格一致性检测报告 ===\n');
console.log(result.summary);

console.log('\n=== 详细建议 ===');
console.log('\n词汇层面:');
result.dimensions.vocabulary.suggestions.forEach(s => console.log('  -', s));

console.log('\n句法层面:');
result.dimensions.syntax.suggestions.forEach(s => console.log('  -', s));

console.log('\n情感层面:');
result.dimensions.sentiment.suggestions.forEach(s => console.log('  -', s));

console.log('\n节奏层面:');
result.dimensions.rhythm.suggestions.forEach(s => console.log('  -', s));
```

**输出示例**：

```
=== 风格一致性检测报告 ===

综合一致性得分：81.5% (基本一致)

⚠ 词汇层面：66.6% (一般)
✓ 句法层面：91.9% (优秀)
✓ 情感层面：100.0% (优秀)
⚠ 节奏层面：69.8% (一般)

=== 详细建议 ===

词汇层面:
  - 词汇使用基本符合，可适当增加特色词汇

句法层面:
  - 句法结构优秀，与目标风格高度一致

情感层面:
  - 情感表达优秀，与目标风格一致

节奏层面:
  - 节奏基本符合，可进一步优化
```

**检测维度**：
- **词汇匹配度**：词汇丰富度 + 高频词重叠度
- **句法匹配度**：平均句长 + 句长分布
- **情感匹配度**：情感倾向 + 情感得分
- **节奏匹配度**：句长标准差

---

## 📚 API 参考

### TextPreprocessor

文本预处理器，用于清理和规范化样本文本。

#### 方法

**`preprocess(text, options)`**

完整预处理流程。

- **参数**：
  - `text` (string): 原始文本
  - `options` (object, 可选): 预处理选项
    - `removeTOC` (boolean): 移除目录，默认 true
    - `removePageNumbers` (boolean): 移除页码，默认 true
    - `normalizeChapterTitles` (boolean): 规范化章节标题，默认 true
    - `normalizePunctuation` (boolean): 统一标点符号，默认 true
    - `removeExtraWhitespace` (boolean): 移除多余空白，默认 true

- **返回**：
  ```javascript
  {
    text: string,              // 处理后的文本
    originalLength: number,    // 原文长度
    processedLength: number,   // 处理后长度
    reduction: number,         // 减少的字符数
    reductionRate: string,     // 减少比例
    steps: string[]            // 处理步骤
  }
  ```

**`assessQuality(text)`**

评估文本质量。

- **参数**：
  - `text` (string): 待评估文本

- **返回**：
  ```javascript
  {
    score: number,             // 质量得分 (0-100)
    level: string,             // 质量等级
    metrics: {
      length: number,
      chineseRatio: number,
      punctuationRatio: number,
      whitespaceRatio: number,
      repeatedLineRatio: number
    },
    suggestions: string[]      // 改进建议
  }
  ```

---

### NLPAnalyzer

NLP 分析器，提供词汇、句法、情感分析。

#### 方法

**`analyze(text)`**

分析文本。

- **参数**：
  - `text` (string): 待分析文本

- **返回**：
  ```javascript
  {
    vocabulary: {
      totalTokens: number,
      uniqueTokens: number,
      vocabularyRichness: number,
      topWords: string[]
    },
    syntax: {
      avgSentenceLength: number,
      lengthDistribution: {
        short: number,
        medium: number,
        long: number
      },
      stdDeviation: number,
      punctuationStyle: object
    },
    sentiment: {
      emotionalTone: string,
      sentimentScore: number
    }
  }
  ```

---

### ConsistencyChecker

风格一致性检测器，实时检测文本与目标风格的匹配度。

#### 方法

**`checkConsistency(text, targetStyle)`**

检测一致性。

- **参数**：
  - `text` (string): 待检测文本
  - `targetStyle` (object): 目标风格配置

- **返回**：
  ```javascript
  {
    overall: number,           // 综合得分 (0-100)
    overallLevel: string,      // 一致性等级
    dimensions: {
      vocabulary: {
        score: number,
        percentage: string,
        level: string,
        suggestions: string[]
      },
      syntax: { ... },
      sentiment: { ... },
      rhythm: { ... }
    },
    summary: string            // 检测摘要
  }
  ```

---

## ❓ 常见问题

### Q1: 样本量多少合适？

**A**:
- **最低要求**：10,000 字（置信度可能较低）
- **推荐**：50,000 字以上（置信度良好）
- **最佳**：100,000 字以上（置信度优秀）

样本量越大，风格学习的准确性越高。

---

### Q2: 如何提高置信度？

**A**: 置信度由 4 个维度决定：

1. **样本量充足度 (S)**：增加样本文本量
2. **特征一致性 (C)**：使用同一作者、同一时期的作品
3. **风格独特性 (U)**：选择风格鲜明的作者
4. **数据完整性 (D)**：确保样本包含完整的正文内容

---

### Q3: 预处理会丢失重要内容吗？

**A**: 不会。预处理只移除：
- 目录（"第一章...1"）
- 页码（"123"、"- 456 -"）
- 多余空白

正文内容完全保留，只是格式规范化。

---

### Q4: 一致性检测得分多少算合格？

**A**: 一致性等级判定：
- **高度一致** (≥90%)：完美匹配目标风格
- **基本一致** (≥75%)：符合目标风格，可以使用
- **部分一致** (≥60%)：基本符合，需要微调
- **一致性较低** (≥40%)：需要大幅调整
- **一致性很低** (<40%)：与目标风格差异较大

一般来说，75% 以上就可以认为是合格的。

---

### Q5: 可以同时学习多个作者的风格吗？

**A**: 可以，但不推荐混合在一起。建议：

1. **分别学习**：为每个作者创建独立的风格配置
2. **独立使用**：在创作时选择一个风格配置
3. **风格融合**：如果需要融合，可以在 AI 创作时同时提供多个风格配置

---

### Q6: NLP 分析支持哪些语言？

**A**: 当前版本主要针对**中文**优化：
- 使用 segment 库进行中文分词
- 中文标点符号识别
- 中文情感词典

英文和其他语言的支持有限。

---

### Q7: 性能如何？会很慢吗？

**A**: 性能非常优秀：
- 10,000 字文本分析仅需 **57ms**
- 比目标性能快 **35 倍**
- 可以实时处理大量文本

---

### Q8: 如何在项目中集成这些功能？

**A**: 有三种方式：

**方式 1：直接使用模块**
```javascript
import { TextPreprocessor, NLPAnalyzer, ConsistencyChecker }
  from 'novel-writer-style-cn';
```

**方式 2：运行完整流程示例**
```bash
node node_modules/novel-writer-style-cn/examples/complete-workflow.js
```

**方式 3：自定义集成**
根据需求选择性使用各个模块，参考 API 文档。

---

### Q9: 风格配置文件可以分享吗？

**A**: 可以！风格配置是 JSON 格式，可以：
- 保存到文件
- 分享给其他用户
- 版本控制（Git）
- 导入导出

---

## 🎓 最佳实践

### 1. 样本选择

- ✅ 选择同一作者、同一时期的作品
- ✅ 确保样本量充足（50,000+ 字）
- ✅ 使用完整的章节或段落
- ❌ 避免混合多个作者的作品
- ❌ 避免使用摘要或片段

### 2. 预处理建议

- ✅ 始终进行预处理，提升学习质量
- ✅ 检查质量评估结果
- ✅ 根据建议优化样本
- ❌ 不要跳过预处理步骤

### 3. 风格学习

- ✅ 关注置信度评估结果
- ✅ 置信度 <60% 时增加样本量
- ✅ 保存风格配置文件
- ❌ 不要使用低置信度的配置

### 4. 创作使用

- ✅ 在 AI 提示词中明确引用风格配置
- ✅ 提供具体的创作要求
- ✅ 使用一致性检测验证结果
- ❌ 不要期望 100% 完美匹配

### 5. 一致性检测

- ✅ 创作后立即检测
- ✅ 根据建议调整内容
- ✅ 多次迭代优化
- ❌ 不要忽略低分维度

---

## 🔗 相关资源

### 文档

- [NLP 分析流程图](./nlp-analysis-flow.md) - 详细的技术流程图
- [CHANGELOG.md](../CHANGELOG.md) - 完整的版本更新日志
- [README.md](../README.md) - 项目概述

### 示例

- [完整工作流程示例](../examples/complete-workflow.js) - 端到端演示
- [NLP 分析测试](../test/nlp-analyzer.test.js) - NLP 功能测试
- [一致性检测测试](../test/consistency-checker.test.js) - 一致性检测测试
- [文本预处理测试](../test/text-preprocessor.test.js) - 预处理功能测试

### 技术支持

- GitHub Issues: [提交问题](https://github.com/lsg1103275794/novel-writer-style-cn/issues)
- NPM 包: [novel-writer-style-cn](https://www.npmjs.com/package/novel-writer-style-cn)

---

## 📊 快速参考

### 核心命令

```bash
# 安装
npm install -g novel-writer-style-cn

# 运行完整示例
node node_modules/novel-writer-style-cn/examples/complete-workflow.js

# 运行测试
node node_modules/novel-writer-style-cn/test/nlp-analyzer.test.js
node node_modules/novel-writer-style-cn/test/consistency-checker.test.js
node node_modules/novel-writer-style-cn/test/text-preprocessor.test.js
```

### 核心模块导入

```javascript
// 文本预处理
import TextPreprocessor from 'novel-writer-style-cn/dist/utils/text-preprocessor.js';

// NLP 分析
import NLPAnalyzer from 'novel-writer-style-cn/dist/utils/nlp-analyzer.js';

// 风格学习
import StyleLearningIntegration from 'novel-writer-style-cn/dist/utils/style-learning-integration.js';

// 一致性检测
import ConsistencyChecker from 'novel-writer-style-cn/dist/utils/consistency-checker.js';
```

---

## 🎉 总结

v0.22.0 提供了一套完整的、科学的风格学习与写作系统：

✅ **自动化** - 从样本清理到质量评估，全程自动化
✅ **量化分析** - 基于真实 NLP 算法，结果可验证
✅ **实时反馈** - 写作过程中随时检测一致性
✅ **高性能** - 10,000 字仅需 57ms
✅ **易用性** - 简单的 API，清晰的文档

开始使用吧！🚀

---

*最后更新：2026-01-15*
*版本：v0.22.0*


## 🔗 依赖关系图

### 模块依赖关系

```
┌─────────────────────────────────────────────────────────────┐
│                      Novel Writer Style CN                   │
│                         核心架构                              │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ CLI 命令层    │    │  AI 命令层    │    │  工具模块层   │
│              │    │              │    │              │
│ novel init   │    │ /style-learn │    │ TextPreproc  │
│ novel check  │    │ /style-analyze│   │ NLPAnalyzer  │
│ novel preproc│    │ /write-styled│    │ Consistency  │
│ novel analyze│    │ /style-list  │    │ ModelConfig  │
│ novel check- │    │ /style-info  │    │ PluginMgr    │
│   style      │    │              │    │              │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   核心工具模块依赖      │
              └────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ segment      │  │ fs-extra     │  │ chalk        │
│ (中文分词)    │  │ (文件操作)    │  │ (终端美化)    │
└──────────────┘  └──────────────┘  └──────────────┘
```

### 数据流向图

```
┌─────────────────────────────────────────────────────────────┐
│                        数据流向                              │
└─────────────────────────────────────────────────────────────┘

用户输入
   │
   ├─→ 原始样本文件 (samples/jinyong.txt)
   │        │
   │        ▼
   │   TextPreprocessor.preprocess()
   │        │
   │        ├─→ 移除目录
   │        ├─→ 移除页码
   │        ├─→ 规范化标点
   │        ├─→ 清理空白
   │        │
   │        ▼
   │   干净样本 (samples/jinyong-clean.txt)
   │        │
   │        ▼
   │   NLPAnalyzer.analyze()
   │        │
   │        ├─→ 中文分词 (segment)
   │        ├─→ 词频统计
   │        ├─→ 句法分析
   │        ├─→ 情感分析
   │        │
   │        ▼
   │   分析结果 (analysis.json)
   │        │
   │        ├─ vocabulary: { totalTokens, uniqueTokens, ... }
   │        ├─ syntax: { avgSentenceLength, distribution, ... }
   │        └─ sentiment: { emotionalTone, score, ... }
   │        │
   │        ▼
   │   StyleLearningIntegration.generateStyleConfig()
   │        │
   │        ├─→ 计算置信度
   │        ├─→ 生成风格参数
   │        ├─→ 提取特征词汇
   │        │
   │        ▼
   │   风格配置 (styles/jinyong.json)
   │        │
   │        ├─ styleName: "金庸风格"
   │        ├─ confidence: 82.5%
   │        ├─ vocabulary: { richness, topWords, ... }
   │        ├─ syntax: { avgLength, distribution, ... }
   │        └─ sentiment: { tone, score, ... }
   │        │
   │        ▼
   ├─→ AI 创作 (使用风格配置)
   │        │
   │        ▼
   │   生成内容 (output/chapter1.txt)
   │        │
   │        ▼
   │   ConsistencyChecker.checkConsistency()
   │        │
   │        ├─→ 分析生成内容
   │        ├─→ 对比目标风格
   │        ├─→ 计算匹配度
   │        ├─→ 生成建议
   │        │
   │        ▼
   │   一致性报告 (consistency-report.json)
   │        │
   │        ├─ overall: 78.5%
   │        ├─ dimensions: { vocabulary, syntax, ... }
   │        └─ suggestions: [ "建议1", "建议2", ... ]
   │        │
   │        ▼
   └─→ 用户查看报告并优化
```

### 模块功能依赖

```
┌─────────────────────────────────────────────────────────────┐
│                    功能模块依赖关系                          │
└─────────────────────────────────────────────────────────────┘

TextPreprocessor (文本预处理)
   │
   ├─ 依赖: 无外部依赖
   ├─ 输入: 原始文本 (string)
   ├─ 输出: 清理后文本 + 统计信息
   └─ 被依赖: NLPAnalyzer, StyleLearningIntegration

NLPAnalyzer (NLP分析)
   │
   ├─ 依赖: segment (中文分词库)
   ├─ 输入: 清理后文本 (string)
   ├─ 输出: 量化分析结果 (object)
   └─ 被依赖: StyleLearningIntegration, ConsistencyChecker

StyleLearningIntegration (风格学习)
   │
   ├─ 依赖: NLPAnalyzer
   ├─ 输入: 清理后文本 + NLP分析结果
   ├─ 输出: 风格配置文件 (JSON)
   └─ 被依赖: AI创作命令

ConsistencyChecker (一致性检测)
   │
   ├─ 依赖: NLPAnalyzer
   ├─ 输入: 生成内容 + 目标风格配置
   ├─ 输出: 一致性报告 (object)
   └─ 被依赖: CLI命令, AI命令

ModelConfig (模型配置)
   │
   ├─ 依赖: fs-extra, os
   ├─ 输入: 环境变量, 配置文件
   ├─ 输出: 模型名称
   └─ 被依赖: PluginManager

PluginManager (插件管理)
   │
   ├─ 依赖: ModelConfig, fs-extra
   ├─ 输入: 插件名称, 项目路径
   ├─ 输出: 插件安装结果
   └─ 被依赖: CLI命令
```

### 配置文件依赖

```
┌─────────────────────────────────────────────────────────────┐
│                    配置文件依赖关系                          │
└─────────────────────────────────────────────────────────────┘

用户配置
   │
   ├─→ ~/.claude/settings.json
   │      │
   │      ├─ env.ANTHROPIC_MODEL
   │      ├─ env.ANTHROPIC_BASE_URL
   │      └─ env.ANTHROPIC_AUTH_TOKEN
   │      │
   │      └─→ ModelConfig.getModelConfig()
   │             │
   │             └─→ PluginManager.addFrontmatter()
   │                    │
   │                    └─→ 生成命令文件 (model: xxx)
   │
   ├─→ 环境变量
   │      │
   │      ├─ NOVEL_AI_MODEL
   │      ├─ ANTHROPIC_MODEL
   │      ├─ ANTHROPIC_BASE_URL
   │      └─ ANTHROPIC_API_KEY
   │      │
   │      └─→ ModelConfig.getModelConfig()
   │
   └─→ 项目配置
          │
          ├─ .specify/config.json
          ├─ .claude/settings.json
          └─ dist/config/model-config.json
          │
          └─→ ModelConfig.getModelConfig()

配置优先级:
   1. NOVEL_AI_MODEL (环境变量) ← 最高优先级
   2. ANTHROPIC_MODEL (环境变量)
   3. ~/.claude/settings.json (用户配置)
   4. .claude/settings.json (项目配置)
   5. claude-sonnet-4-5-20250929 (默认值) ← 最低优先级
```
