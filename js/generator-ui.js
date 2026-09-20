document.addEventListener("DOMContentLoaded",()=>{
 const gen=document.querySelector("#generateWish"),out=document.querySelector("#generatedWish"),copy=document.querySelector("#copyWish"),share=document.querySelector("#shareWish");
 gen?.addEventListener("click",async()=>{out.value=await WishGenerator.wish(document.querySelector("#wishType").value,document.querySelector("#wishLang").value)||"Wish generate nahi ho paya.";});
 copy?.addEventListener("click",async()=>{if(out.value){await navigator.clipboard?.writeText(out.value);toast("Wish copied")}});
 share?.addEventListener("click",async()=>{if(out.value)await WishTools.shareEvent({name:"WishDay Wish",wish:out.value,date:""})});
});