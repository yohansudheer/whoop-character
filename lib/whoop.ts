import { WhoopData } from '@/types';

/**
 * Fetches the latest Whoop data from yesterday's cycle
 * Uses the Whoop MCP server tools to get recovery, sleep, and strain data
 */
export async function getLatestWhoopData(): Promise<WhoopData> {
  try {
    // Get yesterday's date for fetching previous day's data
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString().split('T')[0];

    // In production, this will call the Whoop MCP tools
    // For now, returning mock data for development
    // TODO: Replace with actual Whoop MCP tool calls once deployed

    /*
    Actual implementation will use Whoop MCP tools:

    1. Get recovery data:
       const recoveryData = await whoopGetRecoveryCollection({
         start: yesterdayISO,
         end: yesterdayISO,
         limit: 1
       });

    2. Get sleep data:
       const sleepData = await whoopGetSleepCollection({
         start: yesterdayISO,
         end: yesterdayISO,
         limit: 1
       });

    3. Get strain data from cycles:
       const cycleData = await whoopGetCycleCollection({
         start: yesterdayISO,
         end: yesterdayISO,
         limit: 1
       });
    */

    // Mock data for development
    const mockData: WhoopData = {
      recovery: Math.floor(Math.random() * 100), // Random 0-100
      sleepPerformance: Math.floor(Math.random() * 100), // Random 0-100
      strain: Math.floor(Math.random() * 21), // Random 0-21
    };

    return mockData;

  } catch (error) {
    console.error('Error fetching Whoop data:', error);

    // Return neutral default values on error
    return {
      recovery: 50,
      sleepPerformance: 50,
      strain: 10,
    };
  }
}

/**
 * Helper function to format date for Whoop API
 */
export function formatDateForWhoop(date: Date): string {
  return date.toISOString();
}
