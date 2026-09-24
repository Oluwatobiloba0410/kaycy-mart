const CACHE_NAME = "kaycy-mart-v1";

const APP_SHELL = [
  "./",
  "./Index.html",
  "./Products.html",
  "./ProductDetails.html",
  "./Cart.html",
  "./Checkout.html",
  "./Orders.html",
  "./Account.html",
  "./About.html",
  "./Contact.html",
  "./Kaycy.jpg",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Don't interfere with the Kaycy Mart backend/API.
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});