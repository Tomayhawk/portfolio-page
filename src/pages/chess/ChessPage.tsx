// ChessPage.tsx
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/ui/PageHeader';
import { CHESS_GAMES, CHESS_OPENINGS } from '@/utils/data/chess';

export default function ChessPage() {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      <PageHeader title="Chess" description="My library of games and opening preparation." />

      <div className="mt-10 space-y-12">
        {/* Openings Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            Opening Repertoire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHESS_OPENINGS.map((opening) => (
              <div key={opening.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{opening.title}</h3>
                <p className="text-sm text-zinc-500 mt-2 mb-4 line-clamp-2">{opening.description}</p>
                <div className="flex flex-col gap-2">
                    {opening.lines.map((line, idx) => (
                        <div key={idx} className="text-xs bg-zinc-100 dark:bg-zinc-800 p-2 rounded border border-zinc-200 dark:border-zinc-700/50 font-mono truncate">
                           <span className="font-bold text-zinc-600 dark:text-zinc-400">{line.name}:</span> {line.pgn}
                        </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Games Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            Historical Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHESS_GAMES.map((game) => (
              <Link 
                key={game.id} 
                to={`/chess/game/${game.id}`}
                className="group block bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {game.title}
                        </h3>
                        <p className="text-zinc-500 text-sm">{game.event} • {new Date(game.date).getFullYear()}</p>
                     </div>
                     <span className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-full">
                        {game.result}
                     </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-white border border-zinc-400 rounded-full"></div>
                        <span>{game.white}</span>
                    </div>
                    <span className="text-zinc-300">vs</span>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-black border border-zinc-600 rounded-full"></div>
                        <span>{game.black}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
