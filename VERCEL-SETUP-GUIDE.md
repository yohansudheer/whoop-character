# Detailed Vercel Environment Variables Setup Guide

## Step-by-Step Instructions

### 1. Open the Vercel Environment Variables Page

The page should already be open in your browser. If not, visit:
```
https://vercel.com/yohan-sudheers-projects/experiments/settings/environment-variables
```

### 2. Add First Variable: WHOOP_CLIENT_ID

1. Click the **"Add"** button (blue button on the right)
2. You'll see a form with three fields:
   - **NAME (key)**: Type `WHOOP_CLIENT_ID`
   - **VALUE**: Paste `9687ec3b-fced-4938-8e28-774e2b6db849`
   - **ENVIRONMENTS**: Leave all three checkboxes checked (Production, Preview, Development)
3. Click **"Save"** button at the bottom of the form

### 3. Add Second Variable: WHOOP_CLIENT_SECRET

1. Click the **"Add"** button again
2. Fill in the form:
   - **NAME (key)**: Type `WHOOP_CLIENT_SECRET`
   - **VALUE**: Paste this exactly:
   ```
   1fd7be58edd13164987c20ef2c241de4ea73c2d556b971f1a6ec8388db797779
   ```
   - **ENVIRONMENTS**: Leave all three checkboxes checked
3. Click **"Save"**

### 4. Add Third Variable: WHOOP_REFRESH_TOKEN

1. Click the **"Add"** button again
2. Fill in the form:
   - **NAME (key)**: Type `WHOOP_REFRESH_TOKEN`
   - **VALUE**: Paste this exactly:
   ```
   i5ma2arJtPaA4pF3V42BPVUQ6XmY2k55GDCSHGkarOU.RTP0LvUbTLH_zIOGnyy3VpEsEAAD17Do7IjYxf7jhqE
   ```
   - **ENVIRONMENTS**: Leave all three checkboxes checked
3. Click **"Save"**

### 5. Add Fourth Variable: CRON_SECRET

1. Click the **"Add"** button one more time
2. Fill in the form:
   - **NAME (key)**: Type `CRON_SECRET`
   - **VALUE**: Paste this exactly:
   ```
   cron_whoop_secret_1771272656361
   ```
   - **ENVIRONMENTS**: Leave all three checkboxes checked
3. Click **"Save"**

### 6. Redeploy Your Application

After adding all 4 environment variables, you need to redeploy:

**Option A: Automatic Prompt**
- Vercel might show a banner at the top saying "Environment variables updated"
- Click the **"Redeploy"** button in that banner

**Option B: Manual Redeploy**
1. Go to the **Deployments** tab at the top
2. Find the most recent deployment (should be at the top)
3. Click the **three dots menu (⋮)** on the right
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** in the popup

### 7. Wait for Deployment (1-2 minutes)

You'll see a progress indicator. Wait until you see:
- ✅ **"Deployment Ready"** or **"Ready"** status
- The deployment will turn from yellow/orange to green

### 8. Visit Your Live Site

Once deployment is complete, visit:
```
https://experiments-xi-eight.vercel.app/
```

You should now see your character with REAL Whoop data!

---

## Quick Copy-Paste Reference

If you want to copy all values at once, here they are:

**Variable 1:**
```
Name: WHOOP_CLIENT_ID
Value: 9687ec3b-fced-4938-8e28-774e2b6db849
```

**Variable 2:**
```
Name: WHOOP_CLIENT_SECRET
Value: 1fd7be58edd13164987c20ef2c241de4ea73c2d556b971f1a6ec8388db797779
```

**Variable 3:**
```
Name: WHOOP_REFRESH_TOKEN
Value: i5ma2arJtPaA4pF3V42BPVUQ6XmY2k55GDCSHGkarOU.RTP0LvUbTLH_zIOGnyy3VpEsEAAD17Do7IjYxf7jhqE
```

**Variable 4:**
```
Name: CRON_SECRET
Value: cron_whoop_secret_1771272656361
```

---

## Troubleshooting

### "Environment variable already exists"
- This means you already added it. Skip to the next variable.

### "Invalid value format"
- Make sure you copied the ENTIRE value with no extra spaces at the beginning or end
- Try copying again directly from this guide

### Deployment stuck or failed
- Go to the Deployments tab
- Click on the latest deployment
- Scroll down to "Build Logs" to see what went wrong
- Usually just need to redeploy again

### Site still shows old data after deployment
- Hard refresh the page: Press `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Or clear your browser cache
- Wait 30 seconds and refresh again

---

## What Happens Next?

✅ Your site will show real Whoop data immediately after redeployment
✅ The character will match your current recovery state (currently 55% = Neutral)
✅ Every day at 10 AM UTC, the cron job will automatically fetch new data
✅ Your character appearance will update based on your recovery score

Your Whoop Character webpage is now fully live and automated! 🎉
