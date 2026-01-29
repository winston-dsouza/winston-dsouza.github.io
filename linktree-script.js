// ==================== Theme Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add animation class
    themeToggle.style.animation = 'spin 0.5s ease';
    setTimeout(() => {
        themeToggle.style.animation = '';
    }, 500);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ==================== Link Card Interactions ====================
const linkCards = document.querySelectorAll('.link-card');

linkCards.forEach(card => {
    // Add ripple effect on click
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Add hover sound effect (optional)
    card.addEventListener('mouseenter', function() {
        this.style.setProperty('--hover-scale', '1');
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.setProperty('--hover-scale', '0');
    });
});

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Copy Email on Click ====================
const emailCard = document.querySelector('.email');

if (emailCard) {
    emailCard.addEventListener('click', function(e) {
        // Only copy if not opening email client
        if (e.target.closest('.link-card')) {
            const email = 'winstondsouza688@gmail.com';
            
            // Try to copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Email copied to clipboard!');
                }).catch(err => {
                    console.log('Could not copy email', err);
                });
            }
        }
    });
}

// ==================== Toast Notification ====================
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Add toast styles dynamically
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 14px 24px;
        border-radius: 50px;
        box-shadow: 0 8px 32px var(--card-hover-shadow);
        border: 1px solid var(--border-color);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(toastStyles);

// ==================== Analytics (Optional) ====================
// Track link clicks
linkCards.forEach(card => {
    card.addEventListener('click', function() {
        const linkName = this.querySelector('h3').textContent;
        console.log(`Link clicked: ${linkName}`);
        
        // You can add Google Analytics or other tracking here
        // gtag('event', 'click', {
        //     'event_category': 'Link',
        //     'event_label': linkName
        // });
    });
});

// ==================== Performance Optimization ====================
// Lazy load profile image
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.loading = 'lazy';
}

// ==================== Keyboard Navigation ====================
document.addEventListener('keydown', function(e) {
    // Toggle theme with T key
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            themeToggle.click();
        }
    }
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all link cards
linkCards.forEach(card => {
    observer.observe(card);
});

// ==================== Page Load Animation ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== Service Worker Registration (Optional PWA) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA features
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// ==================== Console Easter Egg ====================
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
console.log('%cLooking for Winston? Check out:', 'font-size: 14px; color: #6c757d;');
console.log('%cLinkedIn: https://www.linkedin.com/in/winston-dsouza/', 'font-size: 12px; color: #0077b5;');
console.log('%cGitHub: https://github.com/winston-dsouza', 'font-size: 12px; color: #333;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'font-size: 12px; font-style: italic; color: #8b5cf6;');

// ==================== Prevent Context Menu on Images (Optional) ====================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // Uncomment to prevent right-click on images
        // e.preventDefault();
    });
});

// ==================== Dynamic Year in Footer ====================
const footerText = document.querySelector('.footer p');
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.textContent = `© ${currentYear} Winston D'Souza`;
}

// ==================== Add Active State on Touch ====================
if ('ontouchstart' in window) {
    linkCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// ==================== Preload Hover States ====================
const preloadHoverStates = () => {
    linkCards.forEach(card => {
        const computedStyle = window.getComputedStyle(card);
        // Force browser to calculate hover state
        card.classList.add('preload-hover');
        setTimeout(() => {
            card.classList.remove('preload-hover');
        }, 10);
    });
};

// Run preload after page load
window.addEventListener('load', preloadHoverStates);
