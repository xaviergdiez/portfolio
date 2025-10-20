// DCM - last update: 180103

///////////////////
//  Global variables:  
var banner = document.getElementById("banner");
var bw = banner.offsetWidth;
var bh = banner.offsetHeight;
var tl = new TimelineMax({delay:-0.5});
var container = document.getElementById("cta_container")
var h = window.innerHeight;
var w = window.innerWidth;
var _delay = 0;

///////////////////
//  Animations:    

function animate() {
    TweenMax.to("#overlay", 0.8, {
        autoAlpha: 0
    });
    tl
        .staggerTo(["#outer_phone", "#inner_phone", "#phone_logo"], 1, {drawSVG: "0% 100%",ease:Linear.easeNone}, 0.25)
        .to(["#bg", "phone_back", "#phone_outline"], 1, {attr:{viewBox:"0 0 600 1200"},ease: Sine.easeInOut}, '-=1')
        .to("#phone_logo", 0.5, {stroke: "transparent",fill: "#fff", ease: Sine.easeInOut}, '-=1')
        .to(["#phone_back"], 1, {autoAlpha: 1, ease:Sine.easeInOut}, '-=1')
        .to(["#phone_back", "#phone_outline"], 2, {scale: 0.8, ease:Sine.easeInOut}, '-=2')
        .to(["#outer_phone", "#inner_phone"], 1, {autoAlpha: 0, ease: Sine.easeInOut}, '-=1')
        .staggerTo("#phone_gradient stop", 1.6, {
            cycle: {
                stopColor: ['hsl(212, 30%, 8%)', 'hsl(219, 29%, 9%)', 'hsl(237, 30%, 12%)', 'hsl(248, 38%, 16%)', 'hsl(253, 45%, 22%)', 'hsl(240, 51%, 48%)', 'hsl(204, 95%, 60%)', 'hsl(197, 94%, 79%)']
            },
            ease: Sine.easeInOut
        }, 0.2, '-=1')
        .staggerTo("#bg_gradient stop", 1.6, {
            cycle: {
                stopColor: ['hsl(212, 30%, 8%)', 'hsl(219, 29%, 9%)', 'hsl(237, 30%, 12%)', 'hsl(248, 38%, 16%)', 'hsl(253, 45%, 22%)', 'hsl(240, 51%, 48%)', 'hsl(204, 95%, 60%)', 'hsl(197, 94%, 79%)']
            },
            ease: Sine.easeInOut
        }, 0.2, '-=3')
        //.to(["#phone_back", "#phone_outline"], 2, {scale: 0.8, ease: Sine.easeInOut}, '-=2')
        .to("#cta_container", 0.7, {autoAlpha:1, ease:Sine.easeOut})
        .to("#toplogo", 0.7, { autoAlpha: 1, ease: Sine.easeOut }, '-=3')
        .to(".logoLetter", 0.7, {fill:"#000", ease:Sine.easeIn}, '-=2.3');

        //console.log(tl.totalDuration());
}


///////////////////
//  Prepare banner: 

//Detect Closest Edge
function closestEdge(x, y, w, h) {
    var topEdgeDist = distMetric(x, y, w / 2, 0);
    var bottomEdgeDist = distMetric(x, y, w / 2, h);
    var leftEdgeDist = distMetric(x, y, 0, h / 2);
    var rightEdgeDist = distMetric(x, y, w, h / 2);
    var min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);
    switch (min) {
        case leftEdgeDist:
            return "left";
        case rightEdgeDist:
            return "right";
        case topEdgeDist:
            return "top";
        case bottomEdgeDist:
            return "bottom";
    }
}

//Distance Formula
function distMetric(x, y, x2, y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return (xDiff * xDiff) + (yDiff * yDiff);
}

container.onmouseenter = function(e) {
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    var edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
    var overlay = document.getElementById("slider");
    var image = this.childNodes[0];

    switch (edge) {
        case "left":
            //tween overlay from the left
            overlay.style.top = "0%";
            overlay.style.left = "-100%";
            TweenMax.to(overlay, .3, { left: '0%' });
            break;
        case "right":
            overlay.style.top = "0%";
            overlay.style.left = "100%";
            //tween overlay from the right
            TweenMax.to(overlay, .3, { left: '0%' });
            break;
        case "top":
            overlay.style.top = "-100%";
            overlay.style.left = "0%";
            //tween overlay from the right
            TweenMax.to(overlay, .3, { top: '0%' });
            break;
        case "bottom":
            overlay.style.top = "100%";
            overlay.style.left = "0%";
            //tween overlay from the right
            TweenMax.to(overlay, .3, { top: '0%' });
            break;
    }
}

container.onmouseleave = function(e){
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    var edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
    var overlay = document.getElementById("slider");
    var image = this.childNodes[0];

    switch (edge) {
        case "left":
            TweenMax.to(overlay, .3, { left: '-100%' });
            break;
        case "right":
            TweenMax.to(overlay, .3, { left: '100%' });
            break;
        case "top":
            TweenMax.to(overlay, .3, { top: '-100%' });
            break;
        case "bottom":
            TweenMax.to(overlay, .3, { top: '100%' });
            break;
    }
}


function handleOrientation(evt) {


    if (!evt.gamma && !evt.beta) {
        evt.gamma = (evt.x * (180 / Math.PI));
        evt.beta = -(evt.y * (180 / Math.PI));
    }

    var rotationYValue = evt.gamma / 3;
    var rotationXValue = -(evt.beta / 9);

    _gradientShift(rotationYValue, rotationXValue);
    _animate(rotationYValue, rotationXValue);
    _bgShift(rotationYValue, rotationXValue);


}

