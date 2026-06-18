/**
 * Complete Reset Script for All Homepage Sections
 * 
 * Run this in the browser console to update localStorage with all new structures.
 * This fixes errors related to missing fields like woodSamples, stats, etc.
 */

const defaultContent = {
  hero: {
    companyName: "ÉBENOR CRÉATION",
    title: "L'élégance du bois, l'empreinte de l'art",
    subtitle: "Découvrez l'excellence de l'ébénisterie tunisienne avec ÉBÉNOR CRÉATION. Nous transformons vos espaces en œuvres d'art avec passion et savoir-faire depuis plus de 25 ans.",
    ctaText: "Demander un devis",
    ctaLink: "/contact",
    videoUrl: "/video/hero.mp4",
    backgroundImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1920",
  },
  factory: {
    title: 'Notre Atelier',
    titleHighlight: 'de Fabrication',
    subtitle: 'Un Savoir-Faire Artisanal',
    description: 'Depuis notre atelier en Tunisie, nous créons des pièces uniques qui allient tradition et modernité.',
    backgroundImage: 'https://images.unsplash.com/photo-1565183928294-7d22f75e6e37?w=1920',
    video1Url: '/video/demoTravail1.mp4',
    video1Title: 'Précision Artisanale',
    video1Description: 'Nos artisans qualifiés travaillent chaque pièce avec précision.',
    video2Url: '/video/demoTravail2.mp4',
    video2Title: 'Technologies Modernes',
    video2Description: 'Équipements de dernière génération pour une qualité exceptionnelle.',
    stats: [
      { icon: '🏆', value: '25+', label: 'Ans d\'expérience' },
      { icon: '👨‍🔧', value: '50+', label: 'Artisans qualifiés' },
      { icon: '🛋️', value: '1000+', label: 'Projets réalisés' },
      { icon: '⭐', value: '100%', label: 'Satisfaction client' },
    ],
  },
  products: {
    title: 'Nos',
    titleHighlight: 'Créations',
    subtitle: 'Découvrez notre sélection de meubles en bois massif.',
  },
  woodCatalog: {
    title: 'Notre Palette',
    titleHighlight: 'de Bois',
    description: 'Explorez notre collection exclusive de bois nobles et essences rares',
    videoUrl: '/video/catalogBois.mp4',
    badgeText: 'Plus de 50 Essences Disponibles',
    ctaButtonText: 'Télécharger le Catalogue Complet',
    ctaButtonLink: '/catalogue-bois.pdf',
    woodSamples: [
      { name: 'Chêne', color: '#8B7355', description: 'Noble et robuste' },
      { name: 'Noyer', color: '#5C4033', description: 'Élégant et chaleureux' },
      { name: 'Érable', color: '#D4A574', description: 'Clair et raffiné' },
      { name: 'Acajou', color: '#6F4E37', description: 'Luxueux et durable' },
    ],
  },
  gallery: {
    title: 'Notre',
    titleHighlight: 'Galerie',
    subtitle: 'Explorez nos réalisations et laissez-vous inspirer.',
  },
  process: {
    title: 'Notre',
    titleHighlight: 'Processus',
    subtitle: 'De la conception à la livraison, découvrez les étapes de création.',
    backgroundImage: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1920',
    steps: [
      { number: '01', icon: '💬', title: 'Consultation', description: 'Échange sur vos besoins et envies.' },
      { number: '02', icon: '📐', title: 'Conception', description: 'Création de plans détaillés.' },
      { number: '03', icon: '🔨', title: 'Fabrication', description: 'Réalisation artisanale.' },
      { number: '04', icon: '🚚', title: 'Installation', description: 'Livraison et installation chez vous.' },
    ],
  },
  cta: {
    badge: 'Votre Projet Nous Attend',
    title: 'Créons ensemble',
    titleHighlight: 'l\'exception',
    description: 'Transformez vos espaces avec l\'expertise ÉBÉNOR CRÉATION. Chaque projet est une œuvre unique, conçue avec passion et réalisée avec excellence.',
    button1Text: 'Devis gratuit en 24h',
    button1Link: '/contact',
    button2Text: 'Visiter notre showroom',
    button2Link: '/showroom',
    phone: '+216 70 123 456',
    email: 'contact@ebenor-creation.tn',
    address: 'Zone Industrielle Mghira 2, 2082 Fouchana, Tunis, Tunisie',
    backgroundImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90',
    stats: [
      { icon: '🏆', number: '25+', label: 'Années d\'expérience' },
      { icon: '🏠', number: '500+', label: 'Projets réalisés' },
      { icon: '⭐', number: '100%', label: 'Satisfaction client' },
      { icon: '⚡', number: '24h', label: 'Délai de réponse' },
    ],
  },
};

// Get existing content
const saved = localStorage.getItem('homepage_content');
let content = {};

if (saved) {
  try {
    content = JSON.parse(saved);
    console.log('📖 Existing content found');
  } catch (e) {
    console.error('❌ Error parsing localStorage:', e);
  }
}

// Merge with defaults to ensure all fields exist
const updatedContent = {
  hero: { ...defaultContent.hero, ...(content.hero || {}) },
  factory: {
    ...defaultContent.factory,
    ...(content.factory || {}),
    stats: content.factory?.stats || defaultContent.factory.stats
  },
  products: { ...defaultContent.products, ...(content.products || {}) },
  woodCatalog: {
    ...defaultContent.woodCatalog,
    ...(content.woodCatalog || {}),
    woodSamples: content.woodCatalog?.woodSamples || defaultContent.woodCatalog.woodSamples
  },
  gallery: { ...defaultContent.gallery, ...(content.gallery || {}) },
  process: {
    ...defaultContent.process,
    ...(content.process || {}),
    steps: content.process?.steps || defaultContent.process.steps
  },
  cta: {
    ...defaultContent.cta,
    ...(content.cta || {}),
    stats: content.cta?.stats || defaultContent.cta.stats
  },
};

// Save back to localStorage
localStorage.setItem('homepage_content', JSON.stringify(updatedContent));

console.log('✅ All sections updated successfully!');
console.log('📦 Updated content:', updatedContent);
console.log('🔄 Refresh the page to see changes');
console.log('');
console.log('📋 Summary:');
console.log('  ✓ Hero section');
console.log('  ✓ Factory section with stats');
console.log('  ✓ Products section');
console.log('  ✓ Wood Catalog with samples');
console.log('  ✓ Gallery section');
console.log('  ✓ Process with steps');
console.log('  ✓ Call to Action with stats');
