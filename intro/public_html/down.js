// JavaScript Document - Updated to GSAP v3

function init() {
    // Register GSAP plugins
    gsap.registerPlugin(DrawSVGPlugin);
    
    // Get element references
    const phone_frame = document.getElementById('phone_frame');
    const phone_bg = document.getElementById('phone_bg');
    
    gsap.set(phone_frame, {autoAlpha:1, scale:0})
    gsap.set('.phone_stroke', {drawSVG:"50% 50%"})
    gsap.set('.info_card', {scale:0, transformOrigin:"center center"})
    gsap.set(['.info_title', '.info_text'], {x:-10})
    gsap.set('.rf_container', {autoAlpha:1, display:"none", scale:0, transformOrigin:"center center"})
    
    var tl = gsap.timeline({
        delay:0.5
    })
    
    tl
        .to(phone_frame, {duration: 1, scale:1, ease:"expo.out"})
        .to(['.info_card','.info_title', '.info_text'], {duration: 0.5, scale:1, autoAlpha:1, x:0, ease:"sine.in", stagger: 0.3}, '-=1')
        .to('.phone_stroke', {duration: 1, drawSVG:"0% 100%"}, '-=1')
        .to('.screen_stroke', {duration: 0.7, autoAlpha:1, ease:"sine.out"})
        .to(phone_bg, {duration: 0.7, autoAlpha:1, ease:"sine.out"}, '-=0.7')
        .to('.down_iframe', {duration: 0.7, scale:1, autoAlpha:1, ease:"sine.out"}, '-=0.2')
        .to('.phone_btn', {duration: 0.3, autoAlpha:1, scale:0.9, display:"block", ease:"bounce.out"})
        .to('.phone_btn', {duration: 1, rotation:360, ease:"sine.out"}, '-=0.3');
}

function refreshbanner(url) {
    document.getElementById(url).src = document.getElementById(url).src;
}