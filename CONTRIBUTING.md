# Ghid de Contribuție - VasileStie.ro

Mulțumim că vrei să contribui la VasileStie.ro! 🎉

## 🚀 Cum să începi

1. **Fork repository-ul** și clonează-l local
2. **Instalează dependințele**: `npm install`
3. **Rulează aplicația**: `npm run dev`
4. **Creează o branch**: `git checkout -b feature/nume-feature`

## 📋 Tipuri de contribuții

### 🐛 Bug Reports
- Folosește template-ul de bug report
- Include pași de reproducere
- Specifică browser-ul și OS-ul

### ✨ Feature Requests
- Descrie feature-ul dorit
- Explică de ce ar fi util
- Propune o implementare dacă ai idei

### 💻 Code Contributions
- Respectă standardele de cod
- Adaugă teste pentru funcționalități noi
- Documentează modificările

## 🛠 Standarde de dezvoltare

### TypeScript
```typescript
// ✅ Bun
interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
}

// ❌ Evită
const user: any = {};
```

### Componente React
```tsx
// ✅ Bun - Componente funcționale cu TypeScript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  onClick, 
  children 
}) => {
  return (
    <button 
      className={cn(
        'px-4 py-2 rounded',
        variant === 'primary' && 'bg-blue-600 text-white'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Styling cu Tailwind
```tsx
// ✅ Bun - Folosește utilitare Tailwind
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">

// ❌ Evită CSS custom fără motiv
<div style={{ display: 'flex', gap: '16px' }}>
```

### Denumire fișiere
- `kebab-case` pentru fișiere: `user-profile.tsx`
- `PascalCase` pentru componente: `UserProfile`
- `camelCase` pentru funcții: `getUserProfile`

## 🔧 Comenzi utile

```bash
# Developement
npm run dev          # Pornește serverul de dev
npm run build        # Build pentru producție
npm run start        # Pornește build-ul de producție
npm run lint         # Verifică codul cu ESLint
npm run lint:fix     # Repară automat problemele ESLint

# Testing (când va fi implementat)
npm run test         # Rulează toate testele
npm run test:watch   # Rulează testele în watch mode
```

## 📝 Commit Messages

Folosește formatul conventional commits:

```bash
# Tipuri de commit
feat: adaugă funcționalitate nouă
fix: repară un bug
docs: actualizează documentația
style: modificări de formatare
refactor: refactorizează codul
test: adaugă sau modifică teste
chore: task-uri de mentenanță

# Exemple
feat: adaugă sistem de notificări push
fix: repară bug la filtrarea serviciilor
docs: actualizează README cu instrucțiuni deployment
```

## 🎯 Areas de Focus

### Prioritate Înaltă
- Sistem de autentificare complet
- Integrare Supabase
- Profile utilizatori și meșteri
- Sistem de rezervări

### Prioritate Medie  
- Optimizări performanță
- Teste automatizate
- Îmbunătățiri UI/UX
- Funcționalități mobile

### Prioritate Scăzută
- Integrări terțe
- Features avansate
- Optimizări SEO

## 🧪 Testing

```bash
# Unit tests
npm run test:unit

# Integration tests  
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📱 Responsive Design

Testează pe toate breakpoint-urile:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

## ♿ Accessibility

- Folosește semantic HTML
- Adaugă `alt` text pentru imagini
- Testează cu keyboard navigation
- Verifică contrast-ul culorilor

## 🔒 Securitate

- Nu commita API keys sau secrete
- Validează toate input-urile
- Sanitizează datele utilizatorilor
- Folosește HTTPS în producție

## 📋 Pull Request Process

1. **Actualizează branch-ul** cu ultimele modificări din main
2. **Testează local** că totul funcționează
3. **Scrie un titlu descriptiv** pentru PR
4. **Completează template-ul** de PR
5. **Solicită review** de la echipa de dezvoltare
6. **Rezolvă feedback-ul** primit
7. **Așteaptă approve-ul** înainte de merge

### Template PR
```markdown
## Descriere
Scurtă descriere a modificărilor.

## Tipul modificării
- [ ] Bug fix
- [ ] Funcționalitate nouă  
- [ ] Breaking change
- [ ] Documentație

## Cum să testezi
1. Pasul 1
2. Pasul 2
3. Pasul 3

## Screenshots (dacă aplicabil)
[Adaugă screenshots]

## Checklist
- [ ] Codul urmează standardele proiectului
- [ ] Am testat modificările local
- [ ] Am adăugat/actualizat documentația
- [ ] Am adăugat teste pentru funcționalitățile noi
```

## 🤝 Code Review

Când faci review:
- Fii constructiv și respectuos
- Explică motivul sugestiilor
- Apreciază codul bun
- Testează modificările local

## 💬 Comunicare

- **GitHub Issues** - pentru bug reports și feature requests
- **GitHub Discussions** - pentru întrebări generale
- **Email** - contact@vasilestie.ro pentru probleme urgente

## 🎉 Recunoaștere

Toți contribuitorii vor fi menționați în:
- README.md
- Pagina de About
- Release notes

Mulțumim pentru contribuția ta la VasileStie.ro! 🚀
