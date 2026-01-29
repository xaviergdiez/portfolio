// Case Study CTA Functionality - Defined at the top for global availability
function initCaseStudyCTAs() {
  console.log('initCaseStudyCTAs function called');
  const ctaBtns = document.querySelectorAll('.case-cta-btn');
  
  ctaBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const caseId = this.dataset.case;
      const expandedContent = document.getElementById(`${caseId}-expanded`);
      const caseStudy = document.getElementById(`${caseId}-case`);
      
      if (!expandedContent || !caseStudy) return;
      
      const isExpanded = this.classList.contains('expanded');
      
      if (isExpanded) {
        // Collapse
        this.classList.remove('expanded');
        expandedContent.classList.remove('expanded');
        
        // Update button text
        this.querySelector('.cta-text').textContent = 'Learn More';
        
        // Remove expanded state from case study
        caseStudy.classList.remove('case-expanded');
        
      } else {
        // First, collapse any other expanded cases
        document.querySelectorAll('.case-cta-btn.expanded').forEach(otherBtn => {
          if (otherBtn !== this) {
            otherBtn.click(); // This will trigger the collapse
          }
        });
        
        // Expand this case
        this.classList.add('expanded');
        expandedContent.classList.add('expanded');
        
        // Update button text
        this.querySelector('.cta-text').textContent = 'Show Less';
        
        // Add expanded state to case study
        caseStudy.classList.add('case-expanded');
        
        // Scroll the case study into view after animation
        setTimeout(() => {
          caseStudy.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 300);
      }
    });
  });
}

