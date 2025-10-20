// JavaScript Document

// Register GSAP plugins
gsap.registerPlugin(DrawSVGPlugin);

function init() {
    const rf_button = document.querySelectorAll(".rf_container");
    const refresh = document.getElementsByClassName("rf_container");
    
    gsap.set(['.resp-iframe', '.resp-iframe_sing'], {scale:0, display:"none", transformOrigin:"center center"});
    gsap.set('.vector_frame', {autoAlpha:1});
    gsap.set('.stroke_frame', {drawSVG:"50% 50%"});
    gsap.set('.info_card', {scale:0, transformOrigin:"center center"});
    gsap.set(['.info_title', '.info_text', '.info_bullets'], {x:-10});
    gsap.set('.rf_container', {display:"block", scale:0, transformOrigin:"center center"});
    
    const tl = gsap.timeline({delay:0});
    
    tl
        .to(['.info_card','.info_title', '.info_text', '.info_bullets'], 0.5, {scale:1, autoAlpha:1, x:0, ease:"sine.in", stagger:0.3}, '-=1')
        .to('.stroke_frame', 0.5, {drawSVG:"0% 100%", stagger:0.5}, '-=0.5')
        .to(['.resp-iframe', '.resp-iframe_sing'], 0.7, {autoAlpha:1, scale:1, display:"block", ease:"expo.out"})
        .to('.rf_container', 0.3, {autoAlpha:1, scale:0.9, ease:"bounce.out"})
        .to('.rf_container', 1, {rotation:360, ease:"sine.out"}, '-=0.3');
}

function refreshbanner(url) {
    const element = document.getElementById(url);
    if (element) {
        element.src = element.src;
    }
}

