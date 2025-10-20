function initBanner(){

    var splitText1 = new SplitText("#text1", {type:"words,chars"});
    var words1 = splitText1.words;
    var splitText2 = new SplitText("#text2", {type:"words,chars"});
    var words2 = splitText2.words;
    var splitText3 = new SplitText("#cta_text", {type:"words,chars"});
    var words3 = splitText3.words;
    var tl = new TimelineMax({
            delay:1
        });

        tl
            .set([text1, text2, cta_text, bg2, arrow_container], {autoAlpha:1})
            .set([orangeBar, text1, text2], {y:30})
            .set([blueBar, cta_text, cta_box, arrow_container], {y:300})
            .set([words1, words2], {x:30, autoAlpha:0})
            .set(words3, {x:10, autoAlpha:0})
            .set(cta_arrow, {scale:0, transformOrigin:"50% 50%"})
            
            .to(orangeBar, 0.5, {width: '250px'})
            .staggerTo(words1, 0.8, {x:0, autoAlpha:1}, 0.2)
            .to(orangeBar, 0.5, {width: '0px'}, '+=2')
            .to(text1, 0.5, {autoAlpha:0}, '-=0.75')
            .from(bg2, 0.5, {x:300})
            .to(orangeBar, 0.5, {width: '250px'})
            .staggerTo(words2, 0.8, {x:0, autoAlpha:1}, 0.2)
            .to(blueBar, 0.5, {width: '204.5px'})
            .staggerTo(words3, 0.5, {x:0, autoAlpha:1}, 0.2)
            .to([cta_box, cta_arrow], 0.5, {autoAlpha:1, scale:1, ease:Expo.easeOut})
            .to(cta_arrow, 0.2, {scale:0.7, repeat:1, yoyo:true})
}

