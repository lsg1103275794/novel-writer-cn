# 使用第三方 API 指南

本文档说明如何配置 Novel Writer 使用第三方 API 服务（如 LongCat、OpenRouter 等）。

## 🎉 自动配置功能（v0.21.7+）

从 v0.21.7 开始，Novel Writer 支持**自动读取模型配置**，无需手动设置！

### 配置优先级

系统会按以下顺序自动查找模型配置：

1. **环境变量 `NOVEL_AI_MODEL`**（最高优先级）
2. **环境变量 `ANTHROPIC_MODEL`**（标准 Anthropic 变量）
3. **用户配置文件** `~/.claude/settings.json`
4. **项目配置文件** `.claude/settings.json`
5. **默认值** `claude-sonnet-4-5-20250929`

这意味着：
- ✅ 如果你已经在 `.claude/settings.json` 中配置了 LongCat，无需额外设置
- ✅ 如果你设置了 `ANTHROPIC_MODEL` 环境变量，会自动使用
- ✅ 支持标准的 Anthropic SDK 环境变量配置

## 问题说明

Novel Writer 默认生成的命令配置文件使用 Claude 的模型名称 `claude-sonnet-4-5-20250929`。当你使用第三方 API 时，会遇到以下错误：

```
API Error: 400 {"error":{"code":"invalid_parameter","message":"不支持的模型名(model=claude-sonnet-4-5-20250929)"}}
```

这是因为第三方 API 使用不同的模型命名规范。

## 解决方案

### 🌟 方案 1：在用户配置中设置（最推荐）

直接在你的 Claude 配置文件中设置模型，Novel Writer 会自动读取：

#### 编辑配置文件

**Windows**:
```powershell
notepad $env:USERPROFILE\.claude\settings.json
```

**Linux/Mac**:
```bash
nano ~/.claude/settings.json
```

#### 添加模型配置

在 `settings.json` 中添加或修改 `env` 部分：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "Bearer your-api-key",
    "ANTHROPIC_BASE_URL": "https://api.longcat.chat",
    "ANTHROPIC_MODEL": "LongCat-Flash-Chat",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "LongCat-Flash-Chat",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "LongCat-Flash-Thinking"
  },
  "model": "opus"
}
```

**配置说明**：
- `ANTHROPIC_MODEL`: 默认使用的模型（Novel Writer 会自动读取）
- `ANTHROPIC_BASE_URL`: API 端点
- `ANTHROPIC_AUTH_TOKEN`: API 密钥
- `ANTHROPIC_DEFAULT_SONNET_MODEL`: Sonnet 模型映射
- `ANTHROPIC_DEFAULT_OPUS_MODEL`: Opus 模型映射

配置完成后，直接运行 `novel init` 即可，无需额外设置！

### 方案 2：使用环境变量

如果你不想修改配置文件，可以设置环境变量：

#### Windows CMD
```cmd
set NOVEL_AI_MODEL=LongCat-Flash-Chat
novel init my-novel
```

#### Windows PowerShell
```powershell
$env:NOVEL_AI_MODEL="LongCat-Flash-Chat"
novel init my-novel
```

#### Linux/Mac
```bash
export NOVEL_AI_MODEL="LongCat-Flash-Chat"
novel init my-novel
```

#### 永久设置（Windows）

**方法 1：系统环境变量**
1. 右键"此电脑" → "属性" → "高级系统设置"
2. 点击"环境变量"
3. 在"用户变量"中新建：
   - 变量名：`ANTHROPIC_MODEL`（推荐）或 `NOVEL_AI_MODEL`
   - 变量值：`LongCat-Flash-Chat`
4. 重启终端生效

**方法 2：PowerShell 配置文件**
```powershell
# 编辑 PowerShell 配置文件
notepad $PROFILE

# 添加以下内容
$env:ANTHROPIC_MODEL="LongCat-Flash-Chat"
$env:ANTHROPIC_BASE_URL="https://api.longcat.chat"
$env:ANTHROPIC_API_KEY="Bearer your-api-key"

# 重新加载配置
. $PROFILE
```

### 方案 3：批量更新已有项目

如果你已经初始化了项目，可以使用脚本批量更新所有命令文件：

```powershell
# 在项目根目录运行
.\scripts\powershell\update-model-name.ps1 -ModelName "LongCat-Flash-Chat"
```

脚本会自动：
1. 扫描 `dist/` 目录下的所有命令配置文件
2. 将 `model: claude-sonnet-4-5-20250929` 替换为指定的模型名称
3. 显示更新进度和统计信息

### 方案 4：手动修改配置文件

如果你只需要修改少数几个命令，可以手动编辑：

#### Claude Code 命令文件
编辑 `.claude/commands/novel.*.md` 文件：

```markdown
---
description: 命令描述
model: LongCat-Flash-Chat  # 修改这一行
---

