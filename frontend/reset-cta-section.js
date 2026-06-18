/**
 * Reset Script for Call to Action Section
 * 
 * Run this in the browser console if you get errors about stats being undefined.
 * This will update your localStorage with the new CTA structure.
 */

const defaultCTA = {
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
};

// Get existing content
const saved = localStorage.getItem('homepage_content');
let content = {};

if (saved) {
  try {
    content = JSON.parse(saved);
  } catch (e) {
    console.error('Error parsing localStorage:', e);
  }
}

// Update CTA section with stats
content.cta = {
  ...defaultCTA,
  ...(content.cta || {}),
  stats: content.cta?.stats || defaultCTA.stats
};

// Save back to localStorage
localStorage.setItem('homepage_content', JSON.stringify(content));

console.log('✅ Call to Action section updated!');
console.log('📦 New content:', content.cta);
console.log('🔄 Refresh the page to see changes');
