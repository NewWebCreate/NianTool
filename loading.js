window.addEventListener('load',()=>{setTimeout(()=>{const m=document.getElementById('m');if(m){m.style.transition='opacity .4s';m.style.opacity=0;setTimeout(()=>m.remove(),400)}},200)});