// Scroll lock helper functions
let scrollPosition = 0;

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  // Prevent arrow keys, space, page up/down from scrolling
  if([32, 33, 34, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}

function lockScroll() {
  scrollPosition = window.pageYOffset;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
  
  // Prevent wheel events
  document.addEventListener('wheel', preventDefault, {passive: false});
  document.addEventListener('touchmove', preventDefault, {passive: false});
  document.addEventListener('keydown', preventDefaultForScrollKeys, {passive: false});
}

function init() {
   let avatar = document.querySelector('.avatar-container');
   let frame = document.querySelector('.frame-container');
   let hero = document.querySelector('.hero-container');
   let tl = gsap.timeline();
   gsap.registerPlugin(DrawSVGPlugin,MorphSVGPlugin,ScrollTrigger)
   
   // Browser-specific fixes
   const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
   const isChromeMobile = /Chrome.*Mobile|CriOS/i.test(navigator.userAgent);
   
   if (isSafari) {
     console.log('Safari detected - applying compatibility fixes');
     
     // Ensure containers are visible
     if (avatar) {
       avatar.style.opacity = '1';
       avatar.style.visibility = 'visible';
       avatar.style.display = 'block';
     }
     if (frame) {
       frame.style.opacity = '1';
       frame.style.visibility = 'visible';
      //  frame.style.display = 'block';
     }
     
     // Disable problematic SVG filters for Safari
     const glowFilter = document.getElementById('glow');
     if (glowFilter) {
       console.log('Disabling SVG glow filter for Safari compatibility');
       glowFilter.style.display = 'none';
     }
     
     // Apply CSS-based glow effects for Safari
     const elementsWithGlow = document.querySelectorAll('[filter*="glow"], .skills-header, .skills-footer, .skill-name');
     elementsWithGlow.forEach(el => {
       el.style.filter = 'none';
       if (el.classList.contains('skills-header') || el.classList.contains('skills-footer') || el.classList.contains('skill-name')) {
         el.style.textShadow = '0 0 8px #7ae3fc, 0 0 12px #7ae3fc';
       }
     });
     
     // Apply drop-shadow to SVG stroke elements for Safari
     const strokeElements = document.querySelectorAll('.frame-stroke, .corner, #circle_stroke');
     strokeElements.forEach(el => {
       el.style.filter = 'drop-shadow(0 0 6px #7ae3fc)';
     });
   }
   
   if (isChromeMobile) {
     console.log('Chrome Mobile detected - applying compatibility fixes');
     
     // Chrome mobile needs explicit positioning properties
     if (avatar) {
       avatar.style.opacity = '1';
       avatar.style.visibility = 'visible';
       avatar.style.display = 'block';
       // Clear any conflicting transforms before GSAP takes control
       avatar.style.transform = '';
       avatar.style.willChange = 'transform';
       // Force hardware acceleration for smoother animations
       avatar.style.backfaceVisibility = 'hidden';
       avatar.style.perspective = '1000px';
     }
   }
   
  //  let userInteracted = false;
  //  let autoResumeTimeout;
   
   // Lock scrolling initially with comprehensive approach
   lockScroll();
   
   
   // Avatar positioning - Use GSAP-only approach for all browsers (cohesive positioning)
   const avatarContainer = document.querySelector('.avatar-container');
   
  //  if (avatarContainer) {
  //    console.log('Setting up GSAP-only avatar positioning for all browsers');
     
  //    // Clear any existing CSS transforms to avoid conflicts
  //    avatarContainer.style.transform = '';
  //    avatarContainer.style.removeProperty('transform');
     
  //    // Set initial position using GSAP properties only
  //    gsap.set(avatarContainer, {
  //      force3D: true,
  //      // Set initial centered position - mobile uses yPercent, desktop uses xPercent
  //      ...(window.innerWidth > 768 ? { xPercent: -50, x: 0 } : { yPercent: -50, y: 0 }),
  //      clearProps: 'transform', // Clear any conflicting CSS transforms
  //      immediateRender: true
  //    });
     
  //    console.log('Avatar initial position set:', window.innerWidth > 768 ? 'xPercent: -50' : 'yPercent: -50');
  //  }
   
   // Verify critical elements exist before starting animations
   const requiredElements = ['#blur-filter', '#xray', '.spark', '#tube-ball'];
   requiredElements.forEach(selector => {
     const element = document.querySelector(selector);
     if (!element) {
       console.warn(`GSAP target ${selector} not found in DOM`);
     }
   });
   
   tl
    .set('.frame-container', { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%", force3D: true })
    .set('.avatar-container', { 
      force3D: true, 
      opacity: 1, 
      visibility: 'visible', 
      // Consistent GSAP-only positioning for all browsers
      ...(window.innerWidth > 768 ? { xPercent: -50, x: 0 } : { yPercent: -50, y: 0 }),
      transformOrigin: "50% 50%"
    })
    .set(['.skill-name', '.skill-item'], { autoAlpha: 0, y: 5 })
    .set(['.eye2', '#xray', '.skills-header', '.dot', '.skills-footer'], { autoAlpha: 0 })
    .addLabel('init', 0)
    .addLabel('start', 0.5)
    .addLabel('mouse', 1)
    .addLabel('helmet', 2)
    .addLabel('glow', 2.5)
    .addLabel('sparks', 2.6)
    .from('#circle_bg', { duration: 1, r: 0, ease: 'cubic.out' }, 'init')
    .from('#xavi', { duration: 0.5, yPercent: 100, ease: 'cubic.out'}, 'start')
    .call(() => {
      addMouseEvent();
    }, null, 'mouse')
    .to("#circle_bg", {duration: 0.5, attr: { fill: "transparent" }, ease: 'cubic.out'}, 'helmet')
    .from("#circle_stroke", {duration: 0.5, autoAlpha:0, ease: 'cubic.out'}, 'helmet+=0.25')
    .from('#helmet', { duration: 0.5, y:'-100%', ease: 'cubic.out' }, 'helmet')
    .from('#helmet-back', { duration: 0.5, y:'-942%', ease: 'cubic.out' }, 'helmet')
    // Safari-compatible glow animation - use CSS properties instead of SVG filter
    .to('.helmet-icon', { 
      duration: 1, 
      ...(isSafari ? 
        { filter: 'drop-shadow(0 0 8px #7ae3fc)', ease: 'cubic.out' } : 
        { attr: { "filter": "url(#glow)" }, ease: 'cubic.out' }
      )
    }, 'glow')
    .from('#blur-filter', { duration: 1, attr:{ "stdDeviation": 0 }, ease: 'cubic.out' }, 'glow')
    
    .to('#xray', { duration: 0.1, autoAlpha: 1, ease: 'rough({ template: none.out  , strength: 1, points: 1000, taper: none, randomize: true, clamp: false})', repeat: 5, yoyo: true }, 'glow')
    .to('.frame-container', { duration: 0.5, autoAlpha: 1, scale: 1, ease: 'sine.inOut', transformOrigin: "50% 50%", force3D: true }, 'glow')
    .to ('.avatar-container', { 
        duration: 0.5, 
        // Consistent GSAP-only positioning - animate to final centered position
        ...(window.innerWidth > 768 ? { xPercent: 0, x: 0 } : { yPercent: 0, y: 0 }),
        ease: 'sine.inOut',
        force3D: true,
    }, 'glow')
    .from(['.frame-stroke', '.corner'], {duration: 0.1, strokeWidth: 0, ease: 'sine.inOut' }, 'glow')
    .from('.frame-stroke', { duration: 0.5, drawSVG: "50% 50%", ease: 'sine.inOut', stagger: 0.25 }, 'glow')
    .from('.corner', { duration: 0.25, drawSVG: "50% 50%", ease: 'sine.inOut', stagger: 0.25 }, 'glow')
    .to('#tube-ball', { duration: 0.5, y: "-250%", ease: 'cubic.out', repeat: -1, }, 'sparks')
    .to('#tube-ball', { duration: 0.25, scale: 2, ease: 'cubic.InOut', repeat: -1, yoyo: true, transformOrigin: "50% 50%" }, 'sparks')
    .from('.spark', { duration: 0.3, autoAlpha: 0, stagger: { each: 0.075, ease: 'rough({ template: none.out  , strength: 1, points: 1000, taper: none, randomize: true, clamp: false})', repeat: -1 }}, 'sparks')
    .call(() => {
      // Animate skill levels after main animation
      animateSkillLevels();
    }, null, 'sparks+=0.5')
    .call(() => {
      // Animation complete - enable scrolling immediately
      console.log('Main animation complete - enabling scrolling');
      enableScrolling();
    }, null, 'sparks+=2')

//Mouse cooridinates positioning and implementation

let xPosition;
let yPosition;

let height;
let width;

// Variables for background container viewbox
let w = window.innerWidth;
let h = window.innerHeight * 2;

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
  
  // Initialize background container viewbox variables
  w = window.innerWidth;
  h = window.innerHeight * 2;
  
  // Resize handler for background container
  function resizeHandler() {
    w = window.innerWidth;
    h = window.innerHeight * 2;
    gsap.set('#bg_container', { attr: {viewBox: '0 0'+ ' ' + w + ' ' + h} });
  }
  
  // Initialize background container viewbox
  resizeHandler();
  
  // Add both resize handlers
  window.addEventListener("resize", updateWindowSize);
  window.addEventListener("resize", resizeHandler);
  
  // Universal resize handler for avatar positioning (all browsers)
  const handleAvatarResize = () => {
    const avatarContainer = document.querySelector('.avatar-container');
    if (avatarContainer) {
      // Re-apply GSAP positioning after resize/orientation change
      gsap.set(avatarContainer, {
        force3D: true,
        ...(window.innerWidth > 768 ? { xPercent: -50, x: 0 } : { yPercent: -50, y: 0 }),
        clearProps: 'transform'
      });
      console.log('Avatar position updated after resize:', window.innerWidth > 768 ? 'xPercent: -50' : 'yPercent: -50');
    }
  };
  
  window.addEventListener("resize", handleAvatarResize);
  window.addEventListener("orientationchange", handleAvatarResize);
  
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
    
    // Initialize masonry grid immediately
    loadMasonryGrid();

    // Initialize case study animations (ScrollTrigger-based, lazy by design)
    initGtechAnimation();
    addGtechBackgroundParticles();
    initFbtoAnimation();
    initHuaweiAnimation();
  }
  
} // End of init() function

// Masonry Grid for Case Study Banners

async function loadMasonryGrid() {
  try {
    const response = await fetch('./manifest.json');
    const data = await response.json();
    const banners = data.banners;
    
    // Sort banners deterministically to avoid shuffling - NO RANDOMIZATION
    const sortedBanners = banners.sort((a, b) => {
      // Sort by area first (largest first), then by name for consistency
      const areaA = a.width * a.height;
      const areaB = b.width * b.height;
      if (areaA !== areaB) return areaB - areaA;
      return a.name.localeCompare(b.name);
    });
    
    const masonryGrid = document.getElementById('masonry-grid');
    masonryGrid.innerHTML = ''; // Clear existing content
    
    // Ensure grid is hidden during loading
    masonryGrid.classList.remove('loaded');
    
    // Create banner elements with placeholders and calculate positions
    const bannerElements = sortedBanners.map((banner, index) => 
      createBannerElementWithPlaceholder(banner, index)
    );
    
    // Calculate optimal positions using masonry algorithm
    const positions = calculateMasonryPositions(sortedBanners);
    
    // Position and append all banners
    bannerElements.forEach((bannerItem, index) => {
      const position = positions[index];
      bannerItem.style.left = `${position.x}px`;
      bannerItem.style.top = `${position.y}px`;
      bannerItem.style.width = `${position.width}px`;
      bannerItem.style.height = `${position.height}px`;
      masonryGrid.appendChild(bannerItem);
    });
    
    // Wait for all placeholders to be positioned, then show grid
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        masonryGrid.classList.add('loaded');
        
        // Lazy-load iframes as they enter the viewport
        loadIframesLazily(sortedBanners);

        setupViewportObserver();
      });
    });
    
  } catch (error) {
    console.error('Error loading banner manifest:', error);
  }
}

