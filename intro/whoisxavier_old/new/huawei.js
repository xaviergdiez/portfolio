
/** Global variables */
var phonesTl = gsap.timeline();
var colorTl = gsap.timeline({ repeat: -1, yoyo:true});
var demo1Tl = gsap.timeline();
var demo2Tl = gsap.timeline();
var demo3Tl = gsap.timeline();
var demo4Tl = gsap.timeline();
var urlPreview = "https://clients.weborama.nl/files/campaigns2/4769865662/180501/NL_nu.nl_201606_index.html";

var mouseOverBool = false;
var demo = document.getElementById('cta_demo');

/** Animation */
function animate() {

  phonesTl

    .addLabel('start', 0)

    .to('#phones_back', {duration: 1, y:"0%", ease:"sine.inOut"}, 'start')
    .to('#phones_front', {duration: 1, y: "0%", ease: "sine.inOut"}, 'start')

  demo1Tl
    
    .addLabel('start', 0)

    .to('.case1_demo', {duration: 0.7, x:"0%", ease:"sine.inOut"}, 'start')
    .to('.case1_copy', {duration: 0.3, autoAlpha:1, ease:"sine.inOut", stagger: 0.15}, 'start+=0.35')
    .to('#cta_demo', {duration: 0.3, autoAlpha:1, ease:"sine.inOut"});

    demo2Tl
    
    .addLabel('start', 0)

    .to('.case2_demo', {duration: 0.7, x:"0%", ease:"sine.inOut"}, 'start')
    .to('.case2_copy', {duration: 0.3, autoAlpha:1, ease:"sine.inOut", stagger: 0.15}, 'start+=0.35')

    demo3Tl
    
    .addLabel('start', 0)

    .to('.case3_demo', {duration: 0.7, x:"0%", ease:"sine.inOut"}, 'start')
    .to('.case3_copy', {duration: 0.3, autoAlpha:1, ease:"sine.inOut", stagger: 0.15}, 'start+=0.35')

    demo4Tl
    
    .addLabel('start', 0)
    .to('.case4_demo', {duration: 0.7, x:"0%", ease:"sine.inOut"}, 'start')
    .to('.case4_copy', {duration: 0.3, autoAlpha:1, ease:"sine.inOut", stagger: 0.15}, 'start+=0.35')



  colorTl

    .addLabel('orange', 2)
    .addLabel('black', 4)
    .addLabel('blue', 6)

    .staggerTo('#bg_gradient stop', 1, { cycle: {stopColor: ["#ff8400", "#ff6700", "#ff3602"], ease:Sine.easeInOut} }, 0.1, 'orange')
    .to(['#orange_back', '#orange_front'], 1,  { autoAlpha: 1, ease:Sine.easeInOut }, 'orange')
    .staggerTo('#bg_gradient stop', 1, { cycle: {stopColor: ["#7c7c7c", "#4a4a4a", "#000000"], ease:Sine.easeInOut} }, -0.1, 'black')
    .to(['#black_back', '#black_front'], 1,  { autoAlpha: 1, ease:Sine.easeInOut }, 'black')
    .staggerTo('#bg_gradient stop', 1, { cycle: {stopColor: ["#d8edfc", "#a1daf8", "#4db4e7"], ease:Sine.easeInOut} }, -0.1, 'blue')
    .to(['#blue_back', '#blue_front'], 1,  { autoAlpha: 1, ease:Sine.easeInOut }, 'blue')
}

/** Prepare assets */

function resizeHandler() {
  w = window.innerWidth;
  h = window.innerHeight * 2;
  gsap.set('#bg_container', { attr: {viewBox: '0 0'+ ' ' + w + ' ' + h} });
}

function reset() {
  gsap.set('#bg_container', { attr: {viewBox: '0 0'+ ' ' + w + ' ' + h} });
  gsap.set(['.case1_demo', '.case2_demo', '.case3_demo', '.case4_demo'], { autoAlpha: 1, x: "-120%" });
  gsap.set('#phones_back', { y:"120%", autoAlpha: 1 })
  gsap.set('#phones_front', { y: "-120%", autoAlpha: 1 })
  gsap.set(['.case1_copy', '.case2_copy', '.case3_copy'], { autoAlpha: 0 });

  // Use ScrollTrigger instead of ScrollMagic
  gsap.registerPlugin(ScrollTrigger);
  
  ScrollTrigger.create({
    trigger: "#demo1_demo",
    animation: demo1Tl,
    start: "top 80%"
  });

  ScrollTrigger.create({
    trigger: "#demo2_demo", 
    animation: demo2Tl,
    start: "top 80%"
  });

  ScrollTrigger.create({
    trigger: "#demo3_demo",
    animation: demo3Tl,
    start: "top 80%"
  });

  ScrollTrigger.create({
    trigger: "#demo4_demo",
    animation: demo4Tl,
    start: "top 80%"
  });

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
    phonesTl.restart();
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
  addEventListeners();
  reset();
  animate();
}
