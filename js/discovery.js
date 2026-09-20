const WishDiscovery={
 category:"all",
 buildFilters(){
  const box=document.querySelector("#filters");if(!box)return;
  const cats=[["all","✨ All"],["birthday","🎂 Birthday"],["anniversary","💍 Anniversary"],["festival","🎉 Festival"],["national","🇮🇳 National"],["state","🏛️ State"],["important","🌍 Important"]];
  box.innerHTML=cats.map(c=>`<button class="filter ${c[0]===this.category?"active":""}" data-cat="${c[0]}">${c[1]}</button>`).join("");
  box.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{this.category=b.dataset.cat;this.buildFilters();render();this.renderUpcoming()});
 },
 apply(list){return this.category==="all"?list:list.filter(e=>e.type===this.category)},
 renderUpcoming(){
  const box=document.querySelector("#upcomingList");if(!box)return;
  let out=[],d=new Date();
  for(let i=0;i<7;i++){let list=typeof on==="function"?on(d):[];this.apply(list).forEach(e=>out.push({...e,showDate:new Date(d)}));d.setDate(d.getDate()+1)}
  box.innerHTML=out.length?out.map(e=>`<div class="event"><div class="icon">${e.icon||"🎉"}</div><div class="event-main"><div class="title">${e.name}</div><div class="meta">${e.showDate.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})} • ${e.category||e.type}</div></div></div>`).join(""):`<div class="event"><div class="event-main">No matching events in the next 7 days.</div></div>`;
 }
};