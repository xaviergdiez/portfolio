
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

/** Global variables */
let tl = gsap.timeline();
let demo1Tl = gsap.timeline();
let demo2Tl = gsap.timeline();
let demo3Tl = gsap.timeline();
let noodleTl = gsap.timeline({ repeat: -1, yoyo:true});
let ctaTl = gsap.timeline({ repeat:-1, repeatDelay: 2.5 });
const demo1 = document.getElementById('cta_demo1');
const demo2 = document.getElementById('cta_demo2');
const demo3 = document.getElementById('cta_demo3');
const urlPreview1 = "https://clients.weborama.nl/files/campaigns2/7454753986/189151/default.htm";
const urlPreview2 = "https://clients.weborama.nl/files/campaigns2/5404735508/189038/default.htm";
const urlPreview3 = "https://clients.weborama.nl/files/campaigns2/8284726785/188994/NL_nu.nl_201904_index.html";
let mouseOverBool = false;

/** Animation */
function animate() {
  demo1Tl
    .addLabel('start', 0)
    .to('.case1_demo', 0.7, { x:"0%", ease:"sine.inOut" }, 'start')
    .to('.case1_copy', 0.3, { autoAlpha:1, ease:"sine.inOut", stagger:0.15 }, 'start+=0.35')
    .to('#cta_demo1', 0.3, { autoAlpha:1, ease:"sine.inOut" });

  demo2Tl
    .addLabel('start', 0)
    .to('.case2_demo', 0.7, { x:"0%", ease:"sine.inOut" }, 'start')
    .to('.case2_copy', 0.3, { autoAlpha:1, ease:"sine.inOut", stagger:0.15 }, 'start+=0.35')
    .to('#cta_demo2', 0.3, { autoAlpha:1, ease:"sine.inOut" });

  demo3Tl
    .addLabel('start', 0)
    .to('.case3_demo', 0.7, { x:"0%", ease:"sine.inOut" }, 'start')
    .to('.case3_copy', 0.3, { autoAlpha:1, ease:"sine.inOut", stagger:0.15 }, 'start+=0.35')
    .to('#cta_demo3', 0.3, { autoAlpha:1, ease:"sine.inOut" });

  noodleTl
    .addLabel('start', 0)
    .to('#noodle', 2.2, { drawSVG: "0% 100%", ease: "power1.out" }, 'start');

  ctaTl
    .to('.cta_arrow', 0.3, { x: 3, ease: "power1.out", repeat: 3, yoyo: true }, 0);
}

/** Prepare assets */
function reset() {
  gsap.set('#noodle', { autoAlpha: 1, drawSVG: "0% 0%" });
  gsap.set(['.case1_demo', '.case2_demo', '.case3_demo'], { autoAlpha: 1, x: "-100%" });
  
  // Replace ScrollMagic with ScrollTrigger
  ScrollTrigger.create({
    trigger: "#demo1_demo",
    start: "top 80%",
    onEnter: () => demo1Tl.restart(),
    onLeave: () => demo1Tl.pause(),
    onEnterBack: () => demo1Tl.restart(),
    onLeaveBack: () => demo1Tl.pause()
  });

  ScrollTrigger.create({
    trigger: "#demo2_demo",
    start: "top 80%",
    onEnter: () => demo2Tl.restart(),
    onLeave: () => demo2Tl.pause(),
    onEnterBack: () => demo2Tl.restart(),
    onLeaveBack: () => demo2Tl.pause()
  });

  ScrollTrigger.create({
    trigger: "#demo3_demo",
    start: "top 80%",
    onEnter: () => demo3Tl.restart(),
    onLeave: () => demo3Tl.pause(),
    onEnterBack: () => demo3Tl.restart(),
    onLeaveBack: () => demo3Tl.pause()
  });
}

function smoothElements() {
  gsap.set(['div', 'img'], { force3D: true, backfaceVisibility: 'hidden', rotationZ: '0.01deg', z: 0.01 });
}

/** Event Listeners */
function addEventListeners() {
  if (demo1) {
    demo1.addEventListener('mouseover', ctaOver);
    demo1.addEventListener('mouseout', ctaOut);
    demo1.addEventListener('click', previewExit, false);
  }
  if (demo2) {
    demo2.addEventListener('mouseover', ctaOver);
    demo2.addEventListener('mouseout', ctaOut);
    demo2.addEventListener('click', previewExit2, false);
  }
  if (demo3) {
    demo3.addEventListener('mouseover', ctaOver);
    demo3.addEventListener('mouseout', ctaOut);
    demo3.addEventListener('click', previewExit3, false);
  }
}

function ctaOver(e) {
  mouseOverBool = true;
  ctaTl.pause();

  gsap.to(this.querySelectorAll('.cta_gradient stop'), 0.5, { 
    stopColor: function(i) { return i === 0 ? '#07c0ff' : '#65D5FC'; }
  });
  gsap.to(this.querySelector('.cta_arrow'), 0.3, { x: 3, ease: "power1.out" });
}

function ctaOut(e) {
  mouseOverBool = false;
  gsap.to(this.querySelectorAll('.cta_gradient stop'), 0.5, { 
    stopColor: function(i) { return i === 0 ? '#07c0ff' : '#038CFF'; }
  });
  gsap.to('.cta_arrow', 0.3, { x: 0, ease: "power1.in" });

  gsap.delayedCall(2.5, function restartCta() {
    if (ctaTl.paused() && !mouseOverBool) {
      ctaTl.restart();
    }
  });
}

function previewExit(e) {
  window.open(window.urlPreview1);
}

function previewExit2(e) {
  window.open(window.urlPreview2);
}

function previewExit3(e) {
  window.open(window.urlPreview3);
}

/** Initialization */
function init() {
  addEventListeners();
  reset();
  animate();
}
