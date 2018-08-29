var VERSION = '3';
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
     './icon-512.png'
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

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  btnAdd.style.display = 'block';
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
/////////////
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(VERSION).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

////////////
function fetch(url) {
  return fetch(url)
    .then(function(response) {
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(VERSION)
      .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  })
    .catch(function(error) {
    console.log('Request failed:', error);
    // You could return a custom offline 404 page here
  });
}
*/
