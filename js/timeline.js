document.addEventListener("DOMContentLoaded",()=>{
 const box=document.querySelector("#timelineList"),more=document.querySelector("#timelineMore");
 function draw(days=30){
  if(!box)return;
  let base=[];
  try{base=(typeof allEvents==="function"?allEvents():[])}catch(e){}
  const list=WishEngine.timeline(base,days);
  box.innerHTML=list.length?list.map(e=>`<div class="timeline-item"><div class="timeline-date">${WishStatus.label(e.status)}<small>${new Date(e.dateObj||e.date).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</small></div><div class="timeline-content"><b>${e.icon||"🎉"} ${e.name}</b><span>${e.category||e.type||"Event"}</span></div></div>`).join(""):`<div class="event"><div class="event-main">No events found in this period.</div></div>`;
 }
 more?.addEventListener("click",()=>{const d=more.dataset.long==="1"?7:30;more.dataset.long=d===30?"1":"0";more.textContent=d===30?"7 Days":"30 Days";draw(d)});
 setTimeout(()=>draw(30),300);
 window.addEventListener("wishday:refresh",()=>draw(Number(more?.textContent?.includes("30")?7:30)));
});