命令内容...
```

#### Gemini CLI 命令文件
编辑 `.gemini/commands/novel/*.toml` 文件：

```toml
description = "命令描述"
model = "LongCat-Flash-Chat"  # 修改这一行

prompt = """
命令内容...
"""
```

## 支持的第三方 API

### LongCat API

**官方文档**: https://api.longcat.chat

**支持的模型**：
- `LongCat-Flash-Chat` - 快速对话模型（推荐用于创作）
- `LongCat-Flash-Thinking` - 思考模型（推荐用于分析）

**配置示例**（Python SDK）：
```python
import anthropic

client = anthropic.Anthropic(
    api_key="Bearer your-api-key",
    base_url="https://api.longcat.chat"
)

message = client.messages.create(
    model="LongCat-Flash-Chat",
    max_tokens=150,
    messages=[{"role": "user", "content": "Hello, LongCat!"}]
)
```

**在 AI 助手中配置**：
1. **Claude Code**: 在设置中配置 API 端点和密钥
2. **Cursor**: 在 `.cursor/settings.json` 中配置
3. **Gemini CLI**: 在 `.gemini/settings.json` 中配置

### OpenRouter

**官方文档**: https://openrouter.ai/docs

**支持的模型**：
- `anthropic/claude-3-opus`
- `anthropic/claude-3-sonnet`
- 以及其他兼容模型

**配置方法**：
```bash
# 设置环境变量
export NOVEL_AI_MODEL="anthropic/claude-3-sonnet"
```

### 其他兼容 API

任何兼容 Anthropic API 格式的服务都可以使用，只需：
1. 确认服务支持的模型名称
2. 设置 `NOVEL_AI_MODEL` 环境变量
3. 在 AI 助手中配置 API 端点

## 常见问题

### Q1: 为什么正常对话不报错，执行命令才报错？

**A**: 因为：
- 正常对话时，AI 助手使用你在设置中配置的模型
- 执行斜杠命令时，AI 助手读取命令配置文件中的 `model` 字段
- 如果命令配置文件中的模型名称与 API 不匹配，就会报错

### Q2: 我需要为每个项目都设置环境变量吗？

**A**: 不需要。有两种方式：
1. **全局设置**：在系统环境变量中设置 `NOVEL_AI_MODEL`，所有项目都会使用
2. **项目级设置**：在项目目录中运行 `update-model-name.ps1` 脚本

### Q3: 如何验证配置是否成功？

**A**: 
1. 初始化一个测试项目：`novel init test-project`
2. 检查生成的命令文件（如 `.claude/commands/novel.specify.md`）
3. 确认 `model:` 字段是否为你设置的模型名称
4. 在 AI 助手中运行 `/novel.specify` 命令测试

### Q4: 不同 AI 平台的配置文件在哪里？

**A**: 
- **Claude Code**: `.claude/commands/novel.*.md`
- **Cursor**: `.cursor/commands/novel.*.md`
- **Gemini CLI**: `.gemini/commands/novel/*.toml`
- **Windsurf**: `.windsurf/workflows/novel.*.md`
- **Roo Code**: `.roo/commands/novel.*.md`

### Q5: 我可以为不同命令使用不同模型吗？

**A**: 可以。手动编辑命令配置文件，为每个命令设置不同的 `model` 值：
- 分析类命令使用 `LongCat-Flash-Thinking`（思考模型）
- 创作类命令使用 `LongCat-Flash-Chat`（对话模型）

## 最佳实践

### 1. 选择合适的模型

| 命令类型 | 推荐模型 | 原因 |
|---------|---------|------|
| 风格分析 (`style-analyze`) | `LongCat-Flash-Thinking` | 需要深度分析 |
| 风格学习 (`style-learn`) | `LongCat-Flash-Thinking` | 需要模式识别 |
| 创作命令 (`write`, `write-styled`) | `LongCat-Flash-Chat` | 需要流畅输出 |
| 规格定义 (`specify`, `plan`) | `LongCat-Flash-Chat` | 需要交互对话 |

### 2. 测试流程

```bash
# 1. 设置环境变量
set NOVEL_AI_MODEL=LongCat-Flash-Chat

# 2. 创建测试项目
novel init test-project --plugins style-learning

# 3. 进入项目
cd test-project

# 4. 在 AI 助手中测试命令
# /novel.specify 测试项目
```

### 3. 版本控制

如果你的项目使用 Git，建议：
- 将 `.claude/commands/` 等目录加入版本控制
- 在 README 中说明使用的模型名称
- 团队成员使用相同的模型配置

## 技术细节

### 命令配置文件格式

#### Markdown 格式（Claude Code、Cursor 等）
```markdown
---
description: 命令描述
argument-hint: [参数]
allowed-tools: Read(//**), Write(//**), Bash(*)
model: LongCat-Flash-Chat
---

命令提示词内容...
```

#### TOML 格式（Gemini CLI）
```toml
description = "命令描述"

prompt = """
命令提示词内容...
"""

[metadata]
model = "LongCat-Flash-Chat"
```

### 环境变量优先级

1. `NOVEL_AI_MODEL` 环境变量（最高优先级）
2. `dist/config/model-config.json` 配置文件
3. 硬编码默认值 `claude-sonnet-4-5-20250929`

## 贡献

如果你使用了其他第三方 API 并成功配置，欢迎：
1. 提交 Issue 分享你的配置经验
2. 提交 PR 更新本文档
3. 在 Discussions 中讨论最佳实践

## 相关资源

- [LongCat API 文档](https://api.longcat.chat)
- [OpenRouter 文档](https://openrouter.ai/docs)
- [Anthropic API 参考](https://docs.anthropic.com/claude/reference)
- [Novel Writer 官方文档](https://github.com/lsg1103275794/novel-writer-style-cn)
