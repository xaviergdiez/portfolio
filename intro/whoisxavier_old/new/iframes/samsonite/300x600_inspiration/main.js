/*--------------------------------------------------//
/$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$
/$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$
| $$  \ $$| $$  \__/| $$  \__/| $$  \__/
| $$$$$$$$| $$ /$$$$| $$      |  $$$$$$
| $$__  $$| $$|_  $$| $$       \____  $$
| $$  | $$| $$  \ $$| $$    $$ /$$  \ $$
| $$  | $$|  $$$$$$/|  $$$$$$/|  $$$$$$/
|__/  |__/ \______/  \______/  \______/
Developed with loving code by http://www.agcs.works
For questions and support email info@agcs.works
//--------------------------------------------------*/

function initBanner(version) {

    var split1 = new SplitText("#text1", {type:"words,chars", position:"absolute"});
    var split2 = new SplitText("#text2", {type:"words,chars", position:"absolute"});
    var split3 = new SplitText("#text3", {type:"words,chars", position:"absolute"});
    var split4 = new SplitText("#text4", {type:"words,chars", position:"absolute"});
    var split5 = new SplitText("#text5", {type:"words,chars", position:"absolute"});

        var tl = new TimelineMax({
            delay:0,
            onComplete:addCtaListeners
        });

        tl
                .set([text1,text2,text3,text4,text5], {autoAlpha:1})
                .set([split1.words,split2.words,split3.words,split4.words,split5.words], {x:-5, autoAlpha:0})

                .staggerTo(split1.words, 0.5, {x:0, autoAlpha:1}, 0.2)
                .to([slide1,text1],1,{autoAlpha:0},'+=1.5')

                .staggerTo(split2.words, 0.5, {x:0, autoAlpha:1}, 0.2)
                .to([slide2,text2],1,{autoAlpha:0},'+=1.5')

                .staggerTo(split3.words, 0.5, {x:0, autoAlpha:1}, 0.2)
                .to([slide3,text3],1,{autoAlpha:0},'+=1.5')

                .staggerTo(split4.words, 0.5, {x:0, autoAlpha:1}, 0.2)
                .to([slide4,text4,logo_smoll],1,{autoAlpha:0},'+=1.5')

                .to([logo_big,ctabox],1,{autoAlpha:1},'-=1')
                .staggerTo(split5.words, 0.5, {x:0, autoAlpha:1}, 0.2)

                .to(cta, 1, {css:{className:'+=active'}})
                .to(cta, 1, {css:{className:'-=active'}},'+=1');

                tl.timeScale(1.25);


    //CONFETTI//

    var w = $("#containerConfetti").width();
    var h = $("#containerConfetti").height();

    function animm(elm){
        TweenMax.to(elm,Random(5)+4,{y:h,ease:Linear.easeNone,repeat:-1, delay:-5});
        TweenMax.to(elm,Random(5)+1,{x:'+=20', repeat:-1,yoyo:true,ease:Sine.easeInOut})
        TweenMax.to(elm,Random(5)+1,{scaleX:0.2,rotation:Random(360), repeat:-1,yoyo:true,ease:Sine.easeInOut})
        TweenMax.to(elm,Random(1)+0.5,{opacity:0, repeat:-1,yoyo:true,ease:Sine.easeInOut})
    };

    function Random (max) {
        return Math.random()*max;
    }

    function random(min, max) {
        return min + Math.floor( Math.random() * (max - min));
    }

    var total = 25;
    for (i=0; i<total; i++){
        $("#containerConfetti").append('<div class="heart_spec"><svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style></style></defs><title>heart</title><path class="heart_fill" d="M29.19,1C29.75,1,30.35,1,31,1c3.92.38,8.45,4,9,10.85v2.28c-.51,6.58-5.48,14.7-20,24.88C5.48,28.87.51,20.75,0,14.17V11.89C.55,5,5.08,1.42,9,1,9.65,1,10.25,1,10.81,1c4.53,0,6.7,2,9.19,4.92C22.49,2.9,24.66,1,29.19,1"/></svg></div>')
        TweenMax.set($(".heart_spec")[i],{x:Random(w-20),y:random(-100,100) ,opacity:1,scale:Random(0.5)+0.5,fill:"hsl(358,64%,"+ random(49,92) +"%)"});
        animm($(".heart_spec")[i]);
    }

    setTimeout(function(){
        $("#containerConfetti").fadeOut('slow',function(){
            $(this).remove();
        })
    }, 29000);


}
function addCtaListeners() {
    container.addEventListener('mouseover', on_cta_over);
    container.addEventListener('mouseout', on_cta_out);
}

function on_cta_over() {
    TweenMax.to(cta,0,{css:{className:'+=active'}});
}
function on_cta_out() {
    TweenMax.to(cta,0,{css:{className:'-=active'}});
}
