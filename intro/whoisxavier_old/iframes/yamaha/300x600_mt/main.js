function initBanner() {
    // Register GSAP plugins with error handling
    if (typeof gsap !== 'undefined') {
        if (typeof DrawSVGPlugin !== 'undefined') {
            gsap.registerPlugin(DrawSVGPlugin);
        }
        if (typeof MorphSVGPlugin !== 'undefined') {
            gsap.registerPlugin(MorphSVGPlugin);
        }
    }

    var tl = gsap.timeline({
        delay:1,
        onComplete:addCtaListeners
    })
    
    tl
        
        .set(half_bottom, {y:-1})
        .set([bg,bg_zoom], {autoAlpha:1, transformOrigin:"center center"})
        .set(cut_container, {autoAlpha:1})
        .set(cut_path, {drawSVG:"0% 0%"})
        .set(bike, {autoAlpha:1, x:300, y:10})
        .set(logo, {x:-300, autoAlpha:1})
        
        .to(logo_full, 0.7, {autoAlpha:1, ease:"rough({ template: none, strength: 1, points: 40, taper: none, randomize: true, clamp: false})"})
        .to(flash, 0.5, {delay:0.5, autoAlpha:1, ease:"rough({ template: none, strength: 1, points: 40, taper: none, randomize: true, clamp: false})"})   
        .set([logo_top,logo_bottom], {autoAlpha:1})
        .to(cut_path, 0.3, {drawSVG:"0% 100%"})
        .to(flash, 0.5, {x:345, y:-139, ease:"sine.out"},'-=0.3')
        .set(logo_full, {autoAlpha:0})
        .to(cut_container, 0.2, {autoAlpha:0})
        .to([logo_top, half_top], 0.7, {y:-600}, '-=0.2')
        .to([logo_bottom, half_bottom], 0.7, {y:600}, '-=0.7')
        .set(bg_zoom, {autoAlpha:0, delay:0.5})
        .to(bg, 0.7, {scale:0.5, x:150, y:-300, ease:"back.in"})
        .to(logo, 0.5, {x:0, ease:"sine.in"})
        .to(bike, 0.7, {x:0, y:-10, ease:"sine.in"})
        .to(toplogo, 0.5, {autoAlpha:1, ease:"rough({ template: none, strength: 1, points: 40, taper: none, randomize: true, clamp: false})"}, '-=0.2')
        .to(shadow, 0.5, {autoAlpha:0.4, ease:"rough({ template: none, strength: 1, points: 40, taper: none, randomize: true, clamp: false})"}, '-=0.5')
        .to(text1flex, 0.7, {autoAlpha:1, ease:"rough({ template: none, strength: 1, points: 40, taper: none, randomize: true, clamp: false})"})
        .to(text1flex, 1, {autoAlpha:0, delay:2})
        .to(text2flex, 0.7, {autoAlpha:1, ease:"rough({ template: none, strength: 1, points: 40, taper: none, randomize: true, clamp: false})"})
        .to(text2flex, 1, {autoAlpha:0, delay:2})
        
    // Convert staggerTo to GSAP v3 syntax
    tl.to([cta, cta_glow, ctaflex], {
        duration: 0.7,
        autoAlpha: 1,
        ease: "rough({ template: none, strength: 1, points: 40, taper: none, randomize: true, clamp: false})",
        stagger: 0.2
    })
}

function addCtaListeners() {
    container.addEventListener('mouseover', on_cta_over);
    container.addEventListener('mouseout', on_cta_out);
}

function on_cta_over() {
    gsap.to(cta_glow, {
        duration: 0.25,
        autoAlpha: 0.5,
        repeat: 1,
        yoyo: true,
        ease: "rough({ template: none, strength: 1, points: 20, taper: none, randomize: true, clamp: false})"
    });
}

function on_cta_out() {
    gsap.to(cta_glow, {
        duration: 0.25,
        autoAlpha: 1,
        ease: "rough({ template: none, strength: 1, points: 20, taper: none, randomize: true, clamp: false})"
    });
}