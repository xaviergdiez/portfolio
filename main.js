function init() {
   let avatar = document.querySelector('.avatar-container');
   let hero = document.querySelector('.hero-container');
   let tl = gsap.timeline();
   gsap.registerPlugin(DrawSVGPlugin);
   
   let userInteracted = false;
   let autoResumeTimeout;
   
   tl
    .set('.eye2', { autoAlpha: 0})
    .set('.frame-container', { scale: 0, transformOrigin: "50% 50%" })
    .set(['.skill-name', '.skill-item'], { autoAlpha: 0, y: 5 })
    .set(['.skills-header','.dot', '.skills-footer'], { autoAlpha: 0 })
    .addLabel('init', 0)
    .addLabel('start', 0.5)
    .addLabel('pause', 1)
    .addLabel('helmet', 1)
    .addLabel('glow', 1.5)
    .addLabel('sparks', 1.6)
    .from('.avatar-container', { duration: 0, display: 'none' }, 'init')
    .from('#circle_bg', { duration: 0.5, r: 0, ease: 'cubic.out' }, 'init')
    .from('#xavi', { duration: 0.5, y:'100%', ease: 'cubic.out'}, 'start')
    .call(() => {
      // Pause the timeline and show play button
      tl.pause();
      setupUserInteraction(tl);
      animationPlaying = true;
      addMouseEvent();
    }, null, 'pause')
    .to("#circle_bg", {duration: 0.5, attr: { fill: "transparent" }, ease: 'cubic.out'}, 'helmet')
    .from("#circle_stroke", {duration: 0.5, autoAlpha:0, ease: 'cubic.out'}, 'helmet+=0.25')
    .from('#helmet', { duration: 0.5, y:'-100%', ease: 'cubic.out' }, 'helmet')
    .from('#helmet-back', { duration: 0.5, y:'-942%', ease: 'cubic.out' }, 'helmet')
    .to('.helmet-icon', { duration: 1, attr: { "filter": "url(#glow)" }, ease: 'cubic.out' }, 'glow')
    .from('#blur-filter', { duration: 1, attr:{ "stdDeviation": 0 }, ease: 'cubic.out' }, 'glow')
    .from('.helmet-glow', {duration: 1, autoAlpha: 0, ease: 'cubic.out' }, 'glow')
    .from('#xray', { duration: 0.1, autoAlpha: 0, ease: 'rough({ template: none.out  , strength: 1, points: 1000, taper: none, randomize: true, clamp: false})', repeat: 5, yoyo: true }, 'glow')
    .from('.frame-container', { duration: 0.5, scale: 0, ease: 'sine.inOut', transformOrigin: "50% 50%" }, 'glow')
    .from('.avatar-container', { 
        duration: 0.5, 
        ...(hero.getBoundingClientRect().width > 768 ? {x: '-50%'} : {y: '-50%'}), 
        ease: 'sine.inOut'
    }, 'glow')
    .from('.frame-stroke', { duration: 0.5, drawSVG: "50% 50%", ease: 'sine.inOut', stagger: 0.25 }, 'glow')
    .from('.corner', { duration: 0.25, drawSVG: "50% 50%", ease: 'sine.inOut', stagger: 0.25 }, 'glow')
    .to('#tube-ball', { duration: 0.5, y: "-250%", ease: 'cubic.out', repeat: -1, }, 'sparks')
    .to('#tube-ball', { duration: 0.25, scale: 2, ease: 'cubic.InOut', repeat: -1, yoyo: true, transformOrigin: "50% 50%" }, 'sparks')
    .from('.spark', { duration: 0.3, autoAlpha: 0, stagger: { each: 0.075, ease: 'rough({ template: none.out  , strength: 1, points: 1000, taper: none, randomize: true, clamp: false})', repeat: -1 }}, 'sparks')
    .call(() => {
      // Animate skill levels after main animation
      animateSkillLevels();
    }, null, 'sparks+=0.5')

//Mouse cooridinates positioning and implementation

let xPosition;
let yPosition;

let height;
let width;

function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

let animationPlaying;
function updateScreenCoords(event) {
    xPosition = event.clientX;
    yPosition = event.clientY;
}

let storedXPosition = 0;
let storedYPosition = 0;

function animateFace() {
    if (!xPosition) return;
    // important, only recalculating if the value changes
    if (storedXPosition === xPosition && storedYPosition === yPosition) return;
  
    // range from -50 to 50
    x = percentage(xPosition, width) - 50;
    y = percentage(yPosition, height) - 50;
  
    // range from -20 to 80
    yHigh = percentage(yPosition, height) - 20;
    // range from -80 to 20
    yLow = percentage(yPosition, height) - 80;
  
    gsap.to('#beard', { yPercent: yHigh / 30, xPercent: x / 90 });
    gsap.to('.eye', { yPercent: yHigh / 3, xPercent: x / 2 });
    gsap.to(".face", { yPercent: y / 6, xPercent: x / 8 });
    gsap.to("#shadow", { yPercent: (yLow / 20) * -1, xPercent: (x / 20) * -1 });
    gsap.to('.ear', { yPercent: (y / 1.5) * -1, xPercent: (x / 10) * -1 });
    gsap.to('.eyebrow', { yPercent: y * 2.5 });
  
    storedXPosition = xPosition;
    storedYPosition = yPosition;
  }

  const blink = gsap.timeline({
    repeat: -1,
    repeatDelay: 5,
    paused: true
  });
  
  blink
    .to( ".eye", { duration: 0.01, autoAlpha: 0 }, 0 )
    .to( ".eye2", { duration: 0.01, autoAlpha: 1 }, 0 )
    .to( ".eye", { duration: 0.01, autoAlpha: 1 }, 0.15 )
    .to( ".eye2", { duration: 0.01, autoAlpha: 0 }, 0.15 )
    

  function addMouseEvent() {
    const safeToAnimate = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  
    if (safeToAnimate) {
      window.addEventListener("mousemove", updateScreenCoords);
  
      // gsap's RAF, falls back to set timeout
      gsap.ticker.add(animateFace);
      blink.play();
    }
  }

  // update if browser resizes
function updateWindowSize() {
    height = window.innerHeight;
    width = window.innerWidth;
  }
  updateWindowSize();
  window.addEventListener("resize", updateWindowSize);
  
  function setupUserInteraction(timeline) {
    // Create a visual indicator for user interaction (optional)
    console.log("Animation paused. Click anywhere to continue or wait 10 seconds for auto-resume.");
    
    // Set up click listener for user interaction
    function resumeAnimation() {
      if (!userInteracted) {
        userInteracted = true;
        clearTimeout(autoResumeTimeout);
        timeline.resume();
        // Remove the click listener after interaction
        document.removeEventListener('click', resumeAnimation);
        document.removeEventListener('keydown', resumeAnimation);
      }
    }
    
    // Add event listeners for user interaction
    document.addEventListener('click', resumeAnimation);
    document.addEventListener('keydown', resumeAnimation);
    
    // Set up auto-resume after 10 seconds
    autoResumeTimeout = setTimeout(() => {
      if (!userInteracted) {
        userInteracted = true;
        timeline.resume();
        // Remove event listeners
        document.removeEventListener('click', resumeAnimation);
        document.removeEventListener('keydown', resumeAnimation);
      }
    }, 10000); // 10 seconds
  }
  
  function animateSkillLevels() {
    // Get all skill level elements
    const skillLevels = document.querySelectorAll('.skill-level');
    const skillItems = document.querySelectorAll('.skill-item');
    this.skillNames = document.querySelectorAll('.skill-name');
    
    skillLevels.forEach((skillLevel, index) => {
      const level = skillLevel.getAttribute('data-level');
      const skillName = this.skillNames[index];
      const skillItem = skillItems[index];
      const percentage = parseInt(level);
      
      // Animate the width of the ::after pseudo-element
      gsap.to('.skills-header', { duration: 0.5, autoAlpha: 1, ease: 'power2.out' });
      gsap.to('.dot', { duration: 0.4, autoAlpha: 1, ease: 'power2.out', stagger: 0.2, repeat: -1, yoyo: true, immediateRender: true });
      gsap.to([skillName, skillItem], { duration: 1, autoAlpha: 1, y: 0, ease: 'power2.out', delay: index * 0.1 });
      gsap.to(skillLevel, {
        duration: 1,
        '--skill-width': `${percentage}%`,
        ease: 'power2.out',
        delay: index * 0. // Stagger the animations
      });
      gsap.to('.skills-footer', { duration: 0.5, autoAlpha: 1, ease: 'power2.out', delay: skillLevels.length * 0.1 + 0.5, repeat: -1, yoyo: true })
    });
  }
  
}

