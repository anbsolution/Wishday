/* WishDay V20 - resilient interaction controller */
(function(){
  function q(s){return document.querySelector(s)}
  function toastSafe(msg){
    try{if(typeof toast==="function"){toast(msg);return}}catch(e){}
    const x=q("#toast");if(!x)return;
    x.textContent=msg;x.className="show";setTimeout(()=>x.className="",1800);
  }
  function setView(v){
    try{
      window.view=v;
      q("#daySection")?.classList.toggle("hidden",v!=="today"&&v!=="tomorrow");
      q("#peopleSection")?.classList.toggle("hidden",v!=="people");
      q("#calendarSection")?.classList.toggle("hidden",v!=="calendar");
      if(typeof render==="function")render();
    }catch(e){console.error("WishDay view error",e);toastSafe("View could not be opened");}
  }

  document.addEventListener("click",function(e){
    const view=e.target.closest("[data-view]");
    if(view){e.preventDefault();setView(view.dataset.view);return}

    const add=e.target.closest("#addBtn,#addBtn2");
    if(add){e.preventDefault();q("#dlg")?.showModal();return}

    if(e.target.closest("#close")){e.preventDefault();q("#dlg")?.close();return}
    if(e.target.closest("#closeSearch")){e.preventDefault();q("#searchDialog")?.close();return}

    const theme=e.target.closest(".theme-choice");
    if(theme&&typeof WishTheme!=="undefined"){
      e.preventDefault();
      WishTheme.apply(theme.dataset.theme);
      q("#themeOptions")?.querySelectorAll(".theme-choice").forEach(x=>x.classList.toggle("active",x===theme));
      return;
    }

    const filter=e.target.closest(".filter");
    if(filter&&typeof WishDiscovery!=="undefined"){
      e.preventDefault();
      WishDiscovery.category=filter.dataset.cat||"all";
      WishDiscovery.buildFilters();
      if(typeof render==="function")render();
      WishDiscovery.renderUpcoming();
      return;
    }

    if(e.target.closest("#prev")){
      e.preventDefault();
      if(typeof cal!=="undefined"){cal.setMonth(cal.getMonth()-1);if(typeof render==="function")render()}
      return;
    }
    if(e.target.closest("#next")){
      e.preventDefault();
      if(typeof cal!=="undefined"){cal.setMonth(cal.getMonth()+1);if(typeof render==="function")render()}
      return;
    }

    if(e.target.closest("#searchBtn")){
      e.preventDefault();
      try{WishSearch.open()}catch(x){q("#searchDialog")?.showModal()}
      return;
    }
    if(e.target.closest("#clearSearch")){
      const i=q("#globalSearch");
      if(i){i.value="";i.dispatchEvent(new Event("input",{bubbles:true}));i.focus()}
      return;
    }

    if(e.target.closest("#generateWish")){
      e.preventDefault();
      const out=q("#generatedWish"),type=q("#wishType")?.value,lang=q("#wishLang")?.value;
      if(out&&typeof WishGenerator!=="undefined"){
        WishGenerator.wish(type,lang).then(x=>out.value=x||"Wish generate nahi ho paya.").catch(()=>out.value="Wish generate nahi ho paya.");
      }
      return;
    }
    if(e.target.closest("#copyWish")){
      const out=q("#generatedWish");
      if(out?.value)navigator.clipboard?.writeText(out.value).then(()=>toastSafe("Wish copied"));
      return;
    }
    if(e.target.closest("#shareWish")){
      const out=q("#generatedWish");
      if(out?.value&&typeof WishTools!=="undefined")WishTools.shareEvent({name:"WishDay Wish",date:"",wish:out.value});
      return;
    }

    if(e.target.closest("#exportPersonal")){
      try{WishPersonal.export()}catch(x){toastSafe("Backup failed")}
      return;
    }
    if(e.target.closest("#installApp")){
      q("#appUpdateNote")&&(q("#appUpdateNote").textContent="Install option is available from your browser menu.");
      return;
    }
    if(e.target.closest("#checkUpdate")){
      q("#appUpdateNote")&&(q("#appUpdateNote").textContent=navigator.onLine?"Latest event data is reachable.":"Offline: using saved data.");
      return;
    }

    if(e.target.closest("#syncBtn")){
      if(typeof WishSync!=="undefined")WishSync.refresh().then(r=>toastSafe(r.ok?"Events synced":"Sync unavailable"));
      return;
    }
    if(e.target.closest("#reminderBtn")){
      if(typeof WishNotifications!=="undefined")WishNotifications.scheduleCheck().then(ok=>toastSafe(ok?"Reminder checked":"Notification permission required"));
      return;
    }

    if(e.target.closest("#enableNotifications")){
      if(typeof WishNotify!=="undefined")WishNotify.request().then(r=>toastSafe(r==="granted"?"Notifications enabled":"Permission not granted"));
      return;
    }

    if(e.target.closest("#settings")){
      q("#settingsPanel")?.scrollIntoView({behavior:"smooth"});
      return;
    }
  },true);

  document.addEventListener("DOMContentLoaded",function(){
    try{if(typeof WishTheme!=="undefined")WishTheme.init()}catch(e){}
    q("#form")?.addEventListener("submit",()=>setTimeout(()=>{
      try{if(typeof render==="function")render()}catch(e){}
    },50),true);
  });
})();
