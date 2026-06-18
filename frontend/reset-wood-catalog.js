/**
 * Reset Script for Wood Catalog Section
 * 
 * Run this in the browser console if you get errors about woodSamples being undefined.
 * This will update your localStorage with the new woodCatalog structure.
 */

const defaultWoodCatalog = {
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

// Update woodCatalog section
content.woodCatalog = {
  ...defaultWoodCatalog,
  ...(content.woodCatalog || {}),
  woodSamples: content.woodCatalog?.woodSamples || defaultWoodCatalog.woodSamples
};

// Save back to localStorage
localStorage.setItem('homepage_content', JSON.stringify(content));

console.log('✅ Wood Catalog section updated!');
console.log('📦 New content:', content.woodCatalog);
console.log('🔄 Refresh the page to see changes');
