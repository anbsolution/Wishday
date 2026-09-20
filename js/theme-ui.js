document.addEventListener("DOMContentLoaded",async()=>{
 const box=document.querySelector("#themeOptions");if(!box)return;
 let presets=[];try{presets=await fetch("./data/theme-presets.json").then(r=>r.json())}catch(e){}
 const current=WishTheme.load();
 box.innerHTML=presets.map(x=>`<button class="theme-choice ${current===x.id?"active":""}" data-theme="${x.id}" title="${x.description||x.name}"><span class="theme-emoji">${x.emoji}</span><span class="theme-name">${x.name}</span><small>${x.description||""}</small></button>`).join("");
 box.querySelectorAll(".theme-choice").forEach(b=>b.onclick=()=>{WishTheme.apply(b.dataset.theme);box.querySelectorAll(".theme-choice").forEach(x=>x.classList.toggle("active",x===b))});
 WishTheme.init();
});
