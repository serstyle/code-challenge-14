const cacheName = 'v2'


self.addEventListener('install', function(event) {
	console.log('installed')
});

self.addEventListener('activate', function(event) {

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
    	.then(res => {
    		const resClone = res.clone();
    		caches
    			.open(cacheName)
    			.then(cache => {
    				cache.put(event.request, resClone);
    			});
    		return res
    	}).catch(err => caches.match(event.request).then(res => res))
    );
});