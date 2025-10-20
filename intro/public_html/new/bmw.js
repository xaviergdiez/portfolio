
/** Global variables */
var introTl = new TimelineMax({ repeat: -1 });
var demo1Tl = new TimelineMax();
var demo2Tl = new TimelineMax();
var demo3Tl = new TimelineMax();
var urlPreview = "https://clients.weborama.nl/files/campaigns2/4769865662/180501/NL_nu.nl_201606_index.html";
var demo = document.getElementById('cta_demo');
var slide1 = document.getElementById('slide1');
var slide2 = document.getElementById('slide2');
var slide3 = document.getElementById('slide3');

var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHooks: "onEnter"
  }
});

/** Animation */
function animate() {

  introTl

    .addLabel('start', 0)
    .addLabel('outline', 0)
    .addLabel('resize1', 1)
    .addLabel('resize2', 2)
    .addLabel('full', 4)
    .addLabel('shine', 5)
    .addLabel('collapse', 7)
    .addLabel('resize3', 8)
    .addLabel('collapse2', 9.5)
    .addLabel('resize4', 10.5)


    .staggerFrom(['.circle', '.letters', '.section'], 0.75, { drawSVG: "0% 0%", strokeWidth: 0, ease: Sine.easeInOut }, 0.25, 'outline')

    .to('#hero_logo', 1, { attr: { viewBox: "0 0 2980 2560" }, ease: Power4.easeInOut}, 'resize1')
    .from('#rect1', 1, { width: 2020, height: 2020, x: 485, y: 265, strokeDashArray: "45px 45px", autoAlpha: 0, ease: Power4.easeInOut }, 'resize1')

    .to('#hero_logo', 1, { attr: { viewBox: "0 0 2980 3820" }, ease: Power4.easeInOut}, 'resize2')
    .from('#rect2', 1, {  attr: { width: 2980, x: 0, height: 0, strokeDashArray: "45px 45px" }, autoAlpha: 0, ease: Power4.easeInOut }, 'resize2+=0.25')
    .from('.copy_letters', 0.5, { drawSVG: "50% 50%", strokeWidth: 0, ease: Sine.easeInOut }, 'resize2+=0.5') 

    .to('#outline', 1, { autoAlpha: 0, ease: Sine.easeInOut}, 'full')
    .to('#bmw_full', 1, { autoAlpha: 1, ease: Sine.easeInOut}, 'full')  
    .to('.bg_rect', 1, { fill: "#fff", stroke: "none", ease: Sine.easeInOut }, 'full')
    .to('.copy_letters', 1, { fill: "#000", stroke: "none", ease: Sine.easeInOut }, 'full')

    .staggerTo('#shine stop', 0.3, { cycle: { stopOpacity: [0.5, 0.5, 0.5, 0.5, 0.5] } }, 0.1, 'shine')
    .staggerTo('#shine stop', 0.3, { cycle: { stopOpacity: [0, 0, 0, 0, 0] } }, 0.1, 'shine+=0.3')
    .staggerTo('#shine stop', 0.3, { cycle: { stopOpacity: [0.5, 0.5, 0.5, 0.5, 0.5] } }, -0.1, 'shine+=1.5')
    .staggerTo('#shine stop', 0.3, { cycle: { stopOpacity: [0, 0, 0, 0, 0] } }, -0.1, 'shine+=1.8')

    .to('#outline', 1, { autoAlpha: 1, ease: Sine.easeInOut}, 'collapse')
    .to('#bmw_full', 1, { autoAlpha: 0, ease: Sine.easeInOut}, 'collapse')  
    .to('.bg_rect', 1, { fill: "transparent", stroke: "#fff", ease: Sine.easeInOut }, 'collapse')
    .to('.copy_letters', 1, { fill: "transparent", stroke: "#fff", ease: Sine.easeInOut }, 'collapse')

    .to('.copy_letters', 0.5, { drawSVG: "50% 50%", strokeWidth: 0, ease: Sine.easeInOut }, 'resize3')
    .to('#rect2', 0.5, {  attr: { width: 2980, x: 0, height: 0, strokeDashArray: "45px 45px" }, autoAlpha: 0, ease: Power4.easeInOut }, 'resize3')
    .to('#hero_logo', 0.5, { attr: { viewBox: "0 0 2980 2560" }, ease: Power4.easeInOut}, 'resize3+=0.5')
    .to('#rect1', 0.5, { width: 2020, height: 2020, x: 485, y: 265, ease: Power4.easeInOut }, 'resize3+=1')
    .to('#hero_logo', 0.5, { attr: { viewBox:"485 265 2020 2020" }, ease: Power4.easeInOut }, 'resize+=1')

    .to('#outline', 0.5, { autoAlpha: 0, ease: Sine.easeInOut }, 'collapse2')
    .to('#rect1', 0.5, { width: 0, height: 0, x: 1495, y: 1275, ease: Power4.easeInOut, onComplete: function() {
      TweenMax.set('#hero_logo', { autoAlpha:1, attr: { viewBox:"485 265 2020 2020" }, transformOrigin: "center center", x: "-50%", y: "-50%" })
      TweenMax.set('#rect1', {  width: 2020, height: 2020, x: 485, y: 265, autoAlpha: 0, ease: Power4.easeInOut })
    } } , 'collapse2+=0.25')

    .staggerFrom(['#cars_frame', '.frame_lines'], 0.5, { drawSVG:"0% 0%", ease:Power4.easeInOut }, 0.25, 'resize4')
    .from('.car', 6, { scale:1.2, ease: Sine.easeInOut, transformOrigin:"center center" }, 'resize4')
    .from('#hero_scramble', 0.5, { autoAlpha: 0, ease: Sine.easeInOut}, 'resize4+=0.5')
    .to('#hero_scramble', 1.5, { scrambleText:{ text:"DYNAMIC SETUP", revealDelay: 0.5, tweenLength:true, ease: Linear.easeNone}, repeat:1 , yoyo: true, repeatDelay: 0.5 }, 'resize4+=0.5')
    .staggerTo('.car', 0.25, { autoAlpha:1, ease: Sine.easeInOut }, 0.25, 'resize4+=0.5')
    .staggerTo('.car', 0.25, { cycle: { x:["-120%", "0%", "120%", "0%"], y:["0%", "-120%", "0%", "120%"] }, ease: Back.easeInOut }, 0.25, 'resize4+=0.75')
    .staggerTo(['.frame_lines', '#cars_frame'], 0.5, { drawSVG:"0% 0%", ease:Power4.easeInOut }, 0.25, 'resize4+=3')



  demo1Tl
    
    .addLabel('start', 0)

    .to('.case1_demo', 0.7, { x:"0%", ease:Sine.easeInOut }, 'start')
    .staggerTo('.case1_copy', 0.3, { autoAlpha:1, ease:Sine.easeInOut }, 0.15, 'start+=0.35')
    .to('#cta_demo', 0.3, { autoAlpha:1, ease:Sine.easeInOut });

    demo2Tl
    
    .addLabel('start', 0)

    .to('.case2_demo', 0.7, { x:"0%", ease:Sine.easeInOut }, 'start')
    .staggerTo('.case2_copy', 0.3, { autoAlpha:1, ease:Sine.easeInOut }, 0.15, 'start+=0.35')

    demo3Tl
    
    .addLabel('start', 0)

    .to('.case3_demo', 0.7, { x:"0%", ease:Sine.easeInOut }, 'start')
    .staggerTo('.case3_copy', 0.3, { autoAlpha:1, ease:Sine.easeInOut }, 0.15, 'start+=0.35')
}

