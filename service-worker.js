const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "/min-test/",
    "/min-test/index.html",
    "/min-test/styles.css",
    "/min-test/manifest.json",
    "/min-test/service-worker.js",
    "/min-test/billede.png"  // Husk at ændre billednavnet, hvis nødvendigt
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => caches.match("/min-test/index.html"))  // Fallback til forsiden
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
