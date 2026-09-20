const WishGenerator={
  pick(arr){return arr[Math.floor(Math.random()*arr.length)]},
  async wish(type,lang="hinglish"){
    try{const r=await fetch("data/wishes.json");const d=await r.json();return this.pick(d[type]?.[lang]||d[type]?.en||[])}catch{return ""}
  },
  theme(type){return {birthday:["#6d5dfc","#ff6fb1"],anniversary:["#a83279","#d38312"],national:["#ef7d32","#5146b8"],festival:["#ff8a00","#e83e8c"],holi:["#ff4b91","#ffb347"],diwali:["#6b2500","#f3a400"],christmas:["#137a45","#bd2938"],state:["#3157d5","#7a5cff"],important:["#2b5876","#4e4376"],nature:["#168d61","#6cbf59"]}[type]||["#6d5dfc","#a28fff"]}
};