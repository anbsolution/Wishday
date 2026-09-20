document.addEventListener("DOMContentLoaded",async()=>{
 const box=document.querySelector("#themeOptions");if(!box)return;
 let presets=[];try{presets=await fetch("./data/theme-presets.json").then(r=>r.json())}catch(e){}
 const current=WishTheme.load();
 box.innerHTML=[{id:"auto",name:"Auto",emoji:"⚙️"},{id:"sunrise",name:"Sunrise",emoji:"🌅"},{id:"midnight",name:"Midnight",emoji:"🌙"},{id:"festival",name:"Festival",emoji:"🎉"},{id:"classic",name:"Classic",emoji:"✨"}].map(x=>`<button class="theme-choice ${current===x.id?"active":""}" data-theme="${x.id}">${x.emoji} ${x.name}</button>`).join("");
 box.querySelectorAll("button").forEach(b=>b.onclick=()=>{const t=b.dataset.theme==="auto"?WishTheme.auto():b.dataset.theme;WishTheme.apply(t);box.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));});
 WishTheme.apply(current==="auto"?WishTheme.auto():current);
});