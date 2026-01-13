# 测试自动配置读取功能
# 用法: .\test-auto-config.ps1

Write-Host "=== Novel Writer 自动配置测试 ===" -ForegroundColor Cyan
Write-Host ""

# 测试场景 1：环境变量
Write-Host "场景 1: 测试环境变量优先级" -ForegroundColor Yellow
Write-Host "设置 NOVEL_AI_MODEL=LongCat-Flash-Chat" -ForegroundColor Gray
$env:NOVEL_AI_MODEL = "LongCat-Flash-Chat"

# 创建测试项目
$testDir = "test-auto-config-$(Get-Date -Format 'yyyyMMddHHmmss')"
Write-Host "创建测试项目: $testDir" -ForegroundColor Gray
novel init $testDir --ai claude 2>&1 | Out-Null

if (Test-Path $testDir) {
    # 检查生成的命令文件
    $cmdFile = Get-ChildItem -Path "$testDir\.claude\commands" -Filter "*.md" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($cmdFile) {
        $content = Get-Content $cmdFile.FullName -Raw
        if ($content -match "model:\s*(.+)") {
            $detectedModel = $matches[1].Trim()
            if ($detectedModel -eq "LongCat-Flash-Chat") {
                Write-Host "  ✓ 成功：检测到模型 = $detectedModel" -ForegroundColor Green
            } else {
                Write-Host "  ✗ 失败：期望 LongCat-Flash-Chat，实际 = $detectedModel" -ForegroundColor Red
            }
        }
    }
    
    # 清理测试项目
    Remove-Item -Recurse -Force $testDir -ErrorAction SilentlyContinue
} else {
    Write-Host "  ✗ 项目创建失败" -ForegroundColor Red
}

Write-Host ""

# 测试场景 2：用户配置文件
Write-Host "场景 2: 测试用户配置文件读取" -ForegroundColor Yellow
Remove-Item Env:\NOVEL_AI_MODEL -ErrorAction SilentlyContinue

$userClaudeDir = "$env:USERPROFILE\.claude"
$userClaudeSettings = "$userClaudeDir\settings.json"

if (Test-Path $userClaudeSettings) {
    Write-Host "  ✓ 找到用户配置: $userClaudeSettings" -ForegroundColor Green
    
    try {
        $settings = Get-Content $userClaudeSettings -Raw | ConvertFrom-Json
        
        # 检查可能的模型配置路径
        $modelPaths = @(
            $settings.env.ANTHROPIC_MODEL,
            $settings.env.ANTHROPIC_DEFAULT_SONNET_MODEL,
            $settings.model,
            $settings.defaultModel
        )
        
        $foundModel = $null
        foreach ($modelPath in $modelPaths) {
            if ($modelPath) {
                $foundModel = $modelPath
                break
            }
        }
        
        if ($foundModel) {
            Write-Host "  ✓ 检测到配置的模型: $foundModel" -ForegroundColor Green
        } else {
            Write-Host "  ⚠ 配置文件中未找到模型设置" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "  ⚠ 无法解析配置文件" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠ 未找到用户配置文件" -ForegroundColor Yellow
    Write-Host "    位置: $userClaudeSettings" -ForegroundColor Gray
}

Write-Host ""

# 测试场景 3：标准 Anthropic 环境变量
Write-Host "场景 3: 测试标准 Anthropic 环境变量" -ForegroundColor Yellow

$anthropicVars = @{
    "ANTHROPIC_API_KEY" = $env:ANTHROPIC_API_KEY
    "ANTHROPIC_AUTH_TOKEN" = $env:ANTHROPIC_AUTH_TOKEN
    "ANTHROPIC_BASE_URL" = $env:ANTHROPIC_BASE_URL
    "ANTHROPIC_MODEL" = $env:ANTHROPIC_MODEL
    "ANTHROPIC_DEFAULT_SONNET_MODEL" = $env:ANTHROPIC_DEFAULT_SONNET_MODEL
    "ANTHROPIC_DEFAULT_OPUS_MODEL" = $env:ANTHROPIC_DEFAULT_OPUS_MODEL
}

$foundAny = $false
foreach ($varName in $anthropicVars.Keys) {
    $value = $anthropicVars[$varName]
    if ($value) {
        $foundAny = $true
        if ($varName -like "*KEY*" -or $varName -like "*TOKEN*") {
            # 隐藏敏感信息
            $displayValue = $value.Substring(0, [Math]::Min(10, $value.Length)) + "..."
        } else {
            $displayValue = $value
        }
        Write-Host "  ✓ $varName = $displayValue" -ForegroundColor Green
    }
}

if (-not $foundAny) {
    Write-Host "  ⚠ 未设置任何 Anthropic 环境变量" -ForegroundColor Yellow
}

Write-Host ""

# 显示配置优先级
Write-Host "=== 配置优先级说明 ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 环境变量 NOVEL_AI_MODEL（最高优先级）" -ForegroundColor White
Write-Host "2. 环境变量 ANTHROPIC_MODEL" -ForegroundColor White
Write-Host "3. 用户配置 ~/.claude/settings.json" -ForegroundColor White
Write-Host "4. 项目配置 .claude/settings.json" -ForegroundColor White
Write-Host "5. 默认值 claude-sonnet-4-5-20250929" -ForegroundColor White
Write-Host ""

# 显示推荐配置方法
Write-Host "=== 推荐配置方法 ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "方法 1: 在用户配置中设置（推荐）" -ForegroundColor Yellow
Write-Host '  编辑文件: $env:USERPROFILE\.claude\settings.json' -ForegroundColor Gray
Write-Host '  添加配置: "env": { "ANTHROPIC_MODEL": "LongCat-Flash-Chat" }' -ForegroundColor Gray
Write-Host ""

Write-Host "方法 2: 设置环境变量" -ForegroundColor Yellow
Write-Host '  临时设置: $env:NOVEL_AI_MODEL="LongCat-Flash-Chat"' -ForegroundColor Gray
Write-Host '  永久设置: 在系统环境变量中添加 NOVEL_AI_MODEL' -ForegroundColor Gray
Write-Host ""

Write-Host "方法 3: 使用标准 Anthropic 变量" -ForegroundColor Yellow
Write-Host '  $env:ANTHROPIC_MODEL="LongCat-Flash-Chat"' -ForegroundColor Gray
Write-Host '  $env:ANTHROPIC_BASE_URL="https://api.longcat.chat"' -ForegroundColor Gray
Write-Host '  $env:ANTHROPIC_API_KEY="Bearer your-api-key"' -ForegroundColor Gray
