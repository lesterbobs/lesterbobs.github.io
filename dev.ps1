$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

Write-Host "Starting website dev server..." -ForegroundColor Cyan
Write-Host "Open the URL below and click 'Chinese Language Learning' to test."
Write-Host ""
npm run dev
