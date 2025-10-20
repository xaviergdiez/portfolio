// JavaScript Document

function init() {
    TweenMax.set(phone_frame, {autoAlpha:1, scale:0})
    TweenMax.set('.phone_stroke', {drawSVG:"50% 50%"})
    TweenMax.set('.info_card', {scale:0, transformOrigin:"center center"})
    TweenMax.set(['.info_title', '.info_text'], {x:-10})
    //TweenMax.set('.video_iframe', {scale:0, transformOrigin:"center center"})
    var tl = new TimelineMax({
        delay:0.5
    })
    
    tl
        .to(phone_frame, 1, {scale:1, ease:Expo.easeOut})
        .staggerTo(['.info_card','.info_title', '.info_text'], 0.5, {scale:1, autoAlpha:1, x:0, ease:Sine.easeIn}, 0.3,'-=1')
        .to('.phone_stroke', 1, {drawSVG:"0% 100%"},'-=1')
        .to('.video_iframe', 0.7, {scale:1, autoAlpha:1, ease:Sine.easeOut})
        .to(phone_bg, 0.7, {autoAlpha:1, ease:Sine.easeOut}, '-=0.7')
    

}

function refreshbanner(url) {
    document.getElementById(url).src = document.getElementById(url).src;
}