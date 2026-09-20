const WishCommand={
 query:"",
 set(q){this.query=String(q||"").trim().toLowerCase()},
 apply(list){
  if(!this.query)return list||[];
  return (list||[]).filter(e=>[e.name,e.type,e.category,e.state,e.relation,e.note].filter(Boolean).join(" ").toLowerCase().includes(this.query));
 }
};