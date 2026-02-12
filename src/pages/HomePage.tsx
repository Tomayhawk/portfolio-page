import { projectsData } from '../utils/data.ts';
import { ProjectGridCard } from '../components/ProjectCard.tsx';
import { styles } from '../utils/styles.ts';

export default function HomePage() {
  return (
    <div className={styles.homeRoot}>
      <div className={styles.homeHero}>
        <h1 className={styles.homeTitle}>Tomayhawk Portfolio Page</h1>
        <p className={styles.homeSubtitle}>Portfolio & Project Archive</p>
      </div>
      <div className="mt-auto pt-12">
        <h2 className={styles.homePinnedHeading}>Pinned Projects</h2>
        <div className={styles.homeGrid}>
          {projectsData.slice(0, 5).map(p => <ProjectGridCard key={p.id} project={p} />)}
        </div>
      </div>
    </div>
  );
}
