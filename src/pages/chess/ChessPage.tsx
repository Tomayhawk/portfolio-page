import { PageHeader } from '../../components/Components.tsx';
import { styles } from '../../utils/styles.ts';

export default function ChessPage() {
  return (
    <div className={styles.chessPageRoot}>
      <div className={styles.chessPageTextCenterLeft}>
          <PageHeader title="Chess" description="My games, analysis, and favorite puzzles." />
      </div>

      <div className={styles.chessPageGrid}>
        <div className={styles.cardBase}>
            <h2 className={styles.h2}>Recent Games</h2>
            <div className={styles.chessPageSpaceY}>
                {[1, 2, 3].map(i => (
                    <div key={i} className={styles.chessPageItem}>
                        <div className={styles.chessPageFlexCol}>
                            <span className={styles.chessPagePlayerText}>vs. Opponent {i}</span>
                            <span className={styles.chessPageSmallText}>Rapid • 10 min</span>
                        </div>
                        <span className={styles.chessPageStatusWon}>Won</span>
                    </div>
                ))}
            </div>
        </div>

        <div className={styles.cardBase}>
            <h2 className={styles.h2}>Stats</h2>
            <div className={styles.chessPageGrid2}>
                <div className={styles.chessPageStatBox1}>
                    <div className={styles.chessPageStatValue1}>1200</div>
                    <div className={styles.chessPageStatLabel1}>Rapid Rating</div>
                </div>
                <div className={styles.chessPageStatBox2}>
                    <div className={styles.chessPageStatValue2}>850</div>
                    <div className={styles.chessPageStatLabel1}>Blitz Rating</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
