function init() {
   let avatar = document.querySelector('.avatar-container');
   let hero = document.querySelector('.hero-container');
   let tl = gsap.timeline();
   gsap.registerPlugin(DrawSVGPlugin,MorphSVGPlugin,ScrollTrigger)
   
  //  let userInteracted = false;
  //  let autoResumeTimeout;
   
   // Lock scrolling initially
   document.body.style.overflow = 'hidden';
   
   tl
    .set('.frame-container', { scale: 0, transformOrigin: "50% 50%" })
    .set(['.skill-name', '.skill-item'], { autoAlpha: 0, y: 5 })
    .set(['.eye2', '#xray', '.skills-header', '.dot', '.skills-footer'], { autoAlpha: 0 })
    .addLabel('init', 0)
    .addLabel('start', 0.5)
    .addLabel('mouse', 1)
    .addLabel('helmet', 2)
    .addLabel('glow', 2.5)
    .addLabel('sparks', 2.6)
    .from('.avatar-container', { duration: 0, display: 'none' }, 'init')
    .from('#circle_bg', { duration: 0.5, r: 0, ease: 'cubic.out' }, 'init')
    .from('#xavi', { duration: 0.5, y:'100%', ease: 'cubic.out'}, 'start')
    .call(() => {
      addMouseEvent();
    }, null, 'mouse')
    .to("#circle_bg", {duration: 0.5, attr: { fill: "transparent" }, ease: 'cubic.out'}, 'helmet')
    .from("#circle_stroke", {duration: 0.5, autoAlpha:0, ease: 'cubic.out'}, 'helmet+=0.25')
    .from('#helmet', { duration: 0.5, y:'-100%', ease: 'cubic.out' }, 'helmet')
    .from('#helmet-back', { duration: 0.5, y:'-942%', ease: 'cubic.out' }, 'helmet')
    .to('.helmet-icon', { duration: 1, attr: { "filter": "url(#glow)" }, ease: 'cubic.out' }, 'glow')
    .from('#blur-filter', { duration: 1, attr:{ "stdDeviation": 0 }, ease: 'cubic.out' }, 'glow')
    .from('.helmet-glow', {duration: 1, autoAlpha: 0, ease: 'cubic.out' }, 'glow')
    .to('#xray', { duration: 0.1, autoAlpha: 1, ease: 'rough({ template: none.out  , strength: 1, points: 1000, taper: none, randomize: true, clamp: false})', repeat: 5, yoyo: true }, 'glow')
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
    .call(() => {
      // Animation complete - enable scrolling after banners are loaded
      console.log('Main animation complete - waiting for banners to load...');
    }, null, 'sparks+=2')

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
    
    // Initialize masonry grid after hero animation completes
    setTimeout(() => {
      loadMasonryGrid();
      
      // Initialize GTECH animation
      initGtechAnimation();
      addGtechBackgroundParticles();
    }, 2500); // Reduced from 3000 to 2500 to start loading earlier
  }
  
} // End of init() function

// Masonry Grid for Case Study Banners
let iframeReloadInterval = null;
let isCaseStudyVisible = false;

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
        
        // Load actual iframes after grid is visible
        loadIframesProgressively(sortedBanners);
        
        // Fallback: Enable scrolling after maximum wait time (10 seconds)
        setTimeout(() => {
          if (document.body.style.overflow === 'hidden') {
            console.log('Fallback: Enabling scrolling after timeout');
            enableScrolling();
          }
        }, 10000);
        
        // Setup iframe reloading and viewport detection
        setupIframeReloading();
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

