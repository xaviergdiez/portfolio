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
  }
  
}

// Masonry Grid for Case Study Banners
async function loadMasonryGrid() {
  try {
    const response = await fetch('./manifest.json');
    const data = await response.json();
    const banners = data.banners;
    
    // Shuffle and separate banners for variety
    const arrangedBanners = arrangeBannersForVariety(banners);
    
    const masonryGrid = document.getElementById('masonry-grid');
    masonryGrid.innerHTML = ''; // Clear existing content
    
    arrangedBanners.forEach((banner, index) => {
      const bannerItem = createBannerElement(banner, index);
      masonryGrid.appendChild(bannerItem);
    });
    
    // Initialize masonry layout after images load
    initializeMasonryLayout();
    
  } catch (error) {
    console.error('Error loading banner manifest:', error);
  }
}

function arrangeBannersForVariety(banners) {
  // Create a copy to avoid mutating original
  const shuffled = [...banners];
  
  // Shuffle the array first
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Separate banners to avoid same name/size clustering
  const arranged = [];
  const used = new Set();
  
  // First pass: add variety by avoiding consecutive same names/sizes
  shuffled.forEach(banner => {
    const lastBanner = arranged[arranged.length - 1];
    const sameAsLast = lastBanner && (
      lastBanner.name === banner.name || 
      (lastBanner.width === banner.width && lastBanner.height === banner.height)
    );
    
    if (!sameAsLast || arranged.length === 0) {
      arranged.push(banner);
      used.add(shuffled.indexOf(banner));
    }
  });
  
  // Second pass: add remaining banners
  shuffled.forEach((banner, index) => {
    if (!used.has(index)) {
      // Find best position to insert (avoid clustering)
      let bestPosition = arranged.length;
      for (let i = 0; i < arranged.length; i++) {
        const prevBanner = arranged[i - 1];
        const nextBanner = arranged[i];
        
        const conflictPrev = prevBanner && (
          prevBanner.name === banner.name || 
          (prevBanner.width === banner.width && prevBanner.height === banner.height)
        );
        
        const conflictNext = nextBanner && (
          nextBanner.name === banner.name || 
          (nextBanner.width === banner.width && nextBanner.height === banner.height)
        );
        
        if (!conflictPrev && !conflictNext) {
          bestPosition = i;
          break;
        }
      }
      
      arranged.splice(bestPosition, 0, banner);
    }
  });
  
  return arranged;
}

function createBannerElement(banner, index) {
  const bannerItem = document.createElement('div');
  bannerItem.className = 'banner-item';
  
  // Use actual banner dimensions
  bannerItem.style.width = `${banner.width}px`;
  bannerItem.style.height = `${banner.height}px`;
  bannerItem.style.position = 'absolute';
  bannerItem.style.setProperty('--aspect-ratio', banner.width / banner.height);
  
  // Add campaign class for styling variety
  bannerItem.classList.add(`campaign-${banner.name.toLowerCase()}`);
  
  // Add size class for responsive behavior
  const sizeClass = getBannerSizeClass(banner.width, banner.height);
  bannerItem.classList.add(sizeClass);
  
  const iframe = document.createElement('iframe');
  iframe.src = banner.path;
  iframe.width = banner.width;
  iframe.height = banner.height;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.loading = 'lazy';
  iframe.title = `${banner.name} - ${banner.width}x${banner.height}${banner.version ? ` ${banner.version}` : ''}`;
  
  bannerItem.appendChild(iframe);
  
  // Add entrance animation delay
  bannerItem.style.animationDelay = `${index * 0.05}s`;
  
  return bannerItem;
}

function getBannerSizeClass(width, height) {
  const area = width * height;
  const aspectRatio = width / height;
  
  if (area > 500000) return 'banner-xl';
  if (area > 200000) return 'banner-lg';
  if (area > 100000) return 'banner-md';
  if (aspectRatio > 3) return 'banner-wide';
  if (aspectRatio < 0.5) return 'banner-tall';
  return 'banner-sm';
}

