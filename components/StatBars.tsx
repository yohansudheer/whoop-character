'use client';

import { StatBarsProps, StatBarProps } from '@/types';
import { getRecoveryColor } from '@/lib/stateCalculator';

/**
 * Stat bars component that displays Recovery, Sleep Performance, and Strain
 */
export function StatBars({ recovery, sleep, strain }: StatBarsProps) {
  return (
    <div className="flex flex-col gap-4 mt-5">
      <StatBar
        label="Recovery"
        value={recovery}
        max={100}
        color={getRecoveryColor(recovery)}
      />
      <StatBar
        label="Sleep Performance"
        value={sleep}
        max={100}
        color="#4A90E2"
      />
      <StatBar
        label="Strain"
        value={strain}
        max={21}
        color="#E24A4A"
      />
    </div>
  );
}

/**
 * Individual stat bar component
 */
function StatBar({ label, value, max, color }: StatBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      {/* Label and value */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800 font-medium text-sm">{label}</span>
        <span className="text-gray-600 text-sm font-mono">
          {Math.round(value)}/{max}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-7 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
