const WishDetail={
  show(e){
    const sec=document.querySelector("#detailSection"), card=document.querySelector("#detailCard");
    if(!sec||!card)return;
    const colors=WishGenerator?.theme(e.theme||e.type)||["#6d5dfc","#a28fff"];
    card.innerHTML=`<div class="hero" style="margin:0;background:linear-gradient(135deg,${colors[0]},${colors[1]})"><div class="eyebrow">${e.category||"EVENT"}</div><h1>${e.icon||"🎉"} ${e.name}</h1><p>${e.dateObj?fmt(e.dateObj):""}</p><div class="wish" style="color:white">${e.personal?wish(e):"Warm wishes on "+e.name+"! 🎉"}</div><button id="detailClose" class="primary" style="margin-top:14px;background:#ffffff22">Back</button></div>`;
    sec.classList.remove("hidden");
    document.querySelector("#detailClose").onclick=()=>sec.classList.add("hidden");
    sec.scrollIntoView({behavior:"smooth"});
  }
};