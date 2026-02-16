# Quick Deployment Guide

Your project is ready to deploy! Follow these simple steps:

## Step 1: Import to Vercel

A browser window should have just opened to: https://vercel.com/new/clone?repository-url=https://github.com/yohansudheer/whoop-character

If not, click this link: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/yohansudheer/whoop-character)

## Step 2: Configure the Project

1. Click **"Import"** on your whoop-character repository
2. Vercel will auto-detect it as a Next.js project ✅

## Step 3: Add Environment Variables

Click **"Environment Variables"** and add these 4 variables:

### Variable 1: WHOOP_CLIENT_ID
```
WHOOP_CLIENT_ID
```
Value:
```
9687ec3b-fced-4938-8e28-774e2b6db849
```

### Variable 2: WHOOP_CLIENT_SECRET
```
WHOOP_CLIENT_SECRET
```
Value:
```
(You need to provide this - it's your Whoop app client secret)
```

### Variable 3: WHOOP_REFRESH_TOKEN
```
WHOOP_REFRESH_TOKEN
```
Value:
```
(The refresh token we got from the OAuth flow earlier)
```

### Variable 4: CRON_SECRET
```
CRON_SECRET
```
Value (generate a random string):
```
cron_whoop_secret_2024_abc123xyz789
```

## Step 4: Deploy

Click **"Deploy"** and wait 2-3 minutes for the build to complete.

## Step 5: Your Live URL

After deployment, you'll get a URL like:
```
https://whoop-character.vercel.app
```

or
```
https://whoop-character-yohan.vercel.app
```

## Step 6: Verify It Works

1. Visit your live URL
2. You should see your character in the "neutral" state (gray sweater)
3. Check that the recovery, sleep, and strain stats show your actual data

## Step 7: Set Up Auto-Updates

The cron job is already configured in `vercel.json` to run daily at 10 AM UTC.

To verify it's working:
1. Go to Vercel Dashboard → Your Project → Cron Jobs
2. You should see "Daily Whoop Update" scheduled
3. Click "Trigger" to run it manually once

## Troubleshooting

### If deployment fails:
- Check the build logs in Vercel dashboard
- Verify all 4 environment variables are set correctly
- Make sure there are no typos in the variable names

### If the page is blank:
- Check browser console for errors (F12)
- Verify the images are loading from `/images/` directory

### If data doesn't update:
- Go to Vercel → Project → Cron Jobs → View Logs
- Check if the cron job is running successfully
- Verify your WHOOP_REFRESH_TOKEN is still valid

## Need Help?

The full README has more details: `/Users/yohansudheer/Desktop/whoop-character/README.md`

---

**Your repository:** https://github.com/yohansudheer/whoop-character
**Deploy page:** https://vercel.com/new/clone?repository-url=https://github.com/yohansudheer/whoop-character
