/**
 * Template name: Campaign Manager
 * description: Basic Campaign Manager template. Can be used for everything that uses a general clicktag variable.
 * last update: 2019 - 01 - 23
 */


/** Global variables */
var tl = gsap.timeline();
var colorTl = gsap.timeline({ repeat: -1, yoyo:true, repeatDelay: 1.5});
var green_bg = ["#02b09c", "#009d91", "#027b7f"];
var orange_bg = ["#ff8400", "#ff6700", "#ff3602"];
var black_bg = ["#7c7c7c", "#4a4a4a", "#000000"];
var blue_bg = ["#d8edfc", "#a1daf8", "#4db4e7"];
var w = window.innerWidth;
var h = window.innerHeight * 2;
var urlPreview = "https://clients.weborama.nl/files/campaigns2/4769865662/180501/NL_nu.nl_201606_index.html";
var demo = document.getElementById('cta_demo');

/** Animation */
function animate() {

  tl
    
    .addLabel('start', 0)

    .to('#phones_back', {duration: 1, y:"0%", ease:"sine.inOut"}, 'start')
    .to('#phones_front', {duration: 1, y: "0%", ease: "sine.inOut"}, 'start')
    .to('#huawei_demo', {duration: 1, x:"0%", ease:"sine.inOut"}, 'start')
    .to('.case_copy', {duration: 0.5, autoAlpha:1, ease:"sine.inOut", stagger: 0.5}, 'start+=0.5')

  colorTl

    .addLabel('orange', 3)
    .addLabel('black', 5.5)
    .addLabel('blue', 9)

    .to('#bg_gradient stop', {duration: 1, stopColor: "#ff8400", ease:"sine.inOut", stagger: 0.1}, 'orange')
    .to('#bg_gradient stop', {duration: 1, stopColor: "#ff6700", ease:"sine.inOut", stagger: 0.1}, 'orange+=0.5')
    .to('#bg_gradient stop', {duration: 1, stopColor: "#ff3602", ease:"sine.inOut", stagger: 0.1}, 'orange+=1')
    .to(['#orange_back', '#orange_front'], {duration: 1, autoAlpha: 1, ease:"sine.inOut"}, 'orange')
    .to('#bg_gradient stop', {duration: 1, stopColor: "#7c7c7c", ease:"sine.inOut", stagger: -0.1}, 'black')
    .to('#bg_gradient stop', {duration: 1, stopColor: "#4a4a4a", ease:"sine.inOut", stagger: -0.1}, 'black+=0.5')
    .to('#bg_gradient stop', {duration: 1, stopColor: "#000000", ease:"sine.inOut", stagger: -0.1}, 'black+=1')
    .to(['#black_back', '#black_front'], {duration: 1, autoAlpha: 1, ease:"sine.inOut"}, 'black')
    .to('#bg_gradient stop', {duration: 1, stopColor: "#d8edfc", ease:"sine.inOut", stagger: -0.1}, 'blue')
    .to('#bg_gradient stop', {duration: 1, stopColor: "#a1daf8", ease:"sine.inOut", stagger: -0.1}, 'blue+=0.5')
    .to('#bg_gradient stop', {duration: 1, stopColor: "#4db4e7", ease:"sine.inOut", stagger: -0.1}, 'blue+=1')
    .to(['#blue_back', '#blue_front'], {duration: 1, autoAlpha: 1, ease:"sine.inOut"}, 'blue')

  // gsap v3:
  //    gsap.to("#myElement_1", {duration: 1, autoAlpha:1});
  //    _delay += 0.2;
  //    gsap.to("#myElement_2", {duration: 1, delay:_delay, autoAlpha:1});

  // Timeline:
  //    tl.to(["#myElement_1"], {duration: 1, autoAlpha:1, ease: "expo.out"}, "intro")
  //      .to(["#myElement_2"], {duration: 1, autoAlpha:1, ease: "expo.out"}, "-=0.5");
  //    tl.timeScale(1.2);
}

/** Prepare banner */

function resizeHandler() {
  w = window.innerWidth;
  h = window.innerHeight * 2;
  gsap.set('#bg_container', { attr: {viewBox: '0 0'+ ' ' + w + ' ' + h} });
}

function reset() {
  gsap.set('#bg_container', { attr: {viewBox: '0 0'+ ' ' + w + ' ' + h} });
  gsap.set('#huawei_demo', { autoAlpha: 1, x: "-100%" });
  gsap.set('#phones_back', { y:"120%", autoAlpha: 1 })
  gsap.set('#phones_front', { y: "-120%", autoAlpha: 1 })
  gsap.set('.case_copy', { autoAlpha: 0 });
}

function smoothElements() {
  gsap.set(['div', 'img'], { force3D: true, backfaceVisibility: 'hidden', rotationZ: '0.01deg', z: 0.01 });
}

/** Replay Banner - use replayTl when replaying a timeline. */
function replay() {
  gsap.to('#overlay', {duration: 0.5, autoAlpha: 1});

  gsap.delayedCall(0.5, reset);
  gsap.delayedCall(0.5, animate);
}

function replayTl() {
  gsap.to('#overlay', {duration: 0.5, autoAlpha: 1});

  gsap.delayedCall(0.5, function play() {
    tl.restart();
  });
}

/** Event Listeners */
function addEventListeners() {
  window.addEventListener('resize', resizeHandler);
  demo.addEventListener('mouseover', ctaOver);
  demo.addEventListener('mouseout', ctaOut);
  demo.addEventListener('click', previewExit, false);
}

function ctaOver(e) {
  gsap.to('#cta_hover', {duration: 0.3, attr: {x: "0%"}, ease: "sine.inOut"});
}

function ctaOut(e) {
  gsap.to('#cta_hover', {duration: 0.3, attr: {x: "-100%"}, ease: "sine.inOut"});
}

function previewExit(e) {
  window.open(window.urlPreview);
}

/** Initialization */
function init() {
  // banner.style.visibility = 'visible';
  // banner.draggable = false;

  //    smoothElements();
  addEventListeners();
  reset();
  animate();
  // reset and replay creative;
//    TweenMax.delayedCall(15, replay);
}
