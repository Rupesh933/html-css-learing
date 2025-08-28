// Djinn Webpage - Complete JavaScript Enhancement
// Author: Enhanced for modern web experience

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features once DOM is loaded
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeInteractiveElements();
    initializeFormHandling();
    initializeMobileFeatures();
});

// ==================== NAVIGATION SYSTEM ====================
function initializeNavigation() {
    const navbar = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-menu a:not([href*="mailto"]):not([href*="tel"])');
    const sections = document.querySelectorAll('section[id], .hero-section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetText = this.textContent.trim();
            let targetSection;
            
            // Map navigation text to sections
            switch(targetText) {
                case 'HOME':
                    targetSection = document.querySelector('.hero-section');
                    break;
                case 'MENUS':
                    targetSection = document.querySelector('.menu-section');
                    break;
                case 'ABOUT US':
                    targetSection = document.querySelector('.service h2');
                    break;
                case 'CONTACT':
                    targetSection = document.querySelector('.contact');
                    break;
            }
            
            if (targetSection) {
                smoothScrollTo(targetSection);
            }
        });
    });

    // Navigation bar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            // Add background on scroll
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
            
            lastScrollY = currentScrollY;
        }
    });

    // Active section highlighting
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveNavLink(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function smoothScrollTo(target) {
    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

function updateActiveNavLink(activeSection) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class based on section
    if (activeSection.classList.contains('hero-section')) {
        document.querySelector('.nav-menu a[href="#"]').classList.add('active');
    } else if (activeSection.classList.contains('menu-section')) {
        const menuLink = Array.from(navLinks).find(link => 
            link.textContent.includes('MENUS'));
        if (menuLink) menuLink.classList.add('active');
    }
}

// ==================== SCROLL EFFECTS & ANIMATIONS ====================
function initializeScrollEffects() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // Scroll indicator animation
    animateScrollIndicator();
    
    // Reveal animations on scroll
    initializeRevealAnimations();
}

function animateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', function() {
        const opacity = Math.max(0, 1 - window.scrollY / 300);
        scrollIndicator.style.opacity = opacity;
    });
    
    // Click to scroll functionality
    scrollIndicator.addEventListener('click', function() {
        const serviceSection = document.querySelector('.service');
        if (serviceSection) {
            smoothScrollTo(serviceSection);
        }
    });
}

function initializeRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Add staggered animation for grid items
                if (entry.target.closest('.service-grid') || entry.target.closest('.sample-grid')) {
                    addStaggeredAnimation(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for reveal animations
    const elementsToReveal = document.querySelectorAll(`
        .service-card, .service-card2, .sample-menu, 
        .option-menu, .contact-item, h2, h3
    `);
    
    elementsToReveal.forEach((el, index) => {
        el.classList.add('reveal-element');
        el.style.animationDelay = `${index * 0.1}s`;
        revealObserver.observe(el);
    });
}

function addStaggeredAnimation(element) {
    const siblings = element.parentNode.children;
    Array.from(siblings).forEach((sibling, index) => {
        if (sibling.classList.contains('reveal-element')) {
            sibling.style.animationDelay = `${index * 0.2}s`;
        }
    });
}

// ==================== INTERACTIVE ELEMENTS ====================
function initializeAnimations() {
    // Hero content typewriter effect
    initializeTypewriter();
    
    // Floating elements animation
    initializeFloatingElements();
    
    // Image hover effects
    initializeImageEffects();
    
    // Button animations
    initializeButtonAnimations();
}

function initializeTypewriter() {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroText = document.querySelector('.hero-content p');
    
    if (heroTitle && heroText) {
        // Add typewriter effect to hero title
        const titleText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid #d4af37';
        
        let titleIndex = 0;
        const typeTitle = () => {
            if (titleIndex < titleText.length) {
                heroTitle.textContent += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeTitle, 100);
            } else {
                heroTitle.style.borderRight = 'none';
                // Start paragraph animation
                setTimeout(() => {
                    heroText.classList.add('fade-in-up');
                }, 500);
            }
        };
        
        setTimeout(typeTitle, 1000);
    }
}

