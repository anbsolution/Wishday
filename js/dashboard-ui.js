document.addEventListener("DOMContentLoaded",()=>{
 function draw(){try{const s=WishDashboard.stats(typeof allEvents==="function"?allEvents():[]);for(const [id,v] of Object.entries({statTotal:s.total,statBirthday:s.birthdays,statAnniversary:s.anniversaries,statUpcoming:s.upcoming})){const el=document.getElementById(id);if(el)el.textContent=v}}catch(e){}}
 setTimeout(draw,500);window.addEventListener("wishday:refresh",draw);
});