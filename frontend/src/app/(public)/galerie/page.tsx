'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Header } from '@/components/premium/Header';
import { SkeletonGrid } from '@/components/ui/LoadingSkeleton';
import { getGalleryImages, GalleryImage, GalleryFilters, getGalleryCategoryLabel } from '@/lib/api/gallery';
import { getBlurDataURL, getResponsiveSizes } from '@/lib/cloudinaryLoader';
import { 
  PhotoIcon,
  FunnelIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

// Dynamic import for Lightbox component (code splitting)
const Lightbox = dynamic(
  () => import('@/components/ui/Lightbox').then((mod) => mod.Lightbox),
  {
    loading: () => null,
    ssr: false,
  }
);

/**
 * Gallery Page with SEO optimization
 * Requirements: 23.6, 23.9, 23.10
 */
export default function GaleriePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Update document title and meta description
  useEffect(() => {
    document.title = 'Notre Galerie - Réalisations en Bois | ÉBENOR CRÉATION';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez nos réalisations et laissez-vous inspirer par notre savoir-faire artisanal. Galerie de créations en bois haut de gamme : cuisines, dressings, mobilier.');
    }
  }, []);
  
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const [filters, setFilters] = useState<GalleryFilters>({
    category: searchParams.get('category') || undefined,
  });

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getGalleryImages(currentPage, 20, filters);
      setImages(response.data);
      setTotalPages(response.pagination.pages);
      setTotal(response.pagination.total);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    const queryString = params.toString();
    router.push(`/galerie${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [filters, currentPage, router]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const handleCategoryChange = (category: string) => {
    setFilters({
      category: category === 'all' ? undefined : category,
    });
    setCurrentPage(1);
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const currentImage = images[selectedImageIndex];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-amber-50/10 to-neutral-50">
        {/* Hero Section - Modern */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-2xl shadow-amber-500/30 mb-8"
              >
                <PhotoIcon className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6">
                Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Projets</span>
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-600 leading-relaxed">
                Découvrez nos réalisations et laissez-vous inspirer par notre savoir-faire artisanal.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters - Enhanced */}
        <section 
          className="py-6 bg-white/80 backdrop-blur-xl border-y border-neutral-200/50 sticky top-20 z-30 shadow-sm"
          aria-label="Filtres de galerie"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-neutral-700">
                <FunnelIcon className="w-5 h-5 text-amber-600" />
                <span className="font-semibold">Catégories:</span>
              </div>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrer par catégorie">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    !filters.category
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                  aria-pressed={!filters.category}
                  aria-label="Afficher toutes les images"
                >
                  Toutes
                </button>
                <button
                  onClick={() => handleCategoryChange('cuisine')}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    filters.category === 'cuisine'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                  aria-pressed={filters.category === 'cuisine'}
                  aria-label={`Filtrer par ${getGalleryCategoryLabel('cuisine')}`}
                >
                  {getGalleryCategoryLabel('cuisine')}
                </button>
                <button
                  onClick={() => handleCategoryChange('dressing')}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    filters.category === 'dressing'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                  aria-pressed={filters.category === 'dressing'}
                  aria-label={`Filtrer par ${getGalleryCategoryLabel('dressing')}`}
                >
                  {getGalleryCategoryLabel('dressing')}
                </button>
                <button
                  onClick={() => handleCategoryChange('mobilier')}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    filters.category === 'mobilier'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                  aria-pressed={filters.category === 'mobilier'}
                  aria-label={`Filtrer par ${getGalleryCategoryLabel('mobilier')}`}
                >
                  {getGalleryCategoryLabel('mobilier')}
                </button>
                <button
                  onClick={() => handleCategoryChange('amenagement')}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    filters.category === 'amenagement'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                  aria-pressed={filters.category === 'amenagement'}
                  aria-label={`Filtrer par ${getGalleryCategoryLabel('amenagement')}`}
                >
                  {getGalleryCategoryLabel('amenagement')}
                </button>
                <button
                  onClick={() => handleCategoryChange('showroom')}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    filters.category === 'showroom'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                  aria-pressed={filters.category === 'showroom'}
                  aria-label={`Filtrer par ${getGalleryCategoryLabel('showroom')}`}
                >
                  {getGalleryCategoryLabel('showroom')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 relative z-10" aria-label="Galerie d'images">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-lg text-neutral-600 font-medium" role="status" aria-live="polite" aria-atomic="true">
                {loading ? (
                  <span className="inline-block w-40 h-6 bg-neutral-200 animate-pulse rounded" />
                ) : (
                  <>
                    <span className="text-2xl font-bold text-neutral-900">{total}</span> <span className="text-neutral-600">image{total !== 1 ? 's' : ''} dans notre galerie</span>
                  </>
                )}
              </p>
            </div>

          {/* Masonry Grid - Enhanced */}
          {loading ? (
            <SkeletonGrid count={8} type="gallery" columns={4} />
          ) : images.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neutral-100 mb-6">
                <PhotoIcon className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-3xl font-bold text-neutral-800 mb-3">
                Aucune image trouvée
              </h3>
              <p className="text-neutral-600 text-lg">
                Essayez de modifier vos filtres
              </p>
            </motion.div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6" role="list">
              {images.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="mb-6 break-inside-avoid group cursor-pointer"
                  onClick={() => openLightbox(index)}
                  role="listitem"
                >
                  <button
                    className="relative rounded-2xl overflow-hidden bg-neutral-100 shadow-lg hover:shadow-2xl transition-all w-full text-left transform hover:scale-[1.02] duration-300"
                    aria-label={`Ouvrir ${image.title} en plein écran`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={image.dimensions.width}
                      height={image.dimensions.height}
                      sizes={getResponsiveSizes('gallery')}
                      className="w-full h-auto"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={getBlurDataURL(image.url)}
                    />
                    {/* Clean hover effect - no text, just subtle zoom indicator */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center" aria-hidden="true">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-4">
                        <svg className="w-8 h-8 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More - Enhanced */}
          {!loading && currentPage < totalPages && (
            <div className="text-center mt-16">
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg rounded-full hover:from-amber-600 hover:to-amber-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
                aria-label="Charger plus d'images"
              >
                <ArrowDownTrayIcon className="w-6 h-6" />
                Charger plus d'images
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <Lightbox
          images={images.map((img) => ({
            url: img.url,
            alt: img.alt,
            title: img.title,
            description: img.description,
          }))}
          currentIndex={selectedImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={prevImage}
        />
      )}
    </div>
    </>
  );
}
