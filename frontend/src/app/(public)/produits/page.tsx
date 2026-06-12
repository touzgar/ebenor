'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/premium/Header';
import { Footer } from '@/components/public/Footer';
import ProductGrid from '@/components/public/ProductGrid';
import ProductTable from '@/components/public/ProductTable';
import Pagination from '@/components/ui/Pagination';
import { SkeletonGrid } from '@/components/ui/LoadingSkeleton';
import { getProducts, Product, ProductFilters, getCategoryLabel, getCategories } from '@/lib/api/products';
import { 
  Squares2X2Icon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  SparklesIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

/**
 * Product Catalog Page with SEO optimization
 * Requirements: 23.5, 23.9, 23.10
 */
export default function ProduitsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Filters from URL
  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get('category') || undefined,
    search: searchParams.get('search') || undefined,
  });

  const [availableCategories, setAvailableCategories] = useState<Array<{ 
    category: string; 
    name?: string; 
    count: number;
    icon?: string;
    color?: string;
  }>>([]);
  
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '-createdAt');
  const [searchInput, setSearchInput] = useState(filters.search || '');

  // Fix SSR hydration by only rendering on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts(currentPage, 12, filters, sortBy);
      
      if (!response.success) {
        setError('Impossible de charger les produits. Veuillez réessayer.');
      }
      
      setProducts(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
      setTotal(response.pagination?.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement des produits');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters, sortBy]);

  // Fetch available categories with counts from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Use the getCategories API which now returns counts
        const response = await getCategories();
        
        if (response.success && response.data) {
          const categoriesArray = response.data.map(cat => ({
            category: cat.slug || cat.category || cat.name || '',
            name: cat.name || getCategoryLabel(cat.slug || cat.category || ''),
            count: cat.count || 0,
            icon: cat.icon,
            color: cat.color,
          }));
          
          // Sort by count descending if no displayOrder
          const sortedCategories = categoriesArray.sort((a, b) => {
            return b.count - a.count;
          });
          
          setAvailableCategories(sortedCategories);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
        // Fallback: fetch all products and count manually
        try {
          const response = await getProducts(1, 1000, {}, '-createdAt');
          
          if (response.success && response.data) {
            const categoryMap = new Map<string, number>();
            
            response.data.forEach(product => {
              const cat = product.category;
              if (cat) {
                categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
              }
            });
            
            const categoriesArray = Array.from(categoryMap.entries()).map(([category, count]) => ({
              category,
              name: getCategoryLabel(category),
              count,
            }));
            
            const sortedCategories = categoriesArray.sort((a, b) => b.count - a.count);
            setAvailableCategories(sortedCategories);
          }
        } catch (fallbackErr) {
          console.error('Fallback also failed', fallbackErr);
        }
      }
    };
    loadCategories();
  }, []); // Only load once on mount

  // Fetch products when dependencies change
  useEffect(() => {
    if (!mounted) return; // Only fetch on client side
    fetchProducts();
  }, [fetchProducts, mounted]);

  // Auto-refresh products every 30 seconds to catch real-time changes
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      fetchProducts();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [fetchProducts, mounted]);

  // Update URL when filters change
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    const queryString = params.toString();
    router.push(`/produits${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [filters, sortBy, currentPage, router]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: category === 'all' ? undefined : category,
    }));
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    
    // Only apply search if empty or at least 2 characters
    if (trimmed.length === 0 || trimmed.length >= 2) {
      setFilters(prev => ({
        ...prev,
        search: trimmed || undefined,
      }));
      setCurrentPage(1);
    }
    // If 1 character, do nothing (keep current filters)
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setSearchInput('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters = filters.category || filters.search;

  // Show loading state during SSR/mounting
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Chargement...</p>
        </div>
      </div>
    );
  }

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
                <Squares2X2Icon className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6">
                Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Showroom</span>
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-600 leading-relaxed">
                Explorez notre collection de créations en bois d'exception, 
                chaque pièce étant le fruit d'un savoir-faire artisanal unique.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters and Search - Enhanced */}
        <section 
          className="py-6 bg-white/80 backdrop-blur-xl border-y border-neutral-200/50 sticky top-20 z-40 shadow-sm" 
          aria-label="Filtres et recherche de produits"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              {/* Category Filters - Enhanced & Organized */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FunnelIcon className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="font-bold text-neutral-900 text-lg">Catégories</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent"></div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {/* "Tous" button always first */}
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all transform hover:scale-105 ${
                      !filters.category
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-amber-300'
                    }`}
                    aria-pressed={!filters.category}
                    aria-label="Afficher tous les produits"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBagIcon className="w-5 h-5" />
                      Tous les produits
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        !filters.category 
                          ? 'bg-white/20' 
                          : 'bg-neutral-100'
                      }`}>
                        {availableCategories.reduce((sum, cat) => sum + cat.count, 0)}
                      </span>
                    </span>
                  </button>

                  {/* Category buttons sorted by popularity */}
                  {availableCategories.map((cat) => {
                    const isActive = filters.category === cat.category;
                    const buttonStyle = cat.color && isActive ? {
                      background: `linear-gradient(to right, ${cat.color}, ${cat.color}dd)`,
                    } : {};
                    
                    return (
                      <button
                        key={cat.category}
                        onClick={() => handleCategoryChange(cat.category)}
                        style={isActive ? buttonStyle : {}}
                        className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all transform hover:scale-105 ${
                          isActive
                            ? cat.color 
                              ? 'text-white shadow-lg'
                              : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                            : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-amber-300'
                        }`}
                        aria-pressed={isActive}
                        aria-label={`Filtrer par ${cat.name || getCategoryLabel(cat.category)}`}
                      >
                        <span className="flex items-center gap-2">
                          {cat.icon && (
                            <span className="text-lg">{cat.icon}</span>
                          )}
                          {cat.name || getCategoryLabel(cat.category)}
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            isActive 
                              ? 'bg-white/20' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {cat.count}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search - Enhanced */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <form onSubmit={handleSearch} className="flex gap-2 flex-1" role="search">
                  <label htmlFor="product-search" className="sr-only">Rechercher des produits</label>
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="product-search"
                      type="search"
                      placeholder="Rechercher un produit... (min 2 caractères)"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-neutral-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none bg-white"
                      aria-label="Rechercher des produits"
                    />
                    {searchInput && searchInput.trim().length === 1 && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full font-medium">
                        Min 2 car.
                      </div>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Lancer la recherche"
                    disabled={searchInput.trim().length === 1}
                  >
                    Rechercher
                  </button>
                </form>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap" role="status" aria-live="polite">
                  <span className="text-sm font-medium text-neutral-600">Filtres actifs:</span>
                  {filters.category && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {getCategoryLabel(filters.category)}
                      <button
                        onClick={() => handleCategoryChange('all')}
                        className="hover:text-amber-900 transition-colors"
                        aria-label={`Retirer le filtre ${getCategoryLabel(filters.category)}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {filters.search && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      "{filters.search}"
                      <button
                        onClick={() => {
                          setSearchInput('');
                          setFilters(prev => ({ ...prev, search: undefined }));
                        }}
                        className="hover:text-amber-900 transition-colors"
                        aria-label="Retirer le filtre de recherche"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-sm text-amber-600 hover:text-amber-700 font-semibold underline"
                    aria-label="Effacer tous les filtres"
                  >
                    Effacer tout
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 relative z-10" aria-label="Liste des produits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error Message - Enhanced */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-800 mb-2">Erreur de chargement</h3>
                  <p className="text-sm text-red-700 mb-3">{error}</p>
                  <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg mb-4">
                    <strong>Solution:</strong> Vérifiez que le backend est démarré sur <code className="bg-red-200 px-2 py-1 rounded font-mono">http://localhost:5000</code>
                  </p>
                  <button
                    onClick={() => fetchProducts()}
                    className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    🔄 Réessayer
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Results Count - Enhanced */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-lg font-medium" role="status" aria-live="polite" aria-atomic="true">
                {loading ? (
                  <span className="inline-block w-48 h-7 bg-neutral-200 animate-pulse rounded-lg" />
                ) : (
                  <span className="text-neutral-600">
                    <span className="text-3xl font-bold text-neutral-900">{total}</span> 
                    <span className="ml-2">produit{total !== 1 ? 's' : ''} trouvé{total !== 1 ? 's' : ''}</span>
                  </span>
                )}
              </p>
              {hasActiveFilters && !loading && (
                <p className="text-sm text-neutral-500 mt-1">
                  Filtres actifs appliqués
                </p>
              )}
            </div>
            
            {/* Real-time update indicator */}
            {!loading && total > 0 && (
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Mis à jour en temps réel</span>
              </div>
            )}
          </div>

          {/* Product Grid */}
          {loading ? (
            <SkeletonGrid count={12} type="product" columns={3} />
          ) : (
            <ProductTable products={products} />
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
          </div>
        </section>

        {/* Call to Action - Enhanced */}
        <section className="py-20 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/0 via-amber-300/10 to-amber-400/0" />
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-6">
                <SparklesIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Vous ne trouvez pas ce que vous cherchez ?
              </h2>
              <p className="text-xl text-amber-50 mb-10 max-w-2xl mx-auto leading-relaxed">
                Nous créons également des pièces sur mesure selon vos spécifications exactes. 
                Contactez-nous pour discuter de votre projet personnalisé.
              </p>
              <a 
                href="/contact" 
                className="inline-block px-10 py-4 bg-white text-amber-600 font-bold text-lg rounded-full hover:bg-amber-50 transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl"
                aria-label="Aller à la page de contact pour demander un devis sur mesure"
              >
                Demander un Devis Sur Mesure
              </a>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
}