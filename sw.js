const CACHE = 'estudos-v1';
const ARQUIVOS = [
  '/meu-site/',
  '/meu-site/index.html',
  '/meu-site/pdfs.html',
  '/meu-site/simulados.html',
  '/meu-site/flashcards.html',
  '/meu-site/mapas.html',
  '/meu-site/formulas.html'
];

// Instala e salva os arquivos no cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ARQUIVOS))
  );
});

// Serve do cache quando offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => caches.match('/meu-site/index.html'));
    })
  );
});

// Limpa caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});