function calculateMasonryPositions(banners) {
  const positions = [];
  const gridWidth = 1800;
  const gridHeight = 1800;
  const gap = 30;
  const occupiedAreas = [];
  
  // Simple deterministic pseudo-random function
  function deterministicRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
  
  // Helper function to check if two rectangles overlap with gap
  function rectanglesOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(x1 + w1 + gap <= x2 || x2 + w2 + gap <= x1 || 
             y1 + h1 + gap <= y2 || y2 + h2 + gap <= y1);
  }
  
  // Helper function to find a valid position using scattered zones
  function findValidPosition(width, height, bannerIndex) {
    // Create zones for more scattered placement
    const zones = [
      { x: 0, y: 0, w: gridWidth * 0.4, h: gridHeight * 0.4 },
      { x: gridWidth * 0.6, y: 0, w: gridWidth * 0.4, h: gridHeight * 0.4 },
      { x: 0, y: gridHeight * 0.6, w: gridWidth * 0.4, h: gridHeight * 0.4 },
      { x: gridWidth * 0.6, y: gridHeight * 0.6, w: gridWidth * 0.4, h: gridHeight * 0.4 },
      { x: gridWidth * 0.2, y: gridHeight * 0.2, w: gridWidth * 0.6, h: gridHeight * 0.6 }
    ];
    
    // Try zones in a different order based on banner index for variety
    const preferredZone = zones[bannerIndex % zones.length];
    const otherZones = zones.filter((_, i) => i !== (bannerIndex % zones.length));
    const zonesToTry = [preferredZone, ...otherZones];
    
    for (const zone of zonesToTry) {
      const stepSize = 60;
      const startX = Math.max(0, zone.x);
      const endX = Math.min(gridWidth - width, zone.x + zone.w - width);
      const startY = Math.max(0, zone.y);
      const endY = Math.min(gridHeight - height, zone.y + zone.h - height);
      
      // Try multiple deterministic positions within the zone
      for (let attempt = 0; attempt < 20; attempt++) {
        const randomX = deterministicRandom(bannerIndex * 100 + attempt * 7);
        const randomY = deterministicRandom(bannerIndex * 150 + attempt * 11);
        
        const x = startX + (randomX * (endX - startX));
        const y = startY + (randomY * (endY - startY));
        
        // Round to step size for cleaner positioning
        const roundedX = Math.round(x / stepSize) * stepSize;
        const roundedY = Math.round(y / stepSize) * stepSize;
        
        if (roundedX >= 0 && roundedY >= 0 && 
            roundedX + width <= gridWidth && roundedY + height <= gridHeight) {
          
          let overlaps = false;
          for (const area of occupiedAreas) {
            if (rectanglesOverlap(roundedX, roundedY, width, height, area.x, area.y, area.w, area.h)) {
              overlaps = true;
              break;
            }
          }
          
          if (!overlaps) {
            return { x: roundedX, y: roundedY };
          }
        }
      }
    }
    
    // If all zones failed, do systematic scan as fallback
    const stepSize = 50;
    for (let y = 0; y <= gridHeight - height; y += stepSize) {
      for (let x = 0; x <= gridWidth - width; x += stepSize) {
        let overlaps = false;
        for (const area of occupiedAreas) {
          if (rectanglesOverlap(x, y, width, height, area.x, area.y, area.w, area.h)) {
            overlaps = true;
            break;
          }
        }
        
        if (!overlaps) {
          return { x, y };
        }
      }
    }
    
    // Final fallback: place in next available row
    const fallbackY = occupiedAreas.length > 0 
      ? Math.max(...occupiedAreas.map(area => area.y + area.h)) + gap
      : 0;
    
    return { 
      x: Math.min(bannerIndex * 100, gridWidth - width), 
      y: Math.min(fallbackY, gridHeight - height)
    };
  }
  
  // Place banners one by one using their actual dimensions
  banners.forEach((banner, index) => {
    const position = findValidPosition(banner.width, banner.height, index);
    
    positions.push({
      x: position.x,
      y: position.y,
      width: banner.width,
      height: banner.height
    });
    
    occupiedAreas.push({
      x: position.x,
      y: position.y,
      w: banner.width,
      h: banner.height
    });
  });
  
  return positions;
}

