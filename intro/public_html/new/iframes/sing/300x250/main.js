// JavaScript Document
var agcs_video = document.getElementById("content_video");

function initBanner() {

var tl = new TimelineMax ({
		delay: 0,
        repeat: 1,
        repeatDelay: 2,
        onComplete: addCtaListeners
	});

tl
    .set(light, {transformOrigin:"150px 125px"})
    .set(gunter, {scale:0, transformOrigin:"150px 125px"})
    .set([johnny, meena, ash, buster], {autoAlpha:1, y:250})
    .set(rosita, {autoAlpha:1, x:-300})
    .set([mouse, logo], {autoAlpha:1, y:-250})
    .set([packshot1, packshot2], {autoAlpha:1, x:300})
    .set(cta, {autoAlpha:1, scale:0, transformOrigin:"227px 177px"})
    .set(cta_lights, {transformOrigin:"228px 182.5px"})
    
    .to(light, 1, {autoAlpha:1, ease:RoughEase.ease.config({ template: Power0.easeNone, strength: 0.5, points: 10, taper: "out", randomize: true, clamp: false})})
    .to(gunter, 1, {autoAlpha:1, scale:1, ease:Expo.easeOut})
    .to(gunter, 1, {x:17, y:112, ease:Expo.easeOut, delay:0.5})
    .to(light, 1, {scale:1.5, ease:Expo.easeOut}, '-=1')
    .staggerTo([rosita, buster, johnny, meena, ash, buster], 1, {x:0, y:0, ease:Expo.easeOut}, 0.25, '-=1')
    .to(light, 1, {autoAlpha:0, ease:Expo.easeIn}, '-=1')
    .staggerTo([sign1, sign2, lights_s, lights_i, lights_n, lights_g], 1, {autoAlpha:1, ease:Expo.easeOut}, 0.15, '-=0.5')
    .to([background, scaffold], 1, {autoAlpha:1, ease:RoughEase.ease.config({ template: Power0.easeNone, strength: 0.5, points: 10, taper: "out", randomize: true, clamp: false})}, '-=1')
    .staggerTo([mouse, logo], 1, {y:0, ease:Bounce.easeIn}, 0.2, '-=0.5')
    .to([scaffold, sign1, lights_s, lights_i, lights_n, lights_g, sign2, rosita, buster, johnny, meena, ash, gunter, logo], 1, {x:-300, delay:1.5})
    .to(mouse, 0.2, {y:-50}, '-=1')
    .staggerTo([packshot1, packshot2], 1, {x:0}, 0.25, '-=1')
    .to(mouse, 0.2, {y:7, ease:Bounce.easeIn})
    .to([packshot1, packshot2, mouse], 0.7, {x:-55})
    .to(cta, 0.7, {scale:1, ease:Expo.easeOut}, '-=0.7')
    .staggerTo([lights_b, lights_e1, lights_s2, lights_t, lights_e2, lights_l, lights_n2, lights_u], 0.5, {autoAlpha:1, ease:Expo.easeOut, repeat:3, yoyo:true}, 0.15)

var tl2 = new TimelineMax({
    delay: 14
});

    tl2
        .to([background, mouse, packshot1, packshot2, cta], 0.7, {autoAlpha:0, ease:Linear.easeNone})

function addCtaListeners() {
   container.addEventListener('mouseover', on_cta_over);
   container.addEventListener('mouseout', on_cta_out);
}

function on_cta_over() {
        TweenMax.to([cta,cta_lights], 0.5, {scale: 1.1, ease:Power4.easeOut})
        TweenMax.to(cta_lights, 0.5, {autoAlpha:1, ease:Expo.easeOut});
}
function on_cta_out() {
        TweenMax.to([cta,cta_lights], 0.5, {scale: 1, ease:Power4.easeIn})
        TweenMax.to(cta_lights, 0.5, {autoAlpha:0, ease:Expo.easeIn});
}
    
}