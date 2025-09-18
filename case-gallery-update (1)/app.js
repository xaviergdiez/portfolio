// Xavier Garcia Portfolio - Complete Case Study Integration (Bug Fixes)
// Modern vanilla JavaScript with enhanced interactive components

// Data structures - FIXED: Correct aspect ratios as per requirements
const bannerSizes = [
    {name: "Leaderboard", dimensions: "728x90", category: "desktop", aspectRatio: 8.1},
    {name: "Medium Rectangle", dimensions: "300x250", category: "universal", aspectRatio: 1.2},
    {name: "Large Mobile Banner", dimensions: "320x100", category: "mobile", aspectRatio: 3.2},
    {name: "Half Page", dimensions: "300x600", category: "desktop", aspectRatio: 0.5},
    {name: "Large Leaderboard", dimensions: "970x250", category: "desktop", aspectRatio: 3.9},
    {name: "Mobile Banner", dimensions: "320x50", category: "mobile", aspectRatio: 6.4},
    {name: "Square", dimensions: "250x250", category: "social", aspectRatio: 1.0},
    {name: "Small Square", dimensions: "200x200", category: "social", aspectRatio: 1.0},
    {name: "Wide Skyscraper", dimensions: "160x600", category: "desktop", aspectRatio: 0.27},
    {name: "Mobile Interstitial", dimensions: "320x480", category: "mobile", aspectRatio: 0.67},
    {name: "Billboard", dimensions: "970x90", category: "desktop", aspectRatio: 10.8},
    {name: "Portrait", dimensions: "300x1050", category: "desktop", aspectRatio: 0.29}
];

