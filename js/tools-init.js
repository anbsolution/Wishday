document.addEventListener("DOMContentLoaded",()=>{
 const ex=document.querySelector("#exportPersonal"),im=document.querySelector("#importPersonal");
 ex?.addEventListener("click",()=>WishPersonal.export());
 im?.addEventListener("change",async()=>{try{await WishPersonal.import(im.files[0]);location.reload()}catch(e){alert("Backup file is invalid.")}});
});