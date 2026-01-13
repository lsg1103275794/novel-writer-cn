# LongCat API 配置示例

本文档展示如何配置 Novel Writer 使用 LongCat API。

## 1. 安装 Novel Writer

```bash
npm install -g novel-writer-style-cn@latest
```

## 2. 设置环境变量

### Windows PowerShell
```powershell
# 临时设置（当前会话有效）
$env:NOVEL_AI_MODEL="LongCat-Flash-Chat"

# 永久设置（添加到 PowerShell 配置文件）
Add-Content $PROFILE '$env:NOVEL_AI_MODEL="LongCat-Flash-Chat"'
```

### Windows CMD
```cmd
# 临时设置
set NOVEL_AI_MODEL=LongCat-Flash-Chat

# 永久设置（系统环境变量）
setx NOVEL_AI_MODEL "LongCat-Flash-Chat"
```

### Linux/Mac
```bash
# 临时设置
export NOVEL_AI_MODEL="LongCat-Flash-Chat"

# 永久设置（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export NOVEL_AI_MODEL="LongCat-Flash-Chat"' >> ~/.bashrc
source ~/.bashrc
```

## 3. 初始化项目

```bash
# 创建新项目
novel init my-novel --plugins style-learning

# 进入项目目录
cd my-novel
```

## 4. 配置 AI 助手

### Claude Code

1. 打开 Claude Code 设置
2. 找到 "API Configuration" 部分
3. 配置：
   - **API Key**: `Bearer your-api-key`
   - **Base URL**: `https://api.longcat.chat`
   - **Model**: 将使用命令文件中的配置（已自动设置为 `LongCat-Flash-Chat`）

### Cursor

1. 打开 Cursor 设置（Ctrl+,）
2. 搜索 "API"
3. 配置：
   - **API Key**: `your-api-key`
   - **API Base URL**: `https://api.longcat.chat`

### Gemini CLI

编辑 `.gemini/settings.json`：

```json
{
  "api": {
    "provider": "anthropic",
    "baseUrl": "https://api.longcat.chat",
    "apiKey": "Bearer your-api-key"
  }
}
```

## 5. 验证配置

### 方法 1：使用测试脚本

```powershell
# 在项目根目录运行
.\scripts\powershell\test-model-config.ps1
```

预期输出：
```
=== Novel Writer 模型配置测试 ===

1. 检查环境变量...
  ✓ NOVEL_AI_MODEL = LongCat-Flash-Chat

2. 检查配置文件...
  ✓ 配置文件存在
  默认模型: claude-sonnet-4-5-20250929
  支持的模型:
    - LongCat-Flash-Chat (LongCat)
    - LongCat-Flash-Thinking (LongCat)

3. 检查命令文件...
  找到 5 个命令文件（显示前5个）:
    novel.specify.md: LongCat-Flash-Chat
    novel.plan.md: LongCat-Flash-Chat
    ...
```

### 方法 2：在 AI 助手中测试

在 Claude Code 中运行：

```
/novel.specify 测试项目
```

如果配置正确，应该能正常执行而不报错。

## 6. 开始创作

### 风格学习流程

```bash
# 1. 准备样本文件
# 将小说文本放入 samples/ 目录

# 2. 在 Claude Code 中分析风格
/novel.style-analyze samples/jinyong/射雕英雄传.txt

# 3. 学习风格
/novel.style-learn samples/jinyong/ --name="金庸风格"

# 4. 风格化创作
/novel.write-styled 第1章 初入江湖 --style="金庸风格"
```

### 传统创作流程

```bash
# 1. 定义创作宪法
/novel.constitution

# 2. 定义故事规格
/novel.specify 一个关于...的故事

# 3. 制定创作计划
/novel.plan

# 4. 开始写作
/novel.write 第1章
```

## 7. 常见问题

### Q: 为什么还是报错 "不支持的模型名"？

**A**: 可能的原因：
1. 环境变量未生效，重启终端后再试
2. 项目是在设置环境变量前创建的，需要运行更新脚本：
   ```powershell
   .\scripts\powershell\update-model-name.ps1 -ModelName "LongCat-Flash-Chat"
   ```
3. AI 助手的 API 配置不正确，检查 Base URL 和 API Key

### Q: 如何切换回 Claude 官方 API？

**A**: 
1. 删除或修改环境变量：
   ```powershell
   Remove-Item Env:\NOVEL_AI_MODEL
   ```
2. 或设置为 Claude 模型：
   ```powershell
   $env:NOVEL_AI_MODEL="claude-sonnet-4-5-20250929"
   ```
3. 在 AI 助手中恢复 Claude 官方 API 配置

### Q: 不同命令可以使用不同模型吗？

**A**: 可以。手动编辑命令配置文件：

```markdown
# .claude/commands/novel.style-analyze.md
---
model: LongCat-Flash-Thinking  # 分析用思考模型
---

# .claude/commands/novel.write.md
---
model: LongCat-Flash-Chat  # 创作用对话模型
---
```

## 8. 性能优化建议

### 模型选择策略

| 任务类型 | 推荐模型 | 原因 |
|---------|---------|------|
| 风格分析 | `LongCat-Flash-Thinking` | 需要深度分析和模式识别 |
| 风格学习 | `LongCat-Flash-Thinking` | 需要提取抽象特征 |
| 内容创作 | `LongCat-Flash-Chat` | 需要流畅自然的输出 |
| 规格定义 | `LongCat-Flash-Chat` | 需要交互式对话 |
| 质量检查 | `LongCat-Flash-Thinking` | 需要逻辑推理 |

### 批量更新命令

```powershell
# 为���析类命令使用思考模型
Get-ChildItem -Path ".claude/commands" -Filter "*analyze*.md" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "model: .+", "model: LongCat-Flash-Thinking"
    Set-Content -Path $_.FullName -Value $content -NoNewline
}

# 为创作类命令使用对话模型
Get-ChildItem -Path ".claude/commands" -Filter "*write*.md" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "model: .+", "model: LongCat-Flash-Chat"
    Set-Content -Path $_.FullName -Value $content -NoNewline
}
```

## 9. 相关资源

- [LongCat API 官方文档](https://api.longcat.chat)
- [Novel Writer 完整文档](../docs/THIRD_PARTY_API.md)
- [风格学习指南](../docs/STYLE_LEARNING_INTEGRATION.md)
- [GitHub 仓库](https://github.com/lsg1103275794/novel-writer-style-cn)

## 10. 获取帮助

如果遇到问题：
1. 查看 [完整文档](../docs/THIRD_PARTY_API.md)
2. 提交 [GitHub Issue](https://github.com/lsg1103275794/novel-writer-style-cn/issues)
3. 加入社区讨论
