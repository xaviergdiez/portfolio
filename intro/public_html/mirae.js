// JavaScript Document - Updated to GSAP v3

function init() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
    
    // Get element references
    const laptop_stroke = document.getElementById('laptop_stroke');
    
    gsap.set(laptop_stroke, {autoAlpha:1, scale:0, transformOrigin:"center center", drawSVG:"50% 50%"})
    gsap.set('.info_card', {scale:0, transformOrigin:"center center"})
    gsap.set(['.info_title', '.info_text'], {x:-10})
    gsap.set('.resp-iframe', {scale:0, display:"none", transformOrigin:"center center"})
    gsap.set('.vector_frame', {autoAlpha:1})
    gsap.set('.stroke_frame', {drawSVG:"50% 50%"})
    gsap.set('.info_card', {scale:0, transformOrigin:"center center"})
    gsap.set(['.info_title', '.info_text', '.info_bullets'], {x:-10})
    gsap.set('.rf_container', {autoAlpha:1, display:"none", scale:0, transformOrigin:"center center"});
    
    var iframes_start = gsap.timeline({
        delay:0.5
    })
    
    iframes_start
        .to('.stroke_frame', {duration: 1, drawSVG:"0% 100%", stagger: 0.5})
        .to(['.info_card','.info_title', '.info_text', '.info_bullets'], {duration: 0.5, scale:1, autoAlpha:1, x:0, ease:"sine.in", stagger: 0.3}, '-=1')
        .to('.resp-iframe', {duration: 0.7, autoAlpha:1, scale:1, display:"block", ease:"expo.out"}, '-=0.5')
        .to('.rf_container', {duration: 0.3, autoAlpha:1, scale:0.9, display:"block", ease:"bounce.out"})
        .to('.rf_container', {duration: 1, rotation:360, ease:"sine.out"}, '-=0.3');
    
    var tl = gsap.timeline({
        delay:0.5
    })
    
    tl
        .to(laptop_stroke, {duration: 1, scale:1, ease:"expo.out"})
        .to(['.info_card','.info_title', '.info_text'], {duration: 0.5, scale:1, autoAlpha:1, x:0, ease:"sine.in", stagger: 0.3}, '-=1')
        .to(['.stroke_grey', '.stroke_white'], {duration: 1, drawSVG:"0% 100%"}, '-=1')
        .to(['.fill_purple','.fill_grey', '.fill_white','.img_laptop'], {duration: 0.7, autoAlpha:1}, '-=0.2')
        .to(['.stroke_grey', '.stroke_white'], {duration: 0.7, autoAlpha:0}, '-=0.7')
}

function addRefresh() {
}

function refreshbanner(url) {
    document.getElementById(url).src = document.getElementById(url).src;
}