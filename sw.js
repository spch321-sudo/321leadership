// 321領導力 — Service Worker
// Versioned cache: bump VERSION whenever app shell or data content changes,
// otherwise already-installed PWA users will keep seeing stale content.
var VERSION = "v1.3.0";
var SHELL_CACHE = "l321-shell-" + VERSION;
var DATA_CACHE = "l321-data-" + VERSION;

var SHELL_FILES = [
  "./",
  "./index.html",
  "./app.js",
  "./manifest.json",
  "./icon-72.png",
  "./icon-96.png",
  "./icon-128.png",
  "./icon-144.png",
  "./icon-152.png",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-384.png",
  "./icon-512.png",
];

var DATA_FILES = [
  "./data.zh.json",
  "./data.zs.json",
  "./data.en.json",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(function (cache) {
      return cache.addAll(SHELL_FILES);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== SHELL_CACHE && k !== DATA_CACHE; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var url = new URL(event.request.url);
  if (event.request.method !== "GET") return;

  // Never cache the AI companion proxy — always go live.
  if (url.hostname.indexOf("workers.dev") >= 0) return;

  var isData = DATA_FILES.some(function (f) { return url.pathname.indexOf(f.replace("./", "/")) >= 0; });

  if (isData) {
    // stale-while-revalidate for content data (three-language JSON packs)
    event.respondWith(
      caches.open(DATA_CACHE).then(function (cache) {
        return cache.match(event.request).then(function (cached) {
          var fetchPromise = fetch(event.request).then(function (resp) {
            if (resp && resp.ok) cache.put(event.request, resp.clone());
            return resp;
          }).catch(function () { return cached; });
          return cached || fetchPromise;
        });
      })
    );
    return;
  }

  // cache-first for app shell
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request).then(function (resp) {
        if (resp && resp.ok && url.origin === location.origin) {
          var respClone = resp.clone();
          caches.open(SHELL_CACHE).then(function (cache) { cache.put(event.request, respClone); });
        }
        return resp;
      }).catch(function () {
        if (event.request.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
