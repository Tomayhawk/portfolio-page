import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Chess, Move } from 'chess.js';
import type { Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Engine from '@/utils/chess/engine';

// Types
interface AnalysisBoardProps {
  initialFen?: string;
  initialPgn?: string;
  onMove?: (fen: string, history: string[]) => void;
}

type EngineOutput = {
  evaluation: string;
  lines: Record<number, { score: string; pv: string; mate?: string | undefined }>;
};

export const AnalysisBoard = ({ initialFen, initialPgn, onMove }: AnalysisBoardProps) => {
  // Game State
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [moveIndex, setMoveIndex] = useState(0);
  const [history, setHistory] = useState<Move[]>([]);

  // Board visual state
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});
  const [moveFrom, setMoveFrom] = useState<string | null>(null);

  // Engine State
  const engine = useMemo(() => new Engine(), []);
  const [engineTime, setEngineTime] = useState(2);
  const [engineLines, setEngineLines] = useState(1);
  const [analysisData, setAnalysisData] = useState<EngineOutput>({ evaluation: '0.00', lines: {} });

  // Helper to Replay Moves Safely
  const makeMoveSafe = (game: Chess, move: Move) => {
    const moveParams: { from: string; to: string; promotion?: string } = {
      from: move.from,
      to: move.to,
    };
    if (move.promotion) {
      moveParams.promotion = move.promotion;
    }
    game.move(moveParams);
  };

  // Initialization
  useEffect(() => {
    const game = gameRef.current;
    game.reset();

    let initialHistory: Move[] = [];
    if (initialPgn) {
      try {
        game.loadPgn(initialPgn);
        initialHistory = game.history({ verbose: true }) as Move[];
        game.reset(); // Reset to start after getting history
      } catch (e) { console.error("Invalid PGN", e); }
    } else if (initialFen) {
      try {
        game.load(initialFen);
      } catch (e) { console.error("Invalid FEN", e); }
    }

    setHistory(initialHistory);
    setMoveIndex(0);
    setFen(game.fen());
  }, [initialFen, initialPgn]);

  // Engine Logic
  useEffect(() => {
    engine.stop();

    const tempGame = new Chess();
    if (initialPgn || history.length > 0) {
      tempGame.reset();
      if (initialFen && !initialPgn) tempGame.load(initialFen);

      for (let i = 0; i < moveIndex; i++) {
        const move = history[i];
        if (move) makeMoveSafe(tempGame, move);
      }
    } else {
      tempGame.load(fen);
    }

    const currentFen = tempGame.fen();

    const timeout = setTimeout(() => {
      engine.setOption('MultiPV', engineLines);
      engine.evaluatePosition(currentFen, engineTime);
    }, 200);

    return () => {
      clearTimeout(timeout);
      engine.stop();
    };
  }, [fen, moveIndex, engineTime, engineLines, engine, history, initialFen, initialPgn]);

  useEffect(() => {
    engine.onMessage(({ positionEvaluation, possibleMate, pv, depth, multipv }) => {
      if (depth && depth < 5) return;

      setAnalysisData(prev => {
        const newLines = { ...prev.lines };
        let evalText = prev.evaluation;

        let scoreDisplay = "";

        if (possibleMate) {
          scoreDisplay = `M${Math.abs(parseInt(possibleMate))}`;
          if (parseInt(possibleMate) < 0) evalText = `-M${Math.abs(parseInt(possibleMate))}`;
          else evalText = `M${parseInt(possibleMate)}`;
        } else if (positionEvaluation) {
          const cp = parseInt(positionEvaluation);
          const score = (cp / 100).toFixed(2);
          scoreDisplay = score;
          evalText = score;
        }

        if (multipv && pv) {
          newLines[multipv] = {
            score: scoreDisplay,
            pv,
            mate: possibleMate
          };
        }

        if (multipv === 1) {
          return { evaluation: evalText, lines: newLines };
        }
        return { ...prev, lines: newLines };
      });
    });
  }, [engine]);


  // Move Handling
  function safeGameMutate(modify: (game: Chess) => void) {
    setOptionSquares({});
    setMoveFrom(null);

    if (moveIndex < history.length) {
      const newGame = new Chess();
      if (initialFen && !initialPgn) newGame.load(initialFen);
      for (let i = 0; i < moveIndex; i++) {
        const move = history[i];
        if (move) makeMoveSafe(newGame, move);
      }
      gameRef.current = newGame;
    }

    modify(gameRef.current);

    const newHistory = gameRef.current.history({ verbose: true }) as Move[];
    setHistory(newHistory);
    setMoveIndex(newHistory.length);
    setFen(gameRef.current.fen());

    if (onMove) onMove(gameRef.current.fen(), gameRef.current.history());
  }

  function onPieceDrop({ piece, sourceSquare, targetSquare }: { piece: { isSparePiece: boolean, pieceType: string, position: string }, sourceSquare: string, targetSquare: string | null }): boolean {
    if (!targetSquare) return false;
    try {
      let move = null;
      safeGameMutate((game) => {
        move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q', // Default promotion to queen
        });
      });
      return move !== null;
    } catch (e) {
      return false;
    }
  }

  function onSquareClick({ piece, square }: { piece: { pieceType: string } | null, square: string }): void {
    if (moveFrom === square) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }

    if (!moveFrom) {
      setMoveFrom(square);
      const moves = gameRef.current.moves({ square: square as Square, verbose: true });
      const newSquares: Record<string, React.CSSProperties> = {};
      moves.forEach((m) => {
        newSquares[m.to] = {
          background: 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
          borderRadius: '50%',
        };
      });
      newSquares[square] = { background: 'rgba(255, 255, 0, 0.4)' };
      setOptionSquares(newSquares);
      return;
    }

    try {
      let move = null;
      safeGameMutate((game) => {
        move = game.move({
          from: moveFrom,
          to: square,
          promotion: 'q',
        });
      });

      if (!move) {
        setMoveFrom(square);
        const moves = gameRef.current.moves({ square: square as Square, verbose: true });
        const newSquares: Record<string, React.CSSProperties> = {};
        moves.forEach((m) => {
          newSquares[m.to] = {
            background: 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
            borderRadius: '50%',
          };
        });
        newSquares[square] = { background: 'rgba(255, 255, 0, 0.4)' };
        setOptionSquares(newSquares);
      }
    } catch (e) {
      setMoveFrom(null);
      setOptionSquares({});
    }
  }

  const navigate = useCallback((direction: 'start' | 'prev' | 'next' | 'end') => {
    setMoveIndex(current => {
      let newIndex: number;
      switch (direction) {
        case 'start': newIndex = 0; break;
        case 'end': newIndex = history.length; break;
        case 'prev': newIndex = Math.max(0, current - 1); break;
        case 'next': newIndex = Math.min(history.length, current + 1); break;
        default: newIndex = current;
      }

      const tempGame = new Chess();
      if (initialFen && !initialPgn) tempGame.load(initialFen);
      for (let i = 0; i < newIndex; i++) {
        const move = history[i];
        if (move) makeMoveSafe(tempGame, move);
      }
      setFen(tempGame.fen());

      return newIndex;
    });
  }, [history, initialFen, initialPgn]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowUp') navigate('start');
      if (e.key === 'ArrowDown') navigate('end');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const arrows = Object.values(analysisData.lines).map((line, idx) => {
    if (!line.pv) return null;
    const parts = line.pv.split(' ');
    const firstMove = parts[0];

    if (!firstMove || firstMove.length < 4) return null;

    const startSquare = firstMove.substring(0, 2);
    const endSquare = firstMove.substring(2, 4);
    const color = idx === 0 ? 'rgba(0, 128, 0, 0.8)' : 'rgba(0, 0, 255, 0.6)';
    return { startSquare, endSquare, color };
  }).filter((arrow): arrow is { startSquare: string; endSquare: string; color: string } => arrow !== null);

  const evalValue = parseFloat(analysisData.evaluation);
  const clampedEval = Math.max(Math.min(evalValue, 5), -5);
  const evalPercent = ((clampedEval * -1 + 5) / 10) * 100;

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full select-none">
      {/* Analysis Bar */}
      <div className="hidden md:flex flex-col w-6 bg-zinc-200 dark:bg-zinc-800 rounded overflow-hidden relative border border-zinc-300 dark:border-zinc-700 h-[500px]">
        <div
          className="absolute w-full bg-zinc-400 dark:bg-zinc-600 transition-all duration-500"
          style={{ height: `${evalPercent}%`, top: 0 }}
        />
      </div>

      {/* Board Area */}
      <div className="flex-1 max-w-[600px] flex flex-col gap-2">
        <div className="relative w-full aspect-square border-4 border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden shadow-xl">
          <Chessboard options={{
            position: fen,
            onPieceDrop: onPieceDrop,
            onSquareClick: onSquareClick,
            boardOrientation: boardOrientation,
            squareStyles: optionSquares,
            arrows: arrows,
            animationDurationInMs: 200,
            allowDragging: true
          }}
          />

          <div className="absolute top-2 right-2 md:hidden bg-black/50 text-white px-2 py-1 rounded text-xs">
            {analysisData.evaluation}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center text-xs text-zinc-500">
            <div className="flex gap-2 items-center">
              <span>Time: {engineTime}s</span>
              <input
                type="range" min="1" max="10" value={engineTime}
                onChange={(e) => setEngineTime(parseInt(e.target.value))}
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
            <button onClick={() => navigate('start')} className="px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded">&lt;&lt;</button>
            <button onClick={() => navigate('prev')} className="px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded">&lt;</button>
            <button onClick={() => navigate('next')} className="px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded">&gt;</button>
            <button onClick={() => navigate('end')} className="px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded">&gt;&gt;</button>
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
                gameRef.current.reset();
                setFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
                setHistory([]);
                setMoveIndex(0);
                setOptionSquares({});
              }}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Reset Game
            </button>
          </div>
        </div>

        <div className="text-xs font-mono space-y-1 bg-zinc-950 text-zinc-300 p-2 rounded">
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
    </div>
  );
};
