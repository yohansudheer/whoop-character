import { Character2D } from '@/components/Character2D';
import { StatBars } from '@/components/StatBars';
import currentState from '@/data/current-state.json';

export default function Home() {
  const { config, data, lastUpdated } = currentState;

  return (
    <main className="relative w-screen h-screen overflow-hidden" style={{ background: '#e0e0e0' }}>
      {/* Character Container */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <Character2D
          modelPath={config.modelPath}
          eyeOpenness={config.eyeOpenness}
          animationSpeed={config.animationSpeed}
        />
      </div>

      {/* UI Overlay - Stats and Info */}
      <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-8 w-96 shadow-2xl border border-gray-200">
        <h1 className="text-gray-900 text-3xl font-bold mb-2">
          Yohan's Wellness
        </h1>
        <p className="text-gray-600 text-sm mb-6 capitalize">
          Status: <span className="text-gray-900 font-medium">{currentState.state}</span>
        </p>

        <StatBars
          recovery={data.recovery}
          sleep={data.sleepPerformance}
          strain={data.strain}
        />

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-xs">
            Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 border border-gray-200 shadow-lg">
        <p className="text-gray-700 text-sm">
          💪 Powered by Whoop Data • Updates daily at 10 AM
        </p>
      </div>
    </main>
  );
}
