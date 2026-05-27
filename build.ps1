$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

# Step 1: Build the game
$gameDir = "C:\Users\Lester\OneDrive\Desktop\Chinese Language Game"
Write-Host "Building game..." -ForegroundColor Cyan
Push-Location $gameDir
try {
    npm run build
} finally {
    Pop-Location
}

# Step 2: Build the website
Write-Host ""
Write-Host "Building website..." -ForegroundColor Cyan
npm run build

Write-Host ""
Write-Host "Done. Ready to deploy from .\dist\" -ForegroundColor Green
Read-Host "Press Enter to close"