const caseStudies = {
    bmw: {
        title: "BMW & MINI Dynamic Asset Management Revolution",
        company: "BMW Group",
        challenge: "Transform global creative operations across BMW & MINI brands through advanced DCO technology, managing 34,000+ assets across 27+ markets while achieving 71% cost reduction and handling 300M+ variable combinations.",
        solution: "Implemented comprehensive dynamic creative optimization system with real-time asset management, automated variable generation, and global campaign consistency while maintaining local market customization capabilities.",
        results: "71% cost reduction achieved while managing 34,000+ assets across 27+ global markets with 300M+ dynamic variable combinations and real-time optimization across all touchpoints.",
        metrics: {
            assets_managed: "34,000+",
            markets: "27+",
            cost_reduction: "71%",
            variables: "300M+",
            efficiency_gain: "85%",
            deployment_speed: "3x faster"
        },
        details: {
            background: "BMW Group required a revolutionary approach to managing their vast creative assets across both BMW and MINI brands globally. The challenge involved coordinating 34,000+ creative assets across 27+ international markets while maintaining brand consistency and achieving significant cost reductions through automation and optimization.",
            approach: [
                "Developed comprehensive DCO framework supporting both BMW and MINI brand guidelines simultaneously",
                "Created automated asset management system handling 300M+ variable combinations in real-time",
                "Implemented global campaign consistency protocols with local market customization capabilities",
                "Built advanced optimization algorithms for real-time creative performance enhancement",
                "Established cross-brand template system reducing production time by 85%",
                "Created unified dashboard for global campaign monitoring and control",
                "Implemented automated A/B testing framework for continuous optimization",
                "Developed smart asset tagging and categorization system for efficient retrieval"
            ],
            outcomes: [
                "71% cost reduction achieved across global creative operations",
                "34,000+ assets successfully managed through automated system",
                "300M+ dynamic variable combinations handled seamlessly",
                "27+ markets supported with consistent brand experience",
                "85% improvement in asset deployment efficiency",
                "3x faster campaign launch times across all regions",
                "Real-time optimization delivering 45% better performance",
                "Global template system reducing creative production costs by 60%"
            ]
        }
    },
    google: {
        title: "Global gTech Display Solutions Leadership Initiative",
        company: "Google gTech",
        challenge: "Lead development team of 15+ engineers across AMER, EMEA, and APAC regions while delivering scalable solutions for Dynamic Remarketing, HTML5 Display Ads, Studio DCO, and DV360 serving millions of customers globally with 24/7 coverage.",
        solution: "Established unified development framework, standardized HTML5 templates for global deployment, implemented cross-regional collaboration processes, and developed enterprise-grade solutions serving both bespoke client needs and scalable support systems.",
        results: "45% reduction in solution deployment time, 500+ custom solutions delivered annually, 98% client satisfaction rate, $66M+ team revenue impact with 24/7 global support coverage across all time zones.",
        metrics: {
            team_size: "15+",
            regions: "3",
            solutions_per_year: "500+",
            satisfaction_rate: "98%",
            coverage: "24/7",
            deployment_improvement: "45%",
            total_revenue_impact: "$66M+",
            conversion_lift: "230%"
        },
        details: {
            background: "As Lead Developer for Google's gTech Display Solutions Team, managed a global development team of 15+ engineers across three major regions: AMER, EMEA, and APAC. This role required establishing technical leadership standards, implementing scalable development processes, and ensuring 24/7 global support coverage while delivering enterprise-grade solutions for millions of customers worldwide.",
            gtech_context: "gTech Ads serves as Google's comprehensive support and technical services division, responsible for the entire Ad products stack from small businesses to enterprise customers globally. Our cross-functional partnerships with Sales, Product, and Engineering teams ensure customers achieve optimal ROI while maintaining Google's position as a trusted advertising partner.",
            approach: [
                "Established unified development framework supporting Dynamic Remarketing, HTML5 Display Ads, Studio DCO, and DV360 across all regions",
                "Implemented standardized HTML5 frameworks for global deployment reducing development time by 45%",
                "Created cross-regional collaboration processes ensuring seamless handoffs across AMER, EMEA, and APAC time zones",
                "Developed enterprise-grade DCO solutions serving both Fortune 500 clients and scalable systems for millions of users",
                "Built comprehensive QA and deployment pipeline supporting 500+ custom solutions annually",
                "Established 24/7 global support coverage with regional expertise and local market knowledge",
                "Implemented advanced performance monitoring and optimization strategies across all global markets",
                "Created scalable training and onboarding programs for distributed team growth"
            ],
            outcomes: [
                "$66M+ total revenue impact generated by global team across all regions",
                "500+ custom solutions delivered annually with consistent quality standards",
                "98% client satisfaction rate maintained across all regions and solution types",
                "45% reduction in solution deployment time through standardized frameworks",
                "24/7 global support coverage implemented with zero downtime handoffs",
                "230% conversion lift achieved through advanced optimization techniques",
                "Enterprise-grade architecture supporting millions of users with 99.9% uptime",
                "Team productivity increased 60% through standardized processes and tools"
            ],
            regional_impact: {
                emea: { 
                    team_size: "6 developers", 
                    revenue: "€15.2M", 
                    specialization: "Dynamic Remarketing & DCO",
                    coverage: "95+ markets"
                },
                amer: { 
                    team_size: "5 developers", 
                    revenue: "$22.8M", 
                    specialization: "HTML5 & Studio Solutions",
                    coverage: "15+ team members"
                },
                apac: { 
                    team_size: "4 developers", 
                    revenue: "$18.6M", 
                    specialization: "DV360 & Mobile Optimization",
                    coverage: "24/7 support"
                }
            }
        }
    },
    huawei: {
        title: "Huawei P30 Pro Dynamic Creative Campaign",
        company: "Huawei Netherlands",
        challenge: "Create highly optimized dynamic creative campaign for Huawei P30 Pro launch in Dutch market using Weborama APTO technology, achieving sub-150KB file sizes while delivering 52% engagement lift and 78% viewability rates.",
        solution: "Developed advanced SVG-based creative system with interactive masking technology, optimized file compression algorithms, and dynamic content adaptation for maximum engagement while maintaining ultra-light file sizes for optimal performance.",
        results: "Sub-150KB creative file sizes achieved with 52% engagement lift, 78% viewability rates in Dutch market, and innovative SVG masking technology providing interactive user experience while maintaining optimal performance.",
        metrics: {
            file_size: "<150KB",
            engagement_lift: "52%",
            viewability: "78%",
            market: "Netherlands",
            technology: "Weborama APTO",
            performance_gain: "45%"
        },
        details: {
            background: "Huawei required an innovative approach for their P30 Pro smartphone launch in the Netherlands market. The challenge involved creating highly engaging creative content while maintaining ultra-lightweight file sizes for optimal performance across all devices and network conditions, utilizing cutting-edge Weborama APTO technology.",
            approach: [
                "Developed advanced SVG-based creative framework for ultra-light file optimization",
                "Created interactive masking technology showcasing P30 Pro features dynamically",
                "Implemented smart compression algorithms maintaining visual quality under 150KB",
                "Built responsive design system adapting to various screen sizes and orientations",
                "Created real-time performance monitoring for engagement and viewability optimization",
                "Developed A/B testing framework for creative element optimization",
                "Implemented progressive loading system for seamless user experience",
                "Created advanced animation system using CSS transforms and SVG manipulations"
            ],
            outcomes: [
                "Sub-150KB file sizes achieved while maintaining premium visual quality",
                "52% engagement lift compared to standard display advertising benchmarks",
                "78% viewability rates achieved across Dutch market campaign deployment",
                "45% performance improvement in loading speed and user interaction",
                "Interactive SVG masking technology delivered unique user experience",
                "Weborama APTO integration optimized for maximum efficiency and impact",
                "Cross-device compatibility ensured consistent experience across platforms",
                "Real-time optimization algorithms improved campaign performance by 35%"
            ]
        }
    },
    fbto: {
        title: "FBTO Health Insurance Rich Media Campaign",
        company: "FBTO Insurance Netherlands",
        challenge: "Create award-winning rich media campaign for FBTO health insurance in Dutch market, achieving 3x CTR improvement vs static ads, 12.6 second time-in-frame engagement, and 61% brand recall lift while winning Weborama Campaign of the Year.",
        solution: "Developed comprehensive rich media framework with interactive video elements, advanced user engagement tracking, dynamic content adaptation, and innovative storytelling techniques specifically designed for insurance product education and conversion optimization.",
        results: "3x CTR improvement vs static advertisements, 12.6 second average time-in-frame engagement, 61% brand recall lift, and Weborama Campaign of the Year award recognition for outstanding creative execution and performance results.",
        metrics: {
            ctr_improvement: "3x",
            time_in_frame: "12.6s",
            brand_recall_lift: "61%",
            market: "Netherlands",
            award: "Campaign of the Year",
            engagement_rate: "87%"
        },
        details: {
            background: "FBTO required a breakthrough campaign for their health insurance products in the highly competitive Dutch market. The challenge involved creating compelling rich media experiences that would educate consumers about complex insurance products while achieving exceptional engagement metrics and brand recognition.",
            approach: [
                "Developed comprehensive rich media framework with interactive video storytelling",
                "Created advanced user engagement tracking system measuring micro-interactions",
                "Implemented dynamic content adaptation based on user behavior and preferences",
                "Built interactive product education modules within rich media experience",
                "Developed advanced animation system combining video and interactive elements",
                "Created smart targeting system for optimal audience segmentation and delivery",
                "Implemented comprehensive A/B testing framework for creative optimization",
                "Built real-time performance monitoring dashboard for campaign optimization"
            ],
            outcomes: [
                "3x CTR improvement compared to static display advertising benchmarks",
                "12.6 second average time-in-frame engagement demonstrating content quality",
                "61% brand recall lift indicating strong brand message retention",
                "87% engagement rate showing exceptional user interaction quality",
                "Weborama Campaign of the Year award for outstanding performance and creativity",
                "Significant increase in insurance quote requests and policy conversions",
                "Industry recognition for innovative approach to insurance marketing",
                "Template framework adopted for subsequent FBTO campaigns with consistent success"
            ]
        }
    }
};

