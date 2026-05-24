/**
 * Aurea Luna - Dashboard JavaScript
 * Main functionality and interactions
 */

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  console.log('Aurea Luna Dashboard initialized');
  initializeEventListeners();
  loadDashboardData();
});

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
  // Action buttons
  document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', handleActionClick);
  });

  // Internal smooth scrolling links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleSmoothScroll);
  });

  // Hover effects
  document.querySelectorAll('.coll-card, .stat-card, .step-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Handle action button clicks
 */
function handleActionClick(event) {
  const buttonText = event.target.textContent.trim();
  console.log('Action clicked:', buttonText);
  
  // Log custom event for analytics
  if (window.gtag) {
    gtag('event', 'dashboard_action', {
      'action': buttonText
    });
  }
}

/**
 * Handle smooth scrolling
 */
function handleSmoothScroll(event) {
  event.preventDefault();
  const targetId = this.getAttribute('href');
  const target = document.querySelector(targetId);
  
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Load and display dashboard data
 */
function loadDashboardData() {
  // Update progress bar dynamically if needed
  updateProgressBar();
  
  // Load saved preferences from localStorage
  loadUserPreferences();
}

/**
 * Update progress bar animation
 */
function updateProgressBar() {
  const progressBar = document.querySelector('.progress-bar-fill');
  if (progressBar) {
    const targetWidth = 72; // 72% as defined
    let currentWidth = 0;
    const step = 1;
    
    const interval = setInterval(() => {
      currentWidth += step;
      progressBar.style.width = currentWidth + '%';
      
      if (currentWidth >= targetWidth) {
        clearInterval(interval);
      }
    }, 10);
  }
}

/**
 * Save user preferences to localStorage
 */
function saveUserPreferences(key, value) {
  try {
    localStorage.setItem(`aurea-luna-${key}`, JSON.stringify(value));
  } catch (error) {
    console.warn('localStorage not available:', error);
  }
}

/**
 * Load user preferences from localStorage
 */
function loadUserPreferences() {
  try {
    const theme = localStorage.getItem('aurea-luna-theme');
    if (theme && theme === 'light') {
      document.body.classList.add('light-mode');
    }
  } catch (error) {
    console.warn('localStorage not available:', error);
  }
}

/**
 * Log page performance metrics
 */
window.addEventListener('load', function() {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page fully loaded in:', pageLoadTime + 'ms');
    
    // Send performance metric to analytics if available
    if (window.gtag) {
      gtag('event', 'page_load_time', {
        'value': pageLoadTime
      });
    }
  }
});

/**
 * Detect and log any errors
 */
window.addEventListener('error', function(event) {
  console.error('Error detected:', event.error);
  
  // Send error to analytics if available
  if (window.gtag) {
    gtag('event', 'exception', {
      'description': event.error ? event.error.message : 'Unknown error'
    });
  }
});

/**
 * Handle visibility changes for analytics
 */
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    console.log('Page hidden');
  } else {
    console.log('Page visible');
  }
});

/**
 * Export dashboard data for debugging
 */
function exportDashboardData() {
  const data = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    pageTitle: document.title,
    url: window.location.href
  };
  return data;
}

// Make functions globally available for testing
window.aurealuna = {
  updateProgressBar,
  saveUserPreferences,
  loadUserPreferences,
  exportDashboardData
};
