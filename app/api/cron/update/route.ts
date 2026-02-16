import { NextResponse } from 'next/server';
import { getLatestWhoopData } from '@/lib/whoop';
import { calculateCharacterState, getCharacterConfig } from '@/lib/stateCalculator';
import { writeFile } from 'fs/promises';
import { join } from 'path';

/**
 * Cron job endpoint that runs daily at 10 AM
 * Fetches Whoop data, calculates character state, and updates the JSON file
 */
export async function GET(request: Request) {
  try {
    // Verify cron secret (Vercel provides this automatically)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log('[Cron] Starting daily Whoop data update...');

    // 1. Fetch latest Whoop data
    const whoopData = await getLatestWhoopData();
    console.log('[Cron] Whoop data fetched:', whoopData);

    // 2. Calculate character state
    const state = calculateCharacterState(whoopData);
    console.log('[Cron] Character state calculated:', state);

    // 3. Get complete character configuration
    const config = getCharacterConfig(state, whoopData);

    // 4. Prepare the data to save
    const stateData = {
      state,
      config,
      data: whoopData,
      lastUpdated: new Date().toISOString(),
    };

    // 5. Save to JSON file in the data directory
    const dataPath = join(process.cwd(), 'data', 'current-state.json');
    await writeFile(dataPath, JSON.stringify(stateData, null, 2), 'utf-8');
    console.log('[Cron] State saved to:', dataPath);

    // 6. Return success response
    return NextResponse.json({
      success: true,
      state,
      data: whoopData,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[Cron] Error during update:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Allow manual triggering via POST as well (for testing)
export async function POST(request: Request) {
  return GET(request);
}
