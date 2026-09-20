const CACHE="wishday-v19";const A=["./","./index.html","./css/style.css","./js/app.js","./js/generator.js","./js/generator-ui.js","./js/notifications.js","./js/reminders.js","./js/notification-center.js","./js/notification-ui.js","./js/theme-engine.js","./js/theme-ui.js","./js/calendar-engine.js","./js/calendar-ui.js","./js/dashboard.js","./js/dashboard-ui.js","./js/command-center.js","./js/command-ui.js","./js/recurrence.js","./js/recurrence-ui.js","./js/years.js","./js/search.js","./js/event-detail.js","./js/discovery.js","./js/summary.js","./js/personal.js","./js/share.js","./js/tools-init.js","./js/settings.js","./js/settings-ui.js","./js/date-intel.js","./js/event-status.js","./js/event-engine.js","./js/timeline.js","./js/app-controls.js","./js/sync.js","./data/events.json","./data/dynamic-events.json","./data/public-holidays.json","./data/categories.json","./data/states.json","./data/wishes.json","./data/theme-presets.json","./data/settings-schema.json","./data/ui-config.json","./data/event-rules.json","./data/notification-schema.json","./manifest.json"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(A))));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.url.includes("/data/events.json"))return e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
  e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request)));
});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>cs.length?cs[0].focus():clients.openWindow("./")))});

self.addEventListener("push",event=>{
  let data={title:"WishDay",body:"You have an upcoming event.",tag:"wishday-push"};
  try{if(event.data)data={...data,...event.data.json()}}catch{}
  event.waitUntil(self.registration.showNotification(data.title,{body:data.body,icon:"icons/icon-192.svg",tag:data.tag}));
});
