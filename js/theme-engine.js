const WishTheme={
 key:"wishday-theme-v14",
 load(){return localStorage.getItem(this.key)||"auto"},
 apply(theme){localStorage.setItem(this.key,theme);document.documentElement.dataset.theme=theme;},
 auto(){const h=new Date().getHours();return h>=19||h<6?"midnight":"sunrise"}
};