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
    
    gsap.set(mountain_container, {autoAlpha:1})
    gsap.set(mountain, {y:600})
    gsap.set(sun_container, {autoAlpha:1})
    gsap.set(sun, {y:170})
    gsap.set(letter1, {autoAlpha:1, x:-300})
    gsap.set(letter2, {autoAlpha:1, x:300})
    gsap.set(toplogo, {y:10})
    gsap.set(bike, {autoAlpha:1, x:-150, y:10, scale:0, transformOrigin:"150px 300px"})
    gsap.set([vertical_container, horizontal_container], {autoAlpha:1})
    gsap.set(cta_txt, {scale:0, transformOrigin:"153.25 495px"})
    gsap.set([v_path1, v_path2, v_path3, v_path4, v_path5, v_path6, v_path7, v_path8, v_path9, v_path10, v_path11, v_path12, v_path13], {drawSVG:"0% 0%"})
    gsap.set([h_path1, h_path2, h_path3, h_path4, h_path5, h_path6, h_path7, h_path8, h_path9, h_path10, h_path11, h_path12, h_path13, h_path14, h_path15, h_path16, h_path17, h_path18, h_path19, h_path20, h_path21, h_path22, h_path23, h_path24, h_path25, h_path26, h_path27, h_path28, h_path29, h_path30, h_path31], {drawSVG:"0% 0%"})
    gsap.set(txt_container, {autoAlpha:1})
    gsap.set([line1, txt_field1], {drawSVG:"0% 0%"})
    gsap.set([line2, txt_field2], {drawSVG:"50% 50%"})
    gsap.set(cta1, {scale:0, transformOrigin:"center center"})
    
    var tl = gsap.timeline({
        delay:0,
        onComplete:addCtaListeners
    })
    
    tl
        // Convert staggerTo to GSAP v3 syntax
        .to([v_path1, v_path2, v_path3, v_path4, v_path5, v_path6, v_path7, v_path8, v_path9, v_path10, v_path11, v_path12, v_path13], {
            duration: 0.5,
            drawSVG: "0% 100%",
            stagger: 0.2
        })
        .to([h_path31, h_path30, h_path29, h_path28, h_path27, h_path26, h_path25, h_path24, h_path23, h_path22, h_path21, h_path20, h_path19, h_path18, h_path17, h_path16, h_path15, h_path14, h_path13, h_path12, h_path11, h_path10, h_path9, h_path8, h_path7, h_path6, h_path5, h_path4, h_path3, h_path2, h_path1], {
            duration: 0.15,
            drawSVG: "0% 100%",
            stagger: 0.075
        }, '-=2.9')
        .to([v_path1, v_path2, v_path3, v_path4, v_path5, v_path6, v_path7, v_path8, v_path9, v_path10, v_path11, v_path12, v_path13, h_path1, h_path2, h_path3, h_path4, h_path5, h_path6, h_path7, h_path8, h_path9, h_path10, h_path11, h_path12, h_path13, h_path14, h_path15, h_path16, h_path17, h_path18, h_path19, h_path20, h_path21, h_path22, h_path23, h_path24, h_path25, h_path26, h_path27, h_path28, h_path29, h_path30, h_path31], 0.3, {stroke:"#63d4f7", repeat:11, yoyo:true}, '-=2.5')
        .to(bike, 1, {scale:1, x:-20, y:0, ease:"sine.in"}, '-=2.7')
        .to(toplogo, 0.5, {autoAlpha:1, y:0, ease:"expo.out"}, '-=0.5')
        .to(mountain, 2, {y:0}, '-=3')
        .to(line1, 0.35, {drawSVG:"0% 50%"})
        .to(line2, 0.35, {drawSVG:"50% 100%"})
        .to(txt_field1, 0.35, {drawSVG:"0% 50%"})
        .to(txt_field2, 0.35, {drawSVG:"50% 100%"})
        .to([bg_field, text1], 0.35, {autoAlpha:1})
        .to(text1, 0.35, {autoAlpha:0, delay:2})
        .to(text2, 0.35, {autoAlpha:1})
        .to(txt_field2, 0.35, {drawSVG:"50% 50%", delay:2})
        .to(txt_field1, 0.35, {drawSVG:"0% 0%"})
        .to([bg_field, text2], 0.35, {autoAlpha:0})
        .to(line2, 0.35, {drawSVG:"50% 50%"},'-=0.35')
        .to(line1, 0.35, {drawSVG:"0% 0%"})
        .to(sun, 8, {autoAlpha:1, y:0}, '-=8')
        //.to(sun, 0.7, {autoAlpha:0}, '-=0.7')
        .to([letter1, letter2], 0.5, {x:0, ease:"sine.in"}, '-=1')
        .to(cta1, 0.5, {autoAlpha:1, scale:1, ease:"expo.out"})
        .to(cta1, 0.5, {morphSVG:"#cta2"}, '-=0.2')
        .to(cta_txt, 0.5, {autoAlpha:1, scale:1, ease:"expo.out"}, '-=0.2');
 }

function addCtaListeners() {
    container.addEventListener('mouseover', on_cta_over);
    container.addEventListener('mouseout', on_cta_out);
}

function on_cta_over() {
    //gsap.to(cta1, {duration: 0.5, morphSVG:"#cta1"});
    //gsap.to(cta_txt, {duration: 0.5, scale:1.2, ease:"expo.out", rotation:0.01, force3D:false},'-=0.5')
}
function on_cta_out() {
    //gsap.to(cta1, {duration: 0.5, morphSVG:"#cta2"});
    //gsap.to(cta_txt, {duration: 0.5, scale:1, ease:"expo.in", rotation:0.01, force3D:false},'-=0.5')
}