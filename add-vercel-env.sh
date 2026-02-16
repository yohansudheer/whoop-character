#!/bin/bash

# This script will print instructions and copy values to clipboard for easy pasting

echo "🔧 Vercel Environment Variables Setup"
echo "======================================"
echo ""
echo "Opening Vercel environment variables page..."
echo ""

open "https://vercel.com/yohan-sudheers-projects/experiments/settings/environment-variables"

sleep 3

echo "I'll copy each value to your clipboard. After each one:"
echo "1. Click 'Add' button on the Vercel page"
echo "2. Type the NAME shown below"
echo "3. Paste (Cmd+V) the VALUE (already copied to clipboard)"
echo "4. Click 'Save'"
echo ""
read -p "Press ENTER when ready to start..."

# Variable 1
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "VARIABLE 1 of 4"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "NAME to type: WHOOP_CLIENT_ID"
echo ""
echo "Copying VALUE to clipboard..."
echo -n "9687ec3b-fced-4938-8e28-774e2b6db849" | pbcopy
echo "✅ VALUE copied! Press Cmd+V to paste it"
echo ""
read -p "Press ENTER after you've saved this variable..."

# Variable 2
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "VARIABLE 2 of 4"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "NAME to type: WHOOP_CLIENT_SECRET"
echo ""
echo "Copying VALUE to clipboard..."
echo -n "1fd7be58edd13164987c20ef2c241de4ea73c2d556b971f1a6ec8388db797779" | pbcopy
echo "✅ VALUE copied! Press Cmd+V to paste it"
echo ""
read -p "Press ENTER after you've saved this variable..."

# Variable 3
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "VARIABLE 3 of 4"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "NAME to type: WHOOP_REFRESH_TOKEN"
echo ""
echo "Copying VALUE to clipboard..."
echo -n "i5ma2arJtPaA4pF3V42BPVUQ6XmY2k55GDCSHGkarOU.RTP0LvUbTLH_zIOGnyy3VpEsEAAD17Do7IjYxf7jhqE" | pbcopy
echo "✅ VALUE copied! Press Cmd+V to paste it"
echo ""
read -p "Press ENTER after you've saved this variable..."

# Variable 4
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "VARIABLE 4 of 4"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "NAME to type: CRON_SECRET"
echo ""
echo "Copying VALUE to clipboard..."
echo -n "cron_whoop_secret_1771272656361" | pbcopy
echo "✅ VALUE copied! Press Cmd+V to paste it"
echo ""
read -p "Press ENTER after you've saved this variable..."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 All variables added!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Now click the 'Redeploy' button that should appear"
echo "at the top of the Vercel page."
echo ""
echo "Your site will be live with real Whoop data in 1-2 minutes!"
