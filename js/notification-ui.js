document.addEventListener("DOMContentLoaded",()=>{
 const s=WishNotify.load(), map={nToday:"today",nTomorrow:"tomorrow",nPersonal:"personal"};
 Object.entries(map).forEach(([id,key])=>{const el=document.querySelector("#"+id);if(el){el.checked=!!s[key];el.onchange=()=>WishNotify.save({[key]:el.checked})}});
 document.querySelector("#enableNotifications")?.addEventListener("click",async()=>{const r=await WishNotify.request();const el=document.querySelector("#enableNotifications");el.textContent=r==="granted"?"🔔 Notifications Enabled":r==="denied"?"🔕 Notifications Blocked":"🔔 Not Supported"});
});