const WishTools={
 async shareEvent(e){
  const text=`${e.icon||"🎉"} ${e.name}\n${e.date||""}\nWishDay`;
  if(navigator.share){try{await navigator.share({title:e.name,text});return true}catch(x){}}
  await navigator.clipboard?.writeText(text);return false;
 },
 downloadICS(e){
  if(!e?.date)return;
  const d=e.date.replaceAll("-","");
  const body=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//WishDay//EN\r\nBEGIN:VEVENT\r\nUID:${e.id||Date.now()}@wishday\r\nDTSTART;VALUE=DATE:${d}\r\nSUMMARY:${String(e.name||"WishDay Event").replace(/[,;\\n]/g," ")}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([body],{type:"text/calendar"}));a.download="wishday-event.ics";a.click();
 }
};