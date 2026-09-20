const WishDate={
 nextOccurrence(mmdd,from=new Date()){const [m,d]=String(mmdd).slice(0,10).split("-").map(Number);let y=from.getFullYear(),x=new Date(y,m-1,d);if(x<new Date(y,from.getMonth(),from.getDate()))x=new Date(y+1,m-1,d);return x},
 daysBetween(a,b){return Math.max(0,Math.ceil((new Date(b).setHours(0,0,0,0)-new Date(a).setHours(0,0,0,0))/86400000))},
 label(n){return n===0?"Today":n===1?"Tomorrow":`In ${n} days`}
};