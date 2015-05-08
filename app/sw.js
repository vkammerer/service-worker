importScripts('../bower_components/cache-polyfill/index.js');


var initCache = function initCache () {
	caches.open('v1').then(function(cache) {
		return cache.addAll([
			'/app/',
			'/app/index.html',
			'/app/style.css',
			'/app/script.js'
		]);
	})
}

self.addEventListener('install', function(event) {
	console.log('install', event);
	event.waitUntil(
		initCache()
	);
});

self.addEventListener('activate', function(event) {
	console.log('activate', event);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
})

/*
	Custom response example
*/

/*
self.addEventListener('fetch', function(event) {
  console.log('fetch', event);
	if (/\.css$/.test(event.request.url)) {
		event.respondWith(
			new Response('body { color: red; }', {
			  headers: { 'Content-Type': 'text/css' }
			})
		);
	}
});
*/
