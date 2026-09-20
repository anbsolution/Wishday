const WishEngine={
 clean(list){
  const map=new Map();
  for(const e of (list||[])){
   if(!e||!e.name)continue;
   const key=e.id||`${e.date||""}|${String(e.name).trim().toLowerCase()}`;
   const old=map.get(key);
   if(!old||this.priority(e)>this.priority(old))map.set(key,e);
  }
  return [...map.values()];
 },
 priority(e){return e.personal?4:(e.source==="public-holiday"?3:(e.source==="dynamic"||e.external_verified?2:1))},
 timeline(list,days=30){
  const out=[],now=new Date();now.setHours(0,0,0,0);
  for(const e of this.clean(list)){const d=e.dateObj||new Date(e.date+"T00:00:00");d.setHours(0,0,0,0);const n=Math.round((d-now)/86400000);if(n>=0&&n<=days)out.push({...e,days:n,status:n===0?"today":n===1?"tomorrow":"upcoming"})}
  return out.sort((a,b)=>a.days-b.days);
 }
};