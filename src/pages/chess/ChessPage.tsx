import { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ChessPage() {
  const [game, setGame] = useState(new Chess());

  // Function to handle piece movement
  function onDrop(sourceSquare: string, targetSquare: string) {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to queen for simplicity
      });

      // If move is invalid, return false
      if (move === null) return false;
      
      setGame(gameCopy);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <div className="max-w-full">
      <div className="text-center md:text-left">
          <PageHeader title="Chess" description="My games, analysis, and favorite puzzles." />
      </div>

      {/* --- Interactive Chess Board Section --- */}
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-center text-zinc-800 dark:text-zinc-200">Play vs. Self</h2>
          <div className="aspect-square w-full" data-testid="chessboard-wrapper">
            <Chessboard 
            />
          </div>
          <div className="mt-4 text-center">
             <button 
                onClick={() => setGame(new Chess())}
                className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md hover:opacity-90 transition-opacity"
             >
                Reset Board
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">Recent Games</h2>
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

        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">Stats</h2>
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
