let personalEvents=typeof WishPersonal!=="undefined"?WishPersonal.load():[];
const $=s=>document.querySelector(s);
const icons={birthday:"🎂",anniversary:"💍",festival:"🎉",national:"🇮🇳",state:"🏛️",important:"🌍"};let dynamicEvents=[];
const wishes={
birthday:{hi:["जन्मदिन की हार्दिक शुभकामनाएँ! आपका आने वाला वर्ष खुशियों और सफलता से भरा रहे। 🎂✨"],en:["Happy Birthday! Wishing you a year filled with happiness, good health and success. 🎂✨"],hinglish:["Happy Birthday! Aapka har din khushiyon aur success se bhara rahe. 🎂✨"]},
anniversary:{hi:["सालगिरह की हार्दिक शुभकामनाएँ! आपका साथ हमेशा खुशियों से भरा रहे। 💍❤️"],en:["Happy Anniversary! Wishing you both many more years of love and happiness. 💍❤️"],hinglish:["Happy Anniversary! Aap dono ka saath hamesha pyaar aur khushiyon se bhara rahe. 💍❤️"]}};
const today=new Date();let view="today",cal=new Date(today.getFullYear(),today.getMonth(),1);
let people=typeof WishPersonal!=="undefined"?WishPersonal.load():JSON.parse(localStorage.getItem("wishday_people")||"[]"),settings=JSON.parse(localStorage.getItem("wishday_settings")||'{"state":"all","lang":"hinglish","notifications":false,"tomorrow":true,"eventDay":true}'),events=[];
const day=(d)=>`${d.getMonth()+1}-${d.getDate()}`, key=d=>d.toISOString().slice(0,10);
const fmt=d=>d.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
const dateY=(mmdd,y)=>{let [m,d]=mmdd.split("-").map(Number);return new Date(y,m-1,d)};
function allEvents(){
 const fixed=events.map(e=>({...e,dateObj:e.mmdd?dateY(e.mmdd,today.getFullYear()):new Date(e.date),personal:false}));
 const dyn=dynamicEvents.map(e=>({...e,dateObj:dateY(String(e.month).padStart(2,"0")+"-"+String(e.day).padStart(2,"0"),today.getFullYear()),personal:false}));
 const ext=(window.publicHolidays||[]).map(e=>({...e,dateObj:new Date(e.date+"T00:00:00"),personal:false}));
 return [...fixed,...dyn,...ext,...people.map(e=>({...e,dateObj:dateY(e.date.slice(5),today.getFullYear()),personal:true,category:e.type}))];
}
function filtered(){let list=allEvents().filter(e=>settings.state==="all"||e.state==="all"||e.state===settings.state);if(typeof WishCommand!=="undefined")list=WishCommand.apply(list);return typeof WishDiscovery!=="undefined"?WishDiscovery.apply(list):list}
function on(d){return filtered().filter(e=>day(e.dateObj)===day(d))}
function nextDate(e){let d=dateY(e.dateObj.toISOString().slice(5,10),today.getFullYear());if(d<new Date(today.getFullYear(),today.getMonth(),today.getDate()))d=dateY(e.dateObj.toISOString().slice(5,10),today.getFullYear()+1);return d}
function wish(e){
 if(e.wish)return e.wish;
 if(e.type==="birthday")return `Happy Birthday, ${e.name}! 🎂`;
 if(e.type==="anniversary")return `Happy Anniversary, ${e.name}! 💐`;
 return `Warm wishes on ${e.name}! 🎉`;
}
function card(e){return `<article class="event"><div class="icon">${icons[e.type]||"🎉"}</div><div class="event-main"><div class="title">${esc(e.name)}</div><div class="meta">${esc(e.category||e.type)} • ${fmt(e.dateObj)}</div><div class="wish">${esc(wish(e))}</div></div>${e.personal?`<button onclick="removeEvent('${e.id}')">🗑️</button>`:""}</article>`}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){
$("#state").value=settings.state;$("#lang").value=settings.lang||"hinglish";
$("#morningToggle").checked=settings.morning!==false;
$("#tomorrowToggle").checked=settings.tomorrow!==false;
$("#eventDayToggle").checked=settings.eventDay!==false;
$("#todayCount").textContent=on(today).length+" event"+(on(today).length!==1?"s":"");
let tm=new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);$("#tomorrowCount").textContent=on(tm).length+" event"+(on(tm).length!==1?"s":"");
$("#daySection").classList.toggle("hidden",view!=="today"&&view!=="tomorrow");$("#peopleSection").classList.toggle("hidden",view!=="people");$("#calendarSection").classList.toggle("hidden",view!=="calendar");
if(view==="today"||view==="tomorrow"){let d=view==="today"?today:tm;$("#sectionTitle").textContent=view==="today"?"Today":"Tomorrow";$("#eventList").innerHTML=on(d).length?on(d).map(card).join(""):`<div class="event"><div class="event-main">No events found for ${fmt(d)}.</div></div>`}
if(view==="people")$("#peopleList").innerHTML=people.length?people.map(e=>card({...e,dateObj:dateY(e.date.slice(5),today.getFullYear()),personal:true})).join(""):`<div class="event"><div class="event-main">No personal events yet. Tap ＋ Add.</div></div>`;
if(view==="calendar")calendar();
hero();
}
function hero(){
let list=filtered().map(e=>({...e,next:nextDate(e)})).sort((a,b)=>a.next-b.next),e=list[0];if(!e)return;
let s=Math.max(0,Math.floor((e.next-Date.now())/1000)),d=Math.floor(s/86400);s%=86400;let h=Math.floor(s/3600);s%=3600;let m=Math.floor(s/60),sec=s%60;
$("#heroTitle").textContent=e.name;$("#heroMeta").textContent=`${icons[e.type]||"🎉"} ${e.category||e.type} • ${fmt(e.next)}`;$("#countdown").textContent=`${String(d).padStart(2,"0")}d ${String(h).padStart(2,"0")}h ${String(m).padStart(2,"0")}m ${String(sec).padStart(2,"0")}s`;$("#heroEyebrow").textContent=on(today).length?"TODAY":"UPCOMING";
let theme=e.theme||e.type;$("#hero").style.background=theme==="diwali"?"linear-gradient(135deg,#7a3000,#f0a000)":theme==="holi"?"linear-gradient(135deg,#e83e8c,#ff9f43)":theme==="christmas"?"linear-gradient(135deg,#14733b,#b52b36)":theme==="national"?"linear-gradient(135deg,#e86b25,#5b4ce8)":"linear-gradient(135deg,#6d5dfc,#a28fff)";
}
function calendar(){let y=cal.getFullYear(),m=cal.getMonth();$("#month").textContent=cal.toLocaleDateString("en-IN",{month:"long",year:"numeric"});let h=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(x=>`<div class="calhead">${x}</div>`).join(""),start=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();for(let i=0;i<start;i++)h+=`<div></div>`;for(let d=1;d<=days;d++){let dt=new Date(y,m,d),has=on(dt).length;h+=`<div class="day ${has?"event":""} ${key(dt)===key(today)?"today":""}">${d}${has?" •":""}</div>`}$("#calendarGrid").innerHTML=h}
window.removeEvent=id=>{people=people.filter(x=>x.id!==id);WishPersonal.save(people);render();toast("Event removed")};
function toast(t){let x=$("#toast");x.textContent=t;x.className="show";setTimeout(()=>x.className="",1800)}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{view=b.dataset.view;render()});
$("#addBtn").onclick=$("#addBtn2").onclick=()=>$("#dlg").showModal();$("#close").onclick=()=>$("#dlg").close();
$("#form").onsubmit=e=>{e.preventDefault();people.push({id:crypto.randomUUID(),name:$("#name").value.trim(),type:$("#type").value,date:$("#date").value,relation:$("#relation").value.trim(),wish:$("#wish").value.trim(),notify:$("#notify").checked,notifyDaysBefore:Number($("#notifyDays").value),repeatYearly:true,createdAt:new Date().toISOString()});WishPersonal.save(people);e.target.reset();$("#notify").checked=true;$("#dlg").close();render();toast("Saved on this device")};
$("#state").onchange=()=>{settings.state=$("#state").value;localStorage.setItem("wishday_settings",JSON.stringify(settings));render()};
$("#lang").onchange=()=>{settings.lang=$("#lang").value;localStorage.setItem("wishday_settings",JSON.stringify(settings));render()};
["morningToggle","tomorrowToggle","eventDayToggle"].forEach(id=>{
 const el=document.querySelector("#"+id); if(el) el.onchange=()=>{
   settings.notifications=true;
   if(id==="morningToggle")settings.morning=el.checked;
   if(id==="tomorrowToggle")settings.tomorrow=el.checked;
   if(id==="eventDayToggle")settings.eventDay=el.checked;
   localStorage.setItem("wishday_settings",JSON.stringify(settings));
 };
});
$("#prev").onclick=()=>{cal.setMonth(cal.getMonth()-1);render()};$("#next").onclick=()=>{cal.setMonth(cal.getMonth()+1);render()};
$("#notifyBtn").onclick=async()=>{if(!("Notification"in window)){toast("Notifications unavailable");return}let p=await Notification.requestPermission();if(p==="granted"){
 settings.notifications=true;localStorage.setItem("wishday_settings",JSON.stringify(settings));
 let r=await navigator.serviceWorker.ready;r.showNotification("WishDay enabled",{body:"Event notifications are now permitted.",icon:"icons/icon-192.svg"});
 toast("Notifications enabled"); if(typeof WishReminderEngine!=="undefined")WishReminderEngine.run();
}else toast("Permission not granted")};
$("#settings").onclick=()=>toast("Use the region selector below to change state");
fetch("data/events.json").then(r=>r.json()).then(x=>{events=x;render();if(typeof WishDiscovery!=="undefined"){WishDiscovery.buildFilters();WishDiscovery.renderUpcoming()}});
if("serviceWorker"in navigator)navigator.serviceWorker.register("service-worker.js");
setInterval(hero,1000);setInterval(()=>{if(typeof WishDiscovery!=="undefined")WishDiscovery.renderUpcoming()},60000);

