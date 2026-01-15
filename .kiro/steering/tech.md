# Novel Writer Style CN - 技术栈与构建

## 技术栈

### 核心技术
- **运行时**：Node.js >= 18.0.0
- **语言**：JavaScript (ES Module)
- **包管理**：npm

### 主要依赖

#### CLI 框架
- `@commander-js/extra-typings` - 命令行参数解析
- `inquirer` - 交互式命令行界面
- `ora` - 终端加载动画
- `chalk` - 终端颜色输出

#### 文件处理
- `fs-extra` - 增强的文件系统操作
- `glob` - 文件模式匹配
- `js-yaml` - YAML 配置文件解析

#### NLP 分析（v0.22.0）
- `segment` - 中文分词
- `mathjs` - 数学计算（统计分析）

#### 其他
- `dotenv` - 环境变量管理

### 开发依赖
- `typescript` - 类型定义（仅用于类型检查）
- `tsx` - TypeScript 执行器
- `@types/*` - TypeScript 类型定义

## 项目结构

```
novel-writer-style-cn/
├── dist/                    # 构建输出（核心运行文件）
│   ├── cli.js              # CLI 主入口
│   ├── version.js          # 版本管理
│   ├── utils/              # 工具模块
│   │   ├── project.js
│   │   ├── interactive.js
│   │   ├── model-config.js
│   │   ├── vocabulary-analyzer.js
│   │   ├── syntax-analyzer.js
│   │   ├── sentiment-analyzer.js
│   │   ├── nlp-analyzer.js
│   │   ├── text-preprocessor.js
│   │   ├── consistency-checker.js
│   │   └── confidence-calculator.js
│   ├── plugins/
│   │   └── manager.js      # 插件管理器
│   └── [AI平台模板目录]/
│       ├── claude/
│       ├── cursor/
│       ├── gemini/
│       └── ...
├── plugins/                 # 插件源码
│   ├── style-learning/     # 风格学习插件
│   ├── authentic-voice/
│   └── ...
├── templates/              # 项目模板
├── experts/                # 专家系统
├── docs/                   # 文档
├── test/                   # 测试文件
├── examples/               # 示例代码
├── package.json
└── README.md
```

## 构建系统

### NPM Scripts

```bash
# 开发
npm run dev              # 使用 tsx 运行开发版本

# 构建（当前跳过，直接使用 dist/）
npm run build            # 跳过 TypeScript 编译
npm run postbuild        # 设置 CLI 可执行权限（Unix）

# 运行
npm start                # 运行构建后的 CLI
node dist/cli.js         # 直接运行

# 清理（当前跳过）
npm run clean            # 保留现有 dist 目录
```

### 构建说明

**重要**：本项目当前不使用 TypeScript 编译，直接维护 `dist/` 目录中的 JavaScript 文件。

- `src/` 目录不存在
- 所有代码直接在 `dist/` 中编写和维护
- 使用 ES Module 语法（`import`/`export`）

## 常用命令

### CLI 命令

```bash
# 项目管理
novel init [name]              # 初始化项目
novel init [name] --here       # 在当前目录初始化
novel init [name] --ai claude  # 指定 AI 平台
novel init [name] --plugins style-learning  # 预装插件
novel upgrade                  # 升级项目
novel check                    # 检查环境

# 插件管理
novel plugins list             # 列出已安装插件
novel plugins add <name>       # 安装插件
novel plugins remove <name>    # 移除插件

# NLP 分析（v0.22.0）
novel preprocess <file>        # 文本预处理
novel preprocess <file> -o output.txt  # 输出到文件
novel analyze <file>           # NLP 分析
novel analyze <file> --verbose # 详细分析
novel check-style <file> <style-file>  # 风格一致性检测
```

### 测试命令

```bash
# 运行测试
npm test                       # 运行所有测试

# 单独测试模块
node test/nlp-analyzer.test.js
node test/text-preprocessor.test.js
node test/consistency-checker.test.js
node test/confidence-calculator.test.js
```

### 开发调试

```bash
# 测试 CLI 功能
node dist/cli.js --help
node dist/cli.js --version
node dist/cli.js check
node dist/cli.js plugins list

# 测试 NLP 功能
node dist/cli.js preprocess samples/example/sample.txt
node dist/cli.js analyze samples/example/sample.txt --verbose
```

## 发布流程

### 版本更新

```bash
# 1. 更新版本号
npm version patch   # 0.22.0 -> 0.22.1
npm version minor   # 0.22.0 -> 0.23.0
npm version major   # 0.22.0 -> 1.0.0

# 2. 更新 CHANGELOG.md
# 手动编辑，记录本次更新内容

# 3. 提交更改
git add .
git commit -m "chore: release v0.22.1"
git push origin master

# 4. 发布到 NPM
npm publish

# 5. 推送标签
git push origin --tags
```

### 发布前检查清单

- [ ] 所有测试通过
- [ ] CLI 命令正常工作
- [ ] 文档已更新
- [ ] CHANGELOG.md 已更新
- [ ] package.json 版本号正确
- [ ] dist/ 目录包含所有必要文件

## 模块系统

### ES Module 规范

所有代码使用 ES Module：

```javascript
// 导出
export default class MyClass {}
export function myFunction() {}

// 导入
import MyClass from './my-class.js'
import { myFunction } from './utils.js'
```

### 文件扩展名

- 所有 JavaScript 文件使用 `.js` 扩展名
- import 语句必须包含 `.js` 扩展名
- package.json 中设置 `"type": "module"`

## 性能指标

### NLP 分析性能（v0.22.0）

- 1,000 字：~9ms
- 5,000 字：~27ms
- 10,000 字：~57ms

### CLI 启动时间

- 冷启动：< 500ms
- 命令执行：< 100ms

## 兼容性

### Node.js 版本
- 最低要求：18.0.0
- 推荐版本：18.x 或 20.x LTS

### 操作系统
- Windows（PowerShell/CMD）
- macOS（Bash/Zsh）
- Linux（Bash）

### AI 平台
- Claude Code ✅
- Cursor ✅
- Gemini CLI ✅
- Windsurf ✅
- 其他 9 个平台 ✅

## 代码规范

### JavaScript 风格
- 使用 ES6+ 语法
- 优先使用 `const`，必要时使用 `let`
- 避免使用 `var`
- 使用箭头函数
- 使用模板字符串

### 命名规范
- 类名：PascalCase（`MyClass`）
- 函数名：camelCase（`myFunction`）
- 常量：UPPER_SNAKE_CASE（`MAX_SIZE`）
- 文件名：kebab-case（`my-module.js`）

### 注释规范
- 使用 JSDoc 风格注释
- 关键函数添加说明
- 复杂逻辑添加行内注释
