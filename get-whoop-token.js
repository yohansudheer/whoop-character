#!/usr/bin/env node

const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');

const CLIENT_ID = '9687ec3b-fced-4938-8e28-774e2b6db849';
const REDIRECT_URI = 'http://localhost:3000/callback';

console.log('🔐 Whoop OAuth Token Generator\n');

// Check if client secret is provided
const clientSecret = process.argv[2];
if (!clientSecret) {
  console.log('❌ Please provide your Whoop Client Secret as an argument');
  console.log('\nUsage: node get-whoop-token.js YOUR_CLIENT_SECRET\n');
  console.log('Get your client secret from: https://developer.whoop.com/dashboard');
  process.exit(1);
}

console.log('✅ Client Secret provided\n');

// Create callback server
const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/callback?code=')) {
    const code = new URL(req.url, `http://localhost:3000`).searchParams.get('code');

    console.log('✅ Got authorization code\n');
    console.log('📡 Exchanging code for tokens...\n');

    // Exchange code for tokens
    const tokenData = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: CLIENT_ID,
      client_secret: clientSecret,
      redirect_uri: REDIRECT_URI
    });

    try {
      const response = await fetch('https://api.prod.whoop.com/oauth/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: tokenData.toString()
      });

      const tokens = await response.json();

      if (tokens.refresh_token) {
        console.log('✅ Got tokens!\n');

        // Save to .env.local
        const envContent = `WHOOP_CLIENT_ID=${CLIENT_ID}
WHOOP_CLIENT_SECRET=${clientSecret}
WHOOP_REFRESH_TOKEN=${tokens.refresh_token}
CRON_SECRET=cron_whoop_secret_${Date.now()}
`;

        fs.writeFileSync('.env.local', envContent);
        console.log('✅ Saved to .env.local\n');

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 SUCCESS! Add these to Vercel:\n');
        console.log('Go to: https://vercel.com/yohan-sudheers-projects/experiments/settings/environment-variables\n');
        console.log('Add these 4 variables:\n');
        console.log('1. WHOOP_CLIENT_ID');
        console.log(`   ${CLIENT_ID}\n`);
        console.log('2. WHOOP_CLIENT_SECRET');
        console.log(`   ${clientSecret}\n`);
        console.log('3. WHOOP_REFRESH_TOKEN');
        console.log(`   ${tokens.refresh_token}\n`);
        console.log('4. CRON_SECRET');
        console.log(`   cron_whoop_secret_${Date.now()}\n`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <head><title>Success!</title></head>
            <body style="font-family: system-ui; padding: 40px; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #00ff88;">✅ Authentication Successful!</h1>
              <p>Your Whoop credentials have been saved to <code>.env.local</code></p>
              <p>Check your terminal for the Vercel environment variables.</p>
              <p style="color: #666;">You can close this window.</p>
            </body>
          </html>
        `);

        setTimeout(() => {
          server.close();
          process.exit(0);
        }, 2000);
      } else {
        throw new Error(JSON.stringify(tokens));
      }
    } catch (error) {
      console.error('❌ Error exchanging code:', error.message);
      res.writeHead(500);
      res.end('Error getting tokens. Check the terminal.');
      server.close();
      process.exit(1);
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  const authUrl = `https://api.prod.whoop.com/oauth/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=read:recovery+read:cycles+read:workout+read:sleep+read:profile+read:body_measurement+offline&state=randomstate`;

  console.log('🌐 Starting local callback server on http://localhost:3000\n');
  console.log('🔓 Opening Whoop authorization page...\n');

  // Open browser
  exec(`open "${authUrl}"`);

  console.log('👉 If the browser did not open, visit:\n');
  console.log(authUrl + '\n');
  console.log('⏳ Waiting for authorization...\n');
});
