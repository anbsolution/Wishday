document.addEventListener("DOMContentLoaded",()=>{
 const grid=document.querySelector("#calendarGrid"),title=document.querySelector("#calTitle");
 function draw(){
  if(!grid)return;
  const base=typeof allEvents==="function"?allEvents():[],x=WishCalendar.build(base);
  title.textContent=x.title;
  const cells=[];for(let i=0;i<x.start;i++)cells.push(`<div class="cal-cell muted"></div>`);
  for(let d=1;d<=x.days;d++){const es=x.map[d]||[];cells.push(`<button class="cal-cell ${es.length?"has-event":""}" data-day="${d}"><b>${d}</b>${es.slice(0,2).map(e=>`<span>${e.icon||"•"} ${e.name}</span>`).join("")}</button>`)}
  grid.innerHTML=cells.join("");
 }
 document.querySelector("#calPrev")?.addEventListener("click",()=>{WishCalendar.month--;if(WishCalendar.month<0){WishCalendar.month=11;WishCalendar.year--}draw()});
 document.querySelector("#calNext")?.addEventListener("click",()=>{WishCalendar.month++;if(WishCalendar.month>11){WishCalendar.month=0;WishCalendar.year++}draw()});
 setTimeout(draw,350);window.addEventListener("wishday:refresh",draw);
});