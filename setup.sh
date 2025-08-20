#!/bin/bash

# 🚀 VasileStie.ro - Script de Setup Rapid

echo "🔨 Bun venit la VasileStie.ro!"
echo "================================"

# Verifică Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nu este instalat. Te rugăm să instalezi Node.js 18+ de la https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "❌ Node.js $NODE_VERSION detectat. Te rugăm să actualizezi la Node.js 18 sau mai nou."
    exit 1
fi

echo "✅ Node.js $(node -v) detectat"

# Verifică npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm nu este disponibil"
    exit 1
fi

echo "✅ npm $(npm -v) detectat"

# Instalează dependințele
echo "📦 Instalez dependințele..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Eroare la instalarea dependințelor"
    exit 1
fi

echo "✅ Dependințele au fost instalate cu succes"

# Creează fișierul .env.local dacă nu există
if [ ! -f ".env.local" ]; then
    echo "⚙️ Creez fișierul de configurare .env.local..."
    cp .env.example .env.local
    echo "✅ .env.local creat din .env.example"
    echo "💡 Nu uita să completezi variabilele de mediu în .env.local"
else
    echo "⚠️ .env.local există deja"
fi

# Verifică dacă este repository git
if [ ! -d ".git" ]; then
    echo "🔗 Inițializez repository-ul git..."
    git init
    git add .
    git commit -m "feat: setup initial VasileStie.ro"
    echo "✅ Git repository inițializat"
else
    echo "✅ Git repository detectat"
fi

echo ""
echo "🎉 Setup complet!"
echo "================================"
echo ""
echo "Comenzi disponibile:"
echo "  npm run dev     - Pornește serverul de development"
echo "  npm run build   - Construiește aplicația pentru producție"  
echo "  npm run start   - Pornește aplicația built"
echo "  npm run lint    - Verifică codul cu ESLint"
echo ""
echo "📚 Citește README.md pentru mai multe informații"
echo "🐛 Raportează probleme la: https://github.com/USERNAME/vasilestie-ro/issues"
echo ""
echo "🚀 Pentru a porni aplicația:"
echo "   npm run dev"
echo ""
echo "Aplicația va fi disponibilă la: http://localhost:3000"
