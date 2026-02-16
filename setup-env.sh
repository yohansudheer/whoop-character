#!/bin/bash

# Complete Vercel Environment Setup Script
# This will configure all environment variables for your Whoop character app

PROJECT_URL="experiments-ewk91cusa-yohan-sudheers-projects.vercel.app"
PROD_URL="experiments-xi-eight.vercel.app"

echo "🔧 Setting up environment variables for Whoop Character"
echo "=================================================="
echo ""

# Get Vercel project info
echo "📋 Project URLs:"
echo "  Production: https://${PROD_URL}"
echo "  Preview: https://${PROJECT_URL}"
echo ""

# Step 1: Get Whoop Client Secret
echo "Step 1: Whoop Client Secret"
echo "----------------------------"
echo "Visit: https://developer.whoop.com/dashboard"
echo "1. Find your app: whoop-character-app"
echo "2. Copy the 'Client Secret'"
echo ""
read -p "Paste Client Secret here: " WHOOP_CLIENT_SECRET
echo ""

# Step 2: Get new Whoop access via OAuth
echo "Step 2: Get Whoop Refresh Token"
echo "--------------------------------"
echo "Opening OAuth authorization URL..."
echo ""

OAUTH_URL="https://api.prod.whoop.com/oauth/oauth2/auth?response_type=code&client_id=9687ec3b-fced-4938-8e28-774e2b6db849&redirect_uri=https://${PROD_URL}/api/auth/callback&scope=read:recovery%20read:sleep%20read:cycles&state=randomstate12345"

open "$OAUTH_URL"

echo "After authorizing:"
echo "1. You'll be redirected to: https://${PROD_URL}/api/auth/callback?code=XXXXX"
echo "2. Copy the full URL"
echo ""
read -p "Paste the callback URL here: " CALLBACK_URL

# Extract code from callback URL
AUTH_CODE=$(echo "$CALLBACK_URL" | grep -o 'code=[^&]*' | cut -d'=' -f2)

if [ -z "$AUTH_CODE" ]; then
    echo "❌ Could not extract authorization code from URL"
    exit 1
fi

echo "✅ Got authorization code: ${AUTH_CODE:0:20}..."
echo ""

# Exchange code for tokens
echo "Exchanging code for tokens..."
TOKEN_RESPONSE=$(curl -s -X POST "https://api.prod.whoop.com/oauth/oauth2/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=authorization_code" \
    -d "code=$AUTH_CODE" \
    -d "client_id=9687ec3b-fced-4938-8e28-774e2b6db849" \
    -d "client_secret=$WHOOP_CLIENT_SECRET" \
    -d "redirect_uri=https://${PROD_URL}/api/auth/callback")

REFRESH_TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"refresh_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$REFRESH_TOKEN" ]; then
    echo "❌ Failed to get refresh token"
    echo "Response: $TOKEN_RESPONSE"
    exit 1
fi

echo "✅ Got refresh token: ${REFRESH_TOKEN:0:20}..."
echo ""

# Step 3: Save to .env.local for local development
echo "Step 3: Saving credentials locally"
echo "-----------------------------------"
cat > .env.local << EOF
WHOOP_CLIENT_ID=9687ec3b-fced-4938-8e28-774e2b6db849
WHOOP_CLIENT_SECRET=$WHOOP_CLIENT_SECRET
WHOOP_REFRESH_TOKEN=$REFRESH_TOKEN
CRON_SECRET=cron_whoop_secret_$(date +%s)
EOF

echo "✅ Saved to .env.local"
echo ""

# Step 4: Display Vercel instructions
echo "Step 4: Add to Vercel"
echo "---------------------"
echo "Go to: https://vercel.com/yohan-sudheers-projects/experiments/settings/environment-variables"
echo ""
echo "Add these 4 environment variables:"
echo ""
echo "1. WHOOP_CLIENT_ID"
echo "   Value: 9687ec3b-fced-4938-8e28-774e2b6db849"
echo ""
echo "2. WHOOP_CLIENT_SECRET"
echo "   Value: $WHOOP_CLIENT_SECRET"
echo ""
echo "3. WHOOP_REFRESH_TOKEN"
echo "   Value: $REFRESH_TOKEN"
echo ""
echo "4. CRON_SECRET"
echo "   Value: cron_whoop_secret_$(date +%s)"
echo ""
echo "=================================================="
echo "✅ Setup complete!"
echo ""
echo "After adding the environment variables in Vercel:"
echo "1. Redeploy your app"
echo "2. Visit: https://${PROD_URL}"
echo "3. Your character should show real Whoop data!"
