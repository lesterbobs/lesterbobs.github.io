# Deploy script for the Lester Roberts site.
#
# First run:    .\deploy.ps1 -Repo https://github.com/<user>/<repo>.git
# Later runs:   .\deploy.ps1 -Message "Updated art page"
#
# After the first push, go to GitHub -> Settings -> Pages and set:
#   Source: Deploy from a branch | Branch: main | Folder: /(root)

param(
    [string]$Message = "Update site",
    [string]$Repo = ""
)

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

if (-not (Test-Path ".git")) {
    Write-Host "No git repo found. Initializing..." -ForegroundColor Cyan
    git init
    git branch -M main

    if (-not $Repo) {
        $Repo = Read-Host "Paste your GitHub repo URL (e.g. https://github.com/you/site.git)"
    }
    git remote add origin $Repo
}
elseif ($Repo) {
    Write-Host "Updating remote origin to $Repo" -ForegroundColor Cyan
    git remote remove origin 2>$null
    git remote add origin $Repo
}

git add .

$pending = git status --porcelain
if (-not $pending) {
    Write-Host "Nothing to commit. Working tree clean." -ForegroundColor Yellow
    exit 0
}

git commit -m $Message
if (-not $?) { exit 1 }

Write-Host "Pushing to origin/main..." -ForegroundColor Cyan
git push -u origin main

Write-Host ""
Write-Host "Done. Site will be live at https://laroberts.net within a minute or two." -ForegroundColor Green
Write-Host "(First-time setup: enable GitHub Pages under repo Settings -> Pages.)" -ForegroundColor DarkGray
