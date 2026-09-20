let wishInstallPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();wishInstallPrompt=e;});
document.addEventListener("DOMContentLoaded",()=>{
 const install=document.querySelector("#installApp"),update=document.querySelector("#checkUpdate"),note=document.querySelector("#appUpdateNote");
 install?.addEventListener("click",async()=>{if(wishInstallPrompt){wishInstallPrompt.prompt();await wishInstallPrompt.userChoice;wishInstallPrompt=null}else note.textContent="Install option is available from your browser menu."});
 update?.addEventListener("click",async()=>{try{const r=await fetch("./data/dynamic-events.json?"+Date.now(),{cache:"no-store"});note.textContent=r.ok?"Latest event data is reachable.":"Update source unavailable right now."}catch(e){note.textContent="Offline: using saved data."}});
});