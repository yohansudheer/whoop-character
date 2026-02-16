#!/bin/bash

# Automated Vercel Deployment Script
# This script will deploy your project and configure environment variables

echo "🚀 Starting Vercel deployment..."
echo ""

# Check if we're logged into Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged into Vercel. Running login..."
    vercel login
fi

echo "📦 Linking project to Vercel..."
cd /Users/yohansudheer/Desktop/whoop-character

# Deploy to production
echo "🔨 Deploying to production..."
DEPLOY_OUTPUT=$(vercel --prod --yes --scope yohan-sudheers-projects 2>&1)

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Get your deployment URL from the output above"
    echo "2. Run the following command to add environment variables:"
    echo ""
    echo "   ./configure-env.sh YOUR_DEPLOYMENT_URL"
    echo ""
else
    echo "❌ Deployment failed. Output:"
    echo "$DEPLOY_OUTPUT"
    echo ""
    echo "💡 Try deploying through the web UI instead:"
    echo "   https://vercel.com/new/clone?repository-url=https://github.com/yohansudheer/whoop-character"
fi
