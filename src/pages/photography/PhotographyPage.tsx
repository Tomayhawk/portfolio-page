import { useState, useEffect } from 'react';
import { PageHeader } from '../../components/Components.tsx';
import { PHOTOS } from '../../utils/data.ts';
import { styles } from '../../utils/styles.ts';

export default function PhotographyPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [layoutMode, setLayoutMode] = useState('side-view');

  const handleNext = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null && selectedIndex < PHOTOS.length - 1) {
          setSelectedIndex((prev) => (prev !== null ? prev + 1 : 0));
      }
  };

  const handlePrev = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null && selectedIndex > 0) {
          setSelectedIndex((prev) => (prev !== null ? prev - 1 : 0));
      }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && selectedIndex !== null && selectedIndex < PHOTOS.length - 1) handleNext();
      if (e.key === 'ArrowLeft' && selectedIndex !== null && selectedIndex > 0) handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
  };

  useEffect(() => {
      if (selectedIndex !== null) {
          window.addEventListener('keydown', handleKeyDown);
          return () => window.removeEventListener('keydown', handleKeyDown);
      }
  }, [selectedIndex]);

  const selectedPhoto = selectedIndex !== null ? PHOTOS[selectedIndex] : null;

  return (
    <div>
      <PageHeader title="Photography" description="A collection of shots from my travels and daily life. Focusing on urban architecture and street photography." />
      
        <div className={styles.photoGrid}>
            {PHOTOS.map((photo, index) => (
                 <div 
                     key={photo.id} 
                     onClick={() => setSelectedIndex(index)}
                     className={styles.photoTile}
                 >
                      <img src={photo.src} alt={photo.title} className={styles.photoImg} />
                      <div className={styles.photoOverlay} />
                      <div className={styles.photoCaptionBox}>
                          <p className={styles.photoCaptionText}>{photo.title}</p>
                      </div>
                 </div>
            ))}
        </div>
      
            <div className={styles.photoMoreWrapper}>
                <p className={styles.photoMoreText}>More photos coming soon.</p>
            </div>

      {selectedPhoto && (
                    <div 
                        className={styles.photoModalBackdrop}
                        onClick={() => setSelectedIndex(null)}
                    >
                            <div 
                                className={`${styles.photoModalInnerBase} ${layoutMode === 'side-view' ? styles.photoModalSideView : styles.photoModalDefaultView}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                    <div className={`${styles.photoModalImageWrapperBase} ${layoutMode === 'side-view' ? 'flex-1 h-full' : 'flex-1 min-h-0'}`}>
                       
                       {layoutMode === 'top-view' && (
                           <div className="absolute top-0 left-0 right-0 h-48 z-10 group/topzone pointer-events-auto">
                                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover/topzone:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                
                                <button 
                                    onClick={() => setSelectedIndex(null)} 
                                    className={styles.photoModalCloseBtn}
                                >
                                    <svg className={styles.icon6} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                           </div>
                       )}

                       <img 
                            src={selectedPhoto.src} 
                            alt={selectedPhoto.title} 
                            className={styles.photoModalImageFitMax} 
                        />
                        
                        <button 
                            onClick={handlePrev} 
                            disabled={selectedIndex === 0}
                            className={`${styles.photoModalNavBtn} ${selectedIndex === 0 ? styles.photoModalNavDisabled : styles.photoModalNavEnabled}`}
                        >
                            <svg className={styles.icon6} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button 
                            onClick={handleNext} 
                            disabled={selectedIndex === PHOTOS.length - 1}
                            className={`${styles.photoModalNavBtn} ${selectedIndex === PHOTOS.length - 1 ? styles.photoModalNavDisabled : styles.photoModalNavEnabled}`}
                        >
                            <svg className={styles.icon6} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>

                        <button 
                            onClick={() => setLayoutMode(prev => prev === 'side-view' ? 'top-view' : 'side-view')}
                            className={styles.photoModalNavBtn + ' absolute bottom-4 left-4 text-xs font-bold uppercase tracking-wider z-20 flex items-center gap-2'}
                        >
                            <svg className={styles.iconMd} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={layoutMode === 'side-view' ? "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" : "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"} /></svg>
                            {layoutMode === 'side-view' ? 'Switch to Top View' : 'Switch to Side View'}
                        </button>
                  </div>

                  <div className={layoutMode === 'side-view' ? 'bg-white dark:bg-[#18181b] border-zinc-200 dark:border-zinc-800 w-full lg:w-96 flex flex-col border-l h-full' : 'bg-white dark:bg-[#18181b] border-zinc-200 dark:border-zinc-800 border-t shrink-0 max-h-[30vh] overflow-y-auto'}>
                      {layoutMode === 'side-view' && (
                          <div className="flex justify-end p-4 pb-0">
                                <button onClick={() => setSelectedIndex(null)} className={styles.photoModalCloseBtn}>
                                    <svg className={styles.icon6} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                          </div>
                      )}
                      
                      <div className={`p-8 ${layoutMode === 'side-view' ? 'flex-1 overflow-y-auto' : ''}`}>
                          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">{selectedPhoto.title}</h2>
                          
                          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">{selectedPhoto.description}</p>
                          
                          {layoutMode === 'side-view' && (
                              <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
                                  {selectedPhoto.location && (
                                    <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                                        <span>Location</span>
                                        <span className="font-mono text-zinc-600 dark:text-zinc-300 text-right">{selectedPhoto.location}</span>
                                    </div>
                                  )}
                                  {selectedPhoto.camera && (
                                    <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                                        <span>Camera</span>
                                        <span className="font-mono text-zinc-600 dark:text-zinc-300 text-right">{selectedPhoto.camera}</span>
                                    </div>
                                  )}
                                  {selectedPhoto.lens && (
                                    <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                                        <span>Lens</span>
                                        <span className="font-mono text-zinc-600 dark:text-zinc-300 text-right">{selectedPhoto.lens}</span>
                                    </div>
                                  )}
                                  {selectedPhoto.focalLength && (
                                    <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                                        <span>Focal Length</span>
                                        <span className="font-mono text-zinc-600 dark:text-zinc-300 text-right">{selectedPhoto.focalLength}</span>
                                    </div>
                                  )}
                                  {selectedPhoto.aperture && (
                                    <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                                        <span>Aperture</span>
                                        <span className="font-mono text-zinc-600 dark:text-zinc-300 text-right">{selectedPhoto.aperture}</span>
                                    </div>
                                  )}
                                  {selectedPhoto.shutterSpeed && (
                                    <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                                        <span>Shutter</span>
                                        <span className="font-mono text-zinc-600 dark:text-zinc-300 text-right">{selectedPhoto.shutterSpeed}</span>
                                    </div>
                                  )}
                                  {selectedPhoto.iso && (
                                    <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                                        <span>ISO</span>
                                        <span className="font-mono text-zinc-600 dark:text-zinc-300 text-right">{selectedPhoto.iso}</span>
                                    </div>
                                  )}
                                  {selectedPhoto.dimensions && (
                                    <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                                        <span>Dimensions</span>
                                        <span className="font-mono text-zinc-600 dark:text-zinc-300 text-right">{selectedPhoto.dimensions}</span>
                                    </div>
                                  )}
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
