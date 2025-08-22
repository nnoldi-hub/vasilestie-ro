# Production Database Schema Update

# 1. Backup current schema
cp prisma/schema.prisma prisma/schema.sqlite.backup

# 2. Update to PostgreSQL
# În prisma/schema.prisma schimbă:
# provider = "sqlite" → provider = "postgresql"

# 3. Generate new client
npm run db:generate

# 4. Create and apply migrations
npm run db:migrate

echo "Schema updated for PostgreSQL!"
