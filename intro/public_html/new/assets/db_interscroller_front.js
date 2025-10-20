var bg01MobilePortrait = 'bg01_small_portrait.jpg';
var bg02MobilePortrait = 'bg02_small_portrait.jpg';
var bg01TabletPortrait = 'bg01_medium_portrait.jpg';
var bg02TabletPortrait = 'bg02_medium_portrait.jpg';

var bg01MobileLandscape = 'bg01_small_landscape.jpg';
var bg02MobileLandscape = 'bg02_small_landscape.jpg';
var bg01TabletLandscape = 'bg01_medium_landscape.jpg';
var bg02TabletLandscape = 'bg02_medium_landscape.jpg';

var bg01Desktop = 'bg01_large.jpg';
var bg02Desktop = 'bg02_large.jpg';

var contentDesktop = 'content_large.png';
var contentMediumLandscape = 'content_medium_landscape.png';
var contentMediumPortrait = 'content_medium_portrait.png';
var contentSmallLandscape = 'content_small_landscape.png';
var contentSmallPortrait = 'content_small_portrait.png';

var InterScrollerOverlay;
var scrollPos = 0;
var topOffset = 0;
var direction = 'down';
var start;
var tl = new TimelineMax({ paused: true });
var ctaTl = new TimelineMax({ delay: 2.5, repeat: -1, repeatDelay: 2.5 });

/* --------- Event Listeners From Weborama Interscroller Library ---------- */

// handleOnAdReady will be called when all calculations are done.
// Object InterScrollerOverlay.state is also ready and can be called if needed.
function handleOnAdReady() {
    resetStageSize();
    handleOrientationChange();
    addCTAListeners();
    reset();
    animate();
    start = Math.abs(screenad.pagey - screenad.scrolly);
    screenad.onScroll = scrollAnimation;

    if (start < screenad.browserheight) { topOffset = start - screenad.browserheight; }
}

// handleOnAdResize is called when the browser view is changed
// (when you resize the browser window or if navigation bars show/hide/resize on mobile devices)
function handleResize() {
    resetStageSize();
}

function handleScroll() {
    if (screenad.onScroll) {
        scrollAnimation();
    } else {
    }
}

function scrollAnimation() {
    if (!screenad.hasVisibility) return;
    if (screenad.pagey > 100) {
        direction = 'down';
    } else if (screenad.scrolly < scrollPos) {
        direction = 'up';
    }
    // saves the new position for iteration.

    scrollPos = screenad.scrolly;
    var progress = (screenad.scrolly - topOffset) / (screenad.browserheight / 2);
    var slide = -screenad.scrolly / 2;
    if (progress > 1) progress = 1;
    tl.progress(progress);
}

// handleVisibilityChange (return boolean) is called when the ad changes visibility.
// it can be used to start an animation or video if the ad has its visibility.
// check it with `screenad.hasVisibility` (will return true or false).
function handleVisibilityChange() {
    if (screenad.hasVisibility) {
        if (screenad.hasVisibility) {
            topOffset = screenad.scrolly;
        }
    } else {
        // stop content (animation, video, hide content)
    }
}

