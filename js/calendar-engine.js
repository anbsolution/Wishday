const WishCalendar={
 month:new Date().getMonth(),year:new Date().getFullYear(),
 daysInMonth(y,m){return new Date(y,m+1,0).getDate()},
 firstDay(y,m){return new Date(y,m,1).getDay()},
 monthName(y,m){return new Date(y,m,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"})},
 build(events){
  const days=this.daysInMonth(this.year,this.month),start=this.firstDay(this.year,this.month),map={};
  (events||[]).forEach(e=>{const d=e.dateObj||new Date(e.date+"T00:00:00");if(d.getFullYear()===this.year&&d.getMonth()===this.month)(map[d.getDate()]??=[]).push(e)});
  return {days,start,map,title:this.monthName(this.year,this.month)};
 }
};