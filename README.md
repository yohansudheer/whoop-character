# Whoop Character Webpage

A real-time health visualization showing your wellness state through an animated character based on your Whoop recovery data.

## Features

- **Real-time Whoop Data Integration**: Displays your current recovery, sleep performance, and strain
- **Dynamic Character States**: Character appearance changes based on your recovery score:
  - 80-100%: Energetic (suit & tie)
  - 60-79%: Good (blue shirt, healthy look)
  - 40-59%: Neutral (gray sweater, casual)
  - 20-39%: Tired (dark clothes, messy hair)
  - 0-19%: Exhausted (hunched posture)
- **Automatic Daily Updates**: Cron job updates your stats every day at 10 AM
- **Smooth Animations**: Breathing animation for a lifelike character display

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Whoop API
- Vercel Cron Jobs

## Deploy to Vercel

### Quick Deploy (Recommended)

1. Visit [Vercel Dashboard](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository: `yohansudheer/whoop-character`
4. Configure environment variables (see below)
5. Click "Deploy"

### Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
WHOOP_CLIENT_ID=9687ec3b-fced-4938-8e28-774e2b6db849
WHOOP_CLIENT_SECRET=your_client_secret_here
WHOOP_REFRESH_TOKEN=your_refresh_token_here
CRON_SECRET=your_cron_secret_here
```

**Getting Your Whoop Credentials:**

1. **Client ID & Secret**: Already configured (see `.env.example`)
2. **Refresh Token**: You'll need to go through the OAuth flow once:
   - Visit: `https://api.prod.whoop.com/oauth/oauth2/auth?response_type=code&client_id=9687ec3b-fced-4938-8e28-774e2b6db849&redirect_uri=https://your-vercel-url.vercel.app/api/auth/callback&scope=read:recovery read:sleep read:cycles&state=randomstate12345`
   - Replace `your-vercel-url.vercel.app` with your actual Vercel deployment URL
   - Authorize the app
   - Exchange the code for a refresh token (see Whoop API docs)
3. **Cron Secret**: Generate a random string for securing your cron endpoint

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yohansudheer/whoop-character.git
cd whoop-character
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Add your Whoop credentials to `.env.local`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## How It Works

1. **Data Fetching**: The `/api/cron/update` endpoint fetches latest Whoop data
2. **State Calculation**: Recovery score determines character state
3. **Character Display**: 2D character image updates based on state
4. **Automatic Updates**: Vercel Cron runs daily at 10 AM to refresh data

## Project Structure

```
whoop-character/
├── app/
│   ├── api/cron/update/route.ts  # Cron job for daily updates
│   └── page.tsx                   # Main page
├── components/
│   ├── Character2D.tsx            # Character display component
│   └── StatBars.tsx               # Health metrics display
├── data/
│   └── current-state.json         # Current state data
├── lib/
│   ├── whoop.ts                   # Whoop API client
│   └── stateCalculator.ts         # State calculation logic
├── public/
│   └── images/                    # Character images (5 states)
└── types/
    └── index.ts                   # TypeScript types
```

## Character Images

All character images have transparent backgrounds and are optimized for display on the light gray background (#e0e0e0).

## Cron Job Configuration

The cron job is configured in `vercel.json` to run daily at 10 AM UTC. You can modify the schedule by editing the cron expression.


## License

MIT
