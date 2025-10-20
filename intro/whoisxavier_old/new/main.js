// JavaScript Document

function init() {
    gsap.set('.article_hide', {scale:0, transformOrigin:"center center"})
    var tl = gsap.timeline({
        delay:0
    })
    
    tl
        .to('.article_hide', {duration: 0.7, autoAlpha:1, scale:1, ease:"expo.out", stagger: 0.2})
    

}

function refreshbanner(url) {
    document.getElementById(url).src = document.getElementById(url).src;
}