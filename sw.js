console.log(self);

self.addEventListener('install', function(event) {
	console.log('install', event);
	event.waitUntil(
	  fetchStuffAndInitDatabases()
	);
});

function fetchStuffAndInitDatabases () {
	console.log('fetchStuffAndInitDatabases')
}

self.addEventListener('activate', function(event) {
	console.log('activate', event);
});

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
