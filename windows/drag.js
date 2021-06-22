const posdiv = document.getElementById("posdiv")
const mascot = document.getElementById("mascot")

dragElement(posdiv);


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (mascot) {
    // if present, the header is where you move the DIV from:
    mascot.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
      e.preventDefault();
    if (e.buttons == 2) {
      //alert("right click react menu");
      //console.log("placeholder")
      contextMenu.style.top = elmnt.offsetTop-135+"px";
      contextMenu.style.left = elmnt.offsetLeft+100+"px";
      menuHitbox.style.top = elmnt.offsetTop-150+"px";
      menuHitbox.style.left = elmnt.offsetLeft+"px";
      contextMenu.classList.add("visible");
      menuHitbox.classList.add("visible");
    }
    else {
      posdiv.classList.remove("motion");
      state.falls = false;
      state.idle = false;
      state.dragged = true;
      contextMenu.classList.remove("visible");
      menuHitbox.classList.remove("visible");
      mascot.src = "../mascots/eevee/Shime12.png"
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    mascot.src = "../mascots/eevee/Shime7.png"
    posdiv.classList.add("motion");
    document.onmouseup = null;
    document.onmousemove = null;
    state.falls = true;
    state.idle = false;
    state.dragged = false;
  }
}

const contextMenu = document.getElementById("context-menu");
//const scope = document.querySelector("html");
const Hitbox = document.getElementById("hitbox");
const menuHitbox = document.getElementById("menu-hitbox");
Hitbox.addEventListener("mouseleave", () => {
   contextMenu.classList.remove("visible");
   menuHitbox.classList.remove("visible");
});


const state = {
  dragged: false,
  falls: true,
  idle: false,
};


/*setInterval(() => {
  mainRunner();
}, 100);*/
requestAnimationFrame(mainRunner);

function mainRunner() {
  if (state.falls == true) {
    //if(parseInt(mascot.style.top) < window.innerHeight-10){
    if(parseInt(posdiv.style.top) < window.innerHeight-40){
      
      posdiv.style.top = parseInt(posdiv.style.top)+10+"px";
      }
    else {
      state.falls = false;
      posdiv.style.top = window.innerHeight-128+"px"
      mascot.src = "../mascots/eevee/Shime37.png"
      posdiv.classList.remove("motion");
      }
    }
  else if(state.dragged == true) { 
    ;
  }
  else if(state.falls == false && state.idle == false) { 
    setTimeout(()=> mascot.src = "../mascots/eevee/Shime1.png", 175)
    state.idle = true;
  }
  else if (state.idle == true){
    ;
  }
  requestAnimationFrame(mainRunner);
}