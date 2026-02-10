import { useParams } from 'react-router-dom';
import { CHESS_OPENINGS } from '../../../utils/data.ts';
import { styles } from '../../../utils/styles.ts';

export default function ChessOpeningDetailPage() {
  const { id } = useParams();
  const opening = CHESS_OPENINGS.find(o => o.id === id);

  if (!opening) return <div className="text-center py-20 text-zinc-500">Opening not found</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fadeIn">
      <div className="mb-8">
        <h1 className={styles.h1}>{opening.title}</h1>
        <p className={`${styles.textStandard} text-lg`}>{opening.description}</p>
      </div>

      <div className="space-y-6">
        {opening.lines.map((line: any, index: number) => (
          <div key={index} className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
            <h3 className={styles.h2}>{line.name}</h3>
            <pre className="font-mono text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto">
              {line.pgn}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