function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.food-survey, .service-img2');
    
    floatingElements.forEach((element, index) => {
        // Add floating animation with different delays
        element.style.animation = `float 3s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

function initializeImageEffects() {
    const images = document.querySelectorAll('img:not(.social-medias img)');
    
    images.forEach(img => {
        // Lazy loading effect
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Hover zoom effect
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log(`Image failed to load: ${this.src}`);
        });
    });
}

function initializeButtonAnimations() {
    const buttons = document.querySelectorAll('button, .book');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // Hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ==================== INTERACTIVE FEATURES ====================
function initializeInteractiveElements() {
    // Menu hover effects
    initializeMenuInteractions();
    
    // Service card interactions
    initializeServiceCardEffects();
    
    // Social media animations
    initializeSocialMediaEffects();
    
    // Dynamic content loading
    initializeDynamicContent();
}

function initializeMenuInteractions() {
    const menuOptions = document.querySelectorAll('.option-menu');
    const sampleMenus = document.querySelectorAll('.sample-menu');
    
    menuOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.classList.add('menu-hover');
            // Highlight related sample menus
            sampleMenus.forEach(menu => menu.classList.add('highlight'));
        });
        
        option.addEventListener('mouseleave', function() {
            this.classList.remove('menu-hover');
            sampleMenus.forEach(menu => menu.classList.remove('highlight'));
        });
    });
}

function initializeServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card, .service-card2');
    
    serviceCards.forEach(card => {
        // Tilt effect on hover
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);
            
            const tiltX = deltaY * 10;
            const tiltY = deltaX * -10;
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${tiltX}deg) 
                rotateY(${tiltY}deg) 
                translateZ(20px)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

function initializeSocialMediaEffects() {
    const socialIcons = document.querySelectorAll('.social-medias img');
    
    socialIcons.forEach((icon, index) => {
        // Bounce animation on page load
        setTimeout(() => {
            icon.style.animation = 'bounceIn 0.6s ease-out';
        }, index * 200);
        
        // Hover rotation effect
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(15deg) scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

function initializeDynamicContent() {
    // Dynamic menu highlighting based on time of day
    const currentHour = new Date().getHours();
    const menuSection = document.querySelector('.menu-section');
    
    if (menuSection) {
        if (currentHour >= 6 && currentHour < 12) {
            menuSection.classList.add('breakfast-time');
        } else if (currentHour >= 12 && currentHour < 17) {
            menuSection.classList.add('lunch-time');
        } else {
            menuSection.classList.add('dinner-time');
        }
    }
    
    // Random featured dish rotation
    rotateFeaturedDish();
}

function rotateFeaturedDish() {
    const dishes = [
        'Malabar Biryani', 'Mango Fish Curry', 
        'Kerala Banana Fritters', 'Ada Pradhaman'
    ];
    
    const heroText = document.querySelector('.hero-content p');
    if (heroText) {
        const originalText = heroText.textContent;
        
        setInterval(() => {
            const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
            const specialText = `${originalText} Today's special: ${randomDish}!`;
            
            // Briefly show special dish
            setTimeout(() => {
                heroText.textContent = specialText;
                heroText.classList.add('highlight-text');
                
                setTimeout(() => {
                    heroText.textContent = originalText;
                    heroText.classList.remove('highlight-text');
                }, 3000);
            }, Math.random() * 2000);
        }, 15000); // Every 15 seconds
    }
}

// ==================== FORM HANDLING & CONTACT ====================
function initializeFormHandling() {
    const bookButtons = document.querySelectorAll('button[type="button"], .book');
    const contactLinks = document.querySelectorAll('a[href^="tel"], a[href^="mailto"]');
    
    // Book consultation handling
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleBookConsultation(this);
        });
    });
    
    // Contact link tracking
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackContactInteraction(this);
        });
    });
    
    // Newsletter simulation (if needed)
    initializeNewsletterSignup();
}

function handleBookConsultation(button) {
    // Show booking confirmation
    showNotification('Redirecting to consultation booking...', 'success');
    
    // Simulate booking process
    button.textContent = 'BOOKING...';
    button.disabled = true;
    
    setTimeout(() => {
        // In a real app, this would redirect to booking form
        const phoneNumber = '+919334529892';
        const message = encodeURIComponent('Hi! I would like to book a consultation for catering services.');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        
        button.textContent = 'PLAN YOUR FEAST';
        button.disabled = false;
    }, 1500);
}

