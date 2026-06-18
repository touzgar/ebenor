import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notre Showroom | ÉBÉNOR CRÉATION',
  description: 'Visitez notre showroom et découvrez nos créations en bois massif. Explorez notre collection de meubles sur mesure et laissez-vous inspirer.',
};

export default function ShowroomPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920')] bg-cover bg-center opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <span className="inline-block px-4 py-2 bg-[#C9A14A]/20 backdrop-blur-sm rounded-full border border-[#C9A14A]/30 text-[#C9A14A] font-semibold tracking-wider uppercase text-sm mb-6">
              Notre Espace
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
              Visitez Notre <span className="text-[#C9A14A]">Showroom</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Découvrez nos créations artisanales dans notre espace d'exposition. 
              Touchez, ressentez et admirez la qualité exceptionnelle de nos meubles en bois massif.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6">
                Une Expérience <span className="text-[#C9A14A]">Immersive</span>
              </h2>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                Notre showroom vous permet de découvrir l'ensemble de notre savoir-faire. 
                Vous pourrez explorer nos différentes collections, toucher les matériaux nobles 
                que nous utilisons et discuter directement avec nos artisans ébénistes.
              </p>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Chaque pièce exposée raconte une histoire unique et illustre notre engagement 
                envers l'excellence et la qualité.
              </p>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A14A]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🛋️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Collections Complètes
                    </h3>
                    <p className="text-neutral-600">
                      Explorez nos gammes de meubles pour salon, chambre, bureau et plus encore
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A14A]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🪵</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Échantillons de Bois
                    </h3>
                    <p className="text-neutral-600">
                      Touchez et comparez plus de 50 essences de bois disponibles
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A14A]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👨‍🔧</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Conseils d'Experts
                    </h3>
                    <p className="text-neutral-600">
                      Nos artisans sont présents pour répondre à vos questions et vous conseiller
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600" 
                    alt="Showroom interior"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600" 
                    alt="Wood samples"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600" 
                    alt="Furniture display"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=600" 
                    alt="Craftsman at work"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info & Hours Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Address */}
            <div>
              <div className="w-16 h-16 rounded-full bg-[#C9A14A]/20 flex items-center justify-center mb-6">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Notre Adresse</h3>
              <p className="text-gray-300 leading-relaxed">
                Zone Industrielle Mghira 2<br />
                2082 Fouchana<br />
                Tunis, Tunisie
              </p>
            </div>

            {/* Hours */}
            <div>
              <div className="w-16 h-16 rounded-full bg-[#C9A14A]/20 flex items-center justify-center mb-6">
                <span className="text-3xl">🕒</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Horaires d'Ouverture</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="text-[#C9A14A]">9h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-[#C9A14A]">9h - 13h</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-gray-500">Fermé</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="w-16 h-16 rounded-full bg-[#C9A14A]/20 flex items-center justify-center mb-6">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <a href="tel:+21670123456" className="block text-gray-300 hover:text-[#C9A14A] transition-colors">
                  📱 +216 70 123 456
                </a>
                <a href="mailto:contact@ebenor-creation.tn" className="block text-gray-300 hover:text-[#C9A14A] transition-colors">
                  📧 contact@ebenor-creation.tn
                </a>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Visite sur rendez-vous recommandée
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9A14A] to-[#D4B55A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">
            Planifiez Votre Visite
          </h2>
          <p className="text-xl text-black/80 mb-8">
            Prenez rendez-vous pour une visite personnalisée de notre showroom 
            et discutez de votre projet avec nos experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="px-10 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-neutral-900 transition-all duration-300 transform hover:scale-105"
            >
              Prendre Rendez-vous
            </a>
            <a 
              href="tel:+21670123456" 
              className="px-10 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105"
            >
              Appeler Maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
