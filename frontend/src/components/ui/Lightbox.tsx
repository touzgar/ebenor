'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getBlurDataURL } from '@/lib/cloudinaryLoader';

export interface LightboxImage {
  url: string;
  alt: string;
  title?: string;
  description?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Lightbox component for viewing images in full-screen overlay
 * Clean popup with blurred background - no text, just the image
 */
export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const currentImage = images[currentIndex];
  const [showControls, setShowControls] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse d'images"
    >
      {/* Blurred Background */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-black/90" aria-hidden="true" />

      {/* Close button - only visible on hover */}
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 z-[10000] p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Fermer"
      >
        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className={`absolute left-4 z-[10000] p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Image précédente"
        >
          <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className={`absolute right-4 z-[10000] p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Image suivante"
        >
          <ChevronRightIcon className="w-8 h-8" aria-hidden="true" />
        </button>
      )}

      {/* Pure Image - NO TEXT, NO OVERLAYS */}
      <div
        className="relative z-[9999] w-[95vw] h-[95vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.url}
          alt={currentImage.alt}
          fill
          sizes="95vw"
          className="object-contain"
          placeholder="blur"
          blurDataURL={getBlurDataURL(currentImage.url)}
          priority
        />
      </div>
    </div>
  );
}
