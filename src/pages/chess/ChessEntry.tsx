import { useParams } from 'react-router-dom';
import { CHESS_GAMES } from '../../utils/data.ts';
import { styles } from '../../utils/styles.ts';

export default function ChessGameDetailPage() {
  const { id } = useParams();
  const game = CHESS_GAMES.find(g => g.id === id);

  if (!game) return <div className="text-center py-20 text-zinc-500">Game not found</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fadeIn">
      <div className="mb-8">
        <h1 className={styles.h1}>{game.title}</h1>
        <p className={`${styles.textStandard} text-lg mb-4`}>
          {game.white} vs. {game.black}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span><strong>Date:</strong> {new Date(game.date).toLocaleDateString()}</span>
          <span><strong>Event:</strong> {game.event}</span>
          <span><strong>Result:</strong> {game.result}</span>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
        <h2 className={styles.h2}>PGN Notation</h2>
        <pre className="font-mono text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto whitespace-pre-wrap break-words">
          {game.pgn}
        </pre>
      </div>
    </div>
  );
}
