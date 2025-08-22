# VasileStie.ro - Deployment Guide 🚀

Ghid complet pentru deploy-ul aplicației în producție.

## 🏗️ Arhitectura Aplicației

- **Framework**: Next.js 13+ cu App Router
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (recomandat)
- **Styling**: Tailwind CSS

## 🚀 Deploy pe Vercel

### 1. Pregătire Locală

```bash
# Generează configurația pentru producție
node setup-production.js vercel

# Verifică că totul funcționează local
npm run build
npm run start
```

### 2. Configurare Vercel

1. **Conectează repository-ul la Vercel**:
   - Mergi pe [vercel.com](https://vercel.com)
   - Import project din GitHub
   - Selectează repository-ul `vasilestie-ro`

2. **Configurează Environment Variables**:
   ```bash
   # În Vercel Dashboard → Settings → Environment Variables
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="generated-secret-from-setup"
   NEXTAUTH_URL="https://your-project.vercel.app"
   ```

3. **Configurează Database**:
   
   **Opțiunea A: Vercel Postgres**
   ```bash
   # În Vercel Dashboard → Storage → Create Database → Postgres
   # Vercel va genera automat DATABASE_URL
   ```
   
   **Opțiunea B: Supabase**
   ```bash
   # Creează proiect pe supabase.com
   # Copiază connection string din Settings → Database
   DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
   ```

### 3. Deploy

```bash
# Vercel va deploy automat la fiecare push pe main/master
git push origin master

# Sau deploy manual cu Vercel CLI
npx vercel --prod
```

## 🌐 Deploy pe Domeniu Propriu

### 1. Configurează Domeniul

```bash
# Generează configurația pentru domeniul tău
node setup-production.js production
```

### 2. Actualizează Environment Variables

```bash
NEXTAUTH_URL="https://your-domain.com"
# Restul variabilelor rămân la fel
```

### 3. Configurează DNS

În Vercel Dashboard → Domains:
- Adaugă domeniul tău
- Configurează DNS records conform instrucțiunilor

## 🗄️ Configurare Database

### Schema Migrations

```bash
# Pentru prima dată (development)
npm run db:migrate

# Pentru producție (automated)
npm run db:deploy
```

### Seed Database

```bash
# Populează baza de date cu date inițiale
npm run db:seed
```

### Database Studio (development)

```bash
# Vizualizează și editează datele
npm run db:studio
```

## 🔒 Environment Variables

### Development (.env.local)
```env
DATABASE_URL="postgresql://localhost:5432/vasilestie_dev"
NEXTAUTH_SECRET="dev-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Production
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
NEXTAUTH_SECRET="super-secure-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 🔄 Database Schema Updates

### Când modifici schema:

1. **Update prisma/schema.prisma**
2. **Generează migration**:
   ```bash
   npm run db:migrate
   ```
3. **Deploy în producție**:
   ```bash
   npm run db:deploy
   ```

## 🛠️ Troubleshooting

### Build Errors
```bash
# Regenerează Prisma client
npm run db:generate

# Verifică environment variables
node check-env.js
```

### Database Connection Issues
```bash
# Testează conexiunea
npx prisma db push --accept-data-loss
```

### Authentication Issues
- Verifică că `NEXTAUTH_SECRET` este setat
- Verifică că `NEXTAUTH_URL` matches domeniul exact
- Verifică că database schema include tabelele NextAuth

## 📊 Monitoring & Logs

### Vercel Logs
```bash
# Vezi logs în timp real
npx vercel logs --follow

# Vezi logs pentru un deployment specific
npx vercel logs [deployment-url]
```

### Database Monitoring
- **Vercel Postgres**: Dashboard în Vercel
- **Supabase**: Dashboard în Supabase

## 🔐 Security Checklist

- [ ] `NEXTAUTH_SECRET` este generat random și securizat
- [ ] Database URL nu este expus în client-side code
- [ ] CORS este configurat corect
- [ ] Rate limiting este implementat pentru API routes
- [ ] Input validation este în toate API endpoints

## 📈 Performance Optimization

### Database
- Indexuri pe câmpuri frecvent folosite
- Connection pooling configurat
- Query optimization cu Prisma

### Next.js
- Image optimization activat
- Static generation pentru pagini statice
- API routes optimizate cu dynamic imports

## 🚨 Backup & Recovery

### Database Backup
```bash
# Export schema și date
pg_dump $DATABASE_URL > backup.sql

# Import backup
psql $DATABASE_URL < backup.sql
```

### Environment Backup
- Salvează environment variables într-un password manager
- Documentează toate serviciile externe folosite

---

## 📞 Support

Pentru probleme de deployment, verifică:
1. [Vercel Documentation](https://vercel.com/docs)
2. [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
3. [Prisma Production Checklist](https://www.prisma.io/docs/guides/deployment)

**Contact**: Pentru suport tehnic, deschide un issue pe GitHub.
