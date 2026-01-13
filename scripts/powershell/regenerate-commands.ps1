# 重新生成项目命令文件
# 用法: .\regenerate-commands.ps1 [-ProjectPath <路径>]

param(
    [string]$ProjectPath = "."
)

Write-Host "=== 重新生成命令文件 ===" -ForegroundColor Cyan
Write-Host ""

# 检查是否是有效的 novel-writer 项目
$configPath = Join-Path $ProjectPath ".specify\config.json"
if (-not (Test-Path $configPath)) {
    Write-Host "错误: 当前目录不是有效的 novel-writer 项目" -ForegroundColor Red
    Write-Host "请在项目根目录运行此脚本" -ForegroundColor Yellow
    exit 1
}

# 读取项目配置
$config = Get-Content $configPath -Raw | ConvertFrom-Json
$aiType = $config.ai

Write-Host "检测到项目 AI 类型: $aiType" -ForegroundColor Green
Write-Host ""

# 检查当前模型配置
Write-Host "检查模型配置..." -ForegroundColor Yellow

$modelConfig = $null

# 1. 检查环境变量
if ($env:NOVEL_AI_MODEL) {
    $modelConfig = $env:NOVEL_AI_MODEL
    Write-Host "  ✓ 使用 NOVEL_AI_MODEL: $modelConfig" -ForegroundColor Green
} elseif ($env:ANTHROPIC_MODEL) {
    $modelConfig = $env:ANTHROPIC_MODEL
    Write-Host "  ✓ 使用 ANTHROPIC_MODEL: $modelConfig" -ForegroundColor Green
} else {
    # 2. 检查用户配置
    $userClaudeSettings = "$env:USERPROFILE\.claude\settings.json"
    if (Test-Path $userClaudeSettings) {
        try {
            $settings = Get-Content $userClaudeSettings -Raw | ConvertFrom-Json
            if ($settings.env.ANTHROPIC_MODEL) {
                $modelConfig = $settings.env.ANTHROPIC_MODEL
                Write-Host "  ✓ 从用户配置读取: $modelConfig" -ForegroundColor Green
            }
        } catch {
            Write-Host "  ⚠ 无法读取用户配置" -ForegroundColor Yellow
        }
    }
}

if (-not $modelConfig) {
    Write-Host "  ⚠ 未检测到模型配置，将使用默认值" -ForegroundColor Yellow
    $modelConfig = "claude-sonnet-4-5-20250929"
}

Write-Host ""
Write-Host "将使用模型: $modelConfig" -ForegroundColor Cyan
Write-Host ""

# 确认操作
$confirm = Read-Host "是否继续重新生成命令文件？(y/n)"
if ($confirm -ne "y") {
    Write-Host "操作已取消" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "开始重新生成..." -ForegroundColor Yellow

# 备份现有命令文件
$backupDir = Join-Path $ProjectPath ".backup-commands-$(Get-Date -Format 'yyyyMMddHHmmss')"
Write-Host "备份现有命令到: $backupDir" -ForegroundColor Gray

$aiDirs = @{
    "claude" = ".claude\commands"
    "cursor" = ".cursor\commands"
    "gemini" = ".gemini\commands"
    "windsurf" = ".windsurf\workflows"
    "roocode" = ".roo\commands"
}

$targetDir = $aiDirs[$aiType]
if ($targetDir) {
    $fullTargetDir = Join-Path $ProjectPath $targetDir
    if (Test-Path $fullTargetDir) {
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
        Copy-Item -Path $fullTargetDir -Destination $backupDir -Recurse -Force
        Write-Host "  ✓ 备份完成" -ForegroundColor Green
    }
}

Write-Host ""

# 查找所有命令文件并更新
$updatedCount = 0
$commandFiles = Get-ChildItem -Path $fullTargetDir -Filter "*.md" -ErrorAction SilentlyContinue

foreach ($file in $commandFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # 检查是否有 frontmatter
    if ($content -match "^---\s*\n([\s\S]*?)\n---") {
        $frontmatter = $matches[1]
        
        # 替换模型名称
        if ($frontmatter -match "model:\s*.+") {
            $newFrontmatter = $frontmatter -replace "model:\s*.+", "model: $modelConfig"
            $newContent = $content -replace "^---\s*\n[\s\S]*?\n---", "---`n$newFrontmatter`n---"
            
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
            Write-Host "  ✓ 已更新: $($file.Name)" -ForegroundColor Green
            $updatedCount++
        }
    }
}

# 处理 TOML 文件（Gemini）
if ($aiType -eq "gemini") {
    $tomlFiles = Get-ChildItem -Path $fullTargetDir -Filter "*.toml" -Recurse -ErrorAction SilentlyContinue
    
    foreach ($file in $tomlFiles) {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        if ($content -match 'model\s*=\s*"[^"]+"') {
            $newContent = $content -replace 'model\s*=\s*"[^"]+"', "model = `"$modelConfig`""
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
            Write-Host "  ✓ 已更新: $($file.Name)" -ForegroundColor Green
            $updatedCount++
        }
    }
}

Write-Host ""
Write-Host "完成！共更新 $updatedCount 个文件" -ForegroundColor Green
Write-Host ""
Write-Host "备份位置: $backupDir" -ForegroundColor Gray
Write-Host "如需恢复，请手动复制备份文件" -ForegroundColor Gray
Write-Host ""
Write-Host "现在可以在 Claude Code 中使用斜杠命令了！" -ForegroundColor Cyan
