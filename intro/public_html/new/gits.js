// JavaScript Document
function init() {
    // Register GSAP plugins
    gsap.registerPlugin(DrawSVGPlugin);
    
    gsap.set('.iframe_container', {x:-10})
    gsap.set('.resp-iframe', {display:"none", transformOrigin:"center center"})
    gsap.set('.vector_frame', {autoAlpha:1})
    gsap.set('.stroke_frame', {drawSVG:"50% 50%"})
    gsap.set('.info_card', {scale:0, transformOrigin:"center center"})
    gsap.set(['.info_title', '.info_text', '.info_bullets'], {x:-100})
    gsap.set('.rf_container', {display:"block", scale:0, transformOrigin:"center center"})
    
    var tl = gsap.timeline({delay:0})
    
    tl
        .to(['.info_card','.info_title', '.info_text', '.info_bullets'], {duration: 0.5, scale:1, autoAlpha:1, x:0, ease:"sine.in", stagger: 0.3}, "-=1")
        .to('.iframe_container', {duration: 0.2, x:0, width:"100%", backgroundColor:"#fff", autoAlpha:1, ease:"expo.out"})
        .to('.resp-iframe', {duration: 0.7, autoAlpha:1, scale:1, display:"block"})
        .to('.stroke_frame', {duration: 0.5, drawSVG:"0% 100%", stagger: 0.5}, '-=0.5')
        .to('.rf_container', {duration: 0.3, autoAlpha:1, scale:0.9, ease:"bounce.out"})
        .to('.rf_container', {duration: 1, rotation:360, ease:"sine.out"}, '-=0.3');
}


function refreshbanner(url) {
    document.getElementById(url).src = document.getElementById(url).src;
}

// JavaScript Document