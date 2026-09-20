const WishSearch={
  open(){document.querySelector("#searchDialog").showModal();document.querySelector("#searchInput").focus();this.run("")},
  run(q){
    q=q.trim().toLowerCase();
    const data=typeof filtered==="function"?filtered():[];
    const results=data.filter(e=>!q||String(e.name).toLowerCase().includes(q)||String(e.category||"").toLowerCase().includes(q)||String(e.type).toLowerCase().includes(q)).slice(0,30);
    document.querySelector("#searchResults").innerHTML=results.length?results.map(e=>`<div class="event" data-search-id="${e.id||e.name}"><div class="icon">${e.icon||"🎉"}</div><div class="event-main"><div class="title">${e.name}</div><div class="meta">${e.category||e.type} • ${e.dateObj?fmt(e.dateObj):""}</div></div></div>`).join(""):`<div class="event"><div class="event-main">No matching events.</div></div>`;
  }
};