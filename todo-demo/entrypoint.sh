#!/bin/sh

echo "📜 Starting entrypoint script..."
echo "🔍 Checking for dist/main.js..."
ls -l dist/main.js

echo "⏳ Running migrations..."
npx prisma migrate deploy

if [ $? -eq 0 ]; then
  echo "✅ Migrations successful, starting app..."
  exec node dist/main
else
  echo "❌ Migrations failed!"
  exit 1
fi
