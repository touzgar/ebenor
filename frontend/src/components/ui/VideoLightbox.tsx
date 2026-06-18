'use client';

import { useEffect, useRef } from 'react';
import { XMarkIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

interface VideoLightboxProps {
  src: string;
  poster?: string;
  onClose: () => void;
}

export default function VideoLightbox({ src, poster, onClose }: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl rounded-xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          className="w-full h-[60vh] md:h-[80vh] bg-black object-contain"
          playsInline
        />

        <button
          onClick={onClose}
          aria-label="Fermer la vidéo"
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80"
        >
          <XMarkIcon className="w-5 h-5 text-white" />
        </button>

        <div className="absolute top-3 left-3 z-30 p-2 rounded-full bg-black/60 text-white flex items-center gap-2">
          <ArrowsPointingOutIcon className="w-4 h-4" />
          <span className="text-xs">Agrandir</span>
        </div>
      </div>
    </div>
  );
}
