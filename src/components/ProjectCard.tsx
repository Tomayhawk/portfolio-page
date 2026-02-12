import { Link } from 'react-router-dom';
import { getTagColor } from '../utils/data.ts';
import { styles } from '../utils/styles.ts';

export const ProjectGridCard = ({ project }: { project: any }) => (
  <Link to={`/projects/${project.title}`} className={styles.projectGridCard}>
    <div className={styles.projectGridCardTop}>
        <div className={styles.projectGridImageWrapper}>
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
    </div>
    <div className={styles.projectCardBody}>
        <div>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDesc}>{project.description}</p>
        </div>
        <div className={styles.projectTagsRow}>
            {project.tags.map((t: string) => <span key={t} className={`${styles.tagInline} ${getTagColor(t)}`}>{t}</span>)}
        </div>
    </div>
  </Link>
);
