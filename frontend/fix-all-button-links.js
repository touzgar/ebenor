/**
 * Professional Fix - Update All Button Links
 * 
 * This script fixes all button links to their correct destinations:
 * - "Visiter notre showroom" → /showroom
 * - "Télécharger le Catalogue Complet" → /contact
 * 
 * Run this in the browser console (F12) to apply all fixes at once.
 */

console.log('🔧 Applying professional fixes...\n');

// Get existing content
const saved = localStorage.getItem('homepage_content');
let content = {};

if (saved) {
  try {
    content = JSON.parse(saved);
    console.log('✅ Content loaded from localStorage');
  } catch (e) {
    console.error('❌ Error parsing localStorage:', e);
  }
}

// Fix 1: Update CTA button 2 to link to /showroom
if (content.cta) {
  content.cta.button2Link = '/showroom';
  console.log('✅ Fixed: "Visiter notre showroom" → /showroom');
} else {
  console.warn('⚠️ CTA section not found');
}

// Fix 2: Update Wood Catalog button to link to /contact
if (content.woodCatalog) {
  content.woodCatalog.ctaButtonLink = '/contact';
  console.log('✅ Fixed: "Télécharger le Catalogue" → /contact');
} else {
  console.warn('⚠️ Wood Catalog section not found');
}

// Save back to localStorage
localStorage.setItem('homepage_content', JSON.stringify(content));
console.log('💾 Saved to localStorage');

// Trigger update events
window.dispatchEvent(new Event('homepage_content_updated'));
console.log('📡 Update events triggered');

try {
  const channel = new BroadcastChannel('homepage_updates');
  channel.postMessage({ type: 'update', data: content });
  channel.close();
  console.log('📡 BroadcastChannel message sent');
} catch (e) {
  // BroadcastChannel not supported
}

console.log('\n✅ ALL FIXES APPLIED SUCCESSFULLY!');
console.log('📋 Summary:');
console.log('  • CTA Button 2: ' + content.cta?.button2Link);
console.log('  • Catalog Button: ' + content.woodCatalog?.ctaButtonLink);
console.log('\n🔄 Reloading page in 2 seconds...');

// Reload page after 2 seconds
setTimeout(() => {
  location.reload();
}, 2000);
