!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;function a(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));document.body.style.background=t}e.disabled=!0,t.addEventListener("click",(function(d){e.disabled=!1,t.disabled=!0,a(),n=setInterval((function(){a()}),1e3)})),e.addEventListener("click",(function(a){e.disabled=!0,t.disabled=!1,clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.525b3cf3.js.map