function createBannerElementWithPlaceholder(banner, index) {
  const bannerItem = document.createElement('div');
  bannerItem.className = 'banner-item';
  bannerItem.style.position = 'absolute';
  bannerItem.style.overflow = 'hidden';
  bannerItem.dataset.bannerIndex = index;
  bannerItem.dataset.bannerPath = banner.path;
  
  // Add campaign class for styling variety
  bannerItem.classList.add(`campaign-${banner.name.toLowerCase()}`);
  
  // Create placeholder (black rectangle with subtle styling)
  const placeholder = document.createElement('div');
  placeholder.className = 'banner-placeholder';
  placeholder.style.width = '100%';
  placeholder.style.height = '100%';
  placeholder.style.backgroundColor = '#1a1a1a';
  placeholder.style.border = '1px solid #333';
  placeholder.style.borderRadius = '6px';
  placeholder.style.display = 'flex';
  placeholder.style.alignItems = 'center';
  placeholder.style.justifyContent = 'center';
  placeholder.style.color = '#666';
  placeholder.style.fontSize = '11px';
  placeholder.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  placeholder.style.flexDirection = 'column';
  placeholder.style.textAlign = 'center';
  placeholder.style.lineHeight = '1.3';
  placeholder.style.transition = 'all 0.3s ease';
  placeholder.style.cursor = 'pointer';
  placeholder.innerHTML = `
    <div style="font-weight: 500; margin-bottom: 4px;">${banner.name}</div>
    <div style="font-size: 9px; opacity: 0.7;">${banner.width}×${banner.height}</div>
  `;
  
  // Add hover effect
  placeholder.addEventListener('mouseenter', () => {
    placeholder.style.backgroundColor = '#252525';
    placeholder.style.borderColor = '#444';
  });
  
  placeholder.addEventListener('mouseleave', () => {
    placeholder.style.backgroundColor = '#1a1a1a';
    placeholder.style.borderColor = '#333';
  });
  
  bannerItem.appendChild(placeholder);
  return bannerItem;
}

function loadIframesLazily(banners) {
  banners.forEach((banner, index) => {
    const bannerItem = document.querySelector(`[data-banner-index="${index}"]`);
    if (!bannerItem) return;

    const placeholder = bannerItem.querySelector('.banner-placeholder');

    const iframe = document.createElement('iframe');
    iframe.src = banner.path;
    iframe.loading = 'lazy';
    iframe.scrolling = 'no';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '4px';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.display = 'block';
    iframe.style.overflow = 'hidden';

    bannerItem.appendChild(iframe);

    // Remove placeholder immediately — iframe content will paint over it
    if (placeholder) {
      placeholder.remove();
    }
  });
}

function setupViewportObserver() {
  // No-op: viewport detection handled by IntersectionObserver in loadIframesLazily
}

// Function to enable scrolling once everything is ready
function enableScrolling() {
  console.log('Hero animation complete - enabling scrolling');
  
  // Remove event listeners
  document.removeEventListener('wheel', preventDefault, {passive: false});
  document.removeEventListener('touchmove', preventDefault, {passive: false});
  document.removeEventListener('keydown', preventDefaultForScrollKeys, {passive: false});
  
  // Restore scroll position and body styles
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('position');
  document.body.style.removeProperty('top');
  document.body.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
  
  // Add a subtle visual indicator that scrolling is now available
  const scrollIndicator = document.createElement('div');
  scrollIndicator.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-family: var(--font-family-mono);
    z-index: 1000;
    pointer-events: none;
    animation: scrollHint 2s ease-in-out infinite;
  `;
  scrollIndicator.textContent = '↓ Scroll to explore';
  document.body.appendChild(scrollIndicator);
  
  // Add CSS animation for scroll hint
  if (!document.getElementById('scroll-hint-styles')) {
    const style = document.createElement('style');
    style.id = 'scroll-hint-styles';
    style.textContent = `
      @keyframes scrollHint {
        0%, 100% { opacity: 0.7; transform: translateX(-50%) translateY(0px); }
        50% { opacity: 1; transform: translateX(-50%) translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Remove scroll indicator after user starts scrolling
  let scrollTimeout;
  const removeIndicator = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (scrollIndicator.parentNode) {
        scrollIndicator.style.opacity = '0';
        setTimeout(() => {
          if (scrollIndicator.parentNode) {
            scrollIndicator.parentNode.removeChild(scrollIndicator);
          }
        }, 300);
      }
      window.removeEventListener('scroll', removeIndicator);
    }, 100);
  };
  
  window.addEventListener('scroll', removeIndicator);
  
  // Also remove indicator after 5 seconds
  setTimeout(() => {
    if (scrollIndicator.parentNode) {
      removeIndicator();
    }
  }, 5000);
}

// GTECH Animation Functions
let gtechTimelineCompleted = false; // Track if main timeline has completed
let gtechTl = null; // Global timeline reference

function initGtechAnimation() {
  // ScrollTrigger animation for GTECH case study
  ScrollTrigger.create({
    trigger: "#gtech-case",
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => {
      console.log("GTECH section entered");
      // First time entering - start the animation
      if (!gtechTl) {
        startGtechAnimations();
      } else if (!gtechTimelineCompleted) {
        // Timeline exists but was paused - resume it
        gtechTl.play();
      }
    },
    onLeave: () => {
      console.log("GTECH section left");
      // Only pause if timeline hasn't completed yet
      if (!gtechTimelineCompleted && gtechTl) {
        gtechTl.pause();
      }
    },
    onEnterBack: () => {
      console.log("GTECH section entered from bottom");
      // Only resume if timeline hasn't completed yet
      if (!gtechTimelineCompleted && gtechTl) {
        gtechTl.play();
      }
    },
    onLeaveBack: () => {
      console.log("GTECH section left going up");
      // Only pause if timeline hasn't completed yet
      if (!gtechTimelineCompleted && gtechTl) {
        gtechTl.pause();
      }
    }
  });
}

