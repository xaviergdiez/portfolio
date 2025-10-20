var agcs_video = document.getElementById("content_video");
//var agcs_video_status = 'muted';
var sound = document.getElementById("sound");

function initBanner() {

var tl = new TimelineMax ({
		delay: 0
	});

tl 
    .set(light, {transformOrigin:"160px 240px"})
    .set(gunter, {scale:0, transformOrigin:"160px 240px"})
    .set([johnny, meena, ash, buster], {autoAlpha:1, y:480})
    .set(rosita, {autoAlpha:1, x:-320})
    .set([scaffold, blue_fill, marquee1], {autoAlpha:1, y:960})
    .set([mouse, logo], {autoAlpha:1, y:-480})
    .set([packshot1, packshot2], {x:-320, autoAlpha:1})
    .set(cta, {scale:0, transformOrigin:"247px 388px"})

    .to(light, 1, {autoAlpha:1, ease:RoughEase.ease.config({ template: Power0.easeNone, strength: 0.5, points: 10, taper: "out", randomize: true, clamp: false})})
    .to(gunter, 1, {autoAlpha:1, scale:1, ease:Expo.easeOut})
    .to(gunter, 1, {x:17, y:130, ease:Expo.easeOut, delay:0.5})
    .to(light, 1, {scale:1.5, ease:Expo.easeOut}, '-=1')
    .staggerTo([meena, johnny, rosita, buster, ash], 1, {x:0, y:0, ease:Expo.easeOut}, 0.25, '-=1')
    .to(light, 1, {autoAlpha:0, ease:Expo.easeIn}, '-=1')
    .staggerTo([sign1, sign2, lights_s, lights_i, lights_n, lights_g], 1, {autoAlpha:1, ease:Expo.easeOut}, 0.15, '-=0.5')
    .to(background, 1, {autoAlpha:1, ease:RoughEase.ease.config({ template: Power0.easeNone, strength: 0.5, points: 10, taper: "out", randomize: true, clamp: false})}, '-=1')
    .to([scaffold, blue_fill, marquee1], 2, {y:0, ease:Sine.easeIn}, '-=2')
    .staggerTo([mouse, logo], 1, {y:0, ease:Bounce.easeIn}, 0.2, '-=0.5')
    .set([videolayer, play], {display:'block'})
    .to([videolayer, play], 1, {autoAlpha:1, ease:Expo.easeOut})
    .staggerTo([buster, rosita, ash, meena, johnny, gunter], 1, {y:960, ease:Sine.easeOut, delay:2}, 0.25)
    .staggerTo([packshot2, packshot1], 1, {x:0, ease:Sine.easeIn}, 0.25, '-=1.5')
    .to(cta, 1, {scale:1, autoAlpha:1, ease:Expo.easeOut}, '-=0.5')
    .staggerTo([lights_b, lights_e1, lights_s2, lights_t, lights_e2, lights_l, lights_n2, lights_u], 0.5, {autoAlpha:1, ease:Expo.easeOut, repeat:3, yoyo:true}, 0.15)
    .to(cta_lights, 1, {autoAlpha:1, ease:Expo.easeOut, repeat:-1, yoyo:true})

    play.addEventListener('click', addPlayListeners);
    agcs_video.addEventListener("ended", addVideoReplay);
        
    function addPlayListeners() {
            agcs_video.play();
            agcs_video.muted = false;
            //TweenMax.set([close_video, sound], {display:'block'})
            TweenMax.to(play, 0.5, {autoAlpha:0, display:'none'});
            //TweenMax.to([close_video, sound], 0.5, {autoAlpha:1});
        }
    
    /*close_video.addEventListener('click', addCloseListeners);
    
    function addCloseListeners() {
            agcs_video.pause();
            agcs_video.currentTime = 0;
            TweenMax.to([close_video, sound, replay], 0.5, {autoAlpha:0});
            TweenMax.to(play, 0.5, {autoAlpha:1, display:'block'});
        }
    
    sound.addEventListener('click', addSoundListeners);

    function addSoundListeners() {
        
        if(agcs_video_status == 'muted') {
            agcs_video.muted = false;
            agcs_video_status = 'unmuted';
            sound.style.backgroundImage= "url('mute.png')";
        } else {
            agcs_video.muted = true;
            agcs_video_status = 'muted';
            sound.style.backgroundImage= "url('sound.png')";
        }
    }*/
    
    function addVideoReplay() {
            TweenMax.set(replay, {display:'block'})    
            TweenMax.to(replay, 0.7, {autoAlpha:1})
        }
    
        replay.addEventListener('click', addReplayListener);
    
        function addReplayListener() {
            agcs_video.currentTime = 0;
            TweenMax.to(replay, 0.7, {autoAlpha:0})
            agcs_video.play();
        }


var tl2 = new TimelineMax ({
		delay: 7.5
	});    

tl2
    .staggerTo([marquee2, marquee3], 1, {autoAlpha:1, ease:Expo.easeOut}, 0.05, '-=1.7')
    .to(marquee3, 1, {autoAlpha:0, repeat:-1, yoyo:true});

}