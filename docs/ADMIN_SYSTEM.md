# Sistem Admin VasileStie.ro

## Prezentare Generală

Sistemul de administrare VasileStie.ro este o aplicație completă de management al echipei și administrării platformei. Permite gestionarea membrilor echipei cu un sistem sofisticat de roluri și permisiuni.

## Funcționalități Principale

### 🏠 Dashboard Principal
- **Statistici în timp real**: Total membri, membri activi, activitate recentă
- **Distribuție pe roluri**: Vizualizare grafică a membrilor pe fiecare rol
- **Membri recenți**: Lista ultimilor membri adăugați
- **Activitate recentă**: Jurnal cu ultimele acțiuni efectuate
- **Alertă pentru aprobări**: Notificări pentru membri în așteptarea activării

### 👥 Gestionare Echipă
- **Vizualizare completă**: Tabel cu toți membrii echipei
- **Filtrare avansată**: După rol, status, departament și căutare text
- **Acțiuni membre**: Activare/dezactivare, editare, ștergere, resetare parolă
- **Export date**: Posibilitate de export în CSV

### 🔐 Sistem de Roluri și Permisiuni

#### Roluri Disponibile:
1. **Administrator** - Acces complet la toate funcționalitățile
2. **Verificator Meșteri** - Verificarea și aprobarea meșterilor
3. **Suport Clienți** - Gestionarea suportului și rezervărilor
4. **Marketing** - Gestionarea campaniilor și conținutului
5. **Moderator** - Moderarea conținutului și interacțiunilor
6. **Content Manager** - Gestionarea conținutului platformei

#### Categorii de Permisiuni:
- **Users**: Gestionarea utilizatorilor
- **Craftsmen**: Gestionarea meșterilor
- **Bookings**: Gestionarea rezervărilor
- **Content**: Gestionarea conținutului
- **Marketing**: Campanii și comunicare
- **System**: Setări și administrare sistem

### ✨ Funcționalități Avansate
- **Formular complex**: Tab-uri pentru informații personale, rol/permisiuni, setări
- **Permisiuni customizabile**: Posibilitatea de a adăuga permisiuni suplimentare
- **Jurnal activitate**: Tracking complet al tuturor acțiunilor
- **Interfață responsive**: Optimizată pentru desktop și mobil

## Structura Proiectului

```
components/admin/
├── admin-layout.tsx          # Layout principal cu navigare
├── admin-dashboard.tsx       # Dashboard cu statistici
├── team-management.tsx       # Gestionare membri echipă
└── member-form-dialog.tsx    # Formular adăugare/editare membru

lib/
├── types/admin.ts           # Tipuri TypeScript pentru admin
├── services/admin-service.ts # Servicii pentru operațiuni CRUD
└── contexts/admin-context.tsx # Context React pentru state management

app/admin/
└── page.tsx                 # Pagina principală admin
```

## Utilizare

### Accesarea Sistemului
Accesați `/admin` în browser pentru a deschide panoul de administrare.

### Adăugarea unui Membru Nou
1. Accesați secțiunea "Echipa"
2. Faceți clic pe "Adaugă Membru"
3. Completați informațiile în cele 3 tab-uri:
   - **Informații Personale**: Nume, email, telefon, departament
   - **Rol și Permisiuni**: Selectarea rolului și permisiuni suplimentare
   - **Setări**: Opțiuni pentru email de bun venit

### Gestionarea Membrilor Existenți
- **Editare**: Click pe butonul de editare din tabela de membri
- **Activare/Dezactivare**: Toggle rapid pentru statusul membrului
- **Resetare parolă**: Generare automată de link pentru resetarea parolei
- **Ștergere**: Cu confirmare pentru siguranță

## Tehnologii Utilizate

- **Next.js 13**: Framework React cu App Router
- **TypeScript**: Tipizare statică pentru siguranță
- **Tailwind CSS**: Stilizare utility-first
- **Radix UI**: Componente accessible și personalizabile
- **React Context**: State management pentru date admin
- **Lucide React**: Iconuri moderne și consistente

## Configurare Dezvoltare

### Prerequizite
- Node.js 18+
- npm sau yarn

### Instalare
```bash
cd project
npm install
npm run dev
```

### Dezvoltare
- Serverul de dezvoltare: `http://localhost:3000/admin`
- Hot reload activat pentru toate componentele
- TypeScript strict mode pentru validări

## Caracteristici de Securitate

### Implementate:
- **Tipizare strictă**: Previne erorile de runtime
- **Validare formulare**: Verificări client-side complete
- **Confirmări acțiuni**: Pentru operațiuni sensibile (ștergere)
- **Separare roluri**: Fiecare rol cu permisiuni specifice

### De Implementat:
- **Autentificare**: Verificare utilizator autentificat
- **Autorizare**: Validare permisiuni pe server
- **Audit trail**: Logging complet al acțiunilor
- **Rate limiting**: Protecție împotriva abuzurilor

## Mock Data

Sistemul include date mock pentru testare și dezvoltare:
- 3 membri de echipă cu roluri diferite
- Log-uri de activitate simulate
- Statistici generate dinamic

## Extensibilitate

### Adăugarea unui Rol Nou:
1. Actualizați tipul `UserRole` în `lib/types/admin.ts`
2. Adăugați configurația în obiectul `ROLES`
3. Definiți permisiunile specifice rolului

### Adăugarea unei Permisiuni Noi:
1. Adăugați permisiunea în array-ul `PERMISSIONS`
2. Specificați categoria corespunzătoare
3. Actualizați rolurile care ar trebui să o conțină

### Adăugarea unei Secțiuni Admin Noi:
1. Creați componenta în `components/admin/`
2. Adăugați ruta în `admin-layout.tsx`
3. Implementați logica în context dacă e necesar

## Performance

- **Lazy loading**: Componentele se încarcă la cerere
- **Memoization**: React.memo pentru componente statice
- **Virtual scrolling**: Pentru liste mari de membri
- **Debounced search**: Căutare optimizată cu întârziere

## Roadmap

### Versiunea 2.0:
- [ ] Autentificare completă cu JWT
- [ ] Integrare bază de date reală
- [ ] Notificări push pentru adminii
- [ ] Dashboard cu grafice interactive
- [ ] Export în multiple formate (PDF, Excel)
- [ ] Sistem de backup automatizat

### Versiunea 3.0:
- [ ] API REST completă
- [ ] Aplicație mobilă pentru admini
- [ ] Integrare cu servicii externe
- [ ] Machine learning pentru detectarea anomaliilor
- [ ] Workflow de aprobare în mai multe etape

## Contribuție

Pentru dezvoltarea sistemului de admin:
1. Respectați structura de fișiere existentă
2. Utilizați TypeScript pentru toate componentele noi
3. Adăugați validări corespunzătoare
4. Testați funcționalitatea pe mobile și desktop
5. Documentați orice schimbări majore

## Suport

Pentru întrebări sau probleme legate de sistemul de admin, creați un issue în repository sau contactați echipa de dezvoltare.
