/**
 * SYNC FOOTER DATA TO ALL PAGES
 * 
 * This script ensures all footers use the same data
 * Run this in your browser console on ANY page
 */

// Complete footer data with all information
const footerData = {
  brand: {
    description: 'ÉBÉNOR CRÉATION - Votre partenaire de confiance pour la menuiserie et l\'ébénisterie d\'excellence en Tunisie. Depuis notre atelier, nous créons des pièces uniques alliant tradition artisanale et design contemporain.'
  },
  contact: {
    phone: '+216 70 123 456',
    email: 'contact@ebenor-creation.tn',
    address: 'Zone Industrielle Mghira 2, 2082 Fouchana, Tunis, Tunisie',
    whatsapp: '+216XXXXXXXX'
  },
  social: {
    facebook: 'https://www.facebook.com/ebenorcreation',
    instagram: 'https://www.instagram.com/ebenorcreation',
    linkedin: 'https://www.linkedin.com/company/ebenorcreation'
  },
  newsletter: {
    title: 'Restez informé',
    description: 'Recevez nos dernières réalisations et nouveautés en exclusivité.'
  },
  bottom: {
    copyright: 'ÉBÉNOR CRÉATION. Tous droits réservés.',
    additionalText: 'Artisanat tunisien d\'excellence'
  },
  navigation: {
    company: [
      { name: 'Accueil', href: '/' },
      { name: 'À propos', href: '/a-propos' },
      { name: 'Nos Produits', href: '/produits' },
      { name: 'Galerie', href: '/galerie' },
      { name: 'Contact', href: '/contact' }
    ],
    services: [
      { name: 'Cuisines équipées', href: '/produits' },
      { name: 'Dressings & Placards', href: '/produits' },
      { name: 'Mobilier sur mesure', href: '/produits' },
      { name: 'Aménagements intérieurs', href: '/produits' }
    ],
    legal: [
      { name: 'Mentions légales', href: '/contact' },
      { name: 'Conditions générales', href: '/contact' }
    ]
  },
  backgroundImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90'
};

// Save to localStorage
localStorage.setItem('footer_content', JSON.stringify(footerData));

// Trigger all update methods
window.dispatchEvent(new Event('footer_content_updated'));

// Trigger storage event manually
window.dispatchEvent(new StorageEvent('storage', {
  key: 'footer_content',
  newValue: JSON.stringify(footerData),
  url: window.location.href,
  storageArea: localStorage
}));

// BroadcastChannel for other tabs
try {
  const channel = new BroadcastChannel('footer_updates');
  channel.postMessage({ type: 'update', data: footerData });
  channel.close();
} catch (e) {
  console.log('BroadcastChannel not supported');
}

console.log('✅ Footer data synchronized!');
console.log('📍 Data saved to localStorage');
console.log('🔄 Refresh the page to see changes');
console.log('');
console.log('Current footer data:', footerData);

// Auto-refresh after 1 second
setTimeout(() => {
  console.log('🔄 Auto-refreshing page...');
  location.reload();
}, 1000);
