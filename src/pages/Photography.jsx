import { PageHeader } from '../components/common/CommonUI';
import { PHOTOS } from '../utils/data';

export default function Photography() {
  return (
    <div>
      <PageHeader title="Photography" description="A collection of shots from my travels and daily life. Focusing on urban architecture and street photography." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {PHOTOS.map((photo) => (
             <div key={photo.id} className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 dark:text-zinc-600 hover:opacity-90 transition-opacity cursor-pointer">
                 <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" />
             </div>
         ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-sm text-zinc-500 italic">More photos coming soon.</p>
      </div>
    </div>
  );
}
