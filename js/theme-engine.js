const WishTheme={
 key:"wishday-theme-v19",
 load(){return localStorage.getItem(this.key)||"auto"},
 resolve(theme){if(theme==="auto"){const h=new Date().getHours();return h>=19||h<6?"midnight":"light"}return theme||"light"},
 apply(theme){const selected=theme||"auto";localStorage.setItem(this.key,selected);document.documentElement.dataset.theme=this.resolve(selected);document.documentElement.dataset.themeChoice=selected;return selected},
 current(){return this.load()},
 init(){this.apply(this.load())}
};
