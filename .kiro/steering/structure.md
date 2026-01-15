# Novel Writer Style CN - 项目结构

## 顶层目录组织

```
novel-writer-style-cn/
├── dist/                    # 构建输出（核心运行文件）
├── plugins/                 # 插件源码
├── templates/               # 项目模板
├── experts/                 # 专家系统
├── docs/                    # 文档
├── test/                    # 测试文件
├── examples/                # 示例代码
├── scripts/                 # 辅助脚本
├── samples/                 # 样本文件
├── memory/                  # 记忆系统
├── plan/                    # 开发计划
├── .claude/                 # Claude Code 配置
├── .github/                 # GitHub 配置
├── .kiro/                   # Kiro 配置
├── .vscode/                 # VSCode 配置
├── package.json             # NPM 包配置
├── CHANGELOG.md             # 版本更新日志
├── README.md                # 项目说明
├── CLAUDE.md                # Claude 指令文件
└── LICENSE                  # MIT 许可证
```

## 核心目录详解

### dist/ - 构建输出（核心）

```
dist/
├── cli.js                   # CLI 主入口（~1500 行）
├── version.js               # 版本管理模块
├── utils/                   # 工具模块
│   ├── project.js           # 项目工具函数
│   ├── interactive.js       # 交互界面模块
│   ├── model-config.js      # 模型配置读取
│   ├── vocabulary-analyzer.js    # 词汇分析器
│   ├── syntax-analyzer.js        # 句法分析器
│   ├── sentiment-analyzer.js     # 情感分析器
│   ├── nlp-analyzer.js           # NLP 综合分析器
│   ├── text-preprocessor.js      # 文本预处理器
│   ├── consistency-checker.js    # 一致性检测器
│   └── confidence-calculator.js  # 置信度计算器
├── plugins/
│   └── manager.js           # 插件管理器
└── [AI平台模板]/
    ├── claude/              # Claude Code 模板
    ├── cursor/              # Cursor 模板
    ├── gemini/              # Gemini CLI 模板
    ├── windsurf/            # Windsurf 模板
    ├── codex/               # Codex CLI 模板
    └── ...                  # 其他 9 个平台
```

**重要说明**：
- 所有代码直接在 `dist/` 中维护，不使用 TypeScript 编译
- 使用 ES Module 语法
- CLI 入口文件：`dist/cli.js`

### plugins/ - 插件系统

```
plugins/
├── style-learning/          # 风格学习插件（核心）
│   ├── README.md
│   ├── config.yaml
│   ├── commands/            # AI 斜杠命令
│   │   ├── style-analyze.md
│   │   ├── style-learn.md
│   │   ├── write-styled.md
│   │   ├── style-check.md
│   │   └── style-workshop.md
│   ├── experts/
│   │   └── style-expert.md
│   ├── templates/
│   │   └── style-config-template.json
│   └── examples/
│       └── usage-example.md
├── authentic-voice/         # 真实人声插件
├── book-analysis/           # 书籍分析插件
├── genre-knowledge/         # 类型知识插件
├── translate/               # 翻译插件
├── luyao-style/             # 路遥风格插件
├── wangyu-style/            # 王钰风格插件
├── shizhangyu-style/        # 十丈余风格插件
└── stardust-dreams/         # 星尘梦想插件
```

**插件结构规范**：
- `config.yaml` - 插件配置
- `commands/` - AI 斜杠命令（Markdown 格式）
- `commands-gemini/` - Gemini 专用命令（TOML 格式）
- `experts/` - 专家系统文件
- `templates/` - 模板文件
- `README.md` - 插件说明

### templates/ - 项目模板

```
templates/
├── checklist-template.md    # 检查清单模板
├── outline-template.md      # 大纲模板
├── story-template.md        # 故事模板
├── writing-constitution-template.md
├── GEMINI.md                # Gemini 配置模板
├── gemini-settings.json
├── vscode-settings.json
├── knowledge/               # 知识库模板
│   ├── character-profiles.md
│   ├── character-voices.md
│   ├── locations.md
│   ├── world-setting.md
│   └── audit-config.json
└── tracking/                # 追踪数据模板
    ├── character-state.json
    ├── plot-tracker.json
    ├── relationships.json
    ├── timeline.json
    └── validation-rules.json
```

### docs/ - 文档目录

