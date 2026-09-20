const WishNotify={
 key:"wishday-notify-v13",
 load(){try{return {...{today:true,tomorrow:true,personal:true,leadTime:0},...JSON.parse(localStorage.getItem(this.key)||"{}")}}catch(e){return{today:true,tomorrow:true,personal:true,leadTime:0}}},
 save(p){const x={...this.load(),...p};localStorage.setItem(this.key,JSON.stringify(x));return x},
 async request(){if(!("Notification"in window))return"unsupported";return await Notification.requestPermission()},
 async send(title,body){if("Notification"in window&&Notification.permission==="granted")new Notification(title,{body,icon:"./icons/icon-192.svg"})}
};