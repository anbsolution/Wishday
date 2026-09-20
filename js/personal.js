const WishPersonal={
 key:"wishday_people",
 load(){try{return JSON.parse(localStorage.getItem(this.key)||"[]")}catch(e){return[]}},
 save(list){localStorage.setItem(this.key,JSON.stringify(list));return list},
 add(e){const list=this.load();e.id=e.id||("p-"+Date.now());e.repeatYearly=e.repeatYearly!==false;e.createdAt=e.createdAt||new Date().toISOString();list.push(e);this.save(list);return e},
 remove(id){this.save(this.load().filter(x=>x.id!==id))},
 export(){const blob=new Blob([JSON.stringify(this.load(),null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="wishday-personal-events.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)},
 async import(file){const data=JSON.parse(await file.text());if(!Array.isArray(data))throw new Error("Invalid backup");this.save(data);return data.length}
};