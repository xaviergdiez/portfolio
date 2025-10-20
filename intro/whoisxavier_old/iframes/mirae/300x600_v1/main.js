function initBanner(){
var splitText1 = new SplitText("#copy", {type:"words,chars"});
var chars1 = splitText1.chars;
var splitText2 = new SplitText("#text1", {type:"words,chars"});
var words1 = splitText2.words;
var tl = new TimelineMax ({
    delay:0,
    onComplete: addCtaListeners
});

tl
    .set([text1, world, grid, copy, cta_container ], {autoAlpha:1})
    .set(".map", {backgroundPositionX: -30})
    .set(".map2", {backgroundPositionX: 30, y:15})
    .set(world, {y:150, x:300, perspective:400})
    .set([world2, grid], {y:150})
    .set(copy, {perspective:400})
    .set(".world_stroke", {drawSVG:"0% 0%"})
    .set(chars1, {y:130})
    .set(cta_draw, {drawSVG:"0% 0%"})
    .set([letter1, letter2, letter3, letter4, letter5, letter6, letter7, letter8, letter9, letter10, letter11], {drawSVG:"50% 50%"})
    
    .to(orangeBar, 0.5, {width: '250px', delay:0.5})
    .staggerFrom(words1, 0.8, {x:30, autoAlpha:0}, 0.2)
    .to([".map"], 5, {backgroundPositionX: 30, rotationY:-9}, '-=0.75')
    .to(world, 2, {x:0}, '-=5')
    .to([world, orangeBar, text1], 0.7, {autoAlpha:0}, '-=2')
    .to(world2, 0.7, {autoAlpha:1}, '-=1.7')
    .staggerTo(".world_stroke", 0.5, {drawSVG:"0% 100%", autoAlpha:0.2},0.02, '-=2.5')
    .to([".map2", grid], 0.7, {scale:4, transformOrigin:"150px 150px", autoAlpha:0.1})
    .to([".map2"], 6, {backgroundPositionX: 30})
    .staggerFrom(chars1, 0.8, {scale:4, autoAlpha:0,  rotationX:-90,  transformOrigin:"100% 50%", ease:Back.easeOut}, 0.02, '-=6')
    .to(cta_draw, 0.7, {drawSVG:"0% 100%"}, '-=4')
    .staggerTo([letter1, letter2, letter3, letter4, letter5, letter6, letter7, letter8, letter9, letter10, letter11], 0.5, {drawSVG:"0% 100%"},0.02, '-=4')
    .to(".stroke", 0.7, {fill:"#fff", ease:Expo.easeOut}, '-=3.5')
    .to(".cta_stroke", 0.7, {fill:"#f58220", ease:Expo.easeOut}, '-=3.5');
    
function addCtaListeners() {
   container.addEventListener('mouseover', on_cta_over);
   container.addEventListener('mouseout', on_cta_out);
}

function on_cta_over() {
    TweenMax.to(".cta_stroke", 0.5, {fill:"#e5f0f6", stroke:"#e5f0f6"});
    TweenMax.to(".stroke", 0.5, {fill:"#00417a", stroke:"#00417a"}, '-=0.5');

}
function on_cta_out() {
    TweenMax.to(".cta_stroke", 0.5, {fill:"#f58220", stroke:"#f58220"});
    TweenMax.to(".stroke", 0.5, {fill:"#fff", stroke:"#fff"}, '-=0.5');
}
}