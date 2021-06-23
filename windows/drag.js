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
      mascot.src = "../mascots/eevee/shime12.png"
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
    mascot.src = "../mascots/eevee/shime36.png"
    posdiv.classList.add("motion");
    document.onmouseup = null;
    document.onmousemove = null;
    state.dragged = false;
    state.falls = true;
    state.idle = false;
    state.animated = false;
    //idleAnimation();
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
  animated:false
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
      mascot.src = "../mascots/eevee/shime37.png"
      posdiv.classList.remove("motion");
      }
    }
  
  else if(state.falls == false && state.idle == false) { 
    state.idle = true;
    iteration = 1;
    idleAnimation()
  }
  
  requestAnimationFrame(mainRunner);
}

setTimeout(()=> {mascot.src = "../mascots/eevee/shime1.png"; idleAnimation()}, 100)

var iteration;

function idleAnimation(){
  setTimeout( ()=> {
    if(state.falls == false && state.dragged == false && state.animated == false){
    mascot.src = "../mascots/eevee/shime"+iteration+".png"; idleAnimation()} 
  }, iterCount(1, 7))
}

function hello() {
  setTimeout( ()=> {
    if(state.falls == false && state.dragged == false && state.animated == true){
    mascot.src = "../mascots/eevee/shime"+iteration+".png"; hello()} 
  }, iterCount(30, 35))
}

function legs() {
  setTimeout( ()=> {
    if(state.falls == false && state.dragged == false && state.animated == true){
    mascot.src = "../mascots/eevee/shime"+iteration+".png"; legs()} 
  }, iterCount(26, 29))
}

function walk() {
  setTimeout( ()=> {
    if(state.falls == false && state.dragged == false && state.animated == true){
    mascot.src = "../mascots/eevee/shime"+iteration+".png";
    if(parseInt(posdiv.style.left)>0){posdiv.style.left = parseInt(posdiv.style.left)-5+"px"} walk()} 
  }, iterCount(8, 11))
}

function randomIdleAction(){
  var randomvar = Math.floor(Math.random() * 20)
    if(randomvar == 10|| randomvar == 11) { state.animated=true; iteration=8; walk(); }
    else if(randomvar == 12|| randomvar == 13) { state.animated=true; iteration=8; walk(); }
    else if(randomvar == 14|| randomvar == 15) { state.animated=true; iteration=30; hello(); }
    else if(randomvar == 16|| randomvar == 17) { state.animated=true; iteration=26; legs(); }
    //else if(randomvar == 19) { hello(); state.animated=true }
}

function randomContinueAction(){
  var randomvar = Math.floor(Math.random() * 4)
  //alert("random walk ")
    if(randomvar == 3) { state.animated=false; iteration=1; idleAnimation() }
    //else if(randomvar == 19) { hello(); state.animated=true }
}

function iterCount(start, max) {
  if(iteration==max) {
    iteration=start;
    if(state.animated == false){randomIdleAction(); return 1100}
    else if(state.animated == true){randomContinueAction(); return 300}
    else { return 300 }
    }
  else{
    iteration++; return 300}
}
