var VERSION = '3.1.2';
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(VERSION).then(function(cache) {
      return cache.addAll(
        [
           './',
      './index.html',
      './sw.js',
      './css/style.css',
     './Icon.png',
     './fox-icon.png',
     './icon-512.png',
      './fox-icon.png'
        ]
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
   console.log('[ServiceWorker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

/*
Cache falling back to the network
if ofline first
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

*/

