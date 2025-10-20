function initBanner() {

    var tl = new TimelineMax({
        delay:1,
        onComplete:addCtaListeners
    });
    
    tl
        .set([text2],{x:-50})
        .set([ctatext,ctabox],{scale:0.9})
        .set([frame2top,frame3top],{x:250,autoAlpha:1})
        .set([frame2bot,frame3bot],{x:-250,autoAlpha:1})
        .set([ctatext,ctabox],{scale:0.9, transformOrigin:"150px 466.5px"})

        //.to(text1,0.5,{autoAlpha:1,x:0,ease: Back.easeOut.config(1.7)})
        //.to(text1,0.5,{autoAlpha:0,x:50,ease: Back.easeIn.config(1.7)},'+=1')
        //.to(bg1,0.5,{autoAlpha:0})
        
        .to(frame1top,0.75,{x:-250,ease: Back.easeIn.config(1)},'+=0.25')
        .to(frame1bot,0.75,{x:250,ease: Back.easeIn.config(1)},'-=0.75')
        
        .to([frame2top,frame2bot],0.75,{x:0,ease: Back.easeOut.config(1)})
        .to(frame2top,0.75,{x:-250,ease: Back.easeIn.config(1)},'+=0.25')
        .to(frame2bot,0.75,{x:250,ease: Back.easeIn.config(1)},'-=0.75')
        
        .to([frame3top,frame3bot],0.75,{x:0,ease: Back.easeOut.config(1)})

        .to([bg2,bg2back,frame3top,frame3bot],0.5,{autoAlpha:0},'+=1')
        .to(text2,0.5,{autoAlpha:1,x:0,ease: Back.easeOut.config(1.7)})
        .to([text2, bg3],0.5,{autoAlpha:0,x:50,ease: Back.easeIn.config(1.7)},'+=1')
        .to([ctatext,text3],0.5,{autoAlpha:1})
        .to(ctaboxholder,1,{width:400})
        .to([ctabox,ctatext],0.25,{scale:1})
        .to(shadow,0.25,{autoAlpha:1},'-=0.25')
    ;

}
function addCtaListeners() {
    container.addEventListener('mouseover', on_cta_over);
    container.addEventListener('mouseout', on_cta_out);
}

function on_cta_over() {
    
    var tl2 = new TimelineMax();
    
    tl2
        .to([ctabox,ctatext],0.25,{scale:0.9})
        .to(shadow,0.25,{autoAlpha:0},'-=0.25')
        
        .to([ctabox,ctatext],0.25,{scale:1},'+=0.1')
        .to(shadow,0.25,{autoAlpha:1},'-=0.25')
    ;
}
function on_cta_out() {
    //TweenMax.to(cta, 0.25, {scale:1, ease:Expo.easeIn});
}