function trackContactInteraction(link) {
    const contactType = link.href.includes('tel') ? 'phone' : 'email';
    showNotification(`Opening ${contactType} app...`, 'info');
    
    // Analytics tracking would go here
    console.log(`Contact interaction: ${contactType} - ${link.href}`);
}

function initializeNewsletterSignup() {
    // Create a floating newsletter signup (optional)
    const newsletter = createNewsletterPopup();
    
    // Show after 30 seconds of browsing
    setTimeout(() => {
        if (newsletter && !localStorage.getItem('newsletter_shown')) {
            newsletter.classList.add('show');
            localStorage.setItem('newsletter_shown', 'true');
        }
    }, 30000);
}

function createNewsletterPopup() {
    const popup = document.createElement('div');
    popup.className = 'newsletter-popup';
    popup.innerHTML = `
        <div class="newsletter-content">
            <button class="close-newsletter">&times;</button>
            <h3>Stay Updated!</h3>
            <p>Get notified about our special menus and offers</p>
            <div class="newsletter-form">
                <input type="email" placeholder="Enter your email">
                <button type="button" class="subscribe-btn">Subscribe</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Close functionality
    popup.querySelector('.close-newsletter').addEventListener('click', () => {
        popup.remove();
    });
    
    return popup;
}

// ==================== MOBILE FEATURES ====================
function initializeMobileFeatures() {
    // Mobile menu toggle
    initializeMobileMenu();
    
    // Touch gestures
    initializeTouchGestures();
    
    // Mobile-specific animations
    initializeMobileAnimations();
}

function initializeMobileMenu() {
    // Create mobile menu button
    const navbar = document.querySelector('.nav-bar');
    if (navbar && window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        
        navbar.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('mobile-open');
            this.textContent = navMenu.classList.contains('mobile-open') ? '✕' : '☰';
        });
    }
}

function initializeTouchGestures() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    });
    
    function handleSwipeGesture() {
        const swipeDistance = touchStartY - touchEndY;
        
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                // Swipe up - show navigation
                document.querySelector('.nav-bar')?.classList.remove('nav-hidden');
            } else {
                // Swipe down - hide navigation (if not at top)
                if (window.scrollY > 100) {
                    document.querySelector('.nav-bar')?.classList.add('nav-hidden');
                }
            }
        }
    }
}

function initializeMobileAnimations() {
    // Reduced motion for mobile
    if (window.innerWidth <= 768) {
        const elements = document.querySelectorAll('[style*="animation"]');
        elements.forEach(el => {
            const currentAnimation = el.style.animation;
            el.style.animation = currentAnimation.replace(/\d+s/g, '1s'); // Speed up animations
        });
    }
}

// ==================== UTILITY FUNCTIONS ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const optimizedScrollHandler = debounce(function() {
    // Handle scroll-heavy operations here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ==================== CSS ANIMATIONS (to be added to CSS) ====================
const dynamicStyles =` 
<style>
/* Navigation Effects */
.nav-bar {
    transition: all 0.3s ease;
}

.nav-bar.scrolled {
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
}

.nav-bar.nav-hidden {
    transform: translateY(-100%);
}

.nav-menu a.active {
    color: #d4af37;
}

/* Reveal Animations */
.reveal-element {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.reveal-element.revealed {
    opacity: 1;
    transform: translateY(0);
}

/* Floating Animation */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

/* Ripple Effect */
@keyframes ripple {
    to { transform: scale(4); opacity: 0; }
}

/* Menu Interactions */
.option-menu.menu-hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.sample-menu.highlight {
    border-left: 3px solid #d4af37;
    transform: translateX(10px);
}

/* Text Effects */
.highlight-text {
    color: #d4af37;
    animation: pulse 1s ease-in-out;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

/* Mobile Menu */
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: block;
    }
    
    .nav-menu.mobile-open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.9);
        padding: 1rem;
    }
}

/* Notifications */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 2rem;
    border-radius: 5px;
    color: white;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 10000;
}

.notification.show {
    transform: translateX(0);
}

.notification-success { background: #27ae60; }
.notification-info { background: #3498db; }
.notification-warning { background: #f39c12; }
.notification-error { background: #e74c3c; }
</style>
`;

// Inject dynamic styles
document.head.insertAdjacentHTML('beforeend', dynamicStyles);

console.log('🎉 Djinn webpage enhanced with complete JavaScript functionality!');