// Animation utilities
class AnimationEngine {
    constructor() {
        this.animations = new Set();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Custom easing functions
    static easings = {
        easeOutQuart: t => 1 - (--t) * t * t * t,
        easeOutCubic: t => (--t) * t * t + 1,
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        easeOutElastic: t => {
            const c4 = (2 * Math.PI) / 3;
            return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
        }
    };

    animate(element, properties, options = {}) {
        if (this.isReducedMotion && !options.forceAnimation) {
            // Apply final state immediately
            Object.keys(properties).forEach(prop => {
                if (prop === 'transform') {
                    element.style.transform = properties[prop];
                } else {
                    element.style[prop] = properties[prop];
                }
            });
            return Promise.resolve();
        }

        const {
            duration = 600,
            easing = AnimationEngine.easings.easeOutCubic,
            delay = 0
        } = options;

        return new Promise(resolve => {
            setTimeout(() => {
                const startTime = performance.now();
                const startValues = {};

                // Get initial values
                Object.keys(properties).forEach(prop => {
                    if (prop === 'opacity') {
                        startValues[prop] = parseFloat(getComputedStyle(element).opacity) || 0;
                    } else if (prop === 'transform') {
                        startValues[prop] = element.style.transform || '';
                    }
                });

                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easing(progress);

                    // Apply animated values
                    Object.keys(properties).forEach(prop => {
                        if (prop === 'opacity') {
                            const startVal = startValues[prop];
                            const endVal = parseFloat(properties[prop]);
                            element.style.opacity = startVal + (endVal - startVal) * easedProgress;
                        } else if (prop === 'transform') {
                            element.style.transform = properties[prop];
                        }
                    });

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        resolve();
                    }
                };

                requestAnimationFrame(animate);
            }, delay);
        });
    }

    // Stagger animations
    stagger(elements, properties, options = {}) {
        const staggerDelay = options.staggerDelay || 100;
        return Promise.all(
            elements.map((element, index) => 
                this.animate(element, properties, {
                    ...options,
                    delay: (options.delay || 0) + (index * staggerDelay)
                })
            )
        );
    }
}

// Main application class
class XavierPortfolio {
    constructor() {
        this.animator = new AnimationEngine();
        this.isLoaded = false;
        this.activeFilter = 'all';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.observers = {};
        this.countersAnimated = false;
        this.bmwChart = null;
        
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Xavier Garcia Portfolio...');
        
        // Apply saved theme immediately
        this.applyTheme(this.currentTheme);
        
        // Setup loading screen
        this.setupLoadingScreen();
        
        // Initialize core functionality
        await this.initializeCore();
        
        // Setup all interactive features
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupHeroAnimations();
        this.setupCounterAnimations();
        this.setupSkillAnimations();
        this.setupBannerGallery();
        this.setupCaseStudyInteractions();
        this.setupContactForm();
        this.setupScrollToTop();
        this.setupParallaxEffects();
        
        console.log('✅ Portfolio initialized successfully');
    }

