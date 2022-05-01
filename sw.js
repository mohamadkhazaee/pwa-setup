// we don't need to store manifest file.it's like a metadata that we do not use inside out pwa app
// we can store external assets

const assets = [
  "styles.css",
  "app.js",
  "sw-register.js",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

//The self read-only property of the WorkerGlobalScope interface returns a reference to the WorkerGlobalScope itself.
// we set an event listener on sw register.then we can use Cache apis to store our assets.like files,images,etc.
self.addEventListener("install", (event) => {
  // because SW normally closes after about 40 seconds, we use waitUntill() method to make the SW running untill
  // caching process is done
  event.waitUntil(
    caches.open("assets").then((cache) => {
      cache.addAll(assets);
    })
  );
});

// to serve the file
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("assets").then((cache) => {
      cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(
          event.request(
            then((res) => {
              caches.open("assets").then((cache) => {
                cache.put(event.request, res.clone());
                return res;
              });
            })
          )
        );
        return cachedResponse || fetchPromise;
      });
    })
  );
});
