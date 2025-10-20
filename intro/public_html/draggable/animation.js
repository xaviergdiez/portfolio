// DCM - last update: 180103 - Updated to GSAP v3

// Register GSAP plugins
gsap.registerPlugin(Draggable, InertiaPlugin);

///////////////////
//  Global variables:  
const banner = document.getElementById("banner");
const bw = banner.offsetWidth;
const bh = banner.offsetHeight;
let lives = 18;

const myDraggable = Draggable.create("#dastronaut", {
    bounds: document.getElementById("banner"),
    inertia: true,
    onPress: function(e) {
        astro_tl.play().timeScale(2); 
        bg_tl.play().timeScale(1);
        enemy_tl.play(); 
    },
    onRelease: function(){
        astro_tl.reverse().timeScale(4);
        bg_tl.stop();
    },
    onDrag: function(e) {
        //see if the target overlaps with the element with ID "element2"
        if (this.hitTest("#enemy1")) {
            lives--;
            console.log(lives);
            checkLives();
            damage_tl.restart();
        }
        if (this.hitTest("#enemy2")) {
            lives--;
            console.log(lives);
            checkLives();
            damage_tl.restart();
        }
        if (this.hitTest("#enemy3")) {
            lives--;
            console.log(lives);
            checkLives();
            damage_tl.restart().delay();
        }
        if (this.hitTest("#enemy4")) {
            lives--;
            console.log(lives);
            checkLives();
            damage_tl.restart();
        }
        if (this.hitTest("#enemy5")) {
            lives--;
            console.log(lives);
            checkLives();
            damage_tl.restart();
        }
        if (this.hitTest("#enemy6")) {
            lives--;
            console.log(lives);
            checkLives();
            damage_tl.restart();
        }
        if (this.hitTest("#enemy7")) {
            lives--;
            console.log(lives);
            checkLives();
            damage_tl.restart();
        }
        if (this.hitTest("#enemy8")) {
            lives--;
            console.log(lives);
            checkLives();
            damage_tl.restart();
        }
        if (this.hitTest("#star_win")) {
            win_tl.play();
        }
    }
});

function checkLives() {
    if (lives <= 12) {
        gsap.to("#life3", 0.2, {autoAlpha:0});
    } 
    if (lives <= 6) {
        gsap.to("#life2", 0.2, {autoAlpha:0});
    } 
    if (lives <= 0) {
        gsap.to("#life1", 0.2, {autoAlpha:0});
        bg_tl.stop();
        loser_tl.play();
    } 
}

const astro_tl = gsap.timeline({paused:true, reversed:true});
astro_tl
    .to("#arm1", 0.5, {rotation:45})
    .to("#arm2", 0.5, {rotation:-45}, '-=0.5')
    .to([flame1, flame2, flame3], 0.25, {autoAlpha:1, y:0, repeat:-1, yoyo:true, stagger:0.1}, '-=0.25');

const bg_tl = gsap.timeline({paused:true, reversed:true});
bg_tl.to("#stars_bg", 10, {attr:{viewBox:"0 0 600 1200"}, ease:"none"});

const enemy_tl = gsap.timeline({paused:true, reversed:true});
enemy_tl
    .to(".enemy", 2, {motionPath:{path:[{x:-600, y:0}, {x:600, y:0}, {x:-600, y:0}]}, repeat:-1})
    .to("#win_star", 4, {rotation:360, transformOrigin:"center center", repeat:-1, ease:"none"}, '-=2');

const damage_tl = gsap.timeline({paused:true, reversed:true});
damage_tl.to([".fill_yellow", ".fill_grey"], 0.2, {fill:"red", repeat:5, yoyo:true});

const win_tl = gsap.timeline({paused:true, reversed:true});
win_tl
    .to([".fill_yellow", ".fill_grey", ".star_yellow"], 0.2, {fill:"green", repeat:5, yoyo:true})
    .to(["#win_txt", "#dastronaut", "#topbar"], 0.5, {autoAlpha:0, ease:"expo.out", delay:0.5})
    .to("#win_star", 1, {scale:8, fill:"black", ease:"expo.out"})
    .to("#win_title", 1, {scale:1, autoAlpha:1, display:"block", ease:"expo.out"}, '-=1');

const loser_tl = gsap.timeline({paused:true, reversed:true});
loser_tl
    .to(["#dastronaut", "#topbar"], 0.5, {autoAlpha:0, ease:"expo.out", delay:0.5})
    .to("#endScene", 0.5, {autoAlpha:1, display:"block", ease:"expo.out"})
    .to("#lose_title", 0.5, {scale:1, autoAlpha:1, display:"block", ease:"expo.out"}, '-=0.5');

let _delay = 0;

///////////////////
//  Animations:    

function animate(){
    gsap.to("#overlay", 0.5, {autoAlpha:0, visibility:"hidden"});
}

///////////////////
//  Prepare banner:  

function reset() {
    gsap.set(["#arm1", "#arm2"], {svgOrigin:"290 853"});
    gsap.set([flame3, flame2, flame1], {y:-10});
    gsap.set(["#win_title", "#lose_title"], {scale:0, transformOrigin:"center center"});
}

function replay() {
    gsap.to("#overlay", 0.5, {autoAlpha:1});
    
    gsap.delayedCall(0.5, reset);
    gsap.delayedCall(0.5, animate);
}

function smoothElements() {
    gsap.set(["div", "img"], {force3D: true, backfaceVisibility: "hidden", rotationZ: '0.01deg', z:0.01});
}

function mouseOver(e){
    //gsap.set("#cta_hover", {autoAlpha:1});
}

function mouseOut(e){
    // gsap.to("#cta_hover", 1, {autoAlpha:0});
}

function bannerExitHandler(e){
    //window.open(window.clickTag);
}

function addEventListeners(){
    banner.addEventListener('mouseover', mouseOver); 
    banner.addEventListener('mouseout', mouseOut);
    banner.addEventListener('click', bannerExitHandler, false);
}

function initBanner() {
    banner.style.visibility = "visible";
    banner.draggable = false;
    
    addEventListeners();
    reset();
    animate();
}