const WishNotifications={
  async permission(){
    if(!("Notification" in window)) return "unsupported";
    if(Notification.permission==="default") return await Notification.requestPermission();
    return Notification.permission;
  },
  async scheduleCheck(){
    const p=await this.permission();
    if(p!=="granted" || !("serviceWorker" in navigator)) return false;
    const regs=await navigator.serviceWorker.getRegistrations();
    const reg=regs[0] || await navigator.serviceWorker.ready;
    const today=new Date();
    const tomorrow=new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);
    const upcoming=typeof on==="function" ? on(tomorrow) : [];
    if(upcoming.length){
      reg.showNotification("WishDay — Tomorrow",{
        body:upcoming.map(e=>`${e.icon||"🎉"} ${e.name}`).join(" • "),
        icon:"icons/icon-192.svg",
        tag:"wishday-tomorrow"
      });
    }
    return true;
  }
};