/** Prepare assets */

function reset() {
  TweenMax.set('#bmw_hero', { xPercent: "50%", yPercent: "0%", x: "-50%", y: "0%" });
  TweenMax.set('.case_info', { xPercent: "50%", yPercent: "0%", x: "-50%", y: "0%" });
  TweenMax.set('#hero_logo', { autoAlpha:1, attr: { viewBox:"485 265 2020 2020" }, transformOrigin: "center center", x: "-50%", y: "-50%" });
  TweenMax.set('#hero_cars', { autoAlpha:1, transformOrigin: "center center", x: "-50%", y: "-50%" });
  TweenMax.set('.bg_rect', { transformOrigin: "center center" })
  TweenMax.set(['.case1_demo', '.case2_demo', '.case3_demo'], { autoAlpha: 1, x: "-120%" });
  TweenMax.set('#phones_back', { y:"120%", autoAlpha: 1 });
  TweenMax.set('#phones_front', { y: "-120%", autoAlpha: 1 });
  TweenMax.set(['.case1_copy', '.case2_copy', '.case3_copy'], { autoAlpha: 0 });

  new ScrollMagic.Scene({
    triggerElement: "#demo1_demo"
  })
  .setTween(demo1Tl)
  .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#demo2_demo"
  })
  .setTween(demo2Tl)
  .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#demo3_demo"
  })
  .setTween(demo3Tl)
  .addTo(controller);

}


function smoothElements() {
  TweenMax.set(['div', 'img'], { force3D: true, backfaceVisibility: 'hidden', rotationZ: '0.01deg', z: 0.01 });
}

/** Event Listeners */
function addEventListeners() {
  demo.addEventListener('mouseover', ctaOver);
  demo.addEventListener('mouseout', ctaOut);
  demo.addEventListener('click', previewExit, false);
}


function ctaOver(e) {
  TweenMax.to('#cta_hover', 0.3, { attr: {x: "0%"}, ease: Sine.easeInOut });
}

function ctaOut(e) {
  TweenMax.to('#cta_hover', 0.3, { attr: {x: "-100%"}, ease: Sine.easeInOut });
}

function previewExit(e) {
  window.open(window.urlPreview);
}

/** Initialization */
function init() {
  smoothElements();
  addEventListeners();
  reset();
  animate();
}
