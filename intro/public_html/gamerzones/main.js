function init() {
    // Register GSAP plugins
    gsap.registerPlugin(DrawSVGPlugin);
    
    // Get element references
    const phone = document.getElementById('phone');
    const frontbg = document.getElementById('frontbg');
    const backbg = document.getElementById('backbg');
    const letters10 = document.getElementById('letters10');
    const letters1 = document.getElementById('letters1');
    const letters2 = document.getElementById('letters2');
    const letters3 = document.getElementById('letters3');
    const letters4 = document.getElementById('letters4');
    const letters5 = document.getElementById('letters5');
    const letters6 = document.getElementById('letters6');
    const letters7 = document.getElementById('letters7');
    const letters8 = document.getElementById('letters8');
    const letters9 = document.getElementById('letters9');
    
    gsap.set('.blue_stroke', {autoAlpha:1, drawSVG:"50% 50%"})
    gsap.set(phone, {autoAlpha:1})
    gsap.set(['.letters','.Grid-cell'], {scale:0, y:20, transformOrigin:"center center"})
    gsap.set(['.title', '.txt_content'], {x:-30})
    gsap.set('.submit_btn', {x:-100})
    
    var tl = gsap.timeline({
        delay:0.5
    })
    
    tl
        .to('.blue_stroke', {duration: 0.3, drawSVG:"0% 100%", ease:"expo.out", stagger: 0.2})
        .to([frontbg, backbg], {duration: 0.5, autoAlpha:1})
        .to('.blue_stroke', {duration: 0.5, stroke:"#898989"}, '-=0.5')
        .to('.fill_screen', {duration: 0.5, autoAlpha:1, ease:"expo.out"}, '-=0.5')
        .to('.frontscreen', {duration: 0.5, fill:"#00ffff", autoAlpha:0.2, ease:"expo.out"})
        .to('.letters', {duration: 0.3, visibility:"visible", scale:1, y:0, ease:"back.out", stagger: 0.05}, '-=0.5')
        .to(letters10, {duration: 0.3, stroke:"#428bca", strokeWidth:1}, '-=0.295')
        .to([letters1, letters2, letters3, letters4, letters5, letters6, letters7, letters8, letters9], {duration: 0.3, autoAlpha:0, ease:"back.in", repeat:-1, yoyo:true, stagger: 0.1}, '-=2');
    
    var tl2 = gsap.timeline({
        delay:3,
        onComplete: addCtaListener
    })
    
    tl2
        .to('.hero', {duration: 2, height:550, ease:"power2.inOut"})
        .to(['.title', '.txt_content'], {duration: 0.7, autoAlpha:1, x:0, ease:"back.out", stagger: 0.2})
        .to('.Grid-cell', {duration: 0.7, autoAlpha:1, scale:1, y:0, ease:"back.out", stagger: 0.2}, '-=0.1')
        .to('.shine_container', {duration: 0.5, className:'+=active', stagger: 0.2})
        .to('.subscribe_container', {duration: 0.7, autoAlpha:1, ease:"expo.out"}, '-=2.1')
    ;
    
function addCtaListener() {
    sign_btn.addEventListener('click', clickInput);
}
    
function clickInput() {
    gsap.set(['.txt_input'], {display:"block", autoAlpha:1});
    gsap.to('.input_container', {duration: 0.7, width:450, ease:"expo.out"});
    gsap.to(sign_btn, {duration: 0.7, backgroundColor:"#07a59d", borderRadius:0, ease:"none"}, "-=0.7");
    gsap.to([sign_btn, '.sign_txt'], {duration: 0.7, autoAlpha:0, ease:"expo.out"})
    gsap.to(input_txt, {duration: 0.7, width:330, ease:"back.out"})
    gsap.to('.submit_btn', {duration: 0.7, x:0, autoAlpha:1, ease:"back.out"}, '-=0.5')
}

}