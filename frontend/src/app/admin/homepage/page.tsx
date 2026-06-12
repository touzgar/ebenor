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
      name: 'À propos',
      description: 'Section de présentation avec titre, description et points forts',
      href: '/admin/homepage/about',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Services',
      description: 'Liste des services offerts avec icônes et descriptions',
      href: '/admin/homepage/services',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Processus',
      description: 'Étapes du processus de travail avec timeline',
      href: '/admin/homepage/process',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: 'from-amber-500 to-amber-600',
    },
    {
      name: 'Témoignages',
      description: 'Avis et témoignages clients avec notes',
      href: '/admin/homepage/testimonials',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: 'from-pink-500 to-pink-600',
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
