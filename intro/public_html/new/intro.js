function init() {
    // Register GSAP plugins
    gsap.registerPlugin(SplitText, DrawSVGPlugin, ScrollTrigger);
    
    var split1 = new SplitText("#intro1_txt", {type:"lines,words,chars", position:"absolute"});
    var m_split1 = new SplitText("#m_intro1_txt", {type:"lines,words,chars", position:"absolute"});
    var split2 = new SplitText("#intro2_txt", {type:"lines,words,chars", position:"absolute"});
    var m_split2 = new SplitText("#m_intro2_txt", {type:"lines,words,chars", position:"absolute"});
    var split3 = new SplitText("#intro3_txt", {type:"lines,words,chars", position:"absolute"});
    var m_split3 = new SplitText("#m_intro3_txt", {type:"lines,words,chars", position:"absolute"});
    
    gsap.set([intro1, m_intro1, intro3, m_intro3], {autoAlpha:0, x:-200})
    gsap.set([intro2, m_intro2], {autoAlpha:0, x:200})
    gsap.set(split1.lines, {autoAlpha:0, x:-5})
    gsap.set('.logo_container', {autoAlpha:1, transformOrigin:"center center"})
    gsap.set([x_stroke1, x_stroke2], {transformOrigin:"center center"})
    gsap.set('.icon_stroke', {autoAlpha:1, drawSVG:"50% 50%"})
    gsap.set('.arrow_stroke', {autoAlpha:1, drawSVG:"0% 0%"})
    gsap.set([icon_title, icon_subtitle], {x:-10})
    gsap.set([phone_container, laptop_container], {autoAlpha:1})
    gsap.set(['.phone_stroke', '.laptop_stroke', '.keyboard_stroke'],{drawSVG:"50% 50%"})
    gsap.set([ui_circle1, ui_circle2], {y:-20})
    gsap.set(tv_body, {autoAlpha:1, fill:"transparent", drawSVG:"50% 50%", stroke:"rgb(255, 255, 255)"})
    gsap.set([ui_header, ui_icon, ui_block1, ui_block2, ui_block3, ui_block4, ui_content1], {x:120})
    gsap.set(ui_content, {x:60})
    gsap.set([ui_bar, ui_btn], {scale:0, transformOrigin:"center center"})
    gsap.set(play_ball1, {scale:0, y:-140, transformOrigin:"center center"})
    gsap.set([bulb_base, filament, ray1, ray2, ray3, ray4, ray5], {autoAlpha:1, drawSVG:"0% 0%"})
    
    var tl = gsap.timeline({
        delay:0.5
    })
    
    tl
        .to(icon, {duration: 1.2, autoAlpha:1, rotation:720, scale:1, ease:"expo.out", transformOrigin:"center center"})
        .to([circle_stroke, x_stroke1, x_stroke2], {duration: 0.7, drawSVG:"0% 100%", stagger: 0.5}, '-=1.2')
        .to(icon, {duration: 1, rotation:720, scale:0.47, ease:"expo.in", transformOrigin:"center center"})
        .to(icon, {duration: 0.7, x:-252, rotation:-720, ease:"back.in", delay:0.5})
        .to([icon_title, icon_subtitle], {duration: 0.7, autoAlpha:1, x:0, ease:"sine.in", stagger: 0.5}, '-=0.2')
        .to(scroll_arrow, {duration: 0.7, drawSVG:"0% 100%"})
        .to(skip, {duration: 0.7, autoAlpha:1})
        .to(scroll_arrow, {duration: 0.3, y:10, repeat:-1, yoyo:true})
    
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
        //.add(function endScroll(){scene.removePin();})
    ;
    
    // Use ScrollTrigger instead of ScrollMagic
    ScrollTrigger.create({
        trigger: ".logo_container",
        start: "top top",
        end: "bottom top+=500%",
        pin: true,
        animation: tl2
    });
    
}