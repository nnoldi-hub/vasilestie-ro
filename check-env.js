#!/usr/bin/env node

/**
 * Script pentru verificarea configurației environment variables
 * Usage: node check-env.js
 */

console.log('🔍 Checking environment configuration...\n');

// Environment variables necesare
const requiredEnvVars = {
  'DATABASE_URL': 'Database connection string',
  'NEXTAUTH_SECRET': 'NextAuth secret key',
  'NEXTAUTH_URL': 'Application URL'
};

// Environment variables opționale
const optionalEnvVars = {
  'NEXT_PUBLIC_SUPABASE_URL': 'Supabase project URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': 'Supabase anonymous key',
  'SMTP_HOST': 'Email server host',
  'SMTP_USER': 'Email username',
  'CLOUDINARY_CLOUD_NAME': 'Cloudinary cloud name'
};

console.log('📋 Environment Information:');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`Platform: ${process.platform}`);
console.log(`Node Version: ${process.version}\n`);

console.log('✅ Required Environment Variables:');
let allRequired = true;

Object.entries(requiredEnvVars).forEach(([key, description]) => {
  const value = process.env[key];
  const status = value ? '✅ SET' : '❌ NOT SET';
  console.log(`${key}: ${status}`);
  
  if (value && key !== 'NEXTAUTH_SECRET') {
    console.log(`  └─ ${value}`);
  } else if (value && key === 'NEXTAUTH_SECRET') {
    console.log(`  └─ ${value.substring(0, 8)}...`);
  } else {
    console.log(`  └─ ${description}`);
    allRequired = false;
  }
});

console.log('\n🔧 Optional Environment Variables:');
Object.entries(optionalEnvVars).forEach(([key, description]) => {
  const value = process.env[key];
  const status = value ? '✅ SET' : '⚠️  NOT SET';
  console.log(`${key}: ${status}`);
  if (value) {
    console.log(`  └─ ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`);
  } else {
    console.log(`  └─ ${description}`);
  }
});

// Verificări specifice
console.log('\n🔬 Configuration Checks:');

// Check DATABASE_URL format
const dbUrl = process.env.DATABASE_URL;
if (dbUrl) {
  if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
    console.log('✅ DATABASE_URL format: PostgreSQL detected');
  } else if (dbUrl.startsWith('file:')) {
    console.log('⚠️  DATABASE_URL format: SQLite detected (not recommended for production)');
  } else {
    console.log('❌ DATABASE_URL format: Invalid format');
  }
} else {
  console.log('❌ DATABASE_URL: Not configured');
}

// Check NEXTAUTH_URL format
const authUrl = process.env.NEXTAUTH_URL;
if (authUrl) {
  if (authUrl.startsWith('https://')) {
    console.log('✅ NEXTAUTH_URL: HTTPS detected (production ready)');
  } else if (authUrl.startsWith('http://localhost')) {
    console.log('⚠️  NEXTAUTH_URL: Local development detected');
  } else {
    console.log('❌ NEXTAUTH_URL: Should start with https:// for production');
  }
}

// Check NEXTAUTH_SECRET strength
const authSecret = process.env.NEXTAUTH_SECRET;
if (authSecret) {
  if (authSecret.length >= 32) {
    console.log('✅ NEXTAUTH_SECRET: Good length (32+ characters)');
  } else {
    console.log('⚠️  NEXTAUTH_SECRET: Should be at least 32 characters');
  }
}

console.log('\n📊 Summary:');
if (allRequired) {
  console.log('✅ All required environment variables are set');
  console.log('🚀 Application should work correctly');
} else {
  console.log('❌ Some required environment variables are missing');
  console.log('⚠️  Application may not work correctly');
  console.log('\n🔧 To fix:');
  console.log('1. Copy .env.local.example to .env.local');
  console.log('2. Fill in the missing values');
  console.log('3. For production, add variables to your deployment platform');
}

// Check if Prisma client is generated
try {
  require('@prisma/client');
  console.log('✅ Prisma Client: Generated and available');
} catch (error) {
  console.log('❌ Prisma Client: Not generated');
  console.log('   Run: npm run db:generate');
}

console.log('\n💡 Next Steps:');
console.log('- Development: npm run dev');
console.log('- Build: npm run build');
console.log('- Deploy: Push to main branch or run deployment script');
console.log('- Setup production: node setup-production.js');

console.log('\n🔗 Useful Commands:');
console.log('- npm run db:studio  # View database');
console.log('- npm run db:migrate # Update schema');
console.log('- npm run db:seed    # Add sample data');
