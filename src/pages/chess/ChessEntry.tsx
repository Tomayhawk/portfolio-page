import { useParams } from 'react-router-dom';
import { CHESS_GAMES } from '../../utils/data.ts';
import { styles } from '../../utils/styles.ts';

export default function ChessGameDetailPage() {
  const { id } = useParams();
  const game = CHESS_GAMES.find(g => g.id === id);

  if (!game) return <div className={styles.chessEntryNotFound}>Game not found</div>;

  return (
    <div className={styles.chessEntryContainer}>
      <div className={styles.chessEntryMb8}>
        <h1 className={styles.h1}>{game.title}</h1>
        <p className={`${styles.textStandard} ${styles.chessEntryParaExtras}`}>
          {game.white} vs. {game.black}
        </p>
        <div className={styles.chessEntryTagsRow}>
          <span><strong>Date:</strong> {new Date(game.date).toLocaleDateString()}</span>
          <span><strong>Event:</strong> {game.event}</span>
          <span><strong>Result:</strong> {game.result}</span>
        </div>
      </div>

      <div className={styles.chessEntryPgnBox}>
        <h2 className={styles.h2}>PGN Notation</h2>
        <pre className={styles.chessEntryPre}>
          {game.pgn}
        </pre>
      </div>
    </div>
  );
}
