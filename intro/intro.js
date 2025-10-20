// GSAP v3 Animation Setup for intro page
// Uses official CDN links for all plugins including premium ones (DrawSVG, MorphSVG, SplitText)

function init() {
    try {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin, SplitText);
        console.log('GSAP plugins registered successfully');
        
        // Define element selectors (with null check for missing elements)
        const intro1 = document.getElementById('intro1');
        const intro2 = document.getElementById('intro2');
        const intro3 = document.getElementById('intro3');
        const m_intro1 = document.getElementById('m_intro1');
        const m_intro2 = document.getElementById('m_intro2');
        const m_intro3 = document.getElementById('m_intro3');
        
        // SVG elements
        const icon = document.getElementById('icon');
        const circle_stroke = document.getElementById('circle_stroke');
        const x_stroke1 = document.getElementById('x_stroke1');
        const x_stroke2 = document.getElementById('x_stroke2');
        const icon_title = document.getElementById('icon_title');
        const icon_subtitle = document.getElementById('icon_subtitle');
        const scroll_arrow = document.getElementById('scroll_arrow');
        const skip = document.getElementById('skip');
        
        // Phone elements
        const phone_container = document.getElementById('phone_container');
        const back = document.getElementById('back');
        const front = document.getElementById('front');
        const phone_screen = document.getElementById('phone_screen');
        const phone_screen2 = document.getElementById('phone_screen2');
        const phone_screen3 = document.getElementById('phone_screen3');
        const phone_screen4 = document.getElementById('phone_screen4');
        const speaker = document.getElementById('speaker');
        
        // Laptop elements  
        const laptop_container = document.getElementById('laptop_container');
        const laptop_base = document.getElementById('laptop_base');
        const laptop_bottom = document.getElementById('laptop_bottom');
        const trackpad = document.getElementById('trackpad');
        const keyboard = document.getElementById('keyboard');
        
        // TV elements
        const tv_body = document.getElementById('tv_body');
        const tv_screen = document.getElementById('tv_screen');
        const tv_base = document.getElementById('tv_base');
        
        // UI elements
        const ui_circle1 = document.getElementById('ui_circle1');
        const ui_circle2 = document.getElementById('ui_circle2');
        const ui_header = document.getElementById('ui_header');
        const ui_icon = document.getElementById('ui_icon');
        const ui_block1 = document.getElementById('ui_block1');
        const ui_block2 = document.getElementById('ui_block2');
        const ui_block3 = document.getElementById('ui_block3');
        const ui_block4 = document.getElementById('ui_block4');
        const ui_content1 = document.getElementById('ui_content1');
        const ui_content = document.getElementById('ui_content');
        const ui_bar = document.getElementById('ui_bar');
        const ui_btn = document.getElementById('ui_btn');
        const ui_screen1 = document.getElementById('ui_screen1');
        const ui_screen2 = document.getElementById('ui_screen2');
        const ui_screen3 = document.getElementById('ui_screen3');
        
        // Play elements
        const play_ball1 = document.getElementById('play_ball1');
        const play_screen1 = document.getElementById('play_screen1');
        const play_screen2 = document.getElementById('play_screen2');
        const play_bulb = document.getElementById('play_bulb');
        
        // Bulb elements
        const bulb_base = document.getElementById('bulb_base');
        const filament = document.getElementById('filament');
        const ray1 = document.getElementById('ray1');
        const ray2 = document.getElementById('ray2');
        const ray3 = document.getElementById('ray3');
        const ray4 = document.getElementById('ray4');
        const ray5 = document.getElementById('ray5');
        
        // Other elements
        const endScroll = document.getElementById('endScroll');
        const scroll_stop = document.getElementById('scroll_stop');
        
        // Check for missing critical elements
        const criticalElements = [intro1, intro2, intro3, icon, circle_stroke, x_stroke1, x_stroke2];
        const missingElements = criticalElements.filter(el => !el);
        if (missingElements.length > 0) {
            console.warn('Some critical elements are missing from the HTML');
        }
    
        // Initialize SplitText animations
        let split1, m_split1, split2, m_split2, split3, m_split3;
        
        split1 = new SplitText("#intro1_txt", {type:"lines,words,chars", position:"absolute"});
        m_split1 = new SplitText("#m_intro1_txt", {type:"lines,words,chars", position:"absolute"});
        split2 = new SplitText("#intro2_txt", {type:"lines,words,chars", position:"absolute"});
        m_split2 = new SplitText("#m_intro2_txt", {type:"lines,words,chars", position:"absolute"});
        split3 = new SplitText("#intro3_txt", {type:"lines,words,chars", position:"absolute"});
        m_split3 = new SplitText("#m_intro3_txt", {type:"lines,words,chars", position:"absolute"});
    
    // Initial GSAP settings for elements
    gsap.set([intro1, m_intro1, intro3, m_intro3], {autoAlpha:0, x:-200})
    gsap.set([intro2, m_intro2], {autoAlpha:0, x:200})
    if (split1 && split1.lines) gsap.set(split1.lines, {autoAlpha:0, x:-5})
    gsap.set('.logo_container', {autoAlpha:1, transformOrigin:"center center"})
    gsap.set([x_stroke1, x_stroke2], {transformOrigin:"center center"})
    gsap.set('.icon_stroke', {autoAlpha:1, drawSVG:"50% 50%"})
    gsap.set('.arrow_stroke', {autoAlpha:1, drawSVG:"0% 0%"})
    gsap.set([icon_title, icon_subtitle], {x:-10})
    gsap.set([phone_container, laptop_container], {autoAlpha:1})
    gsap.set(['.phone_stroke', '.laptop_stroke', '.keyboard_stroke'],{drawSVG:"50% 50%"})
    gsap.set([ui_circle1, ui_circle2], {y:-20})
    if (tv_body) gsap.set(tv_body, {autoAlpha:1, fill:"transparent", drawSVG:"50% 50%", stroke:"rgb(255, 255, 255)"})
    gsap.set([ui_header, ui_icon, ui_block1, ui_block2, ui_block3, ui_block4, ui_content1], {x:120})
    if (ui_content) gsap.set(ui_content, {x:60})
    gsap.set([ui_bar, ui_btn], {scale:0, transformOrigin:"center center"})
    if (play_ball1) gsap.set(play_ball1, {scale:0, y:-140, transformOrigin:"center center"})
    gsap.set([bulb_base, filament, ray1, ray2, ray3, ray4, ray5], {autoAlpha:1, drawSVG:"0% 0%"})
    
    // Main timeline
    var tl = gsap.timeline({
        delay:0.5
    })
    
    if (icon && circle_stroke && x_stroke1 && x_stroke2) {
        tl
            .to(icon, {duration: 1.2, autoAlpha:1, rotation:720, scale:1, ease:"expo.out", transformOrigin:"center center"})
            .to([circle_stroke, x_stroke1, x_stroke2], {duration: 0.7, drawSVG:"0% 100%", stagger: 0.5}, '-=1.2')
            .to(icon, {duration: 1, rotation:720, scale:0.47, ease:"expo.in", transformOrigin:"center center"})
            .to(icon, {duration: 0.7, x:-252, rotation:-720, ease:"back.in", delay:0.5})
    }
    
    if (icon_title && icon_subtitle) {
        tl.to([icon_title, icon_subtitle], {duration: 0.7, autoAlpha:1, x:0, ease:"sine.in", stagger: 0.5}, '-=0.2')
    }
    
    if (scroll_arrow) {
        tl.to(scroll_arrow, {duration: 0.7, drawSVG:"0% 100%"})
          .to(scroll_arrow, {duration: 0.3, y:10, repeat:-1, yoyo:true})
    }
    
    if (skip) {
        tl.to(skip, {duration: 0.7, autoAlpha:1}, '-=0.7')
    }
    
    var tl2 = gsap.timeline({
        delay:0.5
    })
    
    tl2        
        .to([icon_subtitle, icon_title], {duration: 0.7, autoAlpha:0, ease:"expo.out", stagger: 0.3})
        .to(icon, {duration: 0.7, x:0, rotation:360, ease:"back.in", delay:0.5}, '-=1')
        .to(icon, {duration: 1, scale:1, transformOrigin:"center center", delay:0.5})
        .to([circle_stroke, x_stroke1, x_stroke2], {duration: 1, strokeWidth:1}, '-=1')
        .to([x_stroke1, x_stroke2], {duration: 0.5, drawSVG:"0% 0%"}, '-=1')
        .to(circle_stroke, {duration: 1, morphSVG:"#front", stroke:"rgb(207, 207, 207)"}, '-=0.5')
        .to([back, phone_screen, speaker], {duration: 1, drawSVG:"0% 100%", stroke:"rgb(207, 207, 207)", stagger: 0.5})
        .to(back, {duration: 0.7, fill:"rgb(207, 207, 207)"}, '-=0.7')
        .to(circle_stroke, {duration: 0.7, fill:"rgb(255, 255, 255)"}, '-=0.7')
        .to(speaker, {duration: 0.7, fill:"rgb(207, 207, 207)"}, '-=0.7')
        .to([intro1, m_intro1], {duration: 1, x:0, autoAlpha:1, ease:"bounce.out"})
        .to(split1.lines, {duration: 0.7, x:0, autoAlpha:1, ease:"sine.in", stagger: 0.5}, '-=0.7')
        .to(m_split1.lines, {duration: 0.7, x:0, autoAlpha:1, ease:"sine.in", stagger: 0.5}, '-=1.7')
        .to(phone_screen, {duration: 0.7, fill:"rgba(58, 116, 69, 0.8)"}, '-=1.7')
        .to(phone_screen4, {duration: 0.7, y:-60, fill:"rgba(109, 217, 129)", autoAlpha:0.8, ease:"expo.out"}, '-=0.5')
        .to(phone_screen3, {duration: 0.7, y:-40, fill:"rgba(109, 217, 129)", autoAlpha:0.4, ease:"expo.out"}, '-=0.5')
        .to(phone_screen2, {duration: 0.7, y:-20, fill:"rgba(109, 217, 129)", autoAlpha:0.2, ease:"expo.out"}, '-=0.5')
        .to(ui_bar, {duration: 0.7, scale:1, autoAlpha:1, ease:"bounce.out"}, '-=0.5')
        .to([ui_circle1, ui_circle2], {duration: 0.7, autoAlpha:1, y:0, ease:"expo.in", stagger: 0.5}, '-=0.5')
        .to(ui_btn, {duration: 0.7, scale:1, autoAlpha:1, ease:"bounce.out"}, '-=0.2')
        .to([phone_screen2, phone_screen3, phone_screen4], {duration: 0.7, y:0, ease:"expo.in", delay:1, stagger: 0.2})
        .to([ui_bar, ui_circle1, ui_circle2, ui_btn], {duration: 0.7, y:60, ease:"bounce.out"}, '-=0.2')
        .to([circle_stroke, back, phone_screen, phone_screen2, phone_screen3, phone_screen4, speaker, ui_bar, ui_circle1, ui_circle2, ui_btn], {duration: 1, fill:"transparent", stroke:"#fff", delay:1})
        .to([phone_screen2, phone_screen3, phone_screen4, ui_bar, ui_circle1, ui_circle2, ui_btn], {duration: 1, autoAlpha:0}, '-=1')
        .to([intro1, intro2], {duration: 1, autoAlpha:0}, '-=1')
        .to(circle_stroke, {duration: 1, morphSVG:"#laptop_front"})
        .to(speaker, {duration: 0.5, autoAlpha:0}, '-=1')
        .to(phone_screen, {duration: 1, morphSVG:"#laptop_screen"}, '-=1')
        .to(back, {duration: 1, morphSVG:"#laptop_back"}, '-=1')
        .to([laptop_base, laptop_bottom, trackpad, keyboard], {duration: 1, drawSVG:"0% 100%", stroke:"rgb(207, 207, 207)", stagger: 0.5}, '-=1')
        .to([intro2, m_intro2], {duration: 1, x:0, autoAlpha:1, ease:"bounce.out"}, '-=1')
        .to(split2.lines, {duration: 0.7, x:0, autoAlpha:1, ease:"sine.in", stagger: 0.5}, '-=0.7')
        .to(m_split2.lines, {duration: 0.7, x:0, autoAlpha:1, ease:"sine.in", stagger: 0.5}, '-=1.7')
        .to(back, {duration: 0.7, fill:"rgb(207, 207, 207)"}, '-=0.7')
        .to([circle_stroke, laptop_base], {duration: 0.7, fill:"rgb(255, 255, 255)", stroke:"rgb(207, 207, 207)"}, '-=1.7')
        .to([laptop_bottom, trackpad, keyboard, phone_screen], {duration: 0.7, fill:"rgb(207, 207, 207)", stroke:"rgb(207, 207, 207)"}, '-=0.7')
        .to(phone_screen, {duration: 0.7, fill:"rgba(58, 116, 69, 0.8)"})
        .to(ui_screen3, {duration: 0.7, x:60, fill:"rgba(109, 217, 129)", autoAlpha:0.8, ease:"expo.out"}, '-=0.5')
        .to(ui_screen2, {duration: 0.7, x:40, fill:"rgba(109, 217, 129)", autoAlpha:0.4, ease:"expo.out"}, '-=0.5')
        .to(ui_screen1, {duration: 0.7, x:20, fill:"rgba(109, 217, 129)", autoAlpha:0.2, ease:"expo.out"}, '-=0.5')
        .to([ui_header, ui_icon, ui_block1, ui_block2, ui_block3, ui_block4, ui_content1], {duration: 0.7, autoAlpha:1, x:60, ease:"bounce.out", stagger: 0.2})
        .to(ui_content1, {duration: 0.7, morphSVG:"#ui_content"})
        .to([ui_screen1, ui_screen2, ui_screen3], {duration: 0.7, x:0, ease:"expo.in", stagger: 0.2})
        .to([ui_header, ui_icon, ui_block1, ui_block2, ui_block3, ui_block4, ui_content1], {duration: 0.7, x:0, ease:"bounce.out"}, '-=0.2')
        .to([circle_stroke, back, phone_screen, laptop_base, laptop_bottom, trackpad, keyboard], {duration: 1, fill:"transparent", stroke:"#fff", delay:1})
        .to([ui_screen1, ui_screen2, ui_screen3, ui_header, ui_icon, ui_block1, ui_block2, ui_block3, ui_block4, ui_content1, circle_stroke], {duration: 1, autoAlpha:0}, '-=1')
        .to(intro2, {duration: 1, autoAlpha:0}, '-=1')
        .to([back, laptop_base, laptop_bottom, keyboard], {duration: 1, drawSVG:"100% 100%"})
        .to(intro2, {duration: 1, autoAlpha:0}, '-=1')
        .to(tv_body, {duration: 1, drawSVG:"0% 100%"})
        .to(phone_screen, {duration: 1, morphSVG:"#tv_screen"}, '-=1')
        .to(trackpad, {duration: 0.5, morphSVG:"#tv_base"}, '-=1')
        .to(tv_body, {duration: 0.7, fill:"rgb(255, 255, 255)"})
        .to([tv_screen, trackpad], {duration: 0.7, autoAlpha:1, fill:"rgb(207, 207, 207)"}, '-=0.7')
        .to(play_screen1, {duration: 0.3, autoAlpha:1, morphSVG:"#play_screen2"})
        .to(play_screen1, {duration: 0.7, morphSVG:"#tv_screen"})
        .to([intro3, m_intro3], {duration: 1, x:0, autoAlpha:1, ease:"bounce.out"}, '-=1')
        .to(split3.lines, {duration: 0.7, x:0, autoAlpha:1, ease:"sine.in", stagger: 0.5}, '-=0.7')
        .to(m_split3.lines, {duration: 0.7, x:0, autoAlpha:1, ease:"sine.in", stagger: 0.5}, '-=1.7')
        .to(play_ball1, {duration: 0.7, autoAlpha:1, scale:1, y:0, ease:"bounce.out"})
        .to(play_ball1, {duration: 1, morphSVG:"#play_bulb"})
        .to([bulb_base, filament], {duration: 0.5, drawSVG:"0% 100%", stagger: 0.2}, '-=1')
        .to([ray1, ray2, ray3, ray4, ray5], {duration: 0.5, drawSVG:"0% 100%", stagger: 0.2})
        .to(scroll_arrow, {duration: 0.7, y:10, morphSVG:"#scroll_stop"})
        .to(scroll_arrow, {duration: 0.5, autoAlpha:0, ease:"expo.out"})
        .to(intro3, {duration: 1, autoAlpha:0}, '-=1')
        .to(endScroll, {duration: 2, display:"block"})
    ;
    
    // ScrollTrigger for pinning and timeline control
    ScrollTrigger.create({
        trigger: ".logo_container",
        start: "top top",
        end: "+=500%",
        pin: ".logo_container",
        animation: tl2,
        scrub: 1,
        onUpdate: self => {
            // Optional: add any update logic here
        }
    });
    
    } catch (error) {
        console.error('Error initializing GSAP animations:', error);
        console.error('Please check that all SVG elements exist in the HTML and plugins are loaded correctly');
    }
}