function loadIframesProgressively(banners) {
  let loadedCount = 0;
  const totalBanners = banners.length;
  
  // Load iframes with staggered timing to avoid overwhelming the browser
  banners.forEach((banner, index) => {
    setTimeout(() => {
      const bannerItem = document.querySelector(`[data-banner-index="${index}"]`);
      if (bannerItem) {
        const placeholder = bannerItem.querySelector('.banner-placeholder');
        
        const iframe = document.createElement('iframe');
        iframe.src = banner.path;
        iframe.style.border = 'none';
        iframe.style.borderRadius = '4px';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.display = 'block';
        
        iframe.onload = () => {
          if (placeholder && placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
          }
          
          loadedCount++;
          console.log(`Banner ${loadedCount}/${totalBanners} loaded`);
          
          // Enable scrolling when all banners are loaded
          if (loadedCount === totalBanners) {
            setTimeout(() => {
              enableScrolling();
            }, 500); // Small delay to ensure everything is settled
          }
        };
        
        // Handle iframe load errors
        iframe.onerror = () => {
          loadedCount++;
          console.log(`Banner ${loadedCount}/${totalBanners} failed to load`);
          
          if (loadedCount === totalBanners) {
            setTimeout(() => {
              enableScrolling();
            }, 500);
          }
        };
        
        bannerItem.appendChild(iframe);
      }
    }, index * 20); // Stagger by 20ms
  });
}

// Helper functions for iframe reloading and viewport detection
function setupIframeReloading() {
  if (iframeReloadInterval) {
    clearInterval(iframeReloadInterval);
  }
  
  iframeReloadInterval = setInterval(() => {
    if (isCaseStudyVisible) {
      reloadAllIframes();
    }
  }, 20000);
}

function setupViewportObserver() {
  // Note: Removed .case-study ScrollTrigger - only tracking for iframe reloading
  // The GTECH section has its own ScrollTrigger with timeline completion logic
}

function reloadAllIframes() {
  const iframes = document.querySelectorAll('#masonry-grid iframe');
  iframes.forEach(iframe => {
    const currentSrc = iframe.src;
    iframe.src = '';
    setTimeout(() => {
      iframe.src = currentSrc;
    }, 50);
  });
}

