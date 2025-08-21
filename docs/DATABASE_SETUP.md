# 🗄️ Database Setup Guide

## Opțiuni pentru Baza de Date de Producție

### Opțiunea 1: **Vercel Postgres** (Recomandat - cel mai simplu)
```bash
# 1. În Vercel Dashboard:
- Mergi la Storage tab
- Creează Postgres Database
- Copiază CONNECTION_STRING

# 2. Actualizează Environment Variables în Vercel:
DATABASE_URL="postgresql://user:pass@host:port/dbname"
```

### Opțiunea 2: **Railway** (Free tier generos)
```bash
# 1. Creează cont pe railway.app
# 2. New Project → PostgreSQL
# 3. Copiază DATABASE_URL din Settings
```

### Opțiunea 3: **Supabase** (Open-source, free tier bun)
```bash
# 1. Creează cont pe supabase.com
# 2. New Project → PostgreSQL
# 3. Settings → Database → Connection string
```

### Opțiunea 4: **PlanetScale** (MySQL serverless)
```bash
# 1. Creează cont pe planetscale.com  
# 2. New Database → MySQL
# 3. Copiază connection string
```

## 🔧 Setup După Alegerea Provider-ului

### 1. Actualizează Schema pentru PostgreSQL
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"  // schimbă din sqlite
  url      = env("DATABASE_URL")
}
```

### 2. Environment Variables în Vercel
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-super-secret-key-for-production"
NEXTAUTH_URL="https://vasilestie.ro"
```

### 3. Deploy și Migrate
```bash
# Va rula automat în Vercel deployment
npx prisma generate
npx prisma db push
```

### 4. Seed Initial Data (Opțional)
```bash
# Pentru a adăuga date test în producție
npx prisma db seed
```

## 🔐 Securitate Recomandări

1. **Environment Variables**: Toate secretele în Vercel Settings
2. **Database Access**: Restricționează IP-urile
3. **Backup**: Setează backup automat la provider
4. **SSL**: Toate conexiunile prin HTTPS
5. **Rate Limiting**: Pentru API-uri publice

## 📊 Monitorizare

- **Vercel Analytics**: Trafic și performance
- **Database Metrics**: La provider-ul ales
- **Error Tracking**: Sentry sau LogRocket (opțional)
