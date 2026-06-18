/**
 * Fix Showroom Button Link
 * 
 * Run this in the browser console to update the "Visiter notre showroom" button
 * to link to the correct /showroom page instead of /produits
 */

// Get existing content
const saved = localStorage.getItem('homepage_content');
let content = {};

if (saved) {
  try {
    content = JSON.parse(saved);
    console.log('📖 Current content found');
  } catch (e) {
    console.error('❌ Error parsing localStorage:', e);
  }
}

// Update button2Link to /showroom
if (content.cta) {
  content.cta.button2Link = '/showroom';
  console.log('✅ Updated button2Link to /showroom');
} else {
  console.warn('⚠️ No CTA section found in localStorage');
}

// Save back to localStorage
localStorage.setItem('homepage_content', JSON.stringify(content));

// Trigger update events
window.dispatchEvent(new Event('homepage_content_updated'));

try {
  const channel = new BroadcastChannel('homepage_updates');
  channel.postMessage({ type: 'update', data: content });
  channel.close();
} catch (e) {
  // BroadcastChannel not supported
}

console.log('✅ Showroom button link fixed!');
console.log('📦 Button 2 Link:', content.cta?.button2Link);
console.log('🔄 Refresh the page to see changes');
