'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

function getMonogram(title = '') {
  const words = title.split(/\s+/).filter(word => word && !/^(buildinbyte|template|website|app)$/i.test(word));
  if (!words.length) return 'BI';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export default function ProjectCoverArt({ project }) {
  const localPreview = project?.previewImage || null;
  const [imageSource, setImageSource] = useState(project?.thumbnail || localPreview);

  useEffect(() => {
    setImageSource(project?.thumbnail || localPreview);
  }, [project?.thumbnail, localPreview]);

  if (!project) return null;
  const category = project.industry || project.category || 'Custom project';
  const isRemoteImage = /^https?:\/\//i.test(imageSource || '');

  const handleImageError = () => {
    if (localPreview && imageSource !== localPreview) {
      setImageSource(localPreview);
      return;
    }
    setImageSource(null);
  };

  return (
    <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-canvas">
      {imageSource ? (
        <Image
          src={imageSource}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          unoptimized={isRemoteImage}
          onError={handleImageError}
        />
      ) : (
        <div className="relative flex h-full items-center justify-center">
          <span className="font-display text-5xl font-semibold tracking-[-0.05em] text-slate-800/80 dark:text-foreground/85">
            {getMonogram(project.title)}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/75 px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-canvas/60 dark:text-zinc-300">
        {category}
      </div>
    </div>
  );
}
