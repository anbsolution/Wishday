const WishReminderEngine={
  key:(kind,date)=>`wishday_sent_${kind}_${date}`,
  todayKey(){return new Date().toISOString().slice(0,10)},
  async notify(title,body,tag){
    if(!("Notification" in window)||Notification.permission!=="granted"||!("serviceWorker"in navigator)) return false;
    try{
      const reg=await navigator.serviceWorker.ready;
      await reg.showNotification(title,{body,icon:"icons/icon-192.svg",tag,renotify:false});
      return true;
    }catch{return false}
  },
  async run(){
    const s=JSON.parse(localStorage.getItem("wishday_settings")||'{}');
    if(!s.notifications) return;
    const today=new Date(), tomorrow=new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);
    if(s.eventDay!==false && typeof on==="function"){
      const list=on(today).filter(e=>e.personal);
      if(list.length){
        const k=this.key("eventday",this.todayKey());
        if(!localStorage.getItem(k)){
          const ok=await this.notify("WishDay — Today",list.map(e=>`${e.icon||"🎉"} ${e.name}`).join(" • "),"wishday-eventday");
          if(ok)localStorage.setItem(k,"1");
        }
      }
    }
    if(s.tomorrow!==false && typeof on==="function"){
      const list=on(tomorrow);
      if(list.length){
        const k=this.key("tomorrow",tomorrow.toISOString().slice(0,10));
        if(!localStorage.getItem(k)){
          const ok=await this.notify("WishDay — Tomorrow",list.map(e=>`${e.icon||"🎉"} ${e.name}`).join(" • "),"wishday-tomorrow");
          if(ok)localStorage.setItem(k,"1");
        }
      }
    }
  }
};