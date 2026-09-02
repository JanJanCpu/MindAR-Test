const CACHE_NAME = "ar-cache-v1";

// List EVERY file your app needs to run offline
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./targets.mind",
  "./model.glb",
  "https://aframe.io/releases/1.3.0/aframe.min.js",
  "https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-aframe.prod.js",
];

// Install phase: Download and cache everything
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    }),
  );
});

// Fetch phase: Serve from cache if available, otherwise use network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
