document.addEventListener("DOMContentLoaded",()=>{
 const input=document.querySelector("#globalSearch"),clear=document.querySelector("#clearSearch");
 function run(){WishCommand.set(input.value);if(typeof render==="function")render();window.dispatchEvent(new CustomEvent("wishday:refresh"))}
 input?.addEventListener("input",run);clear?.addEventListener("click",()=>{input.value="";run();input.focus()});
});