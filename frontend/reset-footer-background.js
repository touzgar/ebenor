/**
 * RESET FOOTER BACKGROUND IMAGE
 * 
 * This script restores the default footer background image.
 * Run this in your browser console on the admin page.
 */

// Default footer background image URL
const defaultBackgroundImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90';

// Get current footer content
let footerContent = JSON.parse(localStorage.getItem('footer_content') || '{}');

// Update background image to default
footerContent.backgroundImage = defaultBackgroundImage;

// Save back to localStorage
localStorage.setItem('footer_content', JSON.stringify(footerContent));

// Trigger update events for real-time sync
window.dispatchEvent(new Event('footer_content_updated'));

// Broadcast to other tabs
try {
  const channel = new BroadcastChannel('footer_updates');
  channel.postMessage({ type: 'update', data: footerContent });
  channel.close();
} catch (e) {
  console.log('BroadcastChannel not supported');
}

console.log('✅ Footer background image restored to default!');
console.log('📷 Image URL:', defaultBackgroundImage);
console.log('🔄 Please refresh the page to see the changes.');
