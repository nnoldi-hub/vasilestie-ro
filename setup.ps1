# 🚀 VasileStie.ro - Script de Setup Rapid pentru Windows

Write-Host "🔨 Bun venit la VasileStie.ro!" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow

# Verifică Node.js
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js $nodeVersion detectat" -ForegroundColor Green
    
    $versionNumber = [int]($nodeVersion -replace 'v|\..*', '')
    if ($versionNumber -lt 18) {
        Write-Host "❌ Node.js $nodeVersion detectat. Te rugăm să actualizezi la Node.js 18 sau mai nou." -ForegroundColor Red
        Write-Host "Descarcă de la: https://nodejs.org/" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Node.js nu este instalat. Te rugăm să instalezi Node.js 18+ de la https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verifică npm
try {
    $npmVersion = npm -v
    Write-Host "✅ npm $npmVersion detectat" -ForegroundColor Green
} catch {
    Write-Host "❌ npm nu este disponibil" -ForegroundColor Red
    exit 1
}

# Instalează dependințele
Write-Host "📦 Instalez dependențele..." -ForegroundColor Blue
try {
    npm install
    Write-Host "✅ Dependințele au fost instalate cu succes" -ForegroundColor Green
} catch {
    Write-Host "❌ Eroare la instalarea dependințelor" -ForegroundColor Red
    exit 1
}

# Creează fișierul .env.local dacă nu există
if (!(Test-Path ".env.local")) {
    Write-Host "⚙️ Creez fișierul de configurare .env.local..." -ForegroundColor Blue
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ .env.local creat din .env.example" -ForegroundColor Green
    Write-Host "💡 Nu uita să completezi variabilele de mediu în .env.local" -ForegroundColor Yellow
} else {
    Write-Host "⚠️ .env.local există deja" -ForegroundColor Yellow
}

# Verifică dacă este repository git
if (!(Test-Path ".git")) {
    Write-Host "🔗 Inițializez repository-ul git..." -ForegroundColor Blue
    git init
    git add .
    git commit -m "feat: setup initial VasileStie.ro"
    Write-Host "✅ Git repository inițializat" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository detectat" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Setup complet!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Comenzi disponibile:" -ForegroundColor Cyan
Write-Host "  npm run dev     - Pornește serverul de development" -ForegroundColor White
Write-Host "  npm run build   - Construiește aplicația pentru producție" -ForegroundColor White
Write-Host "  npm run start   - Pornește aplicația built" -ForegroundColor White
Write-Host "  npm run lint    - Verifică codul cu ESLint" -ForegroundColor White
Write-Host ""
Write-Host "📚 Citește README.md pentru mai multe informații" -ForegroundColor Cyan
Write-Host "🐛 Raportează probleme la: https://github.com/USERNAME/vasilestie-ro/issues" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Pentru a porni aplicația:" -ForegroundColor Green
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "Aplicația va fi disponibilă la: http://localhost:3000" -ForegroundColor Magenta
