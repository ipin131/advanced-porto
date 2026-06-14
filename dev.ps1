# Local dev starter for porto
# Usage: Right-click -> Run with PowerShell  OR  powershell -File dev.ps1

Set-Location $PSScriptRoot

# Kill anything on the ports netlify dev uses
foreach ($port in @(8888, 5173, 3000)) {
    $procId = (netstat -ano | Select-String ":$port\s" | ForEach-Object {
        ($_ -split '\s+')[-1]
    } | Select-Object -First 1)
    if ($procId -and $procId -match '^\d+$') {
        Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
        Write-Host "Killed PID $procId on port $port"
    }
}

Write-Host ""
Write-Host "Starting netlify dev..." -ForegroundColor Cyan
Write-Host "  Portfolio  -> http://localhost:8888" -ForegroundColor Green
Write-Host "  Chatbot    -> http://localhost:8888 (via Netlify Functions)" -ForegroundColor Green
Write-Host ""

npx netlify dev
