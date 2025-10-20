// JavaScript Document

// Register GSAP plugins
gsap.registerPlugin(DrawSVGPlugin);

function init() {
    // Get required elements with error checking
    const elements = [
        'torso', 'neck2', 'r_sleeve1', 'r_sleeve2', 'r_sleeve3', 
        'l_sleeve1', 'l_sleeve2', 'l_sleeve3', 'face1', 'face2', 
        'neck', 'r_ear', 'l_ear', 'r_arm1', 'r_arm2', 'r_arm3', 
        'l_arm1', 'l_arm2', 'l_arm3', 'nose', 'left_arm1', 'right_arm1',
        'left_arm2', 'right_arm2', 'left_arm3', 'right_arm3',
        'ae_icon', 'ps_icon', 'ai_icon', 'html_icon', 'cs_icon', 'js_icon',
        'linkedin_icon'
    ];
    
    // Check if essential elements exist
    const missingElements = elements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.warn('Missing elements:', missingElements);
    }
    
    gsap.set('.portrait_container', {autoAlpha:1, scale:0, transformOrigin:"center center"});
    gsap.set([torso, neck2, r_sleeve1, r_sleeve2, r_sleeve3, l_sleeve1, l_sleeve2, l_sleeve3], {autoAlpha:0});
    gsap.set([face1, face2, neck, r_ear, l_ear, r_arm1, r_arm2, r_arm3, l_arm1, l_arm2, l_arm3, nose], {fill: "none", drawSVG:"0% 0%"});
    gsap.set(left_arm1, {rotation:0, svgOrigin:"298px 186px"});
    gsap.set(right_arm1, {rotation:0, svgOrigin:"459px 186px"});
    gsap.set(left_arm2, {rotation:-92, svgOrigin:"315px 182px"});
    gsap.set(right_arm2, {rotation:92, svgOrigin:"442px 182px"});
    gsap.set(left_arm3, {rotation:-114, svgOrigin:"331px 179px"});
    gsap.set(right_arm3, {rotation:114, svgOrigin:"426px 179px"});
    gsap.set([ae_icon, ps_icon, ai_icon, html_icon, cs_icon, js_icon], {autoAlpha:0});
    gsap.set('.info_card', {scale:0, transformOrigin:"center center"});
    gsap.set(['.info_title', '.info_text'], {x:-10});
    
    const tl = gsap.timeline({
        delay:0.5
    });
        
    tl
        .to('.portrait_container', 0.7, {scale:1, background:"#7f3f98", ease:"bounce.out"})
        .to([face1, face2, neck, nose, r_ear, l_ear, r_arm1, l_arm1], 0.7, {drawSVG:"0% 100%"}, '-=0.3')
        .to([torso, neck2, r_sleeve1, l_sleeve1], 1, {autoAlpha:1, ease:"expo.out"}, '-=0.7')
        .to(['.info_card','.info_title', '.info_text'], 0.5, {scale:1, autoAlpha:1, x:0, ease:"sine.in", stagger:0.3}, '-=1')
        .to([face2, neck, r_ear, l_ear, r_arm1, r_arm2, r_arm3, l_arm1, l_arm2, l_arm3], 0.7, {fill:"rgba(255, 255, 255, 1)"}, '-=0.5')
        .to(face1, 0.7, {fill:"#cccfdf"}, '-=0.7')
        .set([l_sleeve2, r_sleeve2, l_sleeve3, r_sleeve3], {autoAlpha:1, ease:"expo.out"})
        .to([l_arm2, r_arm2, l_arm3, r_arm3], 0.7, {drawSVG:"0% 100%"})
        .to([left_arm2, right_arm2, left_arm3, right_arm3], 0.7, {rotation:0, stagger:0.3})
        .to([js_icon, ae_icon, cs_icon, ps_icon, html_icon, ai_icon], 0.7, {autoAlpha:1, ease:"expo.out", stagger:0.3}, '-=2.2')
        .to(linkedin_icon, 0.7, {autoAlpha:1, ease:"expo.out"}, '-=0.2');
}

function refreshbanner(url) {
    const element = document.getElementById(url);
    if (element) {
        element.src = element.src;
    }
}