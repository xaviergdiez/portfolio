function init() {
   let avatar = document.querySelector('.avatar-container');
   let hero = document.querySelector('.hero-container');
   let tl = gsap.timeline();
   gsap.registerPlugin(DrawSVGPlugin);
   
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
function initGtechAnimation() {
  // Set up intersection observer for GTECH case study
  const gtechSection = document.getElementById('gtech-case');
  if (!gtechSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateGtechDataIcons();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(gtechSection);
}

// Interactive GTECH Ad Unit
function animateGtechDataIcons() {
  const dataIcons = document.querySelectorAll('.data-icon-btn');
  const adUnit = document.getElementById('morphing-ad');
  
  if (dataIcons.length === 0 || !adUnit) return;

  // Product data for each variant with improved illustrations
  const productData = {
    demographics: {
      title: "Smart Fitness Tracker",
      description: "Perfect for health-conscious millennials",
      price: "$149.99",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><defs><linearGradient id='fitnessBg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%234285f4'/><stop offset='100%' stop-color='%231a73e8'/></linearGradient></defs><rect width='300' height='200' fill='url(%23fitnessBg)'/><ellipse cx='150' cy='100' rx='80' ry='50' fill='white' opacity='0.9'/><rect x='120' y='80' width='60' height='40' rx='20' fill='%234285f4'/><circle cx='130' cy='90' r='3' fill='white'/><circle cx='140' cy='90' r='3' fill='white'/><circle cx='150' cy='90' r='3' fill='white'/><text x='150' y='130' font-family='Arial,sans-serif' font-size='14' text-anchor='middle' fill='%234285f4' font-weight='bold'>FITNESS TRACKER</text></svg>"
    },
    location: {
      title: "Winter Jacket - NYC",
      description: "Stay warm in the concrete jungle",
      price: "$89.99",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><defs><linearGradient id='jacketBg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ea4335'/><stop offset='100%' stop-color='%23d32f2f'/></linearGradient></defs><rect width='300' height='200' fill='url(%23jacketBg)'/><path d='M120 60 Q150 50 180 60 L185 140 Q150 150 115 140 Z' fill='white' opacity='0.9'/><rect x='140' y='70' width='20' height='30' rx='10' fill='%23ea4335'/><rect x='140' y='105' width='20' height='30' rx='10' fill='%23ea4335'/><text x='150' y='165' font-family='Arial,sans-serif' font-size='14' text-anchor='middle' fill='%23ea4335' font-weight='bold'>WINTER JACKET</text></svg>"
    },
    behavior: {
      title: "Eco-Friendly Water Bottle",
      description: "For environmentally conscious shoppers",
      price: "$24.99",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><defs><linearGradient id='ecoBg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2334a853'/><stop offset='100%' stop-color='%231e8e3e'/></linearGradient></defs><rect width='300' height='200' fill='url(%23ecoBg)'/><ellipse cx='150' cy='120' rx='25' ry='60' fill='white' opacity='0.9'/><rect x='140' y='50' width='20' height='15' rx='3' fill='%2334a853'/><path d='M150 80 Q155 85 150 90 Q145 85 150 80' fill='%2334a853'/><text x='150' y='165' font-family='Arial,sans-serif' font-size='12' text-anchor='middle' fill='%2334a853' font-weight='bold'>ECO BOTTLE</text></svg>"
    },
    trends: {
      title: "Trending Gaming Headset",
      description: "Top-rated by gamers worldwide",
      price: "$199.99",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><defs><linearGradient id='gamingBg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23fbbc04'/><stop offset='100%' stop-color='%23f9ab00'/></linearGradient></defs><rect width='300' height='200' fill='url(%23gamingBg)'/><path d='M80 80 Q150 60 220 80 Q220 120 150 120 Q80 120 80 80' fill='white' opacity='0.9'/><circle cx='110' cy='100' r='15' fill='%23fbbc04'/><circle cx='190' cy='100' r='15' fill='%23fbbc04'/><rect x='140' y='90' width='20' height='8' rx='4' fill='%23fbbc04'/><text x='150' y='150' font-family='Arial,sans-serif' font-size='12' text-anchor='middle' fill='%23fbbc04' font-weight='bold'>GAMING HEADSET</text></svg>"
    }
  };

  // Set initial states
  gsap.set(dataIcons, {
    opacity: 1,
    scale: 1
  });

  // Animate icons with stagger entrance
  const tl = gsap.timeline();
  tl.from(dataIcons, {
    duration: 0.8,
    autoAlpha: 0,
    y: -30,
    scale: 0.5,
    ease: "back.out(1.7)",
    stagger: {
      amount: 0.4,
      from: "start"
    }
  })

  // Initial showcase animation
  setTimeout(() => {
    showcaseAdFunctionality();
  }, 2000);

  // Add click interactions
  dataIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      const targetType = icon.dataset.target;
      morphAdUnit(targetType, productData[targetType]);
      
      // Update active state
      dataIcons.forEach(i => i.classList.remove('active'));
      icon.classList.add('active');
    });
  });

  function morphAdUnit(targetType, data) {
    const adUnit = document.getElementById('morphing-ad');
    
    // Add morphing class for animation
    adUnit.classList.add('morphing');
    
    // Animate out current content
    gsap.to(['.ad-title', '.ad-description', '.ad-price'], {
      duration: 0.3,
      opacity: 0,
      y: -20,
      ease: "power2.out"
    });

    gsap.to('.ad-product-image', {
      duration: 0.3,
      scale: 0.8,
      opacity: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Update content
        document.querySelector('.ad-title').textContent = data.title;
        document.querySelector('.ad-description').textContent = data.description;
        document.querySelector('.ad-price').textContent = data.price;
        document.querySelector('.ad-product-image img').src = data.image;
        
        // Update theme
        adUnit.className = `ad-unit ${targetType}`;
        
        // Animate in new content
        gsap.to('.ad-product-image', {
          duration: 0.4,
          scale: 1,
          opacity: 1,
          ease: "back.out(1.2)"
        });
        
        gsap.to(['.ad-title', '.ad-description', '.ad-price'], {
          duration: 0.4,
          opacity: 1,
          y: 0,
          ease: "back.out(1.2)",
          stagger: 0.1
        });
        
        // Remove morphing class
        setTimeout(() => {
          adUnit.classList.remove('morphing');
        }, 800);
      }
    });
  }

  function showcaseAdFunctionality() {
    const icons = Array.from(dataIcons);
    let currentIndex = 0;

    function cycleThrough() {
      const currentIcon = icons[currentIndex];
      const targetType = currentIcon.dataset.target;
      
      // Highlight current icon
      dataIcons.forEach(i => i.classList.remove('active'));
      currentIcon.classList.add('active');
      
      // Morph ad unit
      morphAdUnit(targetType, productData[targetType]);
      
      // Reset icon after delay
      setTimeout(() => {
        currentIcon.classList.remove('active');
        
        currentIndex = (currentIndex + 1) % icons.length;
        
        if (currentIndex === 0) {
          // Completed one cycle, show a "click to interact" hint
          showInteractionHint();
        } else {
          setTimeout(cycleThrough, 1500);
        }
      }, 1200);
    }

    cycleThrough();
  }

  function showInteractionHint() {
    // Create hint element
    const hint = document.createElement('div');
    hint.textContent = 'Click data points to explore variations';
    hint.style.cssText = `
      position: absolute;
      top: 85%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.95);
      color: #333;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: 500;
      pointer-events: none;
      z-index: 10;
      opacity: 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
    `;
    
    document.getElementById('gtech-case').appendChild(hint);
    
    gsap.to(hint, {
      duration: 0.5,
      opacity: 1,
      y: -10,
      ease: "power2.out"
    });

    setTimeout(() => {
      gsap.to(hint, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: "power2.out",
        onComplete: () => hint.remove()
      });
    }, 3000);
  }
}