function startGtechAnimations() {
  
  gtechTl = gsap.timeline({ 
    gtechAnimation: true,
    onComplete: () => {
      // Mark timeline as completed
      gtechTimelineCompleted = true;
      console.log("GTECH main timeline completed - disabling ScrollTrigger pause/resume");
      
      // Enable icon interactions only after timeline completes
      setupGtechIconInteractions();
    }
  });
  let gBlue = "#4285f4";
  let gRed = "#ea4335";
  let gYellow = "#fbbc04";
  let gGreen = "#34a853";
  
  // Start the background particles
  addGtechBackgroundParticles();
  
  
  
  // Animate SVG wireframes entrance
  gtechTl
    .addLabel('userIn', 0)
    .addLabel('userOut', 1.5)
    .addLabel('locationIn', 2)
    .addLabel('locationOut', 3.5)
    .addLabel('behaviourIn', 4)
    .addLabel('behaviourOut', 5.5)
    .addLabel('trendsIn', 6)
    .addLabel('complete', 7.5)
    // Data icons animate in sequence
    .fromTo('#interactive-analytics-container', {duration: 0, autoAlpha: 0, immediateRender: true}, {duration: 0.5, autoAlpha: 1})
    .fromTo('#data-icon-user', { duration: 0.5, autoAlpha: 0, scale: 0, transformOrigin:"center center", rotation: -45 }, {autoAlpha: 1, scale: 1, rotation: 0, ease: "power2.out"}, 'userIn')
    .from("#content-bg", {duration: 0.7, autoAlpha: 0, scale: 0, transformOrigin:"center center",ease: "back.out(1.7)"}, 'userIn')
    .from('#user-product', {duration: 0.5, y: 30, autoAlpha: 0, ease: "power2.out"}, 'userIn+=0.3')
    .from('#user-txt', {duration: 0.5, scaleX: 0, transformOrigin: "left center", ease: "power2.out"}, 'userIn+=0.5')
    .from('#user-cta', {duration: 0.5, scale: 0, autoAlpha: 0, ease: "power2.out"}, 'userIn+=0.8')
    .to(['#user-product', '#user-txt', '#user-cta'], {duration: 0.5, autoAlpha: 0, ease: "power2.in"}, 'userOut')
    .fromTo('#data-icon-location', { duration: 0.5, autoAlpha: 0, scale: 0, transformOrigin:"center center", rotation: -45 }, {autoAlpha: 1, scale: 1, rotation: 0, ease: "power2.out"}, 'locationIn')
    .to('#content-bg', {duration: 0.5, morphSVG: {shape:"#location-bg", type: "rotational"}, fill:gRed, ease: "back.out(1.7)"}, 'locationIn')
    .from('#location-product', {duration: 0.5, y: 30, autoAlpha: 0, ease: "power2.out"}, 'locationIn+=0.3')
    .from('#location-txt', {duration: 0.5, scaleX: 0, transformOrigin: "left center", ease: "power2.out"}, 'locationIn+=0.5')
    .from('.star', {duration: 0.3, scale: 0, rotation: 180, stagger: 0.15, transformOrigin: "50% 50%", ease: "back.out(1.7)"}, 'locationIn+=0.6')
    .from('#location-cta', {duration: 0.5, scale: 0, autoAlpha: 0, ease: "power2.out"}, 'locationIn+=0.8')
    .to(['#location-product', '#location-txt', '.star', '#location-cta'], {duration: 0.5, autoAlpha: 0, ease: "power2.in"}, 'locationOut')
    .fromTo('#data-icon-behavior', { duration: 0.5, autoAlpha: 0, scale: 0, transformOrigin:"center center", rotation: -45 }, {autoAlpha: 1, scale: 1, rotation: 0, ease: "power2.out"}, 'behaviourIn')
    .to('#content-bg', {duration: 0.5, morphSVG: {shape:"#behaviour-bg", type: "rotational"}, fill:gGreen, ease: "back.out(1.7)"}, 'behaviourIn')
    .from('.behaviour-product', {duration: 0.5, y: 30, autoAlpha: 0, stagger: 0.2, ease: "power2.out"}, 'behaviourIn+=0.3')
    .from('.behaviour-txt', {duration: 0.5, scaleX: 0, transformOrigin: "left center", stagger: 0.2, ease: "power2.out"}, 'behaviourIn+=0.5')
    .from('.behaviour-cta', {duration: 0.5, scale: 0, autoAlpha: 0, stagger: 0.2,ease: "power2.out"}, 'behaviourIn+=0.8')
    .to(['.behaviour-product', '.behaviour-txt', '.behaviour-cta'], {duration: 0.5, autoAlpha: 0, ease: "power2.in"}, 'behaviourOut')
    .fromTo('#data-icon-trending', { duration: 0.5, autoAlpha: 0, scale: 0, transformOrigin:"center center", rotation: -45 }, {autoAlpha: 1, scale: 1, rotation: 0, ease: "power2.out"}, 'trendsIn')
    .to('#content-bg', {duration: 0.5, morphSVG: {shape:"#trending-bg", type: "rotational"}, fill:gYellow, ease: "back.out(1.7)"}, 'trendsIn')
    .from('#trending-screen', {duration: 0.5, scale: 0, autoAlpha: 0, transformOrigin: "0% 50%", ease: "power2.out"}, 'trendsIn+=0.3')
    .from('#trending-icon', {duration: 0.5, scale: 0, transformOrigin: "50% 50%", ease: "back.out(1.7)"}, 'trendsIn+=0.4')
    .from('#trending-title', {duration: 0.5, scaleX: 0, transformOrigin: "left center", ease: "power2.out"}, 'trendsIn+=0.5')
    .from('#trending-product', {duration: 0.5, scaleY: 0, transformOrigin: "50% 0%", ease: "power2.out"}, 'trendsIn+=0.5')
    .from('#trending-play', {duration: 0.5, scale: 0, rotation: 180, transformOrigin: "50% 50%", ease: "back.out(1.7)"}, 'trendsIn+=0.6')
    .from('#trending-txt', {duration: 0.5, scaleX: 0, transformOrigin: "left center", ease: "power2.out"}, 'trendsIn+=0.5')
    .from('#trending-cta', {duration: 0.5, scale: 0, autoAlpha: 0, ease: "power2.out"}, 'trendsIn+=0.8');
    
  // Store timeline reference for use in animateAdElements (keeping for compatibility)
  window.gtechMainTimeline = gtechTl;
}

function pauseGtechAnimations() {
  // Only pause if the main timeline hasn't completed yet
  if (gtechTimelineCompleted) {
    console.log("GTECH timeline completed - skipping pause");
    return;
  }
  
  // Use native GSAP timeline pause method
  if (gtechTl) {
    gtechTl.pause();
    console.log("GTECH timeline paused");
  }
}

function resumeGtechAnimations() {
  // Only resume if the main timeline hasn't completed yet
  if (gtechTimelineCompleted) {
    console.log("GTECH timeline completed - skipping resume");
    return;
  }
  
  // Use native GSAP timeline play method to resume
  if (gtechTl) {
    gtechTl.play();
    console.log("GTECH timeline resumed");
  }
}

