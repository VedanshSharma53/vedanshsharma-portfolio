// Vedansh Sharma Portfolio - Interactive Features (Fixed Version)

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    initThemeToggle();
    initSmoothScrolling();
    initScrollAnimations();
    initSkillsAnimation();
    initNavigationHighlight();
    initContactForm();
    initMobileNavigation();
    initTypingAnimation();
    initParallaxEffect();
}

// Theme Toggle Functionality - Fixed
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    setTheme(currentTheme);
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    
    const themeIcon = document.querySelector('#themeToggle i');
    
    if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill';
        document.documentElement.style.setProperty('--color-scheme', 'dark');
    } else {
        themeIcon.className = 'bi bi-moon-fill';
        document.documentElement.style.setProperty('--color-scheme', 'light');
    }
    
    // Update theme-dependent elements
    updateThemeElements();
}

function updateThemeElements() {
    // Force repaint for webkit backdrop-filter
    const glassElements = document.querySelectorAll('.glass-card, .glass-nav');
    glassElements.forEach(element => {
        element.style.transform = 'translateZ(0)';
        setTimeout(() => {
            element.style.transform = '';
        }, 10);
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // Smooth scrolling for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger skill animations when skills section is visible
                if (entry.target.id === 'skills') {
                    setTimeout(() => {
                        animateSkills();
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.glass-card, .project-card, .timeline-item');
    
    sections.forEach(section => observer.observe(section));
    cards.forEach(card => observer.observe(card));
}

// Skills Progress Bar Animation
function initSkillsAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const progressBar = card.querySelector('.progress-bar');
        const targetWidth = progressBar.getAttribute('data-width');
        
        // Store target width for CSS animation
        progressBar.style.setProperty('--target-width', targetWidth);
    });
}

function animateSkills() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = targetWidth;
            bar.parentElement.parentElement.classList.add('animate');
        }, index * 150); // Stagger the animations
    });
}

// Navigation Highlight on Scroll
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 100; // Account for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formEntries = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully!', 'success');
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Mobile Navigation
function initMobileNavigation() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navbarCollapse.contains(e.target) || navbarToggler.contains(e.target);
        
        if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
}

// Typing Animation for Hero Section - Fixed to not interfere with theme toggle
function initTypingAnimation() {
    const greetingElement = document.querySelector('.greeting');
    if (!greetingElement) return;
    
    const greetings = [
        "Hello, I'm",
        "नमस्ते, मैं हूँ", 
        "¡Hola, soy",
        "Bonjour, je suis"
    ];
    
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isTyping = false;
    
    function typeText() {
        if (!isTyping) return; // Safety check
        
        const currentText = greetings[currentIndex];
        
        if (isDeleting) {
            greetingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            greetingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % greetings.length;
            typeSpeed = 300; // Pause before typing new text
        }
        
        if (isTyping) {
            setTimeout(typeText, typeSpeed);
        }
    }
    
    // Start typing animation after page load
    setTimeout(() => {
        isTyping = true;
        typeText();
    }, 1500);
    
    // Pause typing when not visible (performance optimization)
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isTyping = entry.isIntersecting;
                if (isTyping && charIndex === 0 && !isDeleting) {
                    setTimeout(typeText, 500);
                }
            });
        });
        heroObserver.observe(heroSection);
    }
}

// Parallax Effect for Hero Background
function initParallaxEffect() {
    const animatedBg = document.querySelector('.animated-bg');
    
    if (animatedBg) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            animatedBg.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification-alert');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} position-fixed notification-alert`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;
    
    const iconClass = type === 'success' ? 'check-circle-fill' : 'info-circle-fill';
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${iconClass} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()" aria-label="Close"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Enhanced scroll handling with throttling
const throttledScrollHandler = throttle(() => {
    updateScrollProgress();
}, 16); // ~60fps

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    // You can use this for a scroll progress indicator if needed
    document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
}

window.addEventListener('scroll', throttledScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations with delay
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in-up');
        }
    }, 300);
});

// Handle form input focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            if (this.parentElement) {
                this.parentElement.classList.add('focused');
            }
        });
        
        control.addEventListener('blur', function() {
            if (!this.value && this.parentElement) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (control.value && control.parentElement) {
            control.parentElement.classList.add('focused');
        }
    });
});

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .loaded .hero-content {
        animation-delay: 0s;
    }
    
    .notification-alert {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    
    /* Ensure theme transitions work smoothly */
    * {
        transition: background-color 0.3s ease, 
                    color 0.3s ease, 
                    border-color 0.3s ease,
                    opacity 0.3s ease !important;
    }
    
    /* Improve button hover effects */
    .btn:hover {
        transform: translateY(-2px);
    }
    
    .btn:active {
        transform: translateY(0);
    }
`;
document.head.appendChild(notificationStyles);

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Handle visibility change to pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause any heavy animations when tab is hidden
        document.body.classList.add('paused');
    } else {
        // Resume animations when tab is visible
        document.body.classList.remove('paused');
    }
});

// Add smooth page transitions
function addPageTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        body.paused * {
            animation-play-state: paused !important;
        }
        
        .fade-in-up {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Improved focus states for accessibility */
        .btn:focus,
        .form-control:focus,
        .nav-link:focus,
        .theme-toggle:focus {
            outline: 2px solid var(--accent-primary);
            outline-offset: 2px;
        }
        
        /* Reduced motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize page transitions
addPageTransitions();