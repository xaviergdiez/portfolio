// DCM - last update: 180103

///////////////////
//  Global variables:  
var banner = document.getElementById("banner");
var phone = document.getElementById("phone_container");
var output = document.getElementById("output");
var gradient = document.getElementById("phone_gradient")
var bw = banner.offsetWidth;
var bh = banner.offsetHeight;
var tl = new TimelineMax();
var _delay = 0;


///////////////////
//  Animations:    

function animate(){
    TweenMax.to("#overlay", 0.8, {autoAlpha:0});
    
    
}


///////////////////
//  Prepare banner:

var maxX = banner.clientWidth - phone.clientWidth;
var maxY = banner.clientHeight - phone.clientHeight; 

function handleOrientation(event) {

    
     // // Because we don't want to have the device upside down
     // // We constrain the x value to the range [-90,90]
    //  if (evt.y > 90) {
    //      evt.y = 90
    //  };
    //  if (evt.y < -90) {
    //      evt.y = -90
    //  };

    //  // // To make computation easier we shift the range of 
    //  // // x and y to [0,180]
    //  evt.x += 90;
    //  evt.y += 90;

     if (!evt.gamma && !evt.beta) {
         evt.gamma = -(evt.x * (180 / Math.PI));
         evt.beta = -(evt.y * (180 / Math.PI));
     }

     var rotationYValue = evt.gamma / 10;
     var rotationXValue = evt.beta / 10;
     _animate(rotationYValue, rotationXValue);
}

var _getMousePos = function(e) {
    e = e || banner.event;
    
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    var xPos = (mouseX / banner.clientWidth) - 0.5;
    var yPos = (mouseY / banner.clientHeight) - 0.5;
    var rotationYValue = 10 * xPos;
    var rotationXValue = 10 * yPos;
    
    _animate(rotationYValue,rotationXValue);

    console.log(rotationYValue,rotationXValue)
  }
  
  var _animate = function(rotationYValue, rotationXValue) {
    TweenLite.to("#phone_container", 0.6, { rotationY:rotationYValue, rotationX:rotationXValue, ease:Power1.easeOut, transformPerspective:600, transformOrigin:"center" });
   
  }

    
    banner.addEventListener('mousemove', _getMousePos, false);

    if (window.DeviceMotionEvent != undefined) {
        window.addEventListener('deviceorientation', handleOrientation);
    }

function reset() {
    
}

function replay() {
    TweenMax.to("#overlay", 0.5, {autoAlpha:1});
    
    TweenMax.delayedCall(0.5, reset);
    TweenMax.delayedCall(0.5, animate);
}

function smoothElements() {
    TweenMax.set(["div", "img"], {force3D: true, backfaceVisibility: "hidden", rotationZ: '0.01deg', z:0.01});
}

function mouseOver(e){
}

function mouseOut(e){
}

function bannerExitHandler(e){
}

function addEventListeners(){
    banner.addEventListener('mouseover', mouseOver); 
    banner.addEventListener('mouseout', mouseOut);
    banner.addEventListener('click', bannerExitHandler, false);
}

function initBanner() {
    banner.style.visibility = "visible";
    banner.draggable = false;
    
//    smoothElements();
    addEventListeners();
    reset();
    animate();
    //reset and replay creative;
//    TweenMax.delayedCall(15, replay);
}