function addGtechBackgroundParticles() {
  const gtechSection = document.getElementById('gtech-case');
  if (!gtechSection) return;

  // Create floating particles for visual interest
  const particleContainer = document.createElement('div');
  particleContainer.className = 'gtech-particles';
  particleContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;

  gtechSection.appendChild(particleContainer);

  // Google brand colors for particles
  const colors = ['#4285f4', '#ea4335', '#34a853', '#fbbc04'];
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${colors[i % colors.length]};
      opacity: 0.6;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: gtechFloat ${3 + Math.random() * 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
    `;
    particleContainer.appendChild(particle);
  }

  // Add CSS animation for particles
  if (!document.getElementById('gtech-particles-style')) {
    const style = document.createElement('style');
    style.id = 'gtech-particles-style';
    style.textContent = `
      @keyframes gtechFloat {
        0%, 100% { 
          transform: translateY(0) translateX(0) scale(1);
          opacity: 0.6;
        }
        25% { 
          transform: translateY(-20px) translateX(10px) scale(1.2);
          opacity: 1;
        }
        50% { 
          transform: translateY(-10px) translateX(-10px) scale(0.8);
          opacity: 0.8;
        }
        75% { 
          transform: translateY(-30px) translateX(5px) scale(1.1);
          opacity: 0.9;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Note: init() is called from HTML's window.onload event

