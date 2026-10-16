const CACHE='chaps-gym-shell-v5';
const FILES=['./','./index.html','./style.css','./app.mjs?v=1.0.3','./engine.mjs?v=1.0.3','./storage.mjs?v=1.0.3','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('chaps-gym-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(e.request.mode==='navigate'?fetch(e.request).catch(()=>caches.match('./index.html')):caches.match(e.request).then(cached=>cached||fetch(e.request)));});
