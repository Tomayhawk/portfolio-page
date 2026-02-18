import { useParams, Link } from 'react-router-dom';
import { CHESS_GAMES } from '@/utils/data/chess';
import { AnalysisBoard } from '@/features/chess/AnalysisBoard';

export default function ChessGameDetailPage() {
  const { id } = useParams();
  const game = CHESS_GAMES.find(g => g.id === id);

  if (!game) return <div className="text-center py-20 text-zinc-500">Game not found</div>;

  return (
    <div className="max-w-[1400px] mx-auto p-4 lg:p-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <Link to="/chess" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-4 transition-colors">
            <span className="mr-2">←</span> Back to Chess
        </Link>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">{game.title}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">
          {game.white} <span className="text-zinc-300 mx-2">vs</span> {game.black}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: The Board */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 mx-auto">
             <AnalysisBoard initialPgn={game.pgn} />
        </div>

        {/* Right: The Info & PGN */}
        <div className="flex-1 w-full min-w-0">
             {/* Game Metadata Card */}
             <div className="grid grid-cols-2 gap-4 mb-6 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm">
                 <div>
                     <span className="block text-zinc-500 text-xs uppercase tracking-wider font-bold">Event</span>
                     <span className="text-zinc-800 dark:text-zinc-200">{game.event}</span>
                 </div>
                 <div>
                     <span className="block text-zinc-500 text-xs uppercase tracking-wider font-bold">Date</span>
                     <span className="text-zinc-800 dark:text-zinc-200">{game.date}</span>
                 </div>
                 <div>
                     <span className="block text-zinc-500 text-xs uppercase tracking-wider font-bold">Result</span>
                     <span className="text-zinc-800 dark:text-zinc-200">{game.result}</span>
                 </div>
             </div>

             {/* PGN Text Viewer */}
             <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col h-[500px]">
                <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 font-bold text-sm text-zinc-700 dark:text-zinc-300">
                    Game Notation
                </div>
                <div className="p-4 overflow-y-auto font-mono text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                    {game.pgn}
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}
