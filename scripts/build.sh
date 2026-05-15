#!/bin/bash
# Build script for Vercel
# Runs migrations if DATABASE_URL is available, then builds

set -e

echo "🔧 Running build script..."

# Try to run migrations if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
  echo "📦 Running Prisma migrations..."
  npx prisma migrate deploy || {
    echo "⚠️ Migration failed, continuing with build..."
  }
else
  echo "⚠️ DATABASE_URL not set, skipping migrations"
fi

echo "🏗️ Building Next.js..."
npx next build
