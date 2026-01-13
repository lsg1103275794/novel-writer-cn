# 自动配置示例

本文档展示 Novel Writer v0.21.8+ 的自动配置功能。

## 功能说明

从 v0.21.8 开始，Novel Writer 会自动从多个来源读取模型配置，无需手动设置环境变量或修改命令文件。

## 配置优先级

```
1. NOVEL_AI_MODEL 环境变量（最高优先级）
   ↓
2. ANTHROPIC_MODEL 环境变量（标准 Anthropic 变量）
   ↓
3. ~/.claude/settings.json（用户配置）
   ↓
4. .claude/settings.json（项目配置）
   ↓
5. claude-sonnet-4-5-20250929（默认值）
```

## 使用场景

### 场景 1：使用 LongCat API（推荐方式）

#### 步骤 1：配置用户设置

编辑 `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "Bearer sk-ant-xxxxx",
    "ANTHROPIC_BASE_URL": "https://api.longcat.chat",
    "ANTHROPIC_MODEL": "LongCat-Flash-Chat",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "LongCat-Flash-Chat",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "LongCat-Flash-Thinking",
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "6000"
  },
  "model": "opus"
}
```

#### 步骤 2：创建项目

```bash
# 直接创建，无需额外设置
novel init my-novel --plugins style-learning

# 进入项目
cd my-novel
```

#### 步骤 3：验证配置

检查生成的命令文件：

```bash
# Windows
type .claude\commands\novel.specify.md | findstr "model:"

# Linux/Mac
grep "model:" .claude/commands/novel.specify.md
```

预期输出：
```
model: LongCat-Flash-Chat
```

#### 步骤 4：开始使用

在 Claude Code 中直接使用命令，无需任何额外配置：

```
/novel.specify 一个关于时间旅行的科幻小说
```

### 场景 2：临时使用不同模型

即使配置文件中设置了 `LongCat-Flash-Chat`，也可以临时使用其他模型：

```bash
# Windows PowerShell
$env:NOVEL_AI_MODEL="LongCat-Flash-Thinking"
novel init thinking-project

# Linux/Mac
NOVEL_AI_MODEL="LongCat-Flash-Thinking" novel init thinking-project
```

### 场景 3：项目级配置

为特定项目使用不同的模型：

```bash
# 创建项目
novel init special-project
cd special-project

# 创建项目级配置
mkdir -p .claude
cat > .claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_MODEL": "LongCat-Flash-Thinking"
  }
}
EOF

# 重新生成命令（如果需要）
novel plugins:install style-learning
```

### 场景 4：多模型策略

为不同类型的命令使用不同的模型：

#### 配置文件

`~/.claude/settings.json`:
```json
{
  "env": {
    "ANTHROPIC_MODEL": "LongCat-Flash-Chat",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "LongCat-Flash-Chat",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "LongCat-Flash-Thinking"
  }
}
```

#### 手动调整命令文件

```bash
# 为分析类命令使用思考模型
# 编辑 .claude/commands/novel.style-analyze.md
---
model: LongCat-Flash-Thinking
---

# 为创作类命令使用对话模型
# 编辑 .claude/commands/novel.write.md
---
model: LongCat-Flash-Chat
---
```

## 验证配置

### 方法 1：使用测试脚本

```powershell
# 运行自动配置测试
.\scripts\powershell\test-auto-config.ps1
```

### 方法 2：手动检查

```bash
# 1. 检查环境变量
echo $env:ANTHROPIC_MODEL  # PowerShell
echo $ANTHROPIC_MODEL      # Bash

# 2. 检查用户配置
cat ~/.claude/settings.json

# 3. 创建测试项目
novel init test-config
cd test-config

# 4. 检查生成的命令文件
cat .claude/commands/novel.specify.md | grep "model:"
```

### 方法 3：使用 Node.js

```bash
# 显示当前配置
node -e "import('./dist/utils/model-config.js').then(m => m.displayModelConfig())"
```

