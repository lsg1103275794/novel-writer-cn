# Novel Writer - AI 驱动的中文小说创作工具

[![npm version](https://badge.fury.io/js/novel-writer-style-cn.svg)](https://www.npmjs.com/package/novel-writer-style-cn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/lsg1103275794/novel-writer-style-cn.svg)](https://github.com/lsg1103275794/novel-writer-style-cn/stargazers)

> 🚀 基于规格驱动开发（SDD）的 AI 智能小说创作助手
>
> 🎨 **全新功能**：AI风格学习与模仿 - 让AI学习任何作者的写作风格并进行高质量创作
>
> 在 Claude、Cursor、Gemini 等 AI 助手中直接使用斜杠命令，系统化创作高质量小说

## ✨ 核心特性

### 🎨 **风格学习系统** - 全新突破性功能
- 📚 **深度风格分析** - 从词汇、句法、叙述、描写、节奏等5个维度全面分析任何作品
- 🧠 **智能风格学习** - AI自动提取并建模作者的写作特征，生成可复用的风格配置
- ✍️ **风格化创作** - 使用学习的风格进行创作，高度还原目标作者的写作特色
- 🔄 **风格验证** - 自动检查创作内容的风格一致性，确保质量稳定
- 🎭 **风格融合** - 支持多种风格的融合创新，创造独特的个人风格

### 📚 **传统优势功能**
- 🎯 **七步方法论** - 基于规格驱动开发（SDD）的系统化创作流程
- 🤖 **智能辅助** - AI 理解上下文，提供针对性创作建议
- 📝 **中文优化** - 专为中文小说创作设计，支持字数统计、多线索管理
- 🔄 **跨平台** - 支持 13 个 AI 工具，Windows/Mac/Linux 全平台
- 🔌 **插件系统** - 可扩展功能，如真实人声、翻译、风格模仿等
- ✅ **质量保障** - 情节追踪、时间线管理、角色一致性验证

> 📖 **详细特性说明**：查看 [CHANGELOG.md](CHANGELOG.md) 了解各版本的完整更新

## 🚀 快速开始

### ⚠️ 重要说明

**包名变更**：为避免与原项目包名冲突，本项目使用新的包名 `novel-writer-style-cn`

- ✅ **本项目（风格学习版）**：`npm install -g novel-writer-style-cn`
- ❌ **原项目**：`npm install -g novel-writer-cn`（不包含风格学习功能）

**项目关系**：
- **本项目**：[lsg1103275794/novel-writer-style-cn](https://github.com/lsg1103275794/novel-writer-style-cn) - 增加了突破性AI风格学习系统
- **原项目**：[WordFlowLab/novel-writer](https://github.com/wordflowlab/novel-writer) - 基础七步方法论

### 🔧 使用第三方 API（LongCat、OpenRouter 等）

**🎉 v0.21.8+ 自动配置功能**：无需手动设置，自动读取你的配置！

#### 方法 1：在用户配置中设置（最推荐）

编辑你的 Claude 配置文件：

**Windows**:
```powershell
notepad $env:USERPROFILE\.claude\settings.json
```

**Linux/Mac**:
```bash
nano ~/.claude/settings.json
```

添加配置：
```json
{
  "env": {
    "ANTHROPIC_MODEL": "LongCat-Flash-Chat",
    "ANTHROPIC_BASE_URL": "https://api.longcat.chat",
    "ANTHROPIC_AUTH_TOKEN": "Bearer your-api-key"
  }
}
```

然后直接运行 `novel init my-novel`，自动使用配置的模型！

#### 方法 2：使用环境变量

```bash
# Windows CMD
set ANTHROPIC_MODEL=LongCat-Flash-Chat
novel init my-novel

# Windows PowerShell
$env:ANTHROPIC_MODEL="LongCat-Flash-Chat"
novel init my-novel

# Linux/Mac
export ANTHROPIC_MODEL="LongCat-Flash-Chat"
novel init my-novel
```

#### 方法 3：批量更新已有项目

如果你已经初始化了项目，可以使用脚本批量更新模型名称：

```powershell
# 在项目根目录运行
.\scripts\powershell\update-model-name.ps1 -ModelName "LongCat-Flash-Chat"
```

**支持的第三方模型**：
- `LongCat-Flash-Chat` - LongCat 快速对话模型
- `LongCat-Flash-Thinking` - LongCat 思考模型
- 或任何兼容 Anthropic API 的模型名称

**配置优先级**：
1. 环境变量 `NOVEL_AI_MODEL`
2. 环境变量 `ANTHROPIC_MODEL`（标准）
3. 用户配置 `~/.claude/settings.json`
4. 项目配置 `.claude/settings.json`
5. 默认值

**详细文档**：查看 [第三方 API 使用指南](docs/THIRD_PARTY_API.md)

### 1. 安装

```bash
npm install -g novel-writer-style-cn
```

### 2. 初始化项目

```bash
# 基本用法
novel init my-novel  # （my-novel是你的项目名称）

# 推荐：创建项目时预装风格学习插件
novel init my-novel --plugins style-learning

# 指定 AI 平台
novel init my-novel --ai claude    # Claude Code
novel init my-novel --ai gemini    # Gemini CLI
novel init my-novel --ai cursor    # Cursor

# 为已存在的项目安装插件（智能检测）
novel init my-novel --plugins style-learning  # 如果项目已存在，只安装插件

# 或使用插件安装命令
cd my-novel  # （my-novel是你的项目名称）
novel plugins:install style-learning
```

### 3. 开始创作

#### 🎨 风格学习创作流程（推荐）

**⚠️ 重要提示**：命令格式因 AI 平台而异，请根据您使用的平台选择正确格式：

| AI 平台 | 命令格式 | 示例 |
|---------|----------|------|
| **Claude Code** | `/novel.命令名` | `/novel.style-analyze` |
| **Gemini CLI** | `/novel:命令名` | `/novel:style-analyze` |
| **Cursor/Windsurf** | `/命令名` | `/style-analyze` |

**Claude Code 用户示例**：
```bash
# 1. 准备样本文件
# 将要学习的小说文本放入 samples/ 目录

# 2. 分析风格特征
/novel.style-analyze samples/jinyong/射雕英雄传.txt

# 3. 学习目标风格
/novel.style-learn samples/jinyong/ --name="金庸风格"

# 4. 风格化创作
/novel.write-styled 第1章 初入江湖 --style="金庸风格"
```

**Cursor/Windsurf 用户示例**：
```bash
# 使用不带前缀的命令格式
/style-analyze samples/jinyong/射雕英雄传.txt
/style-learn samples/jinyong/ --name="金庸风格"
/write-styled 第1章 初入江湖 --style="金庸风格"
```

**Gemini CLI 用户示例**：
```bash
# 使用冒号分隔符
/novel:style-analyze samples/jinyong/射雕英雄传.txt
/novel:style-learn samples/jinyong/ --name="金庸风格"
/novel:write-styled 第1章 初入江湖 --style="金庸风格"
```

#### 📚 传统七步方法论

在 AI 助手中使用斜杠命令（同样需要根据平台添加相应前缀）：

**Claude Code**：
```
/novel.constitution    # 建立创作原则
/novel.specify         # 明确故事需求  
/novel.clarify         # 澄清关键决策
/novel.plan           # 制定创作计划
/novel.tasks          # 分解执行任务
/novel.write          # 进行具体创作
/novel.analyze        # 验证质量一致性
```

**Cursor/Windsurf**：
```
/constitution    # 建立创作原则
/specify         # 明确故事需求  
/clarify         # 澄清关键决策
/plan           # 制定创作计划
/tasks          # 分解执行任务
/write          # 进行具体创作
/analyze        # 验证质量一致性
```

> 📚 **详细安装说明**：[docs/INSTALLATION_COMPLETE.md](docs/INSTALLATION_COMPLETE.md)
> 📖 **完整工作流程**：[docs/METHODOLOGY.md](docs/METHODOLOGY.md)
> 🎨 **风格学习指南**：[plugins/style-learning/README.md](plugins/style-learning/README.md) ⭐ **必读**

## 📦 升级现有项目

```bash
# 升级到最新版本
npm install -g novel-writer-style-cn@latest
cd my-novel
novel upgrade

# 或指定 AI 平台
novel upgrade --ai claude
```

> 📚 **完整升级指南**：[docs/upgrade-guide.md](docs/upgrade-guide.md) - 包含版本兼容性、迁移说明、回滚方法

## 🎨 风格学习系统 - 突破性创新功能

### 🌟 功能亮点

Novel Writer 首创的 AI 风格学习系统，让你的 AI 助手能够学习任何作者的写作风格并进行高质量模仿创作。

#### 📊 多维度风格分析
- **词汇层面**：高频词汇、专业术语、情感词汇、修饰词使用
- **句法层面**：句长分布、复杂度、标点使用、句式变化  
- **叙述层面**：视角选择、时态运用、叙述距离、对话比例
- **描写层面**：感官描写、修辞手法、意象象征、细节程度
- **节奏层面**：段落长度、信息密度、张弛节奏、过渡技巧

#### 🧠 智能风格建模
将定性的风格特征转化为可操作的量化参数：
```json
{
  "语言正式度": 0.8,    // 金庸风格：文雅古典
  "句式复杂度": 0.6,    // 长短句结合
  "描写详细度": 0.7,    // 重视意境营造
  "情感强度": 0.5,      // 情感表达适中
  "节奏紧凑度": 0.4     // 张弛有度
}
```

#### ✍️ 高质量风格化创作
- **精准模仿**：风格匹配度可达 85-95%
- **场景适配**：根据不同场景自动调整风格强度
- **质量保证**：实时验证风格一致性
- **个性融合**：在模仿中保持创新

### 🚀 使用示例

#### 学习金庸武侠风格
```bash
# 1. 分析金庸作品
/style-analyze samples/jinyong/

# 输出：古典雅致，意境深远，武侠气息浓郁
# 置信度：91%，特征覆盖完整

# 2. 学习风格
/style-learn samples/jinyong/ --name="金庸风格"

# 3. 风格化创作
/write-styled 第1章 初入江湖 --style="金庸风格"
```

#### 生成效果对比

**普通AI创作**：
> 张明走进了房间，看到一个美女坐在那里。她看起来很伤心。

**金庸风格创作**：
> 却说张明踏入这雅室之中，但见角落里坐着一位女子，容颜清丽如仙，正独自饮酒。只见她愁眉不展，美目含泪，显是心中有事。

### 📈 技术优势

- **学习效率高**：10万字样本即可达到良好效果
- **适应性强**：支持各种文学风格和类型
- **可扩展性**：支持风格融合和个性化定制
- **质量稳定**：自动验证确保风格一致性

> 🎯 **详细使用指南**：[plugins/style-learning/README.md](plugins/style-learning/README.md)
> 📖 **完整使用示例**：[plugins/style-learning/examples/usage-example.md](plugins/style-learning/examples/usage-example.md)

## 📚 斜杠命令

### 🎨 风格学习命令（全新功能）

| 命令 | 描述 | 何时使用 |
|------|------|----------|
| `/style-analyze` | 深度分析文本风格 | 学习前了解目标风格特征 |
| `/style-learn` | 学习目标作者风格 | 建立可复用的风格模型 |
| `/write-styled` | 风格化创作 ⭐ | 使用学习的风格进行创作 |
| `/style-list` | 查看已学习风格 | 管理风格库 |
| `/style-info` | 风格详细信息 | 了解风格参数和特征 |
| `/style-validate` | 验证风格一致性 | 检查创作质量 |

### 命名空间说明

| AI 平台 | 命令格式 | 示例 |
|---------|----------|------|
| **Claude Code** | `/novel.命令名` | `/novel.write-styled` |
| **Gemini CLI** | `/novel:命令名` | `/novel:write-styled` |
| **Codex CLI** | `/novel-命令名` | `/novel-write-styled` |
| **其他平台** | `/命令名` | `/write-styled` |

> 💡 下表使用通用格式，实际使用时请根据您的 AI 平台添加相应前缀

### 📖 七步方法论命令

| 命令 | 描述 | 何时使用 |
|------|------|----------|
| `/constitution` | 创作宪法 | 项目开始，定义核心创作原则 |
| `/specify` | 故事规格 | 像 PRD 一样定义故事需求 |
| `/clarify` | 澄清决策 | 通过 5 个问题明确模糊点 |
| `/plan` | 创作计划 | 制定章节结构和技术方案 |
| `/tasks` | 任务分解 | 生成可执行的任务清单 |
| `/write` | 章节写作 | 基于任务清单进行创作 |
| `/analyze` | 综合验证 | 智能双模式：框架分析/内容分析 |

### 追踪与验证

| 命令 | 描述 | 何时使用 |
|------|------|----------|
| `/track-init` | 初始化追踪 | 首次使用（只需一次） |
| `/checklist` | 质量检查清单 ⭐ | 规格验证（写作前）+ 内容扫描（写作后） |
| `/track` | 综合追踪 | 每完成一章后 |
| `/plot-check` | 情节检查 | 每 5-10 章定期检查 |
| `/timeline` | 时间线管理 | 重要事件后 |
| `/relations` | 关系追踪 | 角色关系变化时 |
| `/world-check` | 世界观检查 | 新设定出现后 |

> 📖 **详细命令说明**：[docs/commands.md](docs/commands.md) - 包含每个命令的详细用法、参数和最佳实践

<details>
<summary>📁 项目结构（点击展开）</summary>

```
my-novel/
├── .specify/          # Spec Kit 配置
│   ├── memory/        # 创作记忆（constitution.md等）
│   └── scripts/       # 支持脚本
├── .claude/           # Claude 命令（或 .cursor/.gemini 等）
│   └── commands/      # 斜杠命令文件
├── spec/              # 小说规格数据
│   ├── tracking/      # 追踪数据（plot-tracker.json等）
│   └── knowledge/     # 知识库（world-setting.md等）
├── stories/           # 故事内容
│   └── 001-故事名/
│       ├── specification.md    # 故事规格
│       ├── creative-plan.md    # 创作计划
│       ├── tasks.md            # 任务清单
│       └── content/            # 章节内容
└── scripts/           # 支持脚本
    ├── bash/          # Unix/Linux/Mac
    └── powershell/    # Windows
```

</details>

## 🤖 支持的 AI 助手

| AI 工具 | 说明 | 状态 |
|---------|------|------|
| **Claude Code** | Anthropic 的 AI 助手 | ✅ 推荐 |
| **Cursor** | AI 代码编辑器 | ✅ 完整支持 |
| **Gemini CLI** | Google 的 AI 助手 | ✅ TOML 格式 |
| **Windsurf** | Codeium 的 AI 编辑器 | ✅ 完整支持 |
| **Roo Code** | AI 编程助手 | ✅ 完整支持 |
| **GitHub Copilot** | GitHub 的 AI 编程助手 | ✅ 完整支持 |
| **Qwen Code** | 阿里通义千问代码助手 | ✅ TOML 格式 |
| **OpenCode** | 开源 AI 编程工具 | ✅ 完整支持 |
| **Codex CLI** | AI 编程助手 | ✅ 完整支持 |
| **Kilo Code** | AI 编程工具 | ✅ 完整支持 |
| **Auggie CLI** | AI 开发助手 | ✅ 完整支持 |
| **CodeBuddy** | AI 编程伙伴 | ✅ 完整支持 |
| **Amazon Q Developer** | AWS 的 AI 开发助手 | ✅ 完整支持 |

> 💡 使用 `novel init --all` 可以同时为所有 AI 工具生成配置

## 🛠️ CLI 命令

<details>
<summary>详细选项（点击展开）</summary>

### `novel init [name]`

```bash
novel init my-novel [选项]
```

**常用选项**：
- `--here` - 在当前目录初始化
- `--ai <type>` - 选择 AI 平台（claude/gemini/cursor等）
- `--with-experts` - 包含专家模式
- `--plugins <names>` - 预装插件（逗号分隔）
- `--all` - 生成所有 AI 平台配置

### `novel plugins`

```bash
novel plugins list                # 列出已安装插件
novel plugins add <name>          # 安装插件
novel plugins remove <name>       # 移除插件
```

### `novel upgrade`

```bash
novel upgrade [--ai <type>]       # 升级项目到最新版本
```

### `novel check`

```bash
novel check                       # 检查项目配置和状态
```

</details>

## 📖 文档索引

### 📚 完整文档中心
- **[文档中心](docs/README.md)** - 所有文档的完整索引和导航

### 🚀 快速开始
- **[安装完成指南](docs/INSTALLATION_COMPLETE.md)** - 插件安装完成后的使用指南
- **[创作方法论](docs/METHODOLOGY.md)** - Novel Writer 的七步创作方法论详解
- **[规格驱动创作法](docs/novel-sdd.md)** - 从灵感到作品的系统化创作方法

### 🎨 风格学习系统（重点推荐）
- **[风格学习插件指南](plugins/style-learning/README.md)** ⭐ - 完整功能介绍和使用方法
- **[详细使用示例](plugins/style-learning/examples/usage-example.md)** ⭐ - 从学习到创作的完整流程
- **[风格学习专家](plugins/style-learning/experts/style-expert.md)** - 专业指导和最佳实践
- **[技术集成说明](docs/STYLE_LEARNING_INTEGRATION.md)** - 插件技术细节和集成方法

### 插件与扩展
- **风格学习插件** - `novel plugins add style-learning` ⭐ **强烈推荐**
- **真实人声插件** - `novel plugins add authentic-voice`
  - 编辑 `.specify/memory/personal-voice.md` 配置个人语料
  - 使用 `/authentic-voice` 创作，`/authenticity-audit` 自查
- **翻译插件** - `novel plugins add translate`
- **风格模仿插件** - 路遥、王钰等作家风格

> 💡 使用 `novel plugins list` 查看所有可用插件

## 📈 版本历史

查看完整的更新日志：**[CHANGELOG.md](CHANGELOG.md)**

**最新版本亮点**：
- v0.21.6 - 🐛 **重要修复**：修复所有 AI 平台风格学习命令缺失问题
- v0.21.5 - ✨ 插件命令自动注入系统
- v0.21.4 - 智能插件安装增强
- v0.20.0 - 🎨 **重大更新**：全新风格学习系统，支持AI学习任何作者风格并进行模仿创作
- v0.15.0 - 多平台命令格式优化
- v0.14.2 - 中文字数统计修复
- v0.12.2 - Claude Code 增强层
- v0.12.0 - 多线索管理系统
- v0.10.0 - 七步方法论体系

### 🐛 v0.21.6 重要修复
- **问题修复**：修复用户通过 `novel init` 创建项目后无法使用风格学习命令的问题
- **全平台支持**：为 Claude Code、Cursor、Gemini、Windsurf 等 13 个 AI 平台补全风格学习命令
- **文档更新**：明确各平台的命令格式差异（`/novel.xxx` vs `/xxx`）
- **配置优化**：添加 `.claude/settings.local.json` 到 `.gitignore`

### 🎨 v0.20.0 风格学习系统亮点
- **深度风格分析**：5个维度全面分析任何作品的写作特征
- **智能风格学习**：AI自动提取并建模作者的写作风格
- **高质量模仿创作**：风格匹配度可达85-95%
- **风格验证系统**：自动检查创作内容的风格一致性
- **多风格融合**：支持风格混合和个性化定制

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

**项目地址**：[https://github.com/lsg1103275794/novel-writer-style-cn](https://github.com/lsg1103275794/novel-writer-style-cn)

**原始项目**：基于 [WordFlowLab/novel-writer](https://github.com/wordflowlab/novel-writer) 开发，在原项目基础上增加了突破性的AI风格学习系统。

## 📄 许可证

MIT License

## 🌐 项目矩阵

WordFlowLab 围绕 AI 辅助小说创作展开多维度探索，采用不同方法论和技术栈的开源项目组合：

### 方法论探索系列

| 项目 | 方法论 | 技术特点 | 适用场景 |
|------|--------|----------|----------|
| **[Novel-Writer-Style-CN](https://github.com/lsg1103275794/novel-writer-style-cn)** ⭐ | Spec-Kit + AI风格学习 | 寄生斜杠命令，七步方法论，突破性AI风格学习系统 | 适合多平台用户，跨 13 个 AI 工具，支持风格模仿创作 |
| **[Novel-Writer](https://github.com/wordflowlab/novel-writer)** | Spec-Kit | 寄生斜杠命令，七步方法论 | 适合多平台用户，跨 13 个 AI 工具 |
| **[Novel-Writer-OpenSpec](https://github.com/wordflowlab/novel-writer-openspec)** | OpenSpec | 寄生斜杠命令，规格分离管理（specs/ + changes/） | 适合需要 OpenSpec 规格化管理 |
| **[Novel-Writer-Skills](https://github.com/wordflowlab/novel-writer-skills)** | Spec-Kit + Agent Skills | 寄生斜杠命令，支持 Claude Code Agent Skills | 专为 Claude Code 优化 |

### 工具实现系列

| 项目 | 类型 | 技术基础 | 说明 |
|------|------|----------|------|
| **[WriteFlow](https://github.com/wordflowlab/writeflow)** | CLI 工具 | 模仿 Claude Code 架构 | 独立 CLI，为技术型作家设计 |
| **[NovelWeave](https://github.com/wordflowlab/novelweave)** | VSCode 扩展 | Fork: Cline → Roo Code → Kilo Code → NovelWeave | 可视化小说编辑器，星尘织梦 |

### 技术演进路径

```
Spec-Kit 方法论分支:
  Novel-Writer (主线) ──┬─→ Novel-Writer-Skills (Claude Code 专版)
                       └─→ WriteFlow (CLI 独立版)

OpenSpec 方法论分支:
  Novel-Writer-OpenSpec (探索版)

VSCode 扩展分支:
  Cline → Roo Code → Kilo Code → NovelWeave (小说定制版)
```

### 选择建议

根据您的经验背景选择合适的工具：

| 用户类型 | 推荐项目 | 理由 |
|---------|---------|------|
| 🌟 **新手入门** | [NovelWeave](https://github.com/wordflowlab/novelweave) | 可视化编辑器，VSCode 扩展，最易上手 |
| 🎨 **想要风格学习** | [Novel-Writer-Style-CN](https://github.com/lsg1103275794/novel-writer-style-cn) ⭐ | 突破性AI风格学习系统，支持任何作者风格模仿 |
| 💻 **有编程基础<br>无小说经验** | [Novel-Writer](https://github.com/wordflowlab/novel-writer) <br> [Novel-Writer-Skills](https://github.com/wordflowlab/novel-writer-skills) | 七步方法论引导创作流程<br>Skills 版适合 Claude Code 用户 |
| 📚 **有编程基础<br>有小说经验** | [Novel-Writer-OpenSpec](https://github.com/wordflowlab/novel-writer-openspec) | OpenSpec 规格化管理<br>适合系统化创作和团队协作 |
| 🚀 **技术探索者<br>可贡献 PR** | [WriteFlow](https://github.com/wordflowlab/writeflow) | CLI 工具开发探索<br>欢迎贡献代码和想法 |

**快速决策**：
- **想要AI风格学习** → Novel-Writer-Style-CN（突破性风格模仿功能）⭐
- **完全新手** → NovelWeave（可视化最友好）
- **用 Claude Code** → Novel-Writer-Skills（深度集成 Agent Skills）
- **跨多个 AI 工具** → Novel-Writer（支持 13 个平台）
- **追求规格化** → Novel-Writer-OpenSpec（OpenSpec 方法论）
- **喜欢命令行** → WriteFlow（纯 CLI 体验）

> 💡 **多矩阵、多方法论组合开源**：探索 AI 写作的不同可能性，欢迎根据需求选择合适的工具！

## 🙏 致谢

本项目基于 [WordFlowLab/novel-writer](https://github.com/wordflowlab/novel-writer) 开发，在原项目的 [Spec Kit](https://github.com/sublayerapp/spec-kit) 架构基础上，增加了突破性的AI风格学习系统。特此感谢原项目团队的贡献！

---

**Novel Writer** - 让 AI 成为你的创作伙伴！ ✨📚