function initializeMasonryLayout() {
  const grid = document.getElementById('masonry-grid');
  
  // Simple masonry-like layout using CSS Grid
  const resizeObserver = new ResizeObserver(() => {
    layoutMasonryGrid();
  });
  
  resizeObserver.observe(grid);
  
  // Initial layout
  setTimeout(layoutMasonryGrid, 100);
}

function layoutMasonryGrid() {
  const grid = document.getElementById('masonry-grid');
  const items = grid.querySelectorAll('.banner-item');
  
  if (items.length === 0) return;
  
  // Set grid to relative positioning for absolute positioned items
  grid.style.position = 'relative';
  
  // Row-based masonry layout inspired by reference image
  const gap = 12; // Smaller gap for tighter layout
  const gridRect = grid.getBoundingClientRect();
  
  // Create a 2D array to track occupied spaces
  const gridCells = [];
  const cellSize = 50; // Size of each grid cell for collision detection
  const gridRows = Math.ceil(2000 / cellSize); // Enough rows for all banners
  const gridCols = Math.ceil((gridRect.width * 2) / cellSize); // Extra width for rotation
  
  // Initialize grid
  for (let i = 0; i < gridRows; i++) {
    gridCells[i] = new Array(gridCols).fill(false);
  }
  
  // Function to check if a position is available
  function isPositionAvailable(x, y, width, height) {
    const startCol = Math.floor(x / cellSize);
    const endCol = Math.floor((x + width) / cellSize);
    const startRow = Math.floor(y / cellSize);
    const endRow = Math.floor((y + height) / cellSize);
    
    for (let row = startRow; row <= endRow && row < gridRows; row++) {
      for (let col = startCol; col <= endCol && col < gridCols; col++) {
        if (row >= 0 && col >= 0 && gridCells[row][col]) {
          return false;
        }
      }
    }
    return true;
  }
  
  // Function to mark position as occupied
  function markPositionOccupied(x, y, width, height) {
    const startCol = Math.floor(x / cellSize);
    const endCol = Math.floor((x + width) / cellSize);
    const startRow = Math.floor(y / cellSize);
    const endRow = Math.floor((y + height) / cellSize);
    
    for (let row = startRow; row <= endRow && row < gridRows; row++) {
      for (let col = startCol; col <= endCol && col < gridCols; col++) {
        if (row >= 0 && col >= 0) {
          gridCells[row][col] = true;
        }
      }
    }
  }
  
  items.forEach((item, index) => {
    const itemWidth = parseInt(item.style.width);
    const itemHeight = parseInt(item.style.height);
    
    let placed = false;
    let attempts = 0;
    const maxAttempts = 1000;
    
    // Try to find a position for the item
    while (!placed && attempts < maxAttempts) {
      // Start from top-left and scan row by row
      const row = Math.floor(attempts / 20) * cellSize;
      const col = (attempts % 20) * (cellSize * 2);
      
      // Add some randomness to make it more natural
      const randomX = col + Math.random() * cellSize;
      const randomY = row + Math.random() * cellSize;
      
      if (isPositionAvailable(randomX, randomY, itemWidth + gap, itemHeight + gap)) {
        item.style.left = `${randomX}px`;
        item.style.top = `${randomY}px`;
        markPositionOccupied(randomX, randomY, itemWidth + gap, itemHeight + gap);
        placed = true;
      }
      
      attempts++;
    }
    
    // Fallback positioning if no space found
    if (!placed) {
      const fallbackY = index * 100;
      const fallbackX = (index % 6) * 200;
      item.style.left = `${fallbackX}px`;
      item.style.top = `${fallbackY}px`;
    }
  });
  
  // Calculate grid dimensions
  let maxX = 0;
  let maxY = 0;
  
  items.forEach(item => {
    const x = parseInt(item.style.left) + parseInt(item.style.width);
    const y = parseInt(item.style.top) + parseInt(item.style.height);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  });
  
  // Set grid dimensions with extra space for rotation
  grid.style.width = `${maxX + 400}px`;
  grid.style.height = `${maxY + 400}px`;
}

