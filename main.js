function init() {
   let avatar = document.querySelector('.avatar-container');
   let hero = document.querySelector('.hero-container');
   let tl = gsap.timeline();
   gsap.registerPlugin(DrawSVGPlugin);
   
   let userInteracted = false;
   let autoResumeTimeout;
   
   tl
    .set('.frame-container', { scale: 0, transformOrigin: "50% 50%" })
    .set(['.skill-name', '.skill-item'], { autoAlpha: 0, y: 5 })
    .set(['.eye2', '#xray', '.skills-header', '.dot', '.skills-footer'], { autoAlpha: 0 })
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
    }, 3000);
  }
  
}

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
        };
        
        bannerItem.appendChild(iframe);
      }
    }, index * 20); // Stagger by 0ms
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.classList.contains('case-study')) {
        isCaseStudyVisible = entry.isIntersecting;
      }
    });
  }, {
    threshold: 0.1
  });
  
  const caseStudy = document.querySelector('.case-study');
  if (caseStudy) {
    observer.observe(caseStudy);
  }
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

// Note: init() is called from HTML's window.onload event

