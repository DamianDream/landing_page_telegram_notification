!function(){"use strict";var e=e=>{const t=document.getElementById(e);(e=>{const t=e.querySelector('input[type="tel"]');t.addEventListener("input",(e=>{t.setCustomValidity(""),t.checkValidity()})),t.addEventListener("invalid",(()=>{""===t.value?t.setCustomValidity("Додайте телефон для звязку!"):t.setCustomValidity("Телефон має бути в такому форматі: 050-123-45-65")}))})(t);let n=!1;"modal-form"===e&&(n=!0),t.addEventListener("submit",(async e=>{e.preventDefault();const o=((e,t)=>{let n="WebPage notification:%0A";const o=Object.fromEntries(new FormData(e));for(let e in o)if(o[e]){let t="";switch(e){case"username":t="Iм'я";break;case"usertel":t="Телефон";break;case"usermessage":t="Повідомлення";break;default:t="bane"}n+=`${t}: ${o[e]}%0A`}return t&&(n+=`Вибрана порода: ${document.getElementById("breedchose").value}%0A`),n})(t,n),a=(e=>`https://api.telegram.org/bot6580816336:AAGmm6cN09FQmkMrexKkDeRBNTv0lSVqZRA/sendMessage?chat_id=-1001721377931&text=${e}&parse_mode=html`)(o);await(async(e,t)=>{try{(await fetch(e,{method:"GET"})).ok&&t.reset()}catch(e){console.log("There was an error",e.message)}})(a,t)}))};function t(){document.body.style.overflow=""}window.addEventListener("DOMContentLoaded",(()=>{e("header-form"),e("footer-form"),e("modal-form"),(()=>{const e=document.querySelectorAll(".pricing-card__button"),n=document.querySelector(".modal-form__btn"),o=document.querySelector("[data-modal]"),a=document.querySelector("dialog");e.forEach((e=>{e.addEventListener("click",(e=>{o.showModal(),document.body.style.overflow="hidden"}))})),n.addEventListener("click",(()=>{t()})),a.addEventListener("click",(e=>{const n=a.getBoundingClientRect();(e.clientX<n.left||e.clientX>n.right||e.clientY<n.top||e.clientY>n.bottom)&&(a.close(),t())}))})(),(()=>{const e=document.createElement("div"),t=document.querySelector(".gallery"),n=document.createElement("img"),o=document.createElement("span");e.classList.add("popup"),o.classList.add("popup__text"),e.appendChild(o),t.appendChild(e),e.style.justifyContent="center",e.style.alignItems="center",e.style.display="none",e.appendChild(n),t.addEventListener("click",(t=>{t.preventDefault();let a=t.target,d=a.dataset.breed;if(a&&a.classList.contains("preview")){e.style.display="flex",o.textContent=d,document.body.style.overflow="hidden";const t=a.parentNode.getAttribute("href");n.setAttribute("src",t)}a&&a.matches("div.popup")&&(e.style.display="none",o.textContent="",document.body.style.overflow="")}))})()}))}();