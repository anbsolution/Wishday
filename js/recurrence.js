const WishRecurrence={
 occurrence(e,year){
  if(!e?.repeatYearly||!e.date)return e?.date;
  const m=String(e.date).slice(5,10);return `${year}-${m}`;
 },
 normalize(e,base=new Date()){
  if(!e?.repeatYearly)return e;
  const d=this.occurrence(e,base.getFullYear());
  const x={...e,date:d,dateObj:new Date(d+"T00:00:00")};
  if(x.dateObj<new Date(base.getFullYear(),base.getMonth(),base.getDate())){x.date=this.occurrence(e,base.getFullYear()+1);x.dateObj=new Date(x.date+"T00:00:00")}
  return x;
 }
};