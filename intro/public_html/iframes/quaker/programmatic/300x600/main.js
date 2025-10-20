function initBanner() {

    var tl = new TimelineMax({
        delay:1,
        onComplete:addCtaListeners
    });
    
    tl
        .set(text1,{x:-50})
        .set(topframe,{autoAlpha:1, y:-290})
        .set(bottomframe,{autoAlpha:1, y:310})
        .set([ctatext,ctabox],{scale:0.9, transformOrigin:"150px 466.5px"})
        
        .set([frame2top,frame3top, frame4top],{x:450,autoAlpha:1})
        .set([frame2bottom,frame3bottom, frame4bottom],{x:-450,autoAlpha:1})

        .to(text1,0.5,{autoAlpha:1,x:0,ease: Back.easeOut.config(1.7)})
        .to(text1,0.5,{autoAlpha:0,x:50,ease: Back.easeIn.config(1.7)},'+=1')
        
        .to([topframe,bottomframe],0.5,{autoAlpha:1,y:0})
        
        .to([frame2top,frame2bottom],0.75,{x:0,ease: Back.easeOut.config(1)})
        .to(frame2top,0.75,{x:-450,ease: Back.easeIn.config(1)},'+=1')
        .to(frame2bottom,0.75,{x:450,ease: Back.easeIn.config(1)},'-=0.75')
        
        .to([frame3top,frame3bottom],0.75,{x:0,ease: Back.easeOut.config(1)})
        .to(frame3top,0.75,{x:-450,ease: Back.easeIn.config(1)},'+=1')
        .to(frame3bottom,0.75,{x:450,ease: Back.easeIn.config(1)},'-=0.75')
    
        .to([frame4top,frame4bottom],0.75,{x:0,ease: Back.easeOut.config(1)})
        .to(frame4top,0.75,{x:-450,ease: Back.easeIn.config(1)},'+=1')
        .to(frame4bottom,0.75,{x:450,ease: Back.easeIn.config(1)},'-=0.75')

        .to([frame4bg,ctatext,text2],0.5,{autoAlpha:1})
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