// handleOrientationChange is called when you change the orientation of your mobile device
// check it with `screenad.screenorientation`
// tip: for different devices check our API for screenad.deviceType
// SCREENAD.DEVICE_TABLET, SCREENAD.DEVICE_MOBILE, SCREENAD.DEVICE_DESKTOP
// https://support.weborama.nl/hc/en-us/articles/210396226-Screenad-Interface-1-0-3-API
function handleOrientationChange() {
    if (document.getElementById('weborama-image-overlay')) {

        var bg01 = document.getElementById('bg01');
        var bg02 = document.getElementById('bg02');

        var content_large = document.getElementById('content_large');
        var content_medium_landscape = document.getElementById('content_medium_landscape');
        var content_medium_portrait= document.getElementById('content_medium_portrait');
        var content_small_landscape = document.getElementById('content_small_landscape');
        var content_small_portrait = document.getElementById('content_small_portrait');


        if (screenad.screenorientation === screenad.SCREEN_ORIENTATION_PORTRAIT) {
            // portrait view
            if (screenad.deviceType === screenad.DEVICE_MOBILE) {
                //Mobile
                bg01.style.backgroundImage = 'url(' + bg01MobilePortrait + ')';
                bg02.style.backgroundImage = 'url(' + bg02MobilePortrait + ')';
                content_small_portrait.style.display = 'block';
                content_small_landscape.style.display = 'none';
                content_medium_portrait.style.display = 'none';
                content_medium_landscape.style.display = 'none';
                content_large.style.display = 'none';

            } else if (screenad.deviceType === screenad.DEVICE_TABLET) {
                //Tablet
                bg01.style.backgroundImage = 'url(' + bg01TabletPortrait + ')';
                bg02.style.backgroundImage = 'url(' + bg02TabletPortrait + ')';
                content_small_portrait.style.display = 'none';
                content_small_landscape.style.display = 'none';
                content_medium_portrait.style.display = 'block';
                content_medium_landscape.style.display = 'none';
                content_large.style.display = 'none';

            } else if (screenad.deviceType === screenad.DEVICE_DESKTOP) {
                //Desktop
                bg01.style.backgroundImage = 'url(' + bg01Desktop + ')';
                bg02.style.backgroundImage = 'url(' + bg02Desktop + ')';
                content_small_portrait.style.display = 'none';
                content_small_landscape.style.display = 'none';
                content_medium_portrait.style.display = 'none';
                content_medium_landscape.style.display = 'none';
                content_large.style.display = 'block';
            }
        } else {
            //landscape view
            if (screenad.deviceType === screenad.DEVICE_MOBILE) {
                bg01.style.backgroundImage = 'url(' + bg01MobileLandscape + ')';
                bg02.style.backgroundImage = 'url(' + bg02MobileLandscape + ')';
                content_small_portrait.style.display = 'none';
                content_small_landscape.style.display = 'block';
                content_medium_portrait.style.display = 'none';
                content_medium_landscape.style.display = 'none';
                content_large.style.display = 'none';

            }

            if (screenad.deviceType === screenad.DEVICE_TABLET) {
                //Tablet
                bg01.style.backgroundImage = 'url(' + bg01TabletLandscape + ')';
                bg02.style.backgroundImage = 'url(' + bg02TabletLandscape + ')';
                content_small_portrait.style.display = 'none';
                content_small_landscape.style.display = 'none';
                content_medium_portrait.style.display = 'none';
                content_medium_landscape.style.display = 'block';
                content_large.style.display = 'none';

            } else if (screenad.deviceType === screenad.DEVICE_DESKTOP) {
                //Desktop
                bg01.style.backgroundImage = 'url(' + bg01Desktop + ')';
                bg02.style.backgroundImage = 'url(' + bg02Desktop + ')';
                content_small_portrait.style.display = 'none';
                content_small_landscape.style.display = 'none';
                content_medium_portrait.style.display = 'none';
                content_medium_landscape.style.display = 'none';
                content_large.style.display = 'block';
            }
        }

    }
}

function reset() {
    TweenMax.set('.bg01', { autoAlpha: 1 });
}

function animate() {
    ctaTl
        .to('.cta_arrow', 0.3, { x: 3, ease: Power1.easeOut, repeat: 3, yoyo: true }, 0)
        .to('.cta_shadow', 0.3, { y: 2, ease: Power1.easeOut, repeat: 3, yoyo: true }, 0);

    tl
        .addLabel('start')
        .to('#bg01', 1.5, { autoAlpha: 0, ease: Sine.easeIn, delay:0.5 }, 'start')
        
}

function addCTAListeners() {
    var ctaArea = document.getElementById('click-area');
    ctaArea.addEventListener('mouseover', mouseOver);
    ctaArea.addEventListener('mouseout', mouseOut);
}

function mouseOver() {
    mouseOverBool = true;
    ctaTl.pause();
    TweenMax.staggerTo('.cta_gradient stop', 0.5, { cycle: { stopColor: ['#65D5FC', '#07c0ff'] } });
    TweenMax.to('.cta_shadow', 0.3, { y: 2, ease: Power1.easeOut });
    TweenMax.to('.cta_arrow', 0.3, { x: 3, ease: Power1.easeOut });
}

function mouseOut() {
    mouseOverBool = false;
    TweenMax.staggerTo('.cta_gradient stop', 0.5, { cycle: { stopColor: ['#07c0ff', '#038CFF'] } });
    TweenMax.to('.cta_shadow', 0.3, { y: 0, ease: Power1.easeOut });
    TweenMax.to('.cta_arrow', 0.3, { x: 0, ease: Power1.easeOut });

    TweenMax.delayedCall(2.5, function restartCta() {
        if (ctaTl.paused() && !mouseOverBool) {
            ctaTl.restart();
        }
    });
}

// resetStageSize is used to change the height of the stage depending on the visibility of the navigation bars (mobile)
// this way, your content will always have the maximum space available when you use % in your css.
function resetStageSize() {
    var stage = document.getElementById('stage');
    stage.style.height = InterScrollerOverlay.state.totalContentHeight + 'px';
}

function handlePreloadComplete() {
    InterScrollerOverlay = new window.WeboramaTemplates.InterScrollerOverlay();
    InterScrollerOverlay.addEventListener('onAdReady', handleOnAdReady);
    InterScrollerOverlay.addEventListener('onResize', handleResize);
    InterScrollerOverlay.addEventListener('onScroll', handleScroll);
    InterScrollerOverlay.addEventListener('onOrientationChange', handleOrientationChange);
    InterScrollerOverlay.addEventListener('onVisibilityChange', handleVisibilityChange);
}

screenad.onPreloadComplete = handlePreloadComplete;