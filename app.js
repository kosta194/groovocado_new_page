const languageLinks = document.querySelectorAll('[data-language]');
const menu = document.querySelector('.menu');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu(){ mobileNav.hidden=true; menu.setAttribute('aria-expanded','false'); }
function setLanguage(language, updateURL=false){
 const en=language==='en'; document.documentElement.lang=en?'en':'sl';
 document.querySelectorAll('[data-si]').forEach(element=>{element.textContent=element.dataset[en?'en':'si'];});
 languageLinks.forEach(link=>{link.setAttribute('aria-current',String(link.dataset.language===language));link.href=`?lang=${link.dataset.language}${location.hash}`;});
 document.querySelector('meta[name="description"]').content=en?'Groovocado — nine musicians playing soul, funk, disco and pop! Videos, bookings and press materials.':'Groovocado — 9 glasbenikov, soul, funk, disco in pop! Video, kontakt in gradivo za medije.';
 if(updateURL){const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState({},'',url);}
}
languageLinks.forEach(link=>link.addEventListener('click',event=>{event.preventDefault();setLanguage(link.dataset.language,true);}));
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();menu.focus();}});
window.addEventListener('resize',()=>{if(innerWidth>640)closeMenu();});
window.addEventListener('popstate',()=>setLanguage(new URLSearchParams(location.search).get('lang')==='en'?'en':'sl'));
setLanguage(new URLSearchParams(location.search).get('lang')==='en'?'en':'sl');
document.getElementById('year').textContent=new Date().getFullYear();
