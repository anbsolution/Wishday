const WishYears={
 count(e,base=new Date()){
  if(e?.type!=="anniversary"||!e.date)return null;
  const y0=Number(String(e.date).slice(0,4));if(!y0)return null;
  const y=base.getFullYear(),m=Number(String(e.date).slice(5,7))-1,d=Number(String(e.date).slice(8,10));
  const thisDate=new Date(y,m,d);return y-(thisDate>base?y0+1:y0);
 }
};