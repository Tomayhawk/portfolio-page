import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Chess, Move } from 'chess.js';
import { CHESS_GAMES } from '@/utils/data/chess';
import { AnalysisBoard } from '@/features/chess/AnalysisBoard';

export default function ChessGameDetailPage() {
  const { id } = useParams();
  const game = CHESS_GAMES.find(g => g.id === id);

  if (!game) return <div className="text-center py-20 text-zinc-500">Game not found</div>;

  // Parse PGN into moves for interactive notation
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  // Analysis state
  const [engineDepth, setEngineDepth] = useState(15);
  const [engineLines, setEngineLines] = useState(1);
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [analysisData, setAnalysisData] = useState({ evaluation: '0.00', lines: {} as Record<number, { score: string; pv: string; mate?: string | undefined }> });
  const [showSettings, setShowSettings] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    const chess = new Chess();
    try {
      chess.loadPgn(game.pgn);
      const gameMoves = chess.history({ verbose: true }) as Move[];
      setMoves(gameMoves);
    } catch (error) {
      console.error('Error parsing PGN:', error);
    }
  }, [game.pgn]);

  const handleMoveClick = (moveIndex: number) => {
    setCurrentMoveIndex(moveIndex);
  };

  // Format moves into pairs for display
  const movePairs = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1] || null,
    });
  }

  return (
    <div className="max-w-[1400px] mx-auto p-4 lg:p-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <Link to="/chess" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-4 transition-colors">
            <span className="mr-2">←</span> Back to Chess
        </Link>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">{game.title}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Left: Board with Player Names */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 mx-auto lg:mx-0 max-w-[600px] flex flex-col gap-4">
          {/* White Player */}
          <div className="text-center">
            <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{game.white}</div>
            <div className="text-xs text-zinc-500">(White)</div>
          </div>

          {/* Board */}
          <AnalysisBoard
            initialPgn={game.pgn}
            currentMoveIndex={currentMoveIndex}
            onMoveIndexChange={setCurrentMoveIndex}
            onMove={(fen, history) => setCurrentMoveIndex(history.length)}
            showControls={false}
            showAnalysis={false}
            showAnalysisBar={false}
            engineDepth={engineDepth}
            engineLines={engineLines}
            onEngineSettingsChange={(depth, lines) => {
              setEngineDepth(depth);
              setEngineLines(lines);
            }}
            boardOrientation={boardOrientation}
            onBoardOrientationChange={setBoardOrientation}
            onAnalysisDataChange={setAnalysisData}
            resetTrigger={resetTrigger}
          />

          {/* Black Player */}
          <div className="text-center">
            <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{game.black}</div>
            <div className="text-xs text-zinc-500">(Black)</div>
          </div>
        </div>

        {/* Right: All Information */}
        <div className="flex-1 w-full min-w-[350px] space-y-6">
          <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            {/* Game Metadata */}
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Game Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-zinc-500 text-xs uppercase tracking-wider font-bold">Event</span>
                <span className="text-zinc-800 dark:text-zinc-200">{game.event}</span>
              </div>
              <div>
                <span className="block text-zinc-500 text-xs uppercase tracking-wider font-bold">Date</span>
                <span className="text-zinc-800 dark:text-zinc-200">{game.date}</span>
              </div>
              <div>
                <span className="block text-zinc-500 text-xs uppercase tracking-wider font-bold">White</span>
                <span className="text-zinc-800 dark:text-zinc-200">{game.white}</span>
              </div>
              <div>
                <span className="block text-zinc-500 text-xs uppercase tracking-wider font-bold">Black</span>
                <span className="text-zinc-800 dark:text-zinc-200">{game.black}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-zinc-500 text-xs uppercase tracking-wider font-bold">Result</span>
                <span className="text-zinc-800 dark:text-zinc-200">{game.result}</span>
              </div>
            </div>

            <hr className="my-4 border-zinc-200 dark:border-zinc-700" />

            {/* Interactive Notation */}
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Game Moves</h3>
              <div className="max-h-[400px] overflow-y-auto">
                <div className="font-mono text-sm space-y-1">
                  {movePairs.map((pair, pairIndex) => (
                    <div key={pairIndex} className="flex gap-4">
                      <span className="text-zinc-500 w-8 flex-shrink-0">{pair.number}.</span>
                      <button
                        onClick={() => handleMoveClick(pairIndex * 2)}
                        className={`px-2 py-1 rounded text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                          currentMoveIndex === pairIndex * 2 ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        {pair.white?.san}
                      </button>
                      {pair.black && (
                        <button
                          onClick={() => handleMoveClick(pairIndex * 2 + 1)}
                          className={`px-2 py-1 rounded text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                            currentMoveIndex === pairIndex * 2 + 1 ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'text-zinc-700 dark:text-zinc-300'
                          }`}
                        >
                          {pair.black.san}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <hr className="my-4 border-zinc-200 dark:border-zinc-700" />

            {/* Analysis Display */}
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Engine Analysis</h3>
              <div className="text-sm font-mono space-y-1 bg-zinc-950 text-zinc-300 p-3 rounded">
                <div className="text-center text-lg font-bold mb-2">
                  {analysisData.evaluation}
                </div>
                {Object.entries(analysisData.lines).map(([id, line]) => (
                  <div key={id} className="truncate">
                    <span className={`inline-block w-12 font-bold ${line.score.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                      {line.score}
                    </span>
                    <span className="opacity-75">{line.pv}</span>
                  </div>
                ))}
                {Object.keys(analysisData.lines).length === 0 && <span className="opacity-50">Engine calculating...</span>}
              </div>
            </div>

            <hr className="my-4 border-zinc-200 dark:border-zinc-700" />

            {/* Analysis Controls - Collapsible */}
            <div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-full text-left text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center justify-between"
              >
                Analysis Controls
                <span className="text-sm">{showSettings ? '▼' : '▶'}</span>
              </button>
              {showSettings && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-2 items-center">
                      <span>Depth: {engineDepth}</span>
                      <input
                        type="range" min="5" max="25" value={engineDepth}
                        onChange={(e) => setEngineDepth(parseInt(e.target.value))}
                        className="w-20"
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <span>Lines: {engineLines}</span>
                      <input
                        type="range" min="1" max="3" value={engineLines}
                        onChange={(e) => setEngineLines(parseInt(e.target.value))}
                        className="w-16"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 font-mono">
                    <button onClick={() => setCurrentMoveIndex(0)} className="px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded">&lt;&lt;</button>
                    <button onClick={() => setCurrentMoveIndex(Math.max(0, currentMoveIndex - 1))} className="px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded">&lt;</button>
                    <button onClick={() => setCurrentMoveIndex(Math.min(moves.length, currentMoveIndex + 1))} className="px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded">&gt;</button>
                    <button onClick={() => setCurrentMoveIndex(moves.length)} className="px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded">&gt;&gt;</button>
                  </div>

                  <div className="flex justify-center gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-2">
                    <button
                      onClick={() => setBoardOrientation(b => b === 'white' ? 'black' : 'white')}
                      className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                    >
                      Flip Board
                    </button>
                    <button
                      onClick={() => {
                        setCurrentMoveIndex(0);
                        setResetTrigger(prev => prev + 1);
                      }}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Reset Game
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
