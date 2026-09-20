const WishDashboard={
 stats(events=[]){
  const s={total:events.length,birthdays:0,anniversaries:0,today:0,upcoming:0};
  const now=new Date();now.setHours(0,0,0,0);
  events.forEach(e=>{if(e.type==="birthday")s.birthdays++;if(e.type==="anniversary")s.anniversaries++;const d=e.dateObj||new Date(e.date+"T00:00:00");d.setHours(0,0,0,0);const n=Math.round((d-now)/86400000);if(n===0)s.today++;if(n>0)s.upcoming++});
  return s;
 }
};