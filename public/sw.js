// Placeholder service worker for Phechaan PWA
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  self.clients.claim();
});
// Add caching logic here if needed 