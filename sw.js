let cacheName = "restaurants";
let urlsToCache = [
    "/skeleton",
    "index.html",
    "restaurant.html",
    "css/styles.css",
    "data/restaurants.json",
    "js/dbhelper.js",
    "js/main.js",
    "js/restaurant_info.js",
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/5.jpg",
    "img/6.jpg",
    "img/7.jpg",
    "img/8.jpg",
    "img/9.jpg",
    "img/10.jpg"
];

self.addEventListener('install',function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('install: ok!');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate',function (event) {
   event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
    let requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if(requestUrl.pathname === '/'){
            event.respondWith(caches.match('/skeleton'));
            return;
        }
        event.respondWith(
            caches.match(event.request).then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
        );
    }
    
});
