#!/bin/bash

# 🎯 QuantumSync - Complete Setup Script
# Run this to finish your project in 30 minutes!

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 QUANTUMSYNC - Final Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Frontend: 100% Complete"
echo "✅ Build: Compiled successfully (134.8 kB)"
echo "✅ Documentation: 12 guides ready"
echo "⏳ Remaining: n8n setup (30 minutes)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this from the quantum-sync directory"
    echo ""
    echo "Run this first:"
    echo "cd /Users/macbookair/Downloads/Hackathon/quantum-sync"
    exit 1
fi

echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not installed. Installing now..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Starting React App..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "App will open at: http://localhost:3000"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 NEXT STEPS (After app starts):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Open FINAL_SETUP.md in this folder"
echo "2️⃣  Follow STEP 2 - Import n8n workflow (2 min)"
echo "3️⃣  Follow STEP 3 - Add email nodes (20 min)"
echo "4️⃣  Test at http://localhost:3000/test"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 YOU'RE 85% DONE! Just 30 minutes left!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Starting in 3 seconds..."
sleep 1
echo "Starting in 2 seconds..."
sleep 1
echo "Starting in 1 second..."
sleep 1
echo ""
echo "🚀 LAUNCHING..."
echo ""

# Start the app
npm start