    async initializeCore() {
        return new Promise(resolve => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    // Loading screen management
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    this.isLoaded = true;
                    this.startHeroAnimations();
                    this.initializeBMWChart();
                }
            }, 1000);
        });

        // Fallback timeout
        setTimeout(() => {
            if (loadingScreen && !this.isLoaded) {
                loadingScreen.classList.add('hidden');
                this.isLoaded = true;
                this.startHeroAnimations();
                this.initializeBMWChart();
            }
        }, 3000);
    }

    // Theme management
    applyTheme(theme) {
        document.body.setAttribute('data-color-scheme', theme);
        
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle?.querySelector('.theme-icon');
        
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
        
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        
        // Update chart colors if exists
        if (this.bmwChart) {
            this.updateChartTheme();
        }
        
        console.log(`Theme applied: ${theme}`);
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
                this.applyTheme(newTheme);
                
                // Add animation feedback
                this.animator.animate(themeToggle, { transform: 'scale(0.9)' }, { duration: 150 })
                    .then(() => this.animator.animate(themeToggle, { transform: 'scale(1)' }, { duration: 150 }));
                
                console.log(`Theme toggled to: ${newTheme}`);
            });
            
            console.log('Theme toggle setup complete');
        }
    }

    // Enhanced Navigation functionality with proper section scrolling
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        console.log('Setting up navigation with', navLinks.length, 'links');
        
        // Smooth scrolling for navigation
        navLinks.forEach((link, index) => {
            console.log(`Setting up nav link ${index}:`, link.getAttribute('href'));
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Nav link clicked:', link.getAttribute('href'));
                
                const targetId = link.getAttribute('href');
                
                if (!targetId || !targetId.startsWith('#')) {
                    console.warn('Invalid target ID:', targetId);
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                console.log('Target element found:', !!targetElement, targetId);
                
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    console.log('Scrolling to position:', offsetPosition);
                    this.smoothScrollTo(offsetPosition);
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close mobile menu
                    this.closeMobileMenu();
                } else {
                    console.error('Target element not found:', targetId);
                }
            });
        });

        // Navbar scroll effect
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Auto-hide on scroll down
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        // Update active nav based on scroll position
        this.updateActiveNavOnScroll();
        
        console.log('Navigation setup complete');
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        console.log('Setting up scroll-based nav updates for', sections.length, 'sections');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionId = section.getAttribute('id');
                if (sectionTop <= 150) {
                    current = sectionId;
                }
            });

            if (current) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    smoothScrollTo(targetPosition) {
        console.log('Starting smooth scroll to:', targetPosition);
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = AnimationEngine.easings.easeOutCubic(timeElapsed / duration);
            window.scrollTo(0, startPosition + (distance * run));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                console.log('Smooth scroll completed');
            }
        };

        requestAnimationFrame(animation);
    }

    // Mobile menu
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', () => {
                const isOpen = navLinks.classList.contains('mobile-open');
                
                if (isOpen) {
                    this.closeMobileMenu();
                } else {
                    this.openMobileMenu();
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    openMobileMenu() {
        const navLinks = document.getElementById('navLinks');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        navLinks.classList.add('mobile-open');
        mobileMenuToggle.classList.add('active');
    }

    closeMobileMenu() {
        const navLinks = document.getElementById('navLinks');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        navLinks.classList.remove('mobile-open');
        mobileMenuToggle.classList.remove('active');
    }

    // Hero animations
    startHeroAnimations() {
        if (!this.isLoaded) return;

        const heroElements = document.querySelectorAll('.hero .animate-in');
        
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });

        // Start counters after hero animation
        setTimeout(() => this.animateCounters(), 800);
    }

    setupHeroAnimations() {
        // Floating cards animation is handled by CSS
        // Add mouse movement parallax effect
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual && !this.animator.isReducedMotion) {
            document.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 20;
                const y = (clientY / window.innerHeight - 0.5) * 20;
                
                const cards = heroVisual.querySelectorAll('.floating-card');
                cards.forEach((card, index) => {
                    const multiplier = (index + 1) * 0.5;
                    card.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
                });
            });
        }
    }

    // Enhanced BMW Chart Integration with proper tooltips
    initializeBMWChart() {
        const chartCanvas = document.getElementById('bmwDonutChart');
        if (!chartCanvas) {
            console.log('BMW chart canvas not found');
            return;
        }

        console.log('Initializing BMW chart...');
        const ctx = chartCanvas.getContext('2d');
        
        const data = {
            labels: ['Dynamic Assets', 'Static Assets', 'Video Content'],
            datasets: [{
                data: [65, 20, 15],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                borderWidth: 2,
                borderColor: '#ffffff',
                cutout: '60%'
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#1FB8CD',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                const label = context.label;
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                
                                return `${percentage}% of total assets`;
                            },
                            afterLabel: function(context) {
                                const label = context.label;
                                
                                // Show multiplication breakdown for BMW
                                if (label === 'Dynamic Assets') {
                                    return [
                                        '• 300M+ variable combinations',
                                        '• 27+ global markets',
                                        '• Real-time optimization'
                                    ];
                                } else if (label === 'Static Assets') {
                                    return [
                                        '• Traditional templates',
                                        '• Legacy campaign support'
                                    ];
                                } else if (label === 'Video Content') {
                                    return [
                                        '• Motion graphics',
                                        '• Product demonstrations'
                                    ];
                                }
                                return [];
                            }
                        },
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 12
                        },
                        padding: 12,
                        boxPadding: 6
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'nearest'
                },
                onHover: (event, elements, chart) => {
                    chartCanvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';
                },
                onClick: (event, elements, chart) => {
                    if (elements.length > 0) {
                        const element = elements[0];
                        const label = chart.data.labels[element.index];
                        console.log('Chart segment clicked:', label);
                        
                        // Add click animation
                        const segmentColor = chart.data.datasets[0].backgroundColor[element.index];
                        this.showNotification(`Clicked: ${label} segment`, 'info');
                    }
                }
            }
        };

        try {
            this.bmwChart = new Chart(ctx, config);
            console.log('BMW donut chart initialized successfully');
        } catch (error) {
            console.error('Error initializing BMW chart:', error);
        }
    }

    updateChartTheme() {
        if (!this.bmwChart) return;
        
        const isDark = this.currentTheme === 'dark';
        
        this.bmwChart.options.plugins.tooltip.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)';
        this.bmwChart.options.plugins.tooltip.titleColor = isDark ? '#000000' : '#ffffff';
        this.bmwChart.options.plugins.tooltip.bodyColor = isDark ? '#000000' : '#ffffff';
        
        this.bmwChart.update();
    }

    // Counter animations
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        if (counters.length === 0) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observers.counters = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    this.animateCounter(counter, target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => this.observers.counters.observe(counter));
    }

    animateCounter(element, target) {
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        const animateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = AnimationEngine.easings.easeOutCubic(progress);
            const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            }
        };

        requestAnimationFrame(animateCounter);
    }

    // Scroll animations
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if (animatedElements.length === 0) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observers.scroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            this.observers.scroll.observe(element);
        });
    }

    // Skill animations
    setupSkillAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        if (skillItems.length === 0) return;

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observers.skills = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target.querySelector('.skill-level');
                    const level = skillLevel.getAttribute('data-level');
                    
                    setTimeout(() => {
                        skillLevel.style.setProperty('--skill-width', `${level}%`);
                    }, 200);
                }
            });
        }, observerOptions);

        skillItems.forEach(item => this.observers.skills.observe(item));

        // Add CSS for skill level animation
        const style = document.createElement('style');
        style.textContent = `
            .skill-level::after {
                width: var(--skill-width, 0%) !important;
                transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Case Study Interactions
    setupCaseStudyInteractions() {
        console.log('Setting up case study interactions...');
        
        // Setup BMW case interactions
        this.setupBMWCaseInteractions();
        
        // Setup Google case interactions  
        this.setupGoogleCaseInteractions();
        
        // Setup Huawei case interactions
        this.setupHuaweiCaseInteractions();
        
        // Setup FBTO case interactions
        this.setupFBTOCaseInteractions();
        
        // Setup case study buttons
        this.setupCaseStudyButtons();
        
        console.log('Case study interactions setup complete');
    }

    setupBMWCaseInteractions() {
        // BMW metric cards hover effects
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!this.animator.isReducedMotion) {
                    this.animator.animate(card, { transform: 'translateY(-4px) scale(1.05)' }, { duration: 300 });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!this.animator.isReducedMotion) {
                    this.animator.animate(card, { transform: 'translateY(0) scale(1)' }, { duration: 300 });
                }
            });
        });

        console.log('BMW case interactions setup complete');
    }

    setupGoogleCaseInteractions() {
        // Region cards hover effects with unique animations per region
        const regionCards = document.querySelectorAll('.region-card');
        
        regionCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!this.animator.isReducedMotion) {
                    // Trigger the CSS shine effect
                    card.style.setProperty('--shine-active', '1');
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--shine-active', '0');
            });
            
            // Click handler for region details
            card.addEventListener('click', () => {
                const region = card.getAttribute('data-region');
                if (region) {
                    this.showRegionDetails(region);
                }
            });
        });
        
        console.log('Google case interactions setup complete');
    }

    setupHuaweiCaseInteractions() {
        // SVG masking demo interactions
        const svgDemo = document.getElementById('huaweiMask');
        if (svgDemo) {
            let isAnimating = false;
            
            svgDemo.addEventListener('click', () => {
                if (isAnimating) return;
                
                isAnimating = true;
                
                // Animate the phone reveal effect
                svgDemo.style.transform = 'scale(1.1) rotateY(10deg)';
                svgDemo.style.boxShadow = '0 20px 40px rgba(0, 212, 170, 0.3)';
                
                setTimeout(() => {
                    svgDemo.style.transform = 'scale(1) rotateY(0deg)';
                    svgDemo.style.boxShadow = 'none';
                    isAnimating = false;
                }, 600);
                
                console.log('Huawei SVG demo activated');
            });

            svgDemo.addEventListener('mouseenter', () => {
                if (!isAnimating && !this.animator.isReducedMotion) {
                    svgDemo.style.transform = 'scale(1.05)';
                }
            });

            svgDemo.addEventListener('mouseleave', () => {
                if (!isAnimating) {
                    svgDemo.style.transform = 'scale(1)';
                }
            });
        }
        
        console.log('Huawei case interactions setup complete');
    }

    setupFBTOCaseInteractions() {
        // Video placeholder interactions
        const videoPlaceholder = document.querySelector('.video-placeholder');
        if (videoPlaceholder) {
            videoPlaceholder.addEventListener('click', () => {
                const playButton = videoPlaceholder.querySelector('.play-button-large');
                const overlay = videoPlaceholder.querySelector('.video-overlay');
                
                // Animate play button
                if (!this.animator.isReducedMotion) {
                    this.animator.animate(playButton, { transform: 'scale(0.8)' }, { duration: 150 })
                        .then(() => this.animator.animate(playButton, { transform: 'scale(1.2)' }, { duration: 150 }))
                        .then(() => this.animator.animate(playButton, { transform: 'scale(1)' }, { duration: 150 }));
                }
                
                // Update overlay text
                overlay.textContent = 'Loading Rich Media...';
                setTimeout(() => {
                    overlay.textContent = 'Rich Media Demo';
                }, 2000);
                
                console.log('FBTO video demo activated');
            });

            videoPlaceholder.addEventListener('mouseenter', () => {
                const playButton = videoPlaceholder.querySelector('.play-button-large');
                if (!this.animator.isReducedMotion) {
                    this.animator.animate(playButton, { transform: 'scale(1.1)' }, { duration: 200 });
                }
            });

            videoPlaceholder.addEventListener('mouseleave', () => {
                const playButton = videoPlaceholder.querySelector('.play-button-large');
                if (!this.animator.isReducedMotion) {
                    this.animator.animate(playButton, { transform: 'scale(1)' }, { duration: 200 });
                }
            });
        }
        
        console.log('FBTO case interactions setup complete');
    }

    setupCaseStudyButtons() {
        // Remove any existing event listeners
        document.removeEventListener('click', this.handleCaseStudyClick);
        
        // Use proper event delegation
        this.handleCaseStudyClick = (e) => {
            const button = e.target.closest('[data-case]');
            if (button) {
                e.preventDefault();
                e.stopPropagation();
                
                const caseType = button.getAttribute('data-case');
                console.log('Case study button clicked:', caseType);
                this.showCaseStudyModal(caseType);
            }
        };
        
        // Add the event listener
        document.addEventListener('click', this.handleCaseStudyClick);
        
        console.log('Case study buttons setup complete');
    }

    showRegionDetails(region) {
        const regionData = caseStudies.google.details.regional_impact[region];
        if (!regionData) return;

        console.log('Showing region details:', region, regionData);
        
        // Create mini modal for region details
        const regionModal = document.createElement('div');
        regionModal.className = 'region-modal';
        regionModal.innerHTML = `
            <div class="region-modal-overlay"></div>
            <div class="region-modal-content">
                <button class="region-modal-close">&times;</button>
                <h3>${region.toUpperCase()} Team Details</h3>
                <div class="region-details">
                    <div class="detail-item">
                        <strong>Team Size:</strong> ${regionData.team_size}
                    </div>
                    <div class="detail-item">
                        <strong>Revenue Impact:</strong> ${regionData.revenue}
                    </div>
                    <div class="detail-item">
                        <strong>Specialization:</strong> ${regionData.specialization}
                    </div>
                    <div class="detail-item">
                        <strong>Coverage:</strong> ${regionData.coverage}
                    </div>
                </div>
            </div>
        `;

        // Add styles
        regionModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 4000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
        `;

        const content = regionModal.querySelector('.region-modal-content');
        content.style.cssText = `
            background: var(--color-surface);
            border-radius: var(--radius-lg);
            padding: var(--space-32);
            max-width: 400px;
            width: 90%;
            position: relative;
            box-shadow: var(--shadow-lg);
        `;

        document.body.appendChild(regionModal);
        document.body.style.overflow = 'hidden';

        // Setup close handler
        const closeModal = () => {
            regionModal.remove();
            document.body.style.overflow = '';
        };

        regionModal.querySelector('.region-modal-close').addEventListener('click', closeModal);
        regionModal.querySelector('.region-modal-overlay').addEventListener('click', closeModal);

        // Keyboard handler
        const keyHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', keyHandler);
            }
        };
        document.addEventListener('keydown', keyHandler);
    }

    showCaseStudyModal(caseType) {
        console.log('Showing case study modal for:', caseType);
        
        const caseData = caseStudies[caseType];
        if (!caseData) {
            console.error('Case study data not found for:', caseType);
            return;
        }

        // Remove existing modal if present
        const existingModal = document.getElementById('caseStudyModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create new modal
        const modal = document.createElement('div');
        modal.id = 'caseStudyModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body" id="caseStudyContent">
                    <!-- Content populated by JavaScript -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const modalContent = document.getElementById('caseStudyContent');
        modalContent.innerHTML = this.generateCaseStudyContent(caseType, caseData);

        // Setup close handlers for this specific modal instance
        this.setupModalCloseHandlers(modal);
        
        // Show modal with slight delay to ensure DOM is ready
        setTimeout(() => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }, 50);
        
        console.log('Case study modal displayed');
    }

    generateCaseStudyContent(caseType, caseData) {
        const brandColors = {
            bmw: { primary: '#0066cc', secondary: '#e6f2ff', name: 'BMW' },
            google: { primary: '#4285f4', secondary: '#e8f0fe', name: 'Google' },
            huawei: { primary: '#00d4aa', secondary: '#e6faf7', name: 'Huawei' },
            fbto: { primary: '#e91e63', secondary: '#fce4ec', name: 'FBTO' }
        };

        const brand = brandColors[caseType];
        
        return `
            <div class="case-study-modal ${caseType}-modal">
                <div class="case-modal-header">
                    <div class="brand-header" style="color: ${brand.primary};">
                        <h2>${brand.name}</h2>
                        <div class="case-modal-category">${caseData.company}</div>
                    </div>
                    <h1>${caseData.title}</h1>
                </div>
                
                <div class="case-modal-stats">
                    <h3>Key Metrics</h3>
                    <div class="stats-grid ${caseType}-stats">
                        ${Object.entries(caseData.metrics).map(([key, value]) => `
                            <div class="stat-item">
                                <span class="stat-number">${value}</span>
                                <span class="stat-label">${key.replace(/_/g, ' ').toUpperCase()}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="case-modal-overview">
                    <div class="case-modal-section">
                        <h3>The Challenge</h3>
                        <p>${caseData.challenge}</p>
                    </div>
                    
                    <div class="case-modal-section">
                        <h3>Background</h3>
                        <p>${caseData.details.background}</p>
                    </div>
                </div>

                <div class="case-modal-approach">
                    <h3>Our Approach</h3>
                    <div class="approach-list">
                        ${caseData.details.approach.map((item, index) => `
                            <div class="approach-item">
                                <div class="approach-number" style="background: ${brand.primary};">${(index + 1).toString().padStart(2, '0')}</div>
                                <div class="approach-content">${item}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="case-modal-results">
                    <h3>Results & Impact</h3>
                    <div class="results-grid">
                        ${caseData.details.outcomes.map(outcome => `
                            <div class="result-item">
                                <div class="result-icon" style="color: ${brand.primary};">🚀</div>
                                <div class="result-text">${outcome}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${caseType === 'google' ? this.generateGoogleSpecificContent(caseData, brand) : ''}

                <div class="case-modal-cta" style="border-color: ${brand.primary};">
                    <h4 style="color: ${brand.primary};">Ready to achieve similar results?</h4>
                    <p>Let's discuss how we can transform your campaign performance with proven methodologies.</p>
                    <button class="btn btn--primary close-modal-cta" style="background: ${brand.primary};">Start Your Project</button>
                </div>
            </div>
        `;
    }

    generateGoogleSpecificContent(caseData, brand) {
        if (!caseData.details.regional_impact) return '';
        
        return `
            <div class="regional-breakdown">
                <h3>Regional Team Performance</h3>
                <div class="regions-grid">
                    ${Object.entries(caseData.details.regional_impact).map(([region, data]) => `
                        <div class="region-card">
                            <div class="region-header">
                                <h4>${region.toUpperCase()} Team</h4>
                                <span class="market-count">${data.team_size}</span>
                            </div>
                            <div class="revenue-impact">${data.revenue}</div>
                            <div class="performance">${data.specialization}</div>
                            <div class="coverage-info">${data.coverage}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    setupModalCloseHandlers(modal) {
        if (!modal) return;

        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        const ctaBtn = modal.querySelector('.close-modal-cta');

        const closeModal = () => {
            console.log('Closing case study modal');
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            // Remove modal after animation
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
            }, 300);
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }
        
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                closeModal();
                // Scroll to contact section
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        const headerOffset = 100;
                        const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset;
                        this.smoothScrollTo(offsetPosition);
                    }
                }, 350);
            });
        }

        // Keyboard handler
        const keyHandler = (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
                document.removeEventListener('keydown', keyHandler);
            }
        };
        
        document.addEventListener('keydown', keyHandler);
    }

    // FIXED: Banner gallery with correct aspect ratios
    setupBannerGallery() {
        this.renderBannerGallery();
        this.setupGalleryFilters();
    }

    renderBannerGallery(filter = 'all') {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        let filteredBanners = bannerSizes;
        
        if (filter !== 'all') {
            filteredBanners = bannerSizes.filter(banner => 
                banner.category === filter || banner.category === 'universal'
            );
        }

        galleryGrid.innerHTML = '';

        filteredBanners.forEach((banner, index) => {
            const bannerItem = this.createBannerItem(banner);
            galleryGrid.appendChild(bannerItem);
            
            // Stagger animation
            setTimeout(() => {
                bannerItem.style.opacity = '1';
                bannerItem.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    createBannerItem(banner) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.4s ease';

        // FIXED: Calculate preview height based on CORRECT aspect ratio
        // Base dimensions for visual scaling
        const baseWidth = 280; // Max width for gallery items
        const [actualWidth, actualHeight] = banner.dimensions.split('x').map(Number);
        
        // Calculate scaled dimensions maintaining aspect ratio
        let previewWidth = baseWidth;
        let previewHeight = baseWidth / banner.aspectRatio;
        
        // Ensure reasonable height bounds
        if (previewHeight > 200) {
            previewHeight = 200;
            previewWidth = previewHeight * banner.aspectRatio;
        }
        if (previewHeight < 40) {
            previewHeight = 40;
            previewWidth = previewHeight * banner.aspectRatio;
        }

        item.innerHTML = `
            <div class="banner-preview" style="
                height: ${previewHeight}px; 
                width: ${previewWidth}px; 
                max-width: 100%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--color-bg-1);
                border: 2px dashed var(--color-border);
                border-radius: var(--radius-base);
                position: relative;
            ">
                <div style="
                    font-size: 14px; 
                    font-weight: bold; 
                    color: var(--color-primary);
                    text-align: center;
                    line-height: 1.2;
                ">
                    <div>${banner.dimensions}</div>
                    <div style="font-size: 10px; opacity: 0.7; margin-top: 4px;">
                        ${banner.aspectRatio}:1 ratio
                    </div>
                </div>
            </div>
            <div class="banner-name" style="margin-top: var(--space-12); font-weight: var(--font-weight-bold);">${banner.name}</div>
            <div class="banner-dimensions" style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">${banner.dimensions} pixels</div>
            <div class="banner-category" style="
                background: var(--color-secondary);
                padding: 4px 8px;
                border-radius: var(--radius-sm);
                font-size: 11px;
                text-transform: uppercase;
                margin-top: 8px;
                display: inline-block;
                color: var(--color-text-secondary);
            ">${banner.category}</div>
        `;

        // Add click handler for lightbox
        item.addEventListener('click', () => {
            console.log('Banner item clicked:', banner.name);
            this.showBannerLightbox(banner);
        });

        return item;
    }

    setupGalleryFilters() {
        const filterChips = document.querySelectorAll('.filter-chip');
        
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                // Update active state
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                
                // Apply filter
                const filter = chip.getAttribute('data-filter');
                this.activeFilter = filter;
                this.renderBannerGallery(filter);
            });
        });
    }

    showBannerLightbox(banner) {
        console.log('Showing banner lightbox for:', banner.name);
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.id = 'bannerLightbox';
        
        const lightboxContent = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-image"></div>
                <div class="lightbox-caption"></div>
            </div>
        `;
        
        lightbox.innerHTML = lightboxContent;
        document.body.appendChild(lightbox);

        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        
        // FIXED: Calculate preview dimensions with correct aspect ratio
        const maxWidth = Math.min(600, window.innerWidth * 0.8);
        const maxHeight = Math.min(400, window.innerHeight * 0.6);
        
        // Use correct aspect ratio calculation
        let previewWidth = maxWidth;
        let previewHeight = maxWidth / banner.aspectRatio;
        
        // Ensure it fits in viewport
        if (previewHeight > maxHeight) {
            previewHeight = maxHeight;
            previewWidth = previewHeight * banner.aspectRatio;
        }

        lightboxImage.innerHTML = `
            <div style="
                width: ${previewWidth}px;
                height: ${previewHeight}px;
                background: linear-gradient(135deg, var(--color-bg-1), var(--color-bg-2));
                border: 3px solid var(--color-primary);
                border-radius: var(--radius-lg);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: bold;
                color: var(--color-primary);
                margin: 0 auto;
                position: relative;
            ">
                <div>${banner.dimensions}</div>
                <div style="font-size: 14px; opacity: 0.7; margin-top: 8px;">
                    Aspect Ratio: ${banner.aspectRatio}:1
                </div>
                <div style="
                    position: absolute;
                    bottom: 8px;
                    right: 8px;
                    font-size: 10px;
                    opacity: 0.5;
                    color: var(--color-text-secondary);
                ">
                    Banner Preview
                </div>
            </div>
        `;
        
        lightboxCaption.innerHTML = `
            <h3 style="color: var(--color-primary); margin-bottom: 16px;">${banner.name}</h3>
            <p><strong>Dimensions:</strong> ${banner.dimensions} pixels</p>
            <p><strong>Aspect Ratio:</strong> ${banner.aspectRatio}:1</p>
            <p><strong>Category:</strong> ${banner.category.charAt(0).toUpperCase() + banner.category.slice(1)}</p>
            <p style="font-style: italic; opacity: 0.8;">Professional banner template available for purchase</p>
        `;

        // Show lightbox
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Setup close handlers
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const overlay = lightbox.querySelector('.lightbox-overlay');
        
        const closeLightbox = () => {
            console.log('Closing banner lightbox');
            lightbox.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', keyHandler);
        };
        
        const keyHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', keyHandler);
        
        console.log('Banner lightbox displayed');
    }

    // Contact form
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmission(contactForm);
        });
    }

    async handleContactSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Clear previous errors
        this.clearFormErrors(form);
        
        // Validation
        const errors = this.validateContactForm(data);
        if (errors.length > 0) {
            errors.forEach(error => this.showFieldError(form.querySelector(`[name="${error.field}"]`), error.message));
            this.showNotification('Please fix the errors and try again.', 'error');
            return;
        }

        // Submit animation
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Add loading animation
        submitBtn.style.opacity = '0.7';
        
        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success
        this.showNotification('Thank you! I\'ll get back to you within 24 hours.', 'success');
        form.reset();
        this.clearFormErrors(form);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }

    validateContactForm(data) {
        const errors = [];
        
        if (!data.name?.trim()) {
            errors.push({ field: 'name', message: 'Name is required' });
        }
        
        if (!data.email?.trim()) {
            errors.push({ field: 'email', message: 'Email is required' });
        } else if (!this.isValidEmail(data.email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address' });
        }
        
        if (!data.message?.trim()) {
            errors.push({ field: 'message', message: 'Project details are required' });
        }
        
        return errors;
    }

    showFieldError(field, message) {
        if (!field) return;
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        field.style.borderColor = 'var(--color-error)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: var(--color-error);
            font-size: var(--font-size-sm);
            margin-top: var(--space-4);
        `;
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFormErrors(form) {
        const fields = form.querySelectorAll('.form-control');
        fields.forEach(field => field.style.borderColor = '');
        
        const errors = form.querySelectorAll('.field-error');
        errors.forEach(error => error.remove());
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const bgColor = type === 'success' ? 'rgba(var(--color-success-rgb), 0.1)' :
                        type === 'error' ? 'rgba(var(--color-error-rgb), 0.1)' :
                        'var(--color-surface)';
        
        const borderColor = type === 'success' ? 'var(--color-success)' :
                           type === 'error' ? 'var(--color-error)' :
                           'var(--color-border)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: var(--space-16) var(--space-24);
            background: ${bgColor};
            border: 1px solid ${borderColor};
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-lg);
            z-index: 4000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform var(--duration-normal) var(--ease-standard);
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
                <span style="color: var(--color-text);">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    opacity: 0.7;
                    color: var(--color-text);
                ">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        
        // Auto remove
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Parallax and scroll effects
    setupParallaxEffects() {
        if (this.animator.isReducedMotion) return;

        const parallaxElements = document.querySelectorAll('.section-number');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Scroll to top
    setupScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--color-primary);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all var(--duration-normal) var(--ease-standard);
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            this.smoothScrollTo(0);
        });
    }

    // Cleanup
    destroy() {
        Object.values(this.observers).forEach(observer => observer.disconnect());
        if (this.handleCaseStudyClick) {
            document.removeEventListener('click', this.handleCaseStudyClick);
        }
        if (this.bmwChart) {
            this.bmwChart.destroy();
        }
    }
}

// Global styles injection for dynamic elements
const dynamicStyles = `
    .case-study-modal {
        max-width: 900px;
        margin: 0 auto;
    }
    
    .case-modal-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 2px solid var(--color-border);
    }
    
    .brand-header {
        margin-bottom: 1rem;
    }
    
    .brand-header h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .case-modal-category {
        background: var(--color-secondary);
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 1px;
        color: var(--color-text-secondary);
        display: inline-block;
    }
    
    .case-modal-header h1 {
        margin: 1rem 0;
        color: var(--color-primary);
        font-size: 2rem;
        font-weight: bold;
    }
    
    .case-modal-stats {
        margin-bottom: 2rem;
    }
    
    .case-modal-stats h3 {
        color: var(--color-primary);
        margin-bottom: 1rem;
        font-size: 1.25rem;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .stat-item {
        text-align: center;
        padding: 1rem;
        background: var(--color-bg-1);
        border-radius: 8px;
        border: 1px solid var(--color-border);
        transition: transform 0.2s ease;
    }
    
    .stat-item:hover {
        transform: translateY(-2px);
    }
    
    .stat-number {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--color-primary);
        margin-bottom: 0.25rem;
    }
    
    .stat-label {
        font-size: 0.75rem;
        color: var(--color-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    .case-modal-section {
        margin-bottom: 2rem;
    }
    
    .case-modal-section h3 {
        color: var(--color-primary);
        margin-bottom: 1rem;
        font-size: 1.25rem;
    }
    
    .approach-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .approach-item {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
    }
    
    .approach-number {
        background: var(--color-primary);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        flex-shrink: 0;
    }
    
    .approach-content {
        flex: 1;
        padding-top: 8px;
        line-height: 1.6;
    }
    
    .results-grid {
        display: grid;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .result-item {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        padding: 1rem;
        background: var(--color-bg-1);
        border-radius: 8px;
        border-left: 4px solid var(--color-primary);
    }
    
    .result-icon {
        font-size: 1.25rem;
        flex-shrink: 0;
    }
    
    .result-text {
        line-height: 1.6;
    }
    
    .regional-breakdown {
        margin-bottom: 2rem;
        padding: 2rem;
        background: var(--color-bg-1);
        border-radius: 12px;
        border: 1px solid var(--color-border);
    }
    
    .regional-breakdown h3 {
        color: var(--color-primary);
        margin-bottom: 1.5rem;
        text-align: center;
        font-size: 1.5rem;
    }
    
    .regions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
    }
    
    .region-card {
        background: var(--color-surface);
        border-radius: 12px;
        padding: 1.5rem;
        border: 2px solid var(--color-border);
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .region-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
        border-color: var(--color-primary);
    }
    
    .region-header {
        margin-bottom: 1rem;
    }
    
    .region-header h4 {
        font-size: 1.25rem;
        color: var(--color-primary);
        margin-bottom: 0.5rem;
        font-weight: bold;
    }
    
    .market-count {
        background: var(--color-secondary);
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 0.75rem;
        color: var(--color-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    .revenue-impact {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--color-success);
        margin-bottom: 0.5rem;
    }
    
    .performance,
    .coverage-info {
        color: var(--color-primary);
        font-weight: semibold;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
    }
    
    .case-modal-cta {
        text-align: center;
        padding: 2rem;
        background: var(--color-bg-2);
        border-radius: 12px;
        margin-top: 2rem;
        border: 2px solid var(--color-primary);
    }
    
    .case-modal-cta h4 {
        margin-bottom: 0.5rem;
    }
    
    .case-modal-cta p {
        margin-bottom: 1.5rem;
        color: var(--color-text-secondary);
    }
    
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
    }
    
    .lightbox-content {
        position: relative;
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        padding: var(--space-48);
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--shadow-lg);
    }
    
    .lightbox-close {
        position: absolute;
        top: var(--space-20);
        right: var(--space-24);
        background: none;
        border: none;
        font-size: var(--font-size-2xl);
        cursor: pointer;
        color: var(--color-text-secondary);
        transition: color var(--duration-fast) var(--ease-standard);
    }
    
    .lightbox-close:hover {
        color: var(--color-text);
    }
    
    .lightbox-caption {
        text-align: center;
        margin-top: 1rem;
    }
    
    .lightbox-caption h3 {
        margin-bottom: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .case-modal-header h1 {
            font-size: 1.5rem;
        }
        
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .regions-grid {
            grid-template-columns: 1fr;
        }
        
        .approach-item {
            flex-direction: column;
            text-align: center;
        }
        
        .approach-number {
            align-self: center;
        }
        
        .lightbox-content {
            margin: var(--space-20);
            padding: var(--space-24);
        }
        
        .regional-breakdown {
            padding: 1rem;
        }
    }
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.textContent = dynamicStyles;
document.head.appendChild(styleElement);

// Initialize application
let portfolioInstance;

document.addEventListener('DOMContentLoaded', () => {
    portfolioInstance = new XavierPortfolio();
    
    // Make instance globally accessible for onclick handlers
    window.XavierPortfolio = { instance: portfolioInstance };
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && portfolioInstance) {
        // Restart animations if needed
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { XavierPortfolio, AnimationEngine };
}