```
docs/
├── README.md                # 文档索引
├── PROJECT_STRUCTURE.md     # 项目结构（详细版）
├── usage-guide.md           # 完整使用指南
├── nlp-analysis-flow.md     # NLP 分析流程图
├── INSTALLATION_COMPLETE.md # 安装完成指南
├── METHODOLOGY.md           # 七步方法论
├── novel-sdd.md             # 规格驱动创作法
├── STYLE_LEARNING_INTEGRATION.md
├── THIRD_PARTY_API.md       # 第三方 API 指南
├── DOCUMENTATION_STRUCTURE.md
├── upgrade-guide.md         # 升级指南
├── commands.md              # 命令详解
└── longcat-config-example.md
```

### experts/ - 专家系统

```
experts/
└── core/
    ├── character.md         # 人物塑造专家
    ├── plot.md              # 剧情结构专家
    ├── style.md             # 文风语言专家
    └── world.md             # 世界观设计专家
```

### test/ - 测试文件

```
test/
├── nlp-analyzer.test.js
├── text-preprocessor.test.js
├── consistency-checker.test.js
├── confidence-calculator.test.js
├── style-learning-integration.test.js
└── performance.test.js
```

### scripts/ - 辅助脚本

```
scripts/
├── bash/                    # Unix/Linux/Mac 脚本
│   ├── analyze-story.sh
│   ├── check-consistency.sh
│   ├── constitution.sh
│   └── ...
└── powershell/              # Windows 脚本
    ├── analyze-story.ps1
    ├── check-consistency.ps1
    ├── constitution.ps1
    ├── update-model-name.ps1
    └── ...
```

## 配置文件说明

### 根目录配置

- `package.json` - NPM 包配置，包含版本号、依赖、脚本
- `CHANGELOG.md` - 版本更新日志（发布前必须更新）
- `README.md` - 项目说明（GitHub 展示页面）
- `CLAUDE.md` - Claude 指令文件（Git 使用规范）
- `LICENSE` - MIT 许可证

### AI 平台配置

- `.claude/` - Claude Code 配置目录
  - `commands/` - 斜杠命令
  - `settings.local.json` - 本地设置（不提交）
- `.kiro/` - Kiro 配置目录
  - `steering/` - Steering 规则
- `.vscode/` - VSCode 配置

## 用户项目结构

使用 `novel init` 创建的项目结构：

```
my-novel/
├── .specify/                # Spec Kit 配置
│   ├── memory/              # 创作记忆
│   │   └── constitution.md
│   └── scripts/             # 支持脚本
├── .claude/                 # Claude 命令（或其他 AI 平台）
│   └── commands/            # 斜杠命令文件
├── spec/                    # 小说规格数据
│   ├── tracking/            # 追踪数据
│   │   ├── plot-tracker.json
│   │   ├── timeline.json
│   │   └── relationships.json
│   └── knowledge/           # 知识库
│       ├── world-setting.md
│       ├── character-profiles.md
│       └── locations.md
├── stories/                 # 故事内容
│   └── 001-故事名/
│       ├── specification.md
│       ├── creative-plan.md
│       ├── tasks.md
│       └── content/         # 章节内容
├── samples/                 # 样本文件（风格学习）
│   ├── clean/               # 预处理后的文本
│   └── example/
└── scripts/                 # 支持脚本
    ├── bash/
    └── powershell/
```

## 关键文件路径

### CLI 核心
- 主入口：`dist/cli.js`
- 版本管理：`dist/version.js`
- 插件管理：`dist/plugins/manager.js`

### NLP 模块（v0.22.0）
- 文本预处理：`dist/utils/text-preprocessor.js`
- NLP 分析：`dist/utils/nlp-analyzer.js`
- 一致性检测：`dist/utils/consistency-checker.js`
- 置信度计算：`dist/utils/confidence-calculator.js`

### 风格学习
- 插件目录：`plugins/style-learning/`
- 命令文件：`plugins/style-learning/commands/`
- 专家系统：`plugins/style-learning/experts/style-expert.md`

## 文件命名规范

- JavaScript 文件：kebab-case（`my-module.js`）
- Markdown 文档：kebab-case（`usage-guide.md`）
- 配置文件：kebab-case（`config.yaml`）
- 模板文件：kebab-case + `-template` 后缀

## 目录权限说明

- `dist/` - 核心代码，修改需谨慎测试
- `plugins/` - 插件源码，可扩展
- `templates/` - 模板文件，用于项目初始化
- `docs/` - 文档，需与代码同步更新
- `test/` - 测试文件，新功能需添加测试
