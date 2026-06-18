'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export default function HomepageManagementPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const sections = [
    {
      name: 'Accueil',
      description: 'Gestion complète de la page d\'accueil : Hero, Atelier, Produits, Galerie, Processus, CTA',
      href: '/admin/homepage/accueil',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: 'from-sky-500 to-sky-600',
    },
    {
      name: 'Hero',
      description: 'Bannière principale avec titre, sous-titre et appel à l\'action',
      href: '/admin/homepage/hero',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Showroom',
      description: 'Contenu de la page Showroom/Produits: titre et sous-titre',
      href: '/admin/homepage/showroom',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      color: 'from-amber-500 to-amber-600',
    },
    {
      name: 'Page À Propos',
      description: 'Gestion complète de la page À Propos: Hero, Stats, Histoire, Timeline, Valeurs, CTA',
      href: '/admin/homepage/about',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Nos Projets',
      description: 'Gestion de la page Galerie: Hero et Call-to-Action',
      href: '/admin/homepage/projects',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      name: 'Contact',
      description: 'Informations de contact et horaires d\'ouverture',
      href: '/admin/homepage/contact',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="w-full px-3 sm:px-4 lg:px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900">
              Gestion de la page d'accueil
            </h1>
            <p className="mt-3 text-base lg:text-lg text-neutral-600">
              Personnalisez le contenu de votre page d'accueil section par section
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sections Grid - FULL WIDTH */}
      <div className="w-full px-3 sm:px-4 lg:px-6 py-6">
        {/* Regular Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={section.href}
                className="relative block h-full bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-200/60 hover:shadow-2xl hover:border-amber-300 transition-all duration-200 overflow-hidden group transform-gpu hover:-translate-y-1"
              >
                <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
                <div className="p-6 lg:p-8">
                  <div className="absolute top-3 right-3">
                    <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-semibold">Gérer</span>
                  </div>
                  <div className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-gradient-to-br ${section.color} text-white mb-4 lg:mb-5 group-hover:scale-105 transition-transform duration-200 shadow-md`}>
                    {section.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 mb-2 lg:mb-3 group-hover:text-amber-600 transition-colors">
                    {section.name}
                  </h3>
                  <p className="text-neutral-600 text-sm lg:text-base leading-relaxed">
                    {section.description}
                  </p>
                  <div className="mt-4 lg:mt-6 flex items-center text-amber-600 text-sm lg:text-base font-medium">
                    <span>Modifier</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Help Section removed per request */}

        {/* Quick actions removed per request - modernized layout */}
      </div>
    </div>
  );
}
