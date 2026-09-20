const WishSync={
  async refresh(){
    if(!navigator.onLine)return {ok:false,reason:"offline"};
    try{
      const r=await fetch("data/events.json?ts="+Date.now(),{cache:"no-store"});
      if(!r.ok)throw new Error("event data unavailable");
      const data=await r.json();
      localStorage.setItem("wishday_last_sync",new Date().toISOString());
      return {ok:true,count:data.length};
    }catch(e){return {ok:false,reason:e.message}}
  }
};
window.addEventListener("online",()=>WishSync.refresh());
