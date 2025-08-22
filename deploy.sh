#!/bin/bash

echo "🚀 Starting deployment process..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm ci

# 2. Generate Prisma Client
echo "🔄 Generating Prisma client..."
npx prisma generate

# 3. Run database migrations
echo "🗄️ Running database migrations..."
if [ "$NODE_ENV" = "production" ]; then
    npx prisma migrate deploy
else
    npx prisma migrate dev --name deployment
fi

# 4. Seed database if needed (only for first deployment)
if [ "$SEED_DATABASE" = "true" ]; then
    echo "🌱 Seeding database..."
    npx prisma db seed
fi

# 5. Build the application
echo "🔨 Building application..."
npm run build

echo "✅ Deployment complete!"
