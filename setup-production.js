#!/usr/bin/env node

/**
 * Script pentru configurarea automată a aplicației pentru producție
 * Usage: node setup-production.js [environment]
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const environment = process.argv[2] || 'production';

console.log(`🔧 Setting up ${environment} environment...`);

// Generate secure random secrets
const generateSecret = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Configuration templates
const configs = {
  vercel: {
    DATABASE_URL: 'postgresql://username:password@host:port/database?sslmode=require',
    NEXTAUTH_SECRET: generateSecret(),
    NEXTAUTH_URL: 'https://your-domain.vercel.app',
    NODE_ENV: 'production'
  },
  production: {
    DATABASE_URL: 'postgresql://username:password@host:port/database?sslmode=require',
    NEXTAUTH_SECRET: generateSecret(),
    NEXTAUTH_URL: 'https://your-custom-domain.com',
    NODE_ENV: 'production'
  },
  staging: {
    DATABASE_URL: 'postgresql://username:password@host:port/database?sslmode=require',
    NEXTAUTH_SECRET: generateSecret(),
    NEXTAUTH_URL: 'https://staging.your-domain.com',
    NODE_ENV: 'staging'
  }
};

const config = configs[environment] || configs.production;

console.log('📝 Generated configuration:');
console.log('===========================');

Object.entries(config).forEach(([key, value]) => {
  if (key === 'NEXTAUTH_SECRET') {
    console.log(`${key}=${value.substring(0, 8)}...`);
  } else {
    console.log(`${key}=${value}`);
  }
});

console.log('\n🔐 Security Notes:');
console.log('- Change DATABASE_URL to your actual database connection string');
console.log('- Keep NEXTAUTH_SECRET secure and never commit it to version control');
console.log('- Update NEXTAUTH_URL to your actual domain');
console.log('- Add these environment variables to your deployment platform');

console.log('\n📚 Deployment Instructions:');
console.log('1. Create a PostgreSQL database (Vercel Postgres, Supabase, etc.)');
console.log('2. Add the environment variables above to your deployment platform');
console.log('3. Run: npm run db:deploy (to apply migrations)');
console.log('4. Run: npm run db:seed (to seed initial data)');
console.log('5. Deploy your application');

console.log('\n✅ Setup complete!');

// Save configuration to a file for reference
const envContent = Object.entries(config)
  .map(([key, value]) => `${key}="${value}"`)
  .join('\n');

fs.writeFileSync(`.env.${environment}.example`, envContent);
console.log(`\n📁 Configuration saved to .env.${environment}.example`);

console.log('\n🚨 IMPORTANT: Add these variables to your deployment platform\'s environment settings!');
