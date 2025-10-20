var actionName;
var soundStatus = 'sound';
var animateTimeOut;
var animateTimeOut2;

function initBanner() {
    
    addActionListeners();
    //animate();
    
    animateTimeOut = setTimeout(function() {
        actionName = 'gotoSlide2';
        animate();
        
        animateTimeOut2 = setTimeout(function() {
            actionName = 'gotoSlide3';
            animate();
        }, 3000)
        
    }, 3000)
    
}

function animate(){   
  
    var delay = 0;
    var speed = 1;
    
    if(actionName == 'gotoSlide1') {
        TweenLite.to(slide1, speed, {delay:delay, width:500, ease: Power2.easeOut});
        TweenLite.to(slide_1_img, speed, {delay:delay, width:500, ease: Power2.easeOut});
        TweenLite.to(slide2, speed, {delay:delay, left:450, width: 50, ease: Power2.easeOut});
        TweenLite.to(slide_2_img, speed, {delay:delay, width:100, ease: Power2.easeOut});

        TweenLite.to(arrow1_right, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(arrow3_left, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(mission2, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(mission3, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(playbutton2, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        delay += 1;
        TweenLite.to(arrow2_left, 0.2, {delay:delay, autoAlpha:1, ease: Power2.easeOut});
        TweenLite.to(mission1, 0.2, {delay:delay, autoAlpha:1, ease: Power2.easeOut});
        TweenLite.to(playbutton1, 0.2, {delay:delay, autoAlpha:1, ease: Power2.easeOut});
    }
    if(actionName == 'gotoSlide2') {
        TweenLite.to(slide1, speed, {delay:delay, width:75, ease: Power2.easeOut});
        TweenLite.to(slide_1_img, speed, {delay:delay, width:250, ease: Power2.easeOut});
        TweenLite.to(slide2, speed, {delay:delay, left:75, width: 450, ease: Power2.easeOut});
        TweenLite.to(slide_2_img, speed, {delay:delay, width:500, ease: Power2.easeOut});
        TweenLite.to(slide3, speed, {delay:delay, left:500, width: 50, ease: Power2.easeOut});
        TweenLite.to(slide_3_img, speed, {delay:delay, width:100, ease: Power2.easeOut});
        
        TweenLite.to(arrow2_left, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(arrow2_right, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(mission1, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(mission3, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(playbutton1, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(playbutton3, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        delay += 1;
        TweenLite.to(arrow1_right, 0.2, {delay:delay, autoAlpha:1, ease: Power2.easeOut});
        TweenLite.to(arrow3_left, 0.2, {delay:delay, autoAlpha:1, ease: Power2.easeOut});
        TweenLite.to(mission2, 0.2, {delay:delay, autoAlpha:1, ease: Power2.easeOut});
        TweenLite.to(playbutton2, 0.2, {delay:delay, autoAlpha:1, ease: Power2.easeOut});               
        
    }
    if(actionName == 'gotoSlide3') {
        TweenLite.to(slide2, speed, {delay:delay, width:75, ease: Power2.easeOut});
        TweenLite.to(slide_2_img, speed, {delay:delay, width:100, ease: Power2.easeOut});
        TweenLite.to(slide3, speed, {delay:delay, left:125, width: 425, ease: Power2.easeOut});
        TweenLite.to(slide_3_img, speed, {delay:delay, width:500, ease: Power2.easeOut});
        
        TweenLite.to(arrow1_right, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(arrow3_left, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(mission1, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(mission2, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        TweenLite.to(playbutton2, 0.2, {delay:delay, autoAlpha:0, ease: Power2.easeOut});
        delay += 1;
        TweenLite.to(arrow2_right, 0.2, {delay:delay, autoAlpha:1, ease: Power2.easeOut});
        TweenLite.to(mission3, 0.2, {delay:delay, autoAlpha:1, ease: Power2.easeOut});
        TweenLite.to(playbutton3, 0.2, {delay:delay, autoAlpha:1, ease: Power2.easeOut});
    }
    
}

function addActionListeners() {
    arrow1_right.addEventListener('mouseover', on_arrow_1right_over);
    arrow1_right.addEventListener('mouseout', on_arrow_1right_out);
    arrow2_left.addEventListener('mouseover', on_arrow_2left_over);
    arrow2_left.addEventListener('mouseout', on_arrow_2left_out);
    arrow2_right.addEventListener('mouseover', on_arrow_2right_over);
    arrow2_right.addEventListener('mouseout', on_arrow_2right_out);
    arrow3_left.addEventListener('mouseover', on_arrow_3left_over);
    arrow3_left.addEventListener('mouseout', on_arrow_3left_out);
    
    playbutton1.addEventListener('mouseover', on_playbutton1_over);
    playbutton1.addEventListener('mouseout', on_playbutton1_out);
    playbutton2.addEventListener('mouseover', on_playbutton2_over);
    playbutton2.addEventListener('mouseout', on_playbutton2_out);
    playbutton3.addEventListener('mouseover', on_playbutton3_over);
    playbutton3.addEventListener('mouseout', on_playbutton3_out);
    
    arrow1_right.addEventListener('click', function(){
        clearTimeout(animateTimeOut);
        clearTimeout(animateTimeOut2);
        
        video2.pause();
        video2.style.display = 'none';
        
        actionName = 'gotoSlide1';
        animate();
    });
    arrow2_left.addEventListener('click', function(){    
        clearTimeout(animateTimeOut);
        clearTimeout(animateTimeOut2);
            
        video1.pause();
        video1.style.display = 'none';
        
        actionName = 'gotoSlide2';
        animate();
    });
    arrow2_right.addEventListener('click', function(){ 
        clearTimeout(animateTimeOut);
        clearTimeout(animateTimeOut2);
        
        video3.pause();
        video3.style.display = 'none';
        
        actionName = 'gotoSlide2';         
        animate();
    });
    arrow3_left.addEventListener('click', function(){ 
        clearTimeout(animateTimeOut);
        clearTimeout(animateTimeOut2);
        
        video2.pause();
        video2.style.display = 'none';
        
        actionName = 'gotoSlide3';
        animate();
    });
    
    playbutton1.addEventListener('click', function(){ 
        clearTimeout(animateTimeOut);
        clearTimeout(animateTimeOut2);
        
        this.style.opacity = 0;
        video1.style.display = 'block';
        video1.currentTime = 0;
        video1.play(); 
        
        video1.addEventListener('ended', function(){ 
            playbutton1.style.opacity = 1;
            this.style.display = 'none';
        });
    });
    playbutton2.addEventListener('click', function(){ 
        clearTimeout(animateTimeOut);
        clearTimeout(animateTimeOut2);
        
        this.style.opacity = 0;
        video2.style.display = 'block';
        video2.currentTime = 0;
        video2.play(); 
        
        video2.addEventListener('ended', function(){ 
            playbutton2.style.opacity = 1;
            this.style.display = 'none';
        });
    });
    playbutton3.addEventListener('click', function(){ 
        clearTimeout(animateTimeOut);
        clearTimeout(animateTimeOut2);
        
        this.style.opacity = 0;
        video3.style.display = 'block';
        video3.currentTime = 0;
        video3.play(); 
        
        video3.addEventListener('ended', function(){ 
            playbutton3.style.opacity = 1;
            this.style.display = 'none';
        });
    });
    
    sound.addEventListener('click', function(){ 
        sound.style.display = 'none';
        mute.style.display = 'block';
        video1.volume = 0;
        video2.volume = 0;
        video3.volume = 0;
        soundStatus = 'muted';
    });
    mute.addEventListener('click', function(){ 
        mute.style.display = 'none';
        sound.style.display = 'block';
        video1.volume = 1;
        video2.volume = 1;
        video3.volume = 1;
        soundStatus = 'sound';
    });
    
}
function on_arrow_1right_over() {   arrow1_right.src = 'img/left_arrow_active_30x30.png'; }
function on_arrow_1right_out() {    arrow1_right.src = 'img/left_arrow_30x30.png'; }
function on_arrow_2left_over() {    arrow2_left.src = 'img/right_arrow_active_30x30.png'; }
function on_arrow_2left_out() {     arrow2_left.src = 'img/right_arrow_30x30.png'; }
function on_arrow_2right_over() {   arrow2_right.src = 'img/left_arrow_active_30x30.png'; }
function on_arrow_2right_out() {    arrow2_right.src = 'img/left_arrow_30x30.png'; }
function on_arrow_3left_over() {   arrow3_left.src = 'img/right_arrow_active_30x30.png'; }
function on_arrow_3left_out() {    arrow3_left.src = 'img/right_arrow_30x30.png'; }

function on_playbutton1_over() {   playbutton1.src = 'img/play_button_active_50x50.png'; }
function on_playbutton1_out() {    playbutton1.src = 'img/play_button_50x50.png'; }
function on_playbutton2_over() {   playbutton2.src = 'img/play_button_active_50x50.png'; }
function on_playbutton2_out() {    playbutton2.src = 'img/play_button_50x50.png'; }
function on_playbutton3_over() {   playbutton3.src = 'img/play_button_active_50x50.png'; }
function on_playbutton3_out() {    playbutton3.src = 'img/play_button_50x50.png'; }