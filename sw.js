const V = 'mf-v1';
const FILES = ['./', './index.html'];

self.addEventListener('install', e =>
  e.waitUntil(
    caches.open(V).then(c => c.addAll(FILES))
  )
);

self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k)))
    )
  )
);

self.addEventListener('fetch', e =>
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  )
);