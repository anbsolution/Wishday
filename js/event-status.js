const WishStatus={
 normalize(e,base=new Date()){
  const d=e.dateObj||new Date(e.date+"T00:00:00"),t=new Date(base);t.setHours(0,0,0,0);d.setHours(0,0,0,0);
  const n=Math.round((d-t)/86400000);
  return n===0?"today":n===1?"tomorrow":n>1?"upcoming":n<0?"past":"today";
 },
 label(s){return s==="today"?"Today":s==="tomorrow"?"Tomorrow":s==="past"?"Past":"Upcoming"}
};