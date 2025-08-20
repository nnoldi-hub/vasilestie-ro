# VasileStie.ro 🔨

**"Vasile știe. Tu doar alegi."**

VasileStie.ro este o platformă modernă pentru conectarea clienților cu meșterii potriviți din România. Găsește rapid și ușor profesioniștii de care ai nevoie pentru casa ta.

## 🌟 Caracteristici

### Pentru Clienți
- **Căutare inteligentă** - Filtrează după serviciu, locație și preț
- **Geolocalizare automată** - Detectează automat orașul tău
- **Profil verificat** - Meșteri verificați cu recenzii reale
- **Rezervări online** - Programează servicii direct din platformă
- **Evaluări și recenzii** - Vezi feedback-ul real de la alți clienți

### Pentru Meșteri
- **Profil profesional** - Prezintă-ți serviciile și expertiza
- **Gestionare comenzi** - Administrează cererile de servicii
- **Portfolio vizual** - Afișează lucrările tale anterioare
- **Sistem de rating** - Construiește-ți reputația online
- **Notificări smart** - Primește alerte pentru proiecte noi

## 🛠 Tehnologii

- **Frontend:** Next.js 13, React 18, TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **State Management:** React Hooks, Context API
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel (recomandat)

## 🚀 Instalare și rulare

### Cerințe
- Node.js 18.0 sau mai nou
- npm sau yarn

### Pași de instalare

1. **Clonează repository-ul**
   ```bash
   git clone https://github.com/nnoldi-hub/vasilestie-ro.git
   cd vasilestie-ro
   ```

2. **Instalează dependințele**
   ```bash
   npm install
   # sau
   yarn install
   ```

3. **Configurează variabilele de mediu**
   ```bash
   cp .env.example .env.local
   ```
   
   Completează în `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Pornește serverul de development**
   ```bash
   npm run dev
   # sau
   yarn dev
   ```

5. **Deschide în browser**
   ```
   http://localhost:3000
   ```

## 📁 Structura proiectului

```
vasilestie-ro/
├── app/                    # Next.js App Router
│   ├── globals.css        # Stiluri globale
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx          # Pagina principală
│   ├── servicii/         # Pagina de servicii
│   └── devino-mesterias/ # Înregistrare meșteri
├── components/           # Componente React
│   ├── auth/            # Componente autentificare
│   ├── brand/           # Logo și branding
│   ├── layout/          # Header, Footer
│   ├── sections/        # Secțiuni pagină principală
│   └── ui/              # Componente UI reutilizabile
├── hooks/               # Custom React hooks
├── lib/                # Utilități și configurări
└── public/             # Assets statice
```

## 🎨 Design System

### Culori Brand
- **Primary:** `#3B82F6` (Blue 500)
- **Secondary:** `#1E40AF` (Blue 800)
- **Accent:** `#F59E0B` (Amber 500)
- **Success:** `#10B981` (Emerald 500)
- **Error:** `#EF4444` (Red 500)

### Tipografie
- **Font Principal:** Inter (sans-serif)
- **Font Secundar:** System fonts fallback

## 📱 Funcționalități implementate

### ✅ Complet
- [x] Design responsiv pentru mobile și desktop
- [x] Sistem de căutare cu filtrare avansată
- [x] Geolocalizare automată pentru detectarea orașului
- [x] Header cu navigație și căutare
- [x] Pagina principală cu secțiuni hero, categorii, testimoniale
- [x] Pagina de servicii cu filtrare în timp real
- [x] Componente UI complete (buttons, cards, forms, etc.)
- [x] Logo și identitate vizuală VasileStie

### 🔄 În progres
- [ ] Sistem de autentificare complet
- [ ] Baza de date Supabase
- [ ] Profile utilizatori și meșteri
- [ ] Sistem de rezervări
- [ ] Chat în timp real
- [ ] Plăți online

### 📋 Planificat
- [ ] Aplicație mobilă React Native
- [ ] Sistem de notificări push
- [ ] API pentru parteneri
- [ ] Dashboard analitică
- [ ] Sistem de facturare
- [ ] Integrare cu servicii terțe (Google Maps, etc.)

## 🌐 Deployment

### Vercel (Recomandat)
1. Conectează repository-ul la Vercel
2. Configurează variabilele de mediu
3. Deploy automat la fiecare push pe main

### Manual
```bash
npm run build
npm start
```

## 🤝 Contribuție

1. Fork repository-ul
2. Creează o branch pentru feature (`git checkout -b feature/nume-feature`)
3. Commit modificările (`git commit -m 'Adaugă nume-feature'`)
4. Push pe branch (`git push origin feature/nume-feature`)
5. Deschide un Pull Request

### Standarde de cod
- TypeScript strict mode
- ESLint + Prettier pentru formatare
- Componente funcționale cu hooks
- Tailwind CSS pentru styling
- Nume descriptive pentru variabile și funcții

## 📄 Licență

Acest proiect este licențiat sub MIT License - vezi fișierul [LICENSE](LICENSE) pentru detalii.

## 📞 Contact

- **Website:** [vasilestie.ro](https://vasilestie.ro)
- **Email:** contact@vasilestie.ro
- **Issues:** [GitHub Issues](https://github.com/nnoldi-hub/vasilestie-ro/issues)

## 🙏 Mulțumiri

- [Radix UI](https://www.radix-ui.com/) pentru componente UI
- [Tailwind CSS](https://tailwindcss.com/) pentru styling
- [Lucide](https://lucide.dev/) pentru iconuri
- [Supabase](https://supabase.com/) pentru backend
- [Vercel](https://vercel.com/) pentru hosting

---

**VasileStie.ro** - Conectăm meșterii cu clienții din întreaga Românie! 🇷🇴