// Function to enable scrolling once everything is ready
function enableScrolling() {
  console.log('All banners loaded - enabling scrolling');
  document.body.style.overflow = 'auto';
  
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
    .addLabel('userOut', 2.5)
    .addLabel('locationIn', 3)
    .addLabel('locationOut', 5)
    .addLabel('behaviourIn', 5.5)
    .addLabel('behaviourOut', 8)
    .addLabel('trendsIn', 8.5)
    .addLabel('complete', 11)
    // Data icons animate in sequence
    .fromTo('#interactive-ad-container', {duration: 0, autoAlpha: 0, immediateRender: true}, {duration: 0.5, autoAlpha: 1})
    .fromTo('#data-icon-user', { duration: 0.5, autoAlpha: 0, scale: 0, transformOrigin:"center center", rotation: -45 }, {autoAlpha: 1, scale: 1, rotation: 0, ease: "power2.out"}, 'userIn')
    .from("#ad-bg", {duration: 0.7, autoAlpha: 0, scale: 0, transformOrigin:"center center",ease: "back.out(1.7)"}, 'userIn')
    .from('#user-product', {duration: 0.5, y: 30, autoAlpha: 0, ease: "power2.out"}, 'userIn+=0.3')
    .from('#user-txt', {duration: 0.5, scaleX: 0, transformOrigin: "left center", ease: "power2.out"}, 'userIn+=0.5')
    .from('#user-cta', {duration: 0.5, scale: 0, autoAlpha: 0, ease: "power2.out"}, 'userIn+=0.8')
    .to(['#user-product', '#user-txt', '#user-cta'], {duration: 0.5, autoAlpha: 0, ease: "power2.in"}, 'userOut')
    .fromTo('#data-icon-location', { duration: 0.5, autoAlpha: 0, scale: 0, transformOrigin:"center center", rotation: -45 }, {autoAlpha: 1, scale: 1, rotation: 0, ease: "power2.out"}, 'locationIn')
    .to('#ad-bg', {duration: 0.5, morphSVG: {shape:"#location-bg", type: "rotational"}, fill:gRed, ease: "back.out(1.7)"}, 'locationIn')
    .from('#location-product', {duration: 0.5, y: 30, autoAlpha: 0, ease: "power2.out"}, 'locationIn+=0.3')
    .from('#location-txt', {duration: 0.5, scaleX: 0, transformOrigin: "left center", ease: "power2.out"}, 'locationIn+=0.5')
    .from('.star', {duration: 0.3, scale: 0, rotation: 180, stagger: 0.15, transformOrigin: "50% 50%", ease: "back.out(1.7)"}, 'locationIn+=0.6')
    .from('#location-cta', {duration: 0.5, scale: 0, autoAlpha: 0, ease: "power2.out"}, 'locationIn+=0.8')
    .to(['#location-product', '#location-txt', '.star', '#location-cta'], {duration: 0.5, autoAlpha: 0, ease: "power2.in"}, 'locationOut')
    .fromTo('#data-icon-behavior', { duration: 0.5, autoAlpha: 0, scale: 0, transformOrigin:"center center", rotation: -45 }, {autoAlpha: 1, scale: 1, rotation: 0, ease: "power2.out"}, 'behaviourIn')
    .to('#ad-bg', {duration: 0.5, morphSVG: {shape:"#behaviour-bg", type: "rotational"}, fill:gGreen, ease: "back.out(1.7)"}, 'behaviourIn')
    .from('.behaviour-product', {duration: 0.5, y: 30, autoAlpha: 0, stagger: 0.2, ease: "power2.out"}, 'behaviourIn+=0.3')
    .from('.behaviour-txt', {duration: 0.5, scaleX: 0, transformOrigin: "left center", stagger: 0.2, ease: "power2.out"}, 'behaviourIn+=0.5')
    .from('.behaviour-cta', {duration: 0.5, scale: 0, autoAlpha: 0, stagger: 0.2,ease: "power2.out"}, 'behaviourIn+=0.8')
    .to(['.behaviour-product', '.behaviour-txt', '.behaviour-cta'], {duration: 0.5, autoAlpha: 0, ease: "power2.in"}, 'behaviourOut')
    .fromTo('#data-icon-trending', { duration: 0.5, autoAlpha: 0, scale: 0, transformOrigin:"center center", rotation: -45 }, {autoAlpha: 1, scale: 1, rotation: 0, ease: "power2.out"}, 'trendsIn')
    .to('#ad-bg', {duration: 0.5, morphSVG: {shape:"#trending-bg", type: "rotational"}, fill:gYellow, ease: "back.out(1.7)"}, 'trendsIn')
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
      .to('#ad-bg', {
        duration: 0.5, 
        morphSVG: {shape:"path[d='M857.24,867.75h-486.4c-8.84,0-16-7.16-16-16V124.79c0-8.84,7.16-16,16-16h486.4c8.84,0,16,7.16,16,16v726.96c0,8.84-7.16,16-16,16Z']", type: "rotational"}, 
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
      .to('#ad-bg', {duration: 0.5, morphSVG: {shape:"#location-bg", type: "rotational"}, fill: gRed, ease: "back.out(1.7)"}, 0)
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
      .to('#ad-bg', {duration: 0.5, morphSVG: {shape:"#behaviour-bg", type: "rotational"}, fill: gGreen, ease: "back.out(1.7)"}, 0)
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
      .to('#ad-bg', {duration: 0.5, morphSVG: {shape:"#trending-bg", type: "rotational"}, fill: gYellow, ease: "back.out(1.7)"}, 0)
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
  // Create animated background particles for GTECH section
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
    z-index: -1;
  `;
  
  gtechSection.style.position = 'relative';
  gtechSection.appendChild(particleContainer);
  
  // Create particles
  const particleCount = 20;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'gtech-particle';
    
    // Random Google brand color
    const colors = ['#4285f4', '#ea4335', '#34a853', '#fbbc04'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${color};
      border-radius: 50%;
      opacity: 0.3;
    `;
    
    // Random initial position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    particleContainer.appendChild(particle);
    particles.push(particle);
  }
  
  // Animate particles with ScrollTrigger
  ScrollTrigger.create({
    trigger: "#gtech-case",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      
      particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const direction = index % 2 === 0 ? 1 : -1;
        
        gsap.set(particle, {
          x: Math.sin(progress * Math.PI * 2 + index) * 30 * direction,
          y: progress * 100 * speed - 50,
          rotation: progress * 360 * direction,
          opacity: 0.1 + Math.sin(progress * Math.PI) * 0.3
        });
      });
    }
  });
  
  // Floating animation for particles
  particles.forEach((particle, index) => {
    gsap.to(particle, {
      y: "+=20",
      duration: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: Math.random() * 2,
      gtechAnimation: true
    });
  });
}

// Note: init() is called from HTML's window.onload event

