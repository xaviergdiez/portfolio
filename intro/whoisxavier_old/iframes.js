// JavaScript Document - Updated to GSAP v3

// Register GSAP plugins with fallback handling
function registerPlugins() {
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded. Please ensure GSAP script is loaded before this file.');
        return false;
    }
    
    // Try to register DrawSVGPlugin, but provide fallback if not available
    try {
        if (typeof DrawSVGPlugin !== 'undefined') {
            gsap.registerPlugin(DrawSVGPlugin);
            return true;
        } else {
            console.warn('DrawSVGPlugin not available. Using fallback animation.');
            return false;
        }
    } catch(e) {
        console.warn('DrawSVGPlugin registration failed. Using fallback animation.', e);
        return false;
    }
}

function init() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not defined. Animation will not work.');
        return;
    }
    
    const hasDrawSVG = registerPlugins();
    const rf_button = document.querySelectorAll(".rf_container");
    const refresh = document.getElementsByClassName("rf_container");
    
    gsap.set('.resp-iframe', {scale:0, display:"none", transformOrigin:"center center"});
    gsap.set('.vector_frame', {autoAlpha:1});
    gsap.set('.info_card', {scale:0, transformOrigin:"center center"});
    gsap.set(['.info_title', '.info_text', '.info_bullets'], {x:-10});
    gsap.set('.rf_container', {display:"block", scale:0, transformOrigin:"center center"});
    
    // Set initial state for stroke frames
    if (hasDrawSVG) {
        gsap.set('.stroke_frame', {drawSVG:"50% 50%"});
    } else {
        // Fallback: use CSS-based animation for stroke effect
        gsap.set('.stroke_frame', {
            strokeDasharray: "100% 100%",
            strokeDashoffset: "100%",
            opacity: 0.3
        });
    }
    
    const tl = gsap.timeline({delay:0});
    
    tl
        .to(['.info_card','.info_title', '.info_text', '.info_bullets'], {
            duration: 0.5, 
            scale:1, 
            autoAlpha:1, 
            x:0, 
            ease:"sine.in", 
            stagger: 0.3
        }, '-=1');
    
    // Add stroke animation based on plugin availability
    if (hasDrawSVG) {
        tl.to('.stroke_frame', {
            duration: 0.5, 
            drawSVG:"0% 100%", 
            stagger: 0.5
        }, '-=0.5');
    } else {
        // Fallback stroke animation using dash offset
        tl.to('.stroke_frame', {
            duration: 0.5,
            strokeDashoffset: "0%",
            opacity: 1,
            stagger: 0.5
        }, '-=0.5');
    }
    
    tl
        .to('.resp-iframe', {
            duration: 0.7, 
            scale:1, 
            autoAlpha:1, 
            display:"block", 
            ease:"expo.out"
        })
        .to('.rf_container', {
            duration: 0.3, 
            autoAlpha:1, 
            scale:0.9, 
            ease:"bounce.out"
        })
        .to('.rf_container', {
            duration: 1, 
            rotation:360, 
            ease:"sine.out"
        }, '-=0.3');
}

function refreshbanner(url) {
    const element = document.getElementById(url);
    if (element) {
        element.src = element.src;
    }
}

