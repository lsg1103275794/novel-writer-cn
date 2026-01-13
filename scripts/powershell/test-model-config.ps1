# 测试模型配置
# 用法: .\test-model-config.ps1

Write-Host "=== Novel Writer 模型配置测试 ===" -ForegroundColor Cyan
Write-Host ""

# 检查环境变量
Write-Host "1. 检查环境变量..." -ForegroundColor Yellow
$envModel = $env:NOVEL_AI_MODEL
if ($envModel) {
    Write-Host "  ✓ NOVEL_AI_MODEL = $envModel" -ForegroundColor Green
} else {
    Write-Host "  ⚠ NOVEL_AI_MODEL 未设置（将使用默认值）" -ForegroundColor Gray
}
Write-Host ""

# 检查配置文件
Write-Host "2. 检查配置文件..." -ForegroundColor Yellow
$configPath = "dist/config/model-config.json"
if (Test-Path $configPath) {
    $config = Get-Content $configPath -Raw | ConvertFrom-Json
    Write-Host "  ✓ 配置文件存在" -ForegroundColor Green
    Write-Host "  默认模型: $($config.defaultModel)" -ForegroundColor Gray
    Write-Host "  支持的模型:" -ForegroundColor Gray
    foreach ($key in $config.supportedModels.PSObject.Properties.Name) {
        $model = $config.supportedModels.$key
        Write-Host "    - $($model.name) ($($model.provider))" -ForegroundColor Gray
    }
} else {
    Write-Host "  ⚠ 配置文件不存在" -ForegroundColor Yellow
}
Write-Host ""

# 检查命令文件
Write-Host "3. 检查命令文件..." -ForegroundColor Yellow
$commandFiles = Get-ChildItem -Path "dist" -Recurse -Include "*.md","*.toml" -ErrorAction SilentlyContinue | Where-Object {
    $_.FullName -match "commands|workflows|prompts"
} | Select-Object -First 5

if ($commandFiles) {
    Write-Host "  找到 $($commandFiles.Count) 个命令文件（显示前5个）:" -ForegroundColor Green
    foreach ($file in $commandFiles) {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        if ($content -match "model:\s*(.+)") {
            $modelName = $matches[1].Trim()
            Write-Host "    $($file.Name): $modelName" -ForegroundColor Gray
        }
    }
} else {
    Write-Host "  ⚠ 未找到命令文件" -ForegroundColor Yellow
}
Write-Host ""

# 显示建议
Write-Host "=== 配置建议 ===" -ForegroundColor Cyan
Write-Host ""

if (-not $envModel) {
    Write-Host "如果使用第三方 API，请设置环境变量:" -ForegroundColor Yellow
    Write-Host '  $env:NOVEL_AI_MODEL="LongCat-Flash-Chat"' -ForegroundColor White
    Write-Host ""
}

Write-Host "初始化新项目:" -ForegroundColor Yellow
Write-Host "  novel init my-novel" -ForegroundColor White
Write-Host ""

Write-Host "更新已有项目:" -ForegroundColor Yellow
Write-Host '  .\scripts\powershell\update-model-name.ps1 -ModelName "LongCat-Flash-Chat"' -ForegroundColor White
Write-Host ""

Write-Host "查看详细文档:" -ForegroundColor Yellow
Write-Host "  docs/THIRD_PARTY_API.md" -ForegroundColor White
