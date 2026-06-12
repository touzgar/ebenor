'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  CheckCircleIcon, 
  SparklesIcon, 
  TrophyIcon,
  UsersIcon,
  HeartIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { Header } from '@/components/premium/Header';

export default function AboutPage() {
  const stats = [
    { label: 'Années d\'expérience', value: '25+', icon: TrophyIcon },
    { label: 'Projets réalisés', value: '500+', icon: CheckCircleIcon },
    { label: 'Clients satisfaits', value: '98%', icon: HeartIcon },
    { label: 'Artisans qualifiés', value: '15', icon: UsersIcon },
  ];

  const values = [
    {
      icon: SparklesIcon,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque projet, du design à la réalisation finale.',
    },
    {
      icon: HeartIcon,
      title: 'Passion',
      description: 'Notre passion pour le bois et l\'artisanat se reflète dans chaque création.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Qualité',
      description: 'Nous utilisons uniquement des matériaux nobles et des techniques éprouvées.',
    },
    {
      icon: UsersIcon,
      title: 'Service',
      description: 'Un accompagnement personnalisé du premier contact à la livraison finale.',
    },
  ];

  const timeline = [
    {
      year: '1998',
      title: 'Les débuts',
      description: 'Création de l\'atelier avec une vision: allier tradition et modernité.',
    },
    {
      year: '2005',
      title: 'Expansion',
      description: 'Agrandissement de l\'atelier et diversification des services.',
    },
    {
      year: '2015',
      title: 'Innovation',
      description: 'Intégration de technologies modernes tout en préservant le savoir-faire artisanal.',
    },
    {
      year: '2024',
      title: 'Excellence',
      description: 'Leader en Tunisie pour les créations sur mesure haut de gamme.',
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-neutral-900/90 z-10" />
        <Image
          src="/logo/logo.jpg"
          alt="ÉBENOR CRÉATION"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              L'Art du Bois
              <span className="block text-amber-400 mt-2">Depuis 1998</span>
            </h1>
            <p className="text-xl lg:text-2xl text-neutral-200 max-w-3xl mx-auto">
              Plus de 25 ans d'excellence dans la création de mobilier sur mesure en Tunisie
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-lg text-center border border-amber-100 hover:shadow-xl transition-shadow"
                >
                  <Icon className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-neutral-900 mb-2">{stat.value}</div>
                  <div className="text-neutral-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Notre Histoire
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Une passion familiale transmise de génération en génération
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-neutral-700 leading-relaxed">
                Fondée en 1998, <span className="font-bold text-amber-600">ÉBENOR CRÉATION</span> est née de la passion d'artisans tunisiens pour le travail du bois noble. Notre atelier familial s'est rapidement imposé comme une référence dans la création de mobilier sur mesure haut de gamme.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                Aujourd'hui, nous combinons savoir-faire traditionnel et technologies modernes pour créer des pièces uniques qui transforment vos espaces de vie en véritables œuvres d'art.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                Chaque projet est une nouvelle opportunité de repousser les limites de la créativité, tout en respectant les traditions qui font notre renommée.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/logo/logo.jpg"
                alt="Atelier ÉBENOR CRÉATION"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Notre Évolution
            </h2>
            <p className="text-xl text-neutral-600">
              Plus de deux décennies d'innovation et de croissance
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-600 to-amber-400" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-lg border border-amber-100">
                      <div className="text-3xl font-bold text-amber-600 mb-3">{item.year}</div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                      <p className="text-neutral-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="hidden lg:block w-6 h-6 rounded-full bg-amber-600 border-4 border-white shadow-lg z-10" />

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Nos Valeurs</h2>
            <p className="text-xl text-neutral-300">
              Les principes qui guident chacune de nos créations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 mb-6 group-hover:scale-110 transition-transform shadow-xl">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-neutral-300 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Prêt à créer ensemble ?
            </h2>
            <p className="text-xl mb-10 text-amber-50">
              Transformons vos rêves en réalité avec notre savoir-faire artisanal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-amber-600 rounded-full font-bold text-lg hover:bg-neutral-100 transition-colors shadow-xl hover:shadow-2xl"
              >
                Contactez-nous
              </a>
              <a
                href="/produits"
                className="px-8 py-4 bg-neutral-900 text-white rounded-full font-bold text-lg hover:bg-neutral-800 transition-colors shadow-xl hover:shadow-2xl"
              >
                Voir nos créations
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