async function updateSyncStatus(){
  const el=document.querySelector("#syncStatus"); if(!el)return;
  const last=localStorage.getItem("wishday_last_sync");
  el.textContent=last?`Last online sync: ${new Date(last).toLocaleString()}`:"Not synced yet";
}
document.addEventListener("DOMContentLoaded",()=>{
  const sb=document.querySelector("#syncBtn");
  const rb=document.querySelector("#reminderBtn");
  if(sb)sb.onclick=async()=>{const r=await WishSync.refresh();toast(r.ok?`Synced ${r.count} events`:"Sync unavailable");updateSyncStatus()};
  if(rb)rb.onclick=async()=>{const ok=await WishNotifications.scheduleCheck();toast(ok?"Tomorrow reminder checked":"Notification permission required")};
  updateSyncStatus();
  WishSync.refresh().then(updateSyncStatus);
});

setTimeout(()=>{if(typeof WishReminderEngine!=="undefined")WishReminderEngine.run()},2500);

document.addEventListener("DOMContentLoaded",()=>{
 const sb=document.querySelector("#searchBtn"),sd=document.querySelector("#closeSearch"),si=document.querySelector("#searchInput");
 if(sb)sb.onclick=()=>WishSearch.open();
 if(sd)sd.onclick=()=>document.querySelector("#searchDialog").close();
 if(si)si.oninput=()=>WishSearch.run(si.value);
 document.querySelector("#searchResults")?.addEventListener("click",e=>{
   const row=e.target.closest("[data-search-id]"); if(!row)return;
   const name=row.querySelector(".title")?.textContent;
   const ev=filtered().find(x=>x.name===name); if(ev){document.querySelector("#searchDialog").close();WishDetail.show(ev);}
 });
 fetch("data/dynamic-events.json").then(r=>r.json()).then(x=>{dynamicEvents=x;render()});
 fetch("data/public-holidays.json").then(r=>r.json()).then(x=>{window.publicHolidays=x;render()});
});

window.dispatchEvent(new CustomEvent("wishday:refresh"));
