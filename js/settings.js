const WishSettings={
 key:"wishday-settings-v10",
 defaults:{theme:"auto",language:"hinglish",region:"all",notifyToday:true,notifyTomorrow:true,notifyPersonal:true,notifyDaysBefore:1},
 load(){try{return {...this.defaults,...JSON.parse(localStorage.getItem(this.key)||"{}")}}catch(e){return {...this.defaults}}},
 save(patch){const x={...this.load(),...patch};localStorage.setItem(this.key,JSON.stringify(x));return x},
 reset(){localStorage.removeItem(this.key);return this.load()}
};