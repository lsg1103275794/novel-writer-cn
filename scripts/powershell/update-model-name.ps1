# 批量更新命令文件中的模型名称
# 用法: .\update-model-name.ps1 -ModelName "LongCat-Flash-Chat"

param(
    [Parameter(Mandatory=$true)]
    [string]$ModelName
)

Write-Host "正在更新模型名称为: $ModelName" -ForegroundColor Cyan

# 查找所有命令文件
$commandFiles = Get-ChildItem -Path "dist" -Recurse -Include "*.md","*.toml" | Where-Object {
    $_.FullName -match "commands|workflows|prompts"
}

$updatedCount = 0

foreach ($file in $commandFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # 替换模型名称
    if ($content -match "model:\s*claude-sonnet-4-5-20250929") {
        $newContent = $content -replace "model:\s*claude-sonnet-4-5-20250929", "model: $ModelName"
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "  ✓ 已更新: $($file.FullName)" -ForegroundColor Green
        $updatedCount++
    }
}

Write-Host "`n总共更新了 $updatedCount 个文件" -ForegroundColor Green
Write-Host "提示: 如果你已经初始化了项目，需要在项目目录中也运行此脚本" -ForegroundColor Yellow