预期输出：
```
Using model: LongCat-Flash-Chat
Source: user Claude settings (~/.claude/settings.json)
API Base URL: https://api.longcat.chat
API Key: Bearer sk-...
```

## 常见配置示例

### LongCat API

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "Bearer your-api-key",
    "ANTHROPIC_BASE_URL": "https://api.longcat.chat",
    "ANTHROPIC_MODEL": "LongCat-Flash-Chat"
  }
}
```

### OpenRouter

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "Bearer your-openrouter-key",
    "ANTHROPIC_BASE_URL": "https://openrouter.ai/api/v1",
    "ANTHROPIC_MODEL": "anthropic/claude-3-sonnet"
  }
}
```

### 本地 API（如 LM Studio）

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:1234/v1",
    "ANTHROPIC_MODEL": "local-model"
  }
}
```

### Claude 官方 API

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-ant-xxxxx",
    "ANTHROPIC_MODEL": "claude-sonnet-4-5-20250929"
  }
}
```

## 故障排查

### 问题 1：配置未生效

**症状**：创建项目后，命令文件仍使用默认模型

**解决方案**：
1. 检查配置文件路径是否正确
2. 确认 JSON 格式正确（使用 JSON 验证器）
3. 重启终端使环境变量生效
4. 运行测试脚本验证：`.\scripts\powershell\test-auto-config.ps1`

### 问题 2：找不到配置文件

**症状**：系统提示找不到 `~/.claude/settings.json`

**解决方案**：
```bash
# 创建配置目录和文件
mkdir -p ~/.claude
cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_MODEL": "LongCat-Flash-Chat"
  }
}
EOF
```

### 问题 3：环境变量冲突

**症状**：设置了多个环境变量，不确定哪个生效

**解决方案**：
```bash
# 查看所有相关环境变量
env | grep ANTHROPIC
env | grep NOVEL

# 清除不需要的变量
unset NOVEL_AI_MODEL
unset ANTHROPIC_MODEL
```

### 问题 4：API 调用失败

**症状**：配置正确但 API 调用失败

**检查清单**：
- [ ] API Key 是否正确
- [ ] Base URL 是否正确
- [ ] 网络连接是否正常
- [ ] API 服务是否可用
- [ ] 模型名称是否正确

## 最佳实践

### 1. 使用用户配置

✅ **推荐**：在 `~/.claude/settings.json` 中配置
- 一次配置，所有项目生效
- 便于管理和更新
- 支持版本控制（可选）

❌ **不推荐**：每次都设置环境变量
- 容易忘记
- 不同终端需要重复设置

### 2. 分离敏感信息

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "Bearer ${API_KEY}",
    "ANTHROPIC_BASE_URL": "https://api.longcat.chat",
    "ANTHROPIC_MODEL": "LongCat-Flash-Chat"
  }
}
```

然后在环境变量中设置：
```bash
export API_KEY="your-actual-key"
```

### 3. 使用配置模板

创建配置模板文件 `claude-settings-template.json`：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "Bearer YOUR_API_KEY_HERE",
    "ANTHROPIC_BASE_URL": "https://api.longcat.chat",
    "ANTHROPIC_MODEL": "LongCat-Flash-Chat",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "LongCat-Flash-Chat",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "LongCat-Flash-Thinking"
  },
  "model": "opus"
}
```

使用时复制并填入实际值：
```bash
cp claude-settings-template.json ~/.claude/settings.json
# 编辑并填入实际 API Key
nano ~/.claude/settings.json
```

### 4. 团队协作

如果团队使用相同的 API：

1. 创建团队配置文档
2. 使用环境变量管理敏感信息
3. 在项目 README 中说明配置方法
4. 提供配置模板文件

## 相关资源

- [完整文档](../docs/THIRD_PARTY_API.md)
- [LongCat API 文档](https://api.longcat.chat)
- [Anthropic API 参考](https://docs.anthropic.com/claude/reference)
- [GitHub 仓库](https://github.com/lsg1103275794/novel-writer-style-cn)
