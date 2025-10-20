// JavaScript Document

// Register GSAP plugins
gsap.registerPlugin(DrawSVGPlugin);

function init() {
    const laptopStroke = document.getElementById('laptop_stroke');
    
    if (!laptopStroke) {
        console.warn('laptop_stroke element not found');
        return;
    }
    
    gsap.set(laptopStroke, {autoAlpha:1, scale:0, transformOrigin:"center center", drawSVG:"50% 50%"});
    gsap.set('.info_card', {scale:0, transformOrigin:"center center"});
    gsap.set(['.info_title', '.info_text'], {x:-10});
    gsap.set('.resp-iframe', {scale:0, display:"none", transformOrigin:"center center"});
    gsap.set('.vector_frame', {autoAlpha:1});
    gsap.set('.stroke_frame', {drawSVG:"50% 50%"});
    gsap.set('.info_card', {scale:0, transformOrigin:"center center"});
    gsap.set(['.info_title', '.info_text', '.info_bullets'], {x:-10});
    gsap.set('.rf_container', {autoAlpha:1, display:"none", scale:0, transformOrigin:"center center"});
    
    const iframesStart = gsap.timeline({
        delay:0.5
    });
    
    iframesStart
        .to('.stroke_frame', 1, {drawSVG:"0% 100%", stagger:0.5})
        .to(['.info_card','.info_title', '.info_text', '.info_bullets'], 0.5, {scale:1, autoAlpha:1, x:0, ease:"sine.in", stagger:0.3}, '-=1')
        .to('.resp-iframe', 0.7, {autoAlpha:1, scale:1, display:"block", ease:"expo.out"}, '-=0.5')
        .to('.rf_container', 0.3, {autoAlpha:1, scale:0.9, display:"block", ease:"bounce.out"})
        .to('.rf_container', 1, {rotation:360, ease:"sine.out"}, '-=0.3');
    
    const tl = gsap.timeline({
        delay:0.5
    });
    
    tl
        .to(laptopStroke, 1, {scale:1, ease:"expo.out"})
        .to(['.info_card','.info_title', '.info_text'], 0.5, {scale:1, autoAlpha:1, x:0, ease:"sine.in", stagger:0.3}, '-=1')
        .to(['.stroke_grey', '.stroke_white'], 1, {drawSVG:"0% 100%"}, '-=1')
        .to(['.fill_purple','.fill_grey', '.fill_white','.img_laptop'], 0.7, {autoAlpha:1}, '-=0.2')
        .to(['.stroke_grey', '.stroke_white'], 0.7, {autoAlpha:0}, '-=0.7');
}

function addRefresh() {
}

function refreshbanner(url) {
    document.getElementById(url).src = document.getElementById(url).src;
}