// JavaScript Document
function init(){
    gsap.set('.container', {transformPerspective:3000});
    gsap.set('info_bullets', {x:-100});
    gsap.set('.frame', {x:-300});
    const tl = gsap.timeline({delay:0});
    
    tl.to('.frame', 0.7, {x:0, autoAlpha:1, ease:"back.out", stagger:-0.2});
}

function revealFrame() {
    gsap.to('.info_bullets', 0.7, {x:0, autoAlpha:1, ease:"back.out"});
    gsap.to('.iso', 0.7, {rotation:0.01, z:0.01, rotationX:0, rotationY:0, rotationZ:0});
    gsap.set('.card', {display:"block"});
}

function refreshbanner(url) {
    const element = document.getElementById(url);
    if (element) {
        element.src = element.src;
    }
}