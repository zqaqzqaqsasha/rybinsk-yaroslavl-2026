const PREFIX='ry-2026-',CACHE=PREFIX+'v4';
const APP_SHELL=['./','./index.html','./style.css','./core.js','./app.js','./venue-cards.css','./venue-cards.js','./trip-nav.css','./trip-nav.js','./data/trip.json','./data/weather.json','./assets/icon.svg','./manifest.webmanifest','./route.md','./docs/verification.md'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL.map(path=>new Request(new URL(path,self.registration.scope),{cache:"reload"})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(request,{cache:"no-cache"});if(response.ok)await cache.put(request,response.clone());return response;}catch(error){const saved=await cache.match(request);if(saved)return saved;if(request.mode==='navigate')return (await cache.match('./index.html'))||Response.error();return Response.error();}})());
});
