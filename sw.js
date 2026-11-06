const C="us-v1";
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
});
self.addEventListener("push",e=>{
  let d={title:"Reminder",body:""};try{d=e.data.json()}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:"icon-192.png",tag:d.tag}));
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:"window"}).then(l=>l.length?l[0].focus():clients.openWindow("./")));
});
