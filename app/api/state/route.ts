import { NextResponse } from 'next/server';
import { getLatestWhoopData } from '@/lib/whoop';
import { calculateCharacterState, getCharacterConfig } from '@/lib/stateCalculator';

/**
 * API endpoint that returns current character state based on latest Whoop data
 * This is called by the frontend to get real-time data
 */
export async function GET() {
  try {
    // Fetch latest Whoop data
    const whoopData = await getLatestWhoopData();

    // Calculate character state
    const state = calculateCharacterState(whoopData);

    // Get complete character configuration
    const config = getCharacterConfig(state, whoopData);

    // Return the state data
    return NextResponse.json({
      state,
      config,
      data: whoopData,
      lastUpdated: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[API] Error fetching state:', error);

    // Return fallback data from static file
    const fallbackData = await import('@/data/current-state.json');
    return NextResponse.json(fallbackData.default);
  }
}

// Enable caching for 5 minutes
export const revalidate = 300;
