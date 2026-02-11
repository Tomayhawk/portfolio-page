import { PageHeader } from '../../components/Components.tsx';
import { styles } from '../../utils/styles.ts';

export default function ChessPage() {
  return (
    <div className="max-w-full">
      <div className="text-center md:text-left">
          <PageHeader title="Chess" description="My games, analysis, and favorite puzzles." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className={styles.cardBase}>
            <h2 className={styles.h2}>Recent Games</h2>
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-zinc-700 dark:text-zinc-200">vs. Opponent {i}</span>
                            <span className="text-xs text-zinc-500">Rapid • 10 min</span>
                        </div>
                        <span className="text-sm font-mono text-green-600 dark:text-green-400">Won</span>
                    </div>
                ))}
            </div>
        </div>

        <div className={styles.cardBase}>
            <h2 className={styles.h2}>Stats</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1200</div>
                    <div className="text-xs text-blue-800 dark:text-blue-300 uppercase tracking-wide font-bold mt-1">Rapid Rating</div>
                </div>
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">850</div>
                    <div className="text-xs text-violet-800 dark:text-violet-300 uppercase tracking-wide font-bold mt-1">Blitz Rating</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