var _getMousePos = function (e) {
    e = e || banner.event;

    mouseX = e.clientX;
    mouseY = e.clientY;

    var xPos = (mouseX / banner.clientWidth) - 0.5;
    var yPos = (mouseY / banner.clientHeight) - 0.5;
    var rotationYValue = 10 * xPos;
    var rotationXValue = 10 * yPos;

    // _animate(rotationYValue, rotationXValue);

    _gradientShift(rotationYValue, rotationXValue);
    _animate(rotationYValue, rotationXValue);
    _bgShift(rotationYValue, rotationXValue);

    console.log(rotationYValue, rotationXValue)
}

var _animate = function (rotationYValue, rotationXValue) {

    TweenMax.to(["#phone_back", "#outline_container"], 0.3, {
        rotationY: rotationYValue,
        rotationX: rotationXValue,
        ease: Quad.easeInOut,
        transformPerspective: 600
    });
}

var _gradientShift = function (rotationYValue, rotationXValue) {

    TweenMax.staggerTo("#phone_gradient stop", 0.0375, {
        cycle: {
            stopColor: ["hsl(" + (212 + rotationYValue) + "," + (30 + rotationXValue) + "%," + (8 + rotationXValue) + "%)", "hsl(" + (219 + rotationYValue * 3) + "," + (29 + rotationXValue) + "%," + (9 + rotationXValue) + "%)", "hsl(" + (237 + rotationYValue * 3) + "," + (30 + rotationXValue) + "%," + (12 + rotationXValue) + "%)", "hsl(" + (248 + rotationYValue * 3) + "," + (38 + rotationXValue) + "%," + (16 + rotationXValue) + "%)", "hsl(" + (253 + rotationYValue * 3) + "," + (45 + rotationXValue) + "%," + (22 + rotationXValue) + "%)", "hsl(" + (240 + rotationYValue * 3) + "," + (51 + rotationXValue) + "%," + (48 + rotationXValue) + "%)", "hsl(" + (204 + rotationYValue * 3) + "," + (95 + rotationXValue) + "%," + (60 + rotationXValue) + "%)", "hsl(" + (197 + rotationYValue * 3) + "," + (94 + rotationXValue) + "%," + (79 + rotationXValue) + "%)"]
        },
        ease: Sine.easeInOut
    }, 0.0375);

}

var _bgShift = function (rotationYValue, rotationXValue) {

    TweenMax.staggerTo("#bg_gradient stop", 0.0375, {
        cycle: {
            stopColor: ["hsl(" + (212 - rotationYValue) + "," + (30 - rotationXValue) + "%," + (8 - rotationXValue) + "%)", "hsl(" + (219 - rotationYValue * 3) + "," + (29 - rotationXValue) + "%," + (9 - rotationXValue) + "%)", "hsl(" + (237 - rotationYValue * 3) + "," + (30 - rotationXValue) + "%," + (12 - rotationXValue) + "%)", "hsl(" + (248 - rotationYValue * 3) + "," + (38 - rotationXValue) + "%," + (16 - rotationXValue) + "%)", "hsl(" + (253 - rotationYValue * 3) + "," + (45 - rotationXValue) + "%," + (22 - rotationXValue) + "%)", "hsl(" + (240 - rotationYValue * 3) + "," + (51 - rotationXValue) + "%," + (48 - rotationXValue) + "%)", "hsl(" + (204 - rotationYValue * 3) + "," + (95 - rotationXValue) + "%," + (60 - rotationXValue) + "%)", "hsl(" + (197 - rotationYValue * 3) + "," + (94 - rotationXValue) + "%," + (79 - rotationXValue) + "%)"]
        },
        ease: Sine.easeInOut
    }, 0.0375);

}

function tiltListener() {
    banner.addEventListener('mousemove', _getMousePos, false);

    if (window.DeviceMotionEvent != undefined) {
        window.addEventListener('deviceorientation', handleOrientation, false);
    }
}

function reset() {
    // TweenMax.set(["#bg", "phone_back", "#phone_outline"], {attr:{viewBox:"0  300 300 600"}, transformOrigin:"150px 300px"})
    TweenMax.set(["#outer_phone", "#inner_phone", "#phone_logo"], {drawSVG: "0% 0%"});
    TweenMax.set("#banner", {perspective: 600});
    // TweenMax.set("#outline_container", {rotationX:15, rotationY:10, scale:1.2})
    TweenMax.set(["#phone_back"], {autoAlpha: 0});
    TweenMax.set(["#phone_back", "#phone_outline"], {transformOrigin:"150px 300px"});
    TweenMax.set("#cta_container", {autoAlpha:0});
    TweenMax.set("#toplogo", {autoAlpha:0, transformOrigin:"center center"})
}

function replay() {
    TweenMax.to("#overlay", 0.5, {
        autoAlpha: 1
    });

    TweenMax.delayedCall(0.5, reset);
    TweenMax.delayedCall(0.5, animate);
}

function smoothElements() {
    TweenMax.set(["div", "img"], {
        force3D: true,
        backfaceVisibility: "hidden",
        rotationZ: '0.01deg',
        z: 0.01
    });
}

function mouseOver(e) {}

function mouseOut(e) {}

function addEventListeners() {
    window.addEventListener("deviceorientation", handleOrientation, true);
    banner.addEventListener('mouseover', mouseOver);
    banner.addEventListener('mouseout', mouseOut);
}

function initBanner() {
    banner.style.visibility = "visible";
    banner.draggable = false;

    //    smoothElements();
    addEventListeners();
    reset();
    animate();
    //reset and replay creative;
    TweenMax.delayedCall(6, tiltListener);
}