#!/bin/bash

# Production Deployment Script for CodeEternity

echo "🚀 Starting production deployment..."

# Set environment
export NODE_ENV=production

# Backend Deployment
echo "📦 Deploying Backend..."

cd Backend

# Install dependencies
echo "📥 Installing backend dependencies..."
npm install --production

# Create logs directory
mkdir -p logs

# Start with PM2
echo "🔄 Starting backend with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Frontend Deployment
echo "📦 Deploying Frontend..."

cd ../Frontend

# Install dependencies
echo "📥 Installing frontend dependencies..."
npm install

# Build for production
echo "🔨 Building frontend for production..."
npm run build

echo "✅ Deployment completed successfully!"
echo "🌐 Backend: https://api.codeeternity.com"
echo "🌐 Frontend: https://codeeternity.com"

# Show PM2 status
echo "📊 PM2 Status:"
pm2 status 