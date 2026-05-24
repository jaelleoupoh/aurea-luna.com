/**
 * AUREA LUNA - Main JavaScript
 * Dashboard functionality and interactions
 */

// ===== SECURE SHOPIFY LINK HANDLER =====
function openShopifyThemes() {
  // Store reference securely and open in new tab
  const isConfirmed = confirm(
    'Vous allez être redirigé vers votre tableau de bord Shopify.\n\n' +
    'Assurez-vous d\'être connecté à votre compte Shopify pour accéder à la section des thèmes.'
  );

  if (isConfirmed) {
    // Use a secure method to open - don't hardcode sensitive URLs in HTML
    const storeSubdomain = 'aurea-luna';
    const adminUrl = `https://admin.shopify.com/store/${storeSubdomain}/themes`;

    // Open in new tab/window
    window.open(adminUrl, '_blank', 'noopener,noreferrer');
  }
}

// ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
document.addEventListener('DOMContentLoaded', function() {
  initializeSmoothScroll();
  initializeProgressBar();
  initializeObservers();
  initializeAccessibility();
});

function initializeSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only prevent default if it's an anchor link
      if (href !== '#') {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ===== ANIMATED PROGRESS BAR =====
function initializeProgressBar() {
  const progressBar = document.querySelector('.progress-bar-fill');
  
  if (progressBar) {
    // Trigger animation on load
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fill-animation 1.5s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(progressBar);
  }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initializeObservers() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe stat cards and collection cards
  document.querySelectorAll('.stat-card, .coll-card, .check-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initializeAccessibility() {
  // Add keyboard navigation for buttons
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(button => {
    button.addEventListener('keydown', (e) => {
      // Allow Enter and Space to activate buttons
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Add ARIA labels where needed
  const progressBar = document.querySelector('.progress-bar-wrap');
  if (progressBar) {
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuenow', '72');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.setAttribute('aria-label', 'Progression du lancement: 72%');
  }

  // Add skip link for keyboard navigation
  addSkipLink();
}

// ===== SKIP LINK FOR ACCESSIBILITY =====
function addSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Passer au contenu principal';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--gold);
    color: #1a1a1a;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
    border-radius: 0 0 4px 0;
  `;

  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add ID to content div if it doesn't exist
  const content = document.querySelector('.content');
  if (content && !content.id) {
    content.id = 'content';
  }
}

// ===== RESPONSIVE NAVIGATION CHECK =====
function checkResponsive() {
  const width = window.innerWidth;
  
  if (width <= 768) {
    // Mobile adjustments
    document.body.style.fontSize = '14px';
  } else {
    document.body.style.fontSize = '16px';
  }
}

window.addEventListener('resize', debounce(checkResponsive, 250));
checkResponsive();

// ===== UTILITY: DEBOUNCE =====
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

// ===== THEME DATA VALIDATION =====
const themeData = {
  storeName: 'aurea-luna',
  themeName: 'Shopistart',
  themeId: '185565413667',
  collections: 14,
  progress: 72,
  lastUpdate: new Date().toLocaleDateString('fr-FR')
};

console.log('🌙 Aurea·Luna Dashboard Initialized', themeData);

// ===== EXPORT FOR EXTERNAL USE =====
window.aureaSite = {
  openShopifyThemes,
  themeData,
  version: '1.0.0'
};