document.addEventListener("DOMContentLoaded",()=>{
 const s=WishSettings.load();
 const bind=(id,key)=>{const el=document.querySelector("#"+id);if(!el)return;el.value=s[key]??"";el.addEventListener("change",()=>WishSettings.save({[key]:el.type==="checkbox"?el.checked:el.value}))};
 bind("settingLang","language");bind("settingRegion","region");
 ["notifyToday","notifyTomorrow"].forEach(id=>{const el=document.querySelector("#"+id);if(el){el.checked=!!s[id];el.onchange=()=>WishSettings.save({[id]:el.checked})}});
});