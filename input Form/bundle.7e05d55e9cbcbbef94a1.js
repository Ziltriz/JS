(()=>{"use strict";function e(e){return e.length>=10}function t(e,t){const n=document.createElement("div");n.classList.add("modal"),n.innerHTML=`\n     <h1>${e}</h1>\n     <div class="modal__content">${t}</div>\n     `,mui.overlay("on",n)}class n{static create(e){return fetch("https://inputvalue-e09a0-default-rtdb.europe-west1.firebasedatabase.app/questions.json",{method:"POST",body:JSON.stringify(e),headers:{"Content-type":"application/json"}}).then((e=>e.json())).then((t=>(e.id=t.name,e))).then(i).then(n.renderList)}static fetch(e){return e?fetch(`https://inputvalue-e09a0-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${e}`).then((e=>e.json())).then((e=>e&&e.error?`<p class="error">${questions.error}</p>`:e?Object.keys(e).map((t=>({...e[t],id:t}))):[])):Promise.resolve('<p class="error">Email не зарегестрированы</p>')}static renderList(){const e=a(),t=e.length?e.map(s).join(""):'<div class="mui--text-headline">Вы пока ничего не спрашивали</div>';document.getElementById("List").innerHTML=t}static listToHtml(e){return e.length?`<ol>${e.map((e=>`<li>${e.text}</li>`)).join("")}</ol>`:"<p>No one questions</p>"}}function i(e){const t=a();t.push(e),localStorage.setItem("questions",JSON.stringify(t))}function a(){return JSON.parse(localStorage.getItem("questions")||"[]")}function s(e){return`\n                 <div class="mui-divider">\n                 ${new Date(e.date).toLocaleDateString()}\n                 ${new Date(e.date).toLocaleTimeString()}\n                 </div>\n                 <br>\n                 <div class="mui--text-headline">${e.text}</div>\n`}const o=document.getElementById("form"),r=o.querySelector("#question__input"),l=o.querySelector("#submit");function d(e){e.preventDefault();const t=e.target.querySelector("button"),i=e.target.querySelector("#email").value,a=e.target.querySelector("#password").value;t.disabled=!0,function(e,t){return fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCwaWY3NHFTfd6OANFD3w4bABKrQgjBCE",{method:"POST",body:JSON.stringify({email:e,password:t,returnSecureToken:!0}),headers:{"Content-Type":"application/json "}}).then((e=>e.json())).then((e=>e.idToken))}(i,a).then(n.fetch).then(u).then((()=>t.disabled=!1))}function u(e){"string"==typeof e?t("Error",e):t("Questions list",n.listToHtml(e))}document.getElementById("modal__btn").addEventListener("click",(function(){t("Авторизация",'\n     <form class="mui-form" id="auth__form">\n     <div class="mui-textfield mui-textfield--float-label">\n      <input type="email" id="email" required >\n      <label for="email">Email</label>\n    </div>\n    <div class="mui-textfield mui-textfield--float-label">\n      <input type="password" id="password" required >\n      <label for="password">Password</label>\n    </div>\n    <button  type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Sign In</button>\n     '),document.getElementById("auth__form").addEventListener("submit",d,{once:!0})})),window.addEventListener("load",n.renderList),o.addEventListener("submit",(function(t){if(t.preventDefault(),e(r.value)){const e={text:r.value.trim(),date:(new Date).toJSON()};l.disabled=!0,n.create(e).then((()=>{r.value="",r.className="",l.disabled=!1}))}})),r.addEventListener("input",(()=>{l.disabled=!e(r.value)}))})();