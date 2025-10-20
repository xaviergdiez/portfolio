//$(window).load(function(){

    var tl = new TimelineMax ({
        delay:1, 
        repeat:1, 
        repeatDelay:4
      });

      tl
        .set([column1, column3, column5, column7, column9, column11, column13, column15, column17, column19, column21, column23, column25, column27, column29, column31, column33, column35, column37, column39, column41, column43, column45, column47, column49, column51, column53, column55], {y:-600, autoAlpha:0})
        .set([column2, column4, column6, column8, column10, column12, column14, column16, column18, column20, column22, column24, column26, column28, column30, column32, column34, column36, column38, column40, column42, column44, column46, column48, column50, column52, column54], {y:1200, autoAlpha:1})
      
        .staggerTo(".column_drop", 0.5, {autoAlpha:1, y:0, ease:RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize:  true, clamp: false})}, 0.05)
        

    var tl2 = new TimelineMax({
        delay:2.5
    })
    
    tl2 
        .set([letter_g, letter_h1, letter_o, letter_s1, letter_t, triangle, inthe, letter_s2, letter_h2, letter_e, letter_l1, letter_l2], {autoAlpha:1, drawSVG:"0% 0%"})
        .set(packshot_container, {scale:0, transformOrigin:"154.5px 196px"})
        .set([cta_rect, cta_text], {drawSVG:"50% 50%"})
        
        .to([letter_g, letter_h1, letter_o, letter_s1, letter_t, triangle, inthe, letter_s2, letter_h2, letter_e, letter_l1, letter_l2], 2, {drawSVG:"0% 100%", delay:0.5}, '-=1')
        .to(logo_fill, 0.7, {autoAlpha:1, ease:Expo.easeOut}, '-=0.7')
        .to(logo_shadow, 0.7, {autoAlpha:1, ease:Expo.easeOut}, '-=0.7')
        .to(packshot_container, 1, {autoAlpha:1, scale:1, ease:Expo.easeOut}, '-=0.5')
        .to(packshot, 0.5, {autoAlpha:0.6, repeat:1, yoyo:true, ease:RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize:  true, clamp: false})}, '-=1')
        .to(glitch1, 0.2, {autoAlpha:0.6, bezier:[{x:-3, y:0}, {x:3, y:3}], repeat:5, yoyo:true, ease:RoughEase.ease.config({ template:Power0.easeNone, strength: 1, points: 20, taper: "none", randomize:  true, clamp: false})}, '-=1')
        .to(glitch2, 0.2, {autoAlpha:0.6, bezier:[{x:3, y:-3}, {x:-3, y:0}], repeat:5, yoyo:true, ease:RoughEase.ease.config({ template:Power0.easeNone, strength: 1, points: 20, taper: "none", randomize:  true, clamp: false})}, '-=1')
        .to(packshot, 0.5, {x:-97, ease:Sine.easeOut})
        .staggerTo([cta_rect, cta_text], 0.7, {drawSVG:"0% 100%"}, 0.2)
        .to(cta_text, 0.7, {stroke:"none", fill:"#000"})
        .to(cta_rect, 0.7, {stroke:"none", fill:"#fff"}, '-=0.7')
        .to(".column_drop", 1, {autoAlpha:0})
        .to(sj_glitch1, 0.2, {autoAlpha:0.4, bezier:[{x:-1, y:0}, {x:1, y:0}], repeat:3, yoyo:true, ease:RoughEase.ease.config({ template:Power0.easeNone, strength: 1, points: 20, taper: "none", randomize:  true, clamp: false})}, '-=1')
        .to(sj_glitch2, 0.2, {autoAlpha:0.4, bezier:[{x:1, y:0}, {x:-1, y:0}], repeat:3, yoyo:true, ease:RoughEase.ease.config({ template:Power0.easeNone, strength: 1, points: 20, taper: "none", randomize:  true, clamp: false})}, '-=1')
        .to(sj_glitch3, 0.2, {autoAlpha:0.4, bezier:[{x:1, y:0}, {x:-1, y:0}], repeat:3, yoyo:true, ease:RoughEase.ease.config({ template:Power0.easeNone, strength: 1, points: 20, taper: "none", randomize:  true, clamp: false})}, '-=1')
      
    /*function finish_pic(){
        cvs1.PixelFlow('simpleanimate', 0, 1500);
    }*/
    
    /*function addCtaListeners() {
       container.addEventListener('mouseover', on_cta_over);
       container.addEventListener('mouseout', on_cta_out);
   }

    function on_cta_over() {
        cvs2.PixelFlow('simpleanimate', 16, 500);
        TweenMax.to(clip, 0.5, {scale: 1.1, ease:Power4.easeOut, onComplete:pixel_finish});
        
        
   }
    function on_cta_out() {
        TweenMax.to(clip, 0.5, {scale: 1, ease:Power4.easeIn})
    }
    
    function pixel_finish() {
        cvs2.PixelFlow('simpleanimate', 0, 250);
    }*/
    
//});              