function setupGtechIconInteractions() {
  const iconButtons = document.querySelectorAll('.data-icon-btn');
  const colors = {
    'user': '#4285f4',
    'location': '#ea4335',
    'behaviour': '#34a853', 
    'trends': '#fbbc04'
  };
  
  // Animation state tracking
  let isAnimating = false;
  
  // Function to disable all buttons
  function disableButtons() {
    isAnimating = true;
    iconButtons.forEach(btn => {
      btn.style.pointerEvents = 'none';
      btn.style.opacity = '0.6';
    });
  }
  
  // Function to enable all buttons
  function enableButtons() {
    isAnimating = false;
    iconButtons.forEach(btn => {
      btn.style.pointerEvents = 'auto';
      btn.style.opacity = '1';
    });
  }
  
  iconButtons.forEach(button => {
    // Set initial button color
    const type = button.dataset.type;
    button.style.backgroundColor = colors[type];
    
    button.addEventListener('click', () => {
      // Prevent rapid clicking
      if (isAnimating) return;
      
      // Disable buttons during animation
      disableButtons();
      
      // Trigger appropriate animation and pass callback to re-enable buttons
      animateAdElements(type, enableButtons);
      
      // Update button states
      iconButtons.forEach(btn => {
        btn.classList.remove('active');
        gsap.to(btn, { scale: 1, duration: 0.2 });
      });
      
      button.classList.add('active');
      gsap.to(button, { scale: 1.1, duration: 0.2 });
    });
    
    // Hover effects (only when not animating)
    button.addEventListener('mouseenter', () => {
      if (!button.classList.contains('active') && !isAnimating) {
        gsap.to(button, { scale: 1.05, duration: 0.2 });
      }
    });
    
    button.addEventListener('mouseleave', () => {
      if (!button.classList.contains('active') && !isAnimating) {
        gsap.to(button, { scale: 1, duration: 0.2 });
      }
    });
  });
  
  // Set initial active state for user button
  const userButton = document.querySelector('[data-type="user"]');
  if (userButton) {
    userButton.classList.add('active');
    gsap.set(userButton, { scale: 1.1 });
  }
}

function animateAdElements(type, onComplete) {
  // Define Google brand colors
  const gBlue = "#4285f4";
  const gRed = "#ea4335";
  const gYellow = "#fbbc04";
  const gGreen = "#34a853";
  
  // Trigger the appropriate case animation
  switch(type) {
    case 'user':
      triggerUserCase(onComplete);
      break;
      
    case 'location':
      triggerLocationCase(onComplete);
      break;
      
    case 'behaviour':
      triggerBehaviourCase(onComplete);
      break;
      
    case 'trends':
      triggerTrendsCase(onComplete);
      break;
      
    default:
      triggerUserCase(onComplete);
      break;
  }
  
  function triggerUserCase(onComplete) {
    console.log("Triggering User case animation");
    
    // Kill any existing animations on user elements for faster reset
    gsap.killTweensOf(['#user-product', '#user-txt', '#user-cta']);
    
    // Hide all non-user elements immediately
    gsap.to(['#location-product', '#location-txt', '.star', '#location-cta',
              '.behaviour-product', '.behaviour-txt', '.behaviour-cta',
              '#trending-screen', '#trending-icon', '#trending-title', 
              '#trending-product', '#trending-play', '#trending-txt', '#trending-cta'], { 
      duration: 0,
      autoAlpha: 0,
      immediateRender: true
    });
    
    let userTL = gsap.timeline({
      onComplete: onComplete // Call the callback when animation completes
    });
    userTL
      .to('#content-bg', {
        duration: 0.5, 
        morphSVG: {shape:"#user-bg", type: "rotational"}, 
        fill: gBlue, 
        ease: "back.out(1.7)"
      }, 0)
      .fromTo('#user-product', {y: 30, autoAlpha: 0}, {duration: 0.5, y: 0, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.3)
      .fromTo('#user-txt', {scaleX: 0, transformOrigin: "left center"}, {duration: 0.5, scaleX: 1, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.5)
      .fromTo('#user-cta', {scale: 0, autoAlpha: 0}, {duration: 0.5, scale: 1, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.8);
  }
  
  function triggerLocationCase(onComplete) {
    console.log("Triggering Location case animation");
    
    // Kill any existing animations on location elements for faster reset
    gsap.killTweensOf(['#location-product', '#location-txt', '.star', '#location-cta']);
    
    // Hide all non-location elements immediately
    gsap.to(['#user-product', '#user-txt', '#user-cta',
              '.behaviour-product', '.behaviour-txt', '.behaviour-cta',
              '#trending-screen', '#trending-icon', '#trending-title', 
              '#trending-product', '#trending-play', '#trending-txt', '#trending-cta'], { 
      autoAlpha: 0,
      duration: 0,
      immediateRender: true
    });
    
    let locationTL = gsap.timeline({
      onComplete: onComplete // Call the callback when animation completes
    });
    locationTL
      .to('#content-bg', {duration: 0.5, morphSVG: {shape:"#location-bg", type: "rotational"}, fill: gRed, ease: "back.out(1.7)"}, 0)
      .fromTo('#location-product', {y: 30, autoAlpha: 0}, {duration: 0.5, y: 0, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.3)
      .fromTo('#location-txt', {scaleX: 0, transformOrigin: "left center"}, {duration: 0.5, scaleX: 1, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.5)
      .fromTo('.star', {scale: 0, rotation: 180, transformOrigin: "50% 50%"}, {duration: 0.3, scale: 1, rotation: 0, autoAlpha: 1, stagger: 0.15, ease: "back.out(1.7)", immediateRender: true}, 0.6)
      .fromTo('#location-cta', {scale: 0, autoAlpha: 0}, {duration: 0.5, scale: 1, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.8);
  }
  
  function triggerBehaviourCase(onComplete) {
    console.log("Triggering Behaviour case animation");
    
    // Kill any existing animations on behaviour elements for faster reset
    gsap.killTweensOf(['.behaviour-product', '.behaviour-txt', '.behaviour-cta']);
    
    // Hide all non-behaviour elements immediately
    gsap.to(['#user-product', '#user-txt', '#user-cta',
              '#location-product', '#location-txt', '.star', '#location-cta',
              '#trending-screen', '#trending-icon', '#trending-title', 
              '#trending-product', '#trending-play', '#trending-txt', '#trending-cta'], { 
      duration: 0,
      autoAlpha: 0,
      immediateRender: true
    });
    
    let behaviourTL = gsap.timeline({
      onComplete: onComplete // Call the callback when animation completes
    });
    behaviourTL
      .to('#content-bg', {duration: 0.5, morphSVG: {shape:"#behaviour-bg", type: "rotational"}, fill: gGreen, ease: "back.out(1.7)"}, 0)
      .fromTo('.behaviour-product', {y: 30, autoAlpha: 0}, {duration: 0.5, y: 0, autoAlpha: 1, stagger: 0.2, ease: "power2.out", immediateRender: true}, 0.3)
      .fromTo('.behaviour-txt', {scaleX: 0, transformOrigin: "left center"}, {duration: 0.5, scaleX: 1, autoAlpha: 1, stagger: 0.2, ease: "power2.out", immediateRender: true}, 0.5)
      .fromTo('.behaviour-cta', {scale: 0, autoAlpha: 0}, {duration: 0.5, scale: 1, autoAlpha: 1, stagger: 0.2, ease: "power2.out", immediateRender: true}, 0.8);
  }
  
  function triggerTrendsCase(onComplete) {
    console.log("Triggering Trends case animation");
    
    // Kill any existing animations on trending elements for faster reset
    gsap.killTweensOf(['#trending-screen', '#trending-icon', '#trending-title', 
                       '#trending-product', '#trending-play', '#trending-txt', '#trending-cta']);
    
    // Hide all non-trends elements immediately
    gsap.to(['#user-product', '#user-txt', '#user-cta',
              '#location-product', '#location-txt', '.star', '#location-cta',
              '.behaviour-product', '.behaviour-txt', '.behaviour-cta'], { 
      duration: 0,
      autoAlpha: 0,
      immediateRender: true
    });
    
    let trendsTL = gsap.timeline({
      onComplete: onComplete // Call the callback when animation completes
    });
    trendsTL
      .to('#content-bg', {duration: 0.5, morphSVG: {shape:"#trending-bg", type: "rotational"}, fill: gYellow, ease: "back.out(1.7)"}, 0)
      .fromTo('#trending-screen', {scale: 0, autoAlpha: 0, transformOrigin: "50% 0%" }, {duration: 0.5, scale: 1, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.3)
      .fromTo('#trending-icon', {scale: 0, autoAlpha: 0, transformOrigin: "50% 50%"}, {duration: 0.5, scale: 1, autoAlpha: 1, ease: "back.out(1.7)", immediateRender: true}, 0.4)
      .fromTo('#trending-title', {scaleX: 0, transformOrigin: "left center"}, {duration: 0.5, scaleX: 1, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.5)
      .fromTo('#trending-product', {autoAlpha: 0, scaleY: 0, transformOrigin: "50% 0%"}, {duration: 0.5, scaleY: 1, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.5)
      .fromTo('#trending-play', {autoAlpha: 0, scale: 0, rotation: 180, transformOrigin: "50% 50%"}, {duration: 0.5, scale: 1, autoAlpha: 1, rotation: 0, ease: "back.out(1.7)", immediateRender: true}, 0.6)
      .fromTo('#trending-txt', {scaleX: 0, transformOrigin: "left center"}, {duration: 0.5, scaleX: 1, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.5)
      .fromTo('#trending-cta', {scale: 0, autoAlpha: 0}, {duration: 0.5, scale: 1, autoAlpha: 1, ease: "power2.out", immediateRender: true}, 0.8);
  }
}

function addGtechBackgroundParticles() {
  // Create Material Design-inspired background particles for GTECH section
  const gtechSection = document.querySelector('#gtech-case');
  if (!gtechSection) return;
  
  // Create particle container
  const particleContainer = document.createElement('div');
  particleContainer.className = 'gtech-particles';
  particleContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: 2;
  `;
  
  gtechSection.style.position = 'relative';
  gtechSection.appendChild(particleContainer);
  
  // Create subtle Material Design particles
  const particleCount = 12; // Reduced for cleaner look
  const particles = [];
  
  // Very subtle Google brand colors for Material Design feel
  const materialColors = [
    'rgba(66, 133, 244, 0.08)',   // Google Blue - very subtle
    'rgba(234, 67, 53, 0.06)',    // Google Red - very subtle
    'rgba(52, 168, 83, 0.07)',    // Google Green - very subtle
    'rgba(251, 188, 4, 0.05)',    // Google Yellow - very subtle
    'rgba(156, 39, 176, 0.04)',   // Material Purple - very subtle
    'rgba(96, 125, 139, 0.06)'    // Material Blue Grey - very subtle
  ];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'material-particle';
    
    // Material Design-inspired particle styling
    const size = Math.random() * 3 + 1; // Smaller particles (1-4px)
    const color = materialColors[Math.floor(Math.random() * materialColors.length)];
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: 0;
    `;
    
    particleContainer.appendChild(particle);
    particles.push(particle);
    
    // Material Design-inspired animation with cubic-bezier timing
    gsap.set(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: 0
    });
    
    // Gentle, Material Design-style floating animation
    gsap.to(particle, {
      duration: Math.random() * 8 + 6, // 6-14 seconds
      x: `+=${Math.random() * 100 - 50}`,
      y: `+=${Math.random() * 80 - 40}`,
      opacity: Math.random() * 0.4 + 0.1, // Very subtle opacity
      ease: "none",
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 2
    });
    
    // Subtle scale pulsing for Material Design depth
    gsap.to(particle, {
      duration: Math.random() * 4 + 3,
      scale: Math.random() * 0.5 + 0.8,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 3
    });
  }
}

// FBTO Animation Functions
let fbtoTl = null; // Global timeline reference for FBTO animations

function initFbtoAnimation() {
  // ScrollTrigger animation for FBTO case study
  ScrollTrigger.create({
    trigger: "#fbto-case",
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => {
      console.log("FBTO section entered");
      // First time entering - start the animation
      if (!fbtoTl) {
        startFbtoAnimations();
      } else {
        // Timeline exists but was paused - resume it
        fbtoTl.play();
      }
    },
    onLeave: () => {
      console.log("FBTO section left");
      if (fbtoTl) {
        fbtoTl.pause();
      }
    },
    onEnterBack: () => {
      console.log("FBTO section entered from bottom");
      if (fbtoTl) {
        fbtoTl.play();
      }
    },
    onLeaveBack: () => {
      console.log("FBTO section left going up");
      if (fbtoTl) {
        fbtoTl.pause();
      }
    }
  });
}

function startFbtoAnimations() {
  fbtoTl = gsap.timeline({ 
    repeat: -1, // Loop the animation
    yoyo: true,
    onStart: () => {
      console.log("FBTO animation started");
    }
  });
  
  // Noodle drawing animation
  fbtoTl
    .set('#noodle', { autoAlpha: 1, drawSVG: "0% 0%" })
    .addLabel('noodleStart', 0)
    .to('#noodle', 2.2, { drawSVG: "0% 100%", ease: "power1.out" }, 'noodleStart');
    
  console.log("FBTO timeline created and started");
}

// HUAWEI Animation Functions
let huaweiTl = null; // Global timeline reference for HUAWEI animations

function initHuaweiAnimation() {
  // ScrollTrigger animation for HUAWEI case study
  ScrollTrigger.create({
    trigger: "#huawei-case",
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => {
      console.log("HUAWEI section entered");
      // First time entering - start the animation
      if (!huaweiTl) {
        startHuaweiAnimations();
      } else {
        // Timeline exists but was paused - resume it
        huaweiTl.play();
      }
    },
    onLeave: () => {
      console.log("HUAWEI section left");
      if (huaweiTl) {
        huaweiTl.pause();
      }
    },
    onEnterBack: () => {
      console.log("HUAWEI section entered from bottom");
      if (huaweiTl) {
        huaweiTl.play();
      }
    },
    onLeaveBack: () => {
      console.log("HUAWEI section left going up");
      if (huaweiTl) {
        huaweiTl.pause();
      }
    }
  });
}

function startHuaweiAnimations() {
  huaweiTl = gsap.timeline({ 
    repeat: -1, 
    onStart: () => {
      console.log("HUAWEI animation started");
    }
  });
  
  // Ensure w and h are defined (defensive programming)
  if (typeof w === 'undefined' || typeof h === 'undefined') {
    w = window.innerWidth;
    h = window.innerHeight * 2;
  }
  
  // Huawei phone animation - colors fade in on top of each other with gradient changes
  huaweiTl
    .set('#bg_container', { attr: {viewBox: '0 0'+ ' ' + w + ' ' + h} })
    // Set initial state - Only Green phone visible with green gradient (matches HTML default)
    .set('#phones_front', { autoAlpha: 1 })
    .set('#phones_back', { autoAlpha: 1 })
    .set('.front_phone', { autoAlpha: 0 })
    .set('.back_phone', { autoAlpha: 0 })
    .set('#green_front', { autoAlpha: 1 })
    .set('#green_back', { autoAlpha: 1 })
    // Ensure gradient starts with green colors
    .set('#bg_gradient stop', { attr: { "stop-color": (i) => ["#02b09c", "#009d91", "#027b7f"][i] } })
    
    // Define animation labels for each color phase
    .addLabel('green_start', 0)
    .addLabel('to_orange', 2)
    .addLabel('to_black', 4)
    .addLabel('to_blue', 6)
    .addLabel('cycle_end', 8)
    
    // Phase 1: Orange fades in on top while gradient changes to orange
    .to('#bg_gradient stop', { 
      duration: 1.5, 
      attr: { "stop-color": (i) => ["#ff8400", "#ff6700", "#ff3602"][i] }, 
      ease: "sine.inOut",
      stagger: 0.1 
    }, 'to_orange')
    .to(['#orange_front', '#orange_back'], { duration: 1, autoAlpha: 1, ease: "sine.inOut" }, 'to_orange')
    
    // Phase 2: Black fades in on top while gradient changes to black
    .to('#bg_gradient stop', { 
      duration: 1.5, 
      attr: { "stop-color": (i) => ["#7c7c7c", "#4a4a4a", "#000000"][i] }, 
      ease: "sine.inOut",
      stagger: 0.1 
    }, 'to_black')
    .to(['#black_front', '#black_back'], { duration: 1, autoAlpha: 1, ease: "sine.inOut" }, 'to_black')
    
    // Phase 3: Blue fades in on top while gradient changes to blue
    .to('#bg_gradient stop', { 
      duration: 1.5, 
      attr: { "stop-color": (i) => ["#d8edfc", "#a1daf8", "#4db4e7"][i] }, 
      ease: "sine.inOut",
      stagger: 0.1 
    }, 'to_blue')
    .to(['#blue_front', '#blue_back'], { duration: 1, autoAlpha: 1, ease: "sine.inOut" }, 'to_blue')
    
    // Phase 4: Reset for loop - hide all phones except green, reset gradient to green
    .to(['#orange_front', '#orange_back', '#black_front', '#black_back', '#blue_front', '#blue_back'], { 
      duration: 0.5, 
      autoAlpha: 0, 
      ease: "sine.inOut" 
    }, 'cycle_end')
    .to('#bg_gradient stop', { 
      duration: 0.5, 
      attr: { "stop-color": (i) => ["#02b09c", "#009d91", "#027b7f"][i] }, 
      ease: "sine.inOut",
      stagger: 0.1 
    }, 'cycle_end');
    
  console.log("HUAWEI timeline created and started");
}

// Note: init() is called from HTML's window.onload event

// Initialize CTA functionality when DOM is loaded
// Using a safer approach to ensure the function is available
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired, checking if initCaseStudyCTAs exists:', typeof initCaseStudyCTAs);
    try {
      initCaseStudyCTAs();
    } catch (error) {
      console.error('Error initializing CTA functionality:', error);
    }
  });
} else {
  // Document is already loaded
  console.log('Document already loaded, checking if initCaseStudyCTAs exists:', typeof initCaseStudyCTAs);
  try {
    initCaseStudyCTAs();
  } catch (error) {
    console.error('Error initializing CTA functionality